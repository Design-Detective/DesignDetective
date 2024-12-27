// file that serve to subscribe the background worker of my web extension.
// thanks.html when installing the extension:
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "thanks.html",
    });
  }
});

chrome.action.setBadgeText({ 
  text: "ON" 
});

chrome.action.setBadgeBackgroundColor({
  color: "#5A3737"
});

// add event listener for "on click":
chrome.action.onClicked.addListener((tab) => {
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return  tab;
  }
});