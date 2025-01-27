chrome.runtime.onInstalled.addListener(() => {
    console.log("DejAIvu extension installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleDetection") {
        console.log("Toggling detection feature");
        // Placeholder for logic
    }
});