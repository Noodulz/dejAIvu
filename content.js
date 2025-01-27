console.log("DejAIvu extension activated!");

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll("img");
    images.forEach((img, index) => {
        console.log(`Processing image ${index}: ${img.src}`);
        overlayPlaceholder(img);
    });
});

function overlayPlaceholder(img) {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.width = `${img.width}px`;
    overlay.style.height = `${img.height}px`;
    overlay.style.top = `${img.offsetTop}px`;
    overlay.style.left = `${img.offsetLeft}px`;
    overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    overlay.style.zIndex = "1000";
    document.body.appendChild(overlay);
}