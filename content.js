console.log("DejAIvu extension activated!");

function processExistingImages() {
    const images = document.querySelectorAll("img");
    console.log(`Found ${images.length} images.`);
    images.forEach((img, index) => {
        console.log(`Processing image ${index}: ${img.src}`);
        overlayPlaceholder(img);
    });
}

function watchForNewImages() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === "IMG") {
                    console.log(`New image detected: ${node.src}`);
                    overlayPlaceholder(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Run the existing image processor
processExistingImages();

// Start watching for dynamically loaded images
watchForNewImages();

function overlayPlaceholder(img) {
    const rect = img.getBoundingClientRect(); // Get image position and size

    // Create overlay
    const overlay = document.createElement("div");
    overlay.style.position = "absolute"; // Use absolute positioning
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.style.top = `${img.offsetTop}px`; // Align with image's top position
    overlay.style.left = `${img.offsetLeft}px`; // Align with image's left position
    overlay.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    overlay.style.zIndex = "1000";
    overlay.style.pointerEvents = "none"; // Prevent interaction issues

    // Insert the overlay in the same container as the image
    img.parentElement.style.position = "relative"; // Ensure parent has positioning context
    img.parentElement.appendChild(overlay);
}