document.getElementById("toggle-detection").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggleDetection" });
    alert("Detection toggled!");
});