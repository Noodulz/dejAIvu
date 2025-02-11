let session;

// ✅ Load ONNX Runtime dynamically before using it
async function loadONNXRuntime() {
    return new Promise((resolve, reject) => {
        if (window.ort) {
            console.log("ONNX Runtime already loaded.");
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("lib/ort.min.js");
        script.onload = () => {
            console.log("ONNX Runtime Loaded!");
            resolve();
        };
        script.onerror = (e) => reject(new Error("Failed to load ONNX Runtime: " + e));
        document.head.appendChild(script);
    });
}

// ✅ Load ONNX Model after ONNX Runtime is available
async function loadONNXModel() {
    await loadONNXRuntime();

    // 🔥 Wait for `ort` to fully initialize before proceeding
    while (!window.ort || typeof window.ort.InferenceSession === "undefined") {
        console.log("Waiting for ONNX Runtime to initialize...");
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    session = await ort.InferenceSession.create(chrome.runtime.getURL("model/praisebe.onnx"));
    console.log("ONNX Model Loaded!");
}

async function preprocessImage(imgElement) {
    return new Promise((resolve, reject) => {
        try {
            // Create a hidden canvas to draw the image
            const canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            const ctx = canvas.getContext("2d");

            // ✅ Draw image directly from the DOM (No CORS issue here!)
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

            try {
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                let input = new Float32Array(canvas.width * canvas.height * 3);

                for (let i = 0, j = 0; i < imageData.length; i += 4) {
                    input[j++] = imageData[i] / 255;     // Red
                    input[j++] = imageData[i + 1] / 255; // Green
                    input[j++] = imageData[i + 2] / 255; // Blue
                }

                resolve(new ort.Tensor("float32", input, [1, canvas.width, canvas.height, 3]));
            } catch (error) {
                console.error("Failed to process image due to CORS restrictions.", error);
                reject(error);
            }
        } catch (error) {
            console.error("Error in preprocessing image:", error);
            reject(error);
        }
    });
}


// ✅ Run inference
async function runONNXModel(tensorImage) {
    if (!session) await loadONNXModel();

    // ✅ Check if `session` is properly initialized
    if (!session) {
        console.error("ONNX session failed to initialize.");
        return null;
    }

    const results = await session.run({ "input": tensorImage });
    const output = results["output"].data[0];

    return output > 0.5 ? 1 : 0; // 🔥 Returns 1 if AI-generated, 0 if human-made
}

// ✅ Expose functions for `content.js`
window.preprocessImage = preprocessImage;
window.runONNXModel = runONNXModel;
