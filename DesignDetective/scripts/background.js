// file that serve to subscribe the background worker of my web extension.

const { Text } = require("@xmldom/xmldom");

// thanks.html when installing the extension:
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "thanks.html",
    });
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.action.setBadgeText({ text: "ON" });

chrome.action.setBadgeBackgroundColor({ color: "#5A3737" });
