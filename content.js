console.log("AI Image Detector is running...");

function scanImages() {
    let images = document.querySelectorAll("img:not([data-processed])");

    images.forEach(async (img) => {
        img.setAttribute("data-processed", "true"); // Prevent duplicate processing

        // Process the image directly without fetching
        const tensorImage = await preprocessImage(img);

        // Run ONNX inference
        const prediction = await runONNXModel(tensorImage);

        if (prediction === 1) { // AI-generated detected
            console.log("AI-generated image detected!");
            replaceImageWithHeatmap(img);
        }
    });
}

// Observe new images added dynamically
const observer = new MutationObserver(() => {
    scanImages();
});
observer.observe(document.body, { childList: true, subtree: true });

// Function to scan and analyze images

// Replace image with heatmap overlay
function replaceImage(img, canvas) {
    canvas.style.position = "absolute";
    canvas.style.top = img.offsetTop + "px";
    canvas.style.left = img.offsetLeft + "px";
    canvas.style.width = img.width + "px";
    canvas.style.height = img.height + "px";
    img.replaceWith(canvas);
}

function replaceImageWithHeatmap(imgElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    const ctx = canvas.getContext("2d");

    // ✅ Draw the original image first
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // ✅ Overlay a semi-transparent red filter
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; // Red overlay with 50% transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ✅ Replace the original image with the canvas
    imgElement.replaceWith(canvas);
}

