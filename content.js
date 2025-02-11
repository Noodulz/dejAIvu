// Load ONNX Runtime from local extension folder
const onnxScript = document.createElement("script");
onnxScript.src = chrome.runtime.getURL("lib/ort.min.js");
onnxScript.onload = async () => {
    console.log("ONNX Runtime Web loaded");
    await initializeONNX();
};
document.head.appendChild(onnxScript);

let model = null;

async function initializeONNX() {
    try {
        if (typeof window.ort === "undefined") {
            console.error("ONNX Runtime is not available.");
            return;
        }

        const modelPath = chrome.runtime.getURL("model/praisebe.onnx");
        console.log("Loading ONNX model from:", modelPath);
        model = await window.ort.InferenceSession.create(modelPath);

        if (model) {
            console.log("ONNX Model successfully loaded.");
            processExistingImages();
            watchForNewImages();
        } else {
            console.error("Model failed to load.");
        }
    } catch (error) {
        console.error("Error loading ONNX model:", error);
    }
}

function processExistingImages() {
    if (!model) {
        console.warn("ONNX model is still not loaded. Retrying in 1 second...");
        setTimeout(processExistingImages, 1000);
        return;
    }

    const images = document.querySelectorAll("img");
    console.log(`Found ${images.length} images on the page.`);
    
    images.forEach((img, index) => {
        console.log(`Processing image ${index + 1}: ${img.src}`);
        predictImage(img);
    });
}

function watchForNewImages() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === "IMG") {
                    if (!model) {
                        console.warn("ONNX model is still not ready. Skipping new image detection.");
                        return;
                    }

                    console.log(`New image detected: ${node.src}`);
                    predictImage(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

async function preprocessImage(imgElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 256;
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const inputTensor = new Float32Array(256 * 256 * 3);
    let j = 0;
    for (let i = 0; i < pixels.length; i += 4) {
        inputTensor[j++] = pixels[i] / 255.0;
        inputTensor[j++] = pixels[i + 1] / 255.0;
        inputTensor[j++] = pixels[i + 2] / 255.0;
    }

    return new window.ort.Tensor("float32", inputTensor, [1, 3, 256, 256]);
}

async function predictImage(imgElement) {
    if (!model) {
        console.warn("ONNX model is not loaded yet. Skipping prediction.");
        return;
    }

    try {
        console.log("Preprocessing image...");
        const inputTensor = await preprocessImage(imgElement);

        console.log("Running model inference...");
        const feeds = {};
        feeds[model.inputNames[0]] = inputTensor;

        const output = await model.run(feeds);
        const outputName = model.outputNames[0];
        const prediction = output[outputName].data[0];

        console.log(`Prediction score for image: ${prediction}`);

        if (prediction > 0.5) {
            console.log("AI-generated image detected, applying overlay.");
            applyOverlay(imgElement);
        } else {
            console.log("Image is not AI-generated.");
        }
    } catch (error) {
        console.error("Prediction error:", error);
    }
}

function applyOverlay(img) {
    console.log(`Applying overlay to image: ${img.src}`);

    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = `${img.offsetTop}px`;
    overlay.style.left = `${img.offsetLeft}px`;
    overlay.style.width = `${img.width}px`;
    overlay.style.height = `${img.height}px`;
    overlay.style.background = "rgba(255, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";
    overlay.style.pointerEvents = "none";

    img.parentElement.style.position = "relative";
    img.parentElement.appendChild(overlay);
}

// Start detecting images when the page loads
initializeONNX();
