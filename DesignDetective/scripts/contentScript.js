// file that serve to subscribe the background worker of my web extension.
// thanks.html when installing the extension:
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "thanks.html",
    });
  }
});

// Set some UI element when using the extension:
chrome.action.setBadgeText({ 
  text: "ON" 
});
chrome.action.setBadgeBackgroundColor({
  color: "#5A3737"
});

const btn = document.getElementById("btn");
// add event listener for "on click":
btn.addEventListener('click', async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  try {
    // `tab` will either be a `tabs.Tab` instance or an empty array (`[]`).
    const tab = await chrome.tabs.query(queryOptions);
    if (tab.length > 0) {
      const htmlDoc = new DOMParser().parseFromString(tab.content, 'text/html');
      const styleElements = htmlDoc.querySelectorAll('[style]');
      
      if (styleElements.length > 0) {

      }
    } 
    else {
      alert("Open a tab you want to analyse first.");
    }
  } 
  catch (error) {
    console.error('Error querying tabs:', error);
  }
});

