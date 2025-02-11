function generateSaliencyHeatmap(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0, img.width, img.height);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // Generate a fake heatmap (randomized for now, real saliency requires model gradients)
    for (let i = 0; i < data.length; i += 4) {
        let intensity = Math.random() * 255;
        data[i] = intensity;      // Red
        data[i + 1] = 0;          // Green
        data[i + 2] = 255 - intensity; // Blue
        data[i + 3] = 150;        // Transparency
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}
