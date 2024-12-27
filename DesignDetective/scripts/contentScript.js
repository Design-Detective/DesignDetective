// JavaScript of my web extension: Retrive and print ou Font and Color palette of the last active tab.
const btn = document.getElementById("btn");

// thanks.html when installing the extension:
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "thanks.html",
    });
  }
});

// set some UI elements:
chrome.action.setBadgeText({ text: "ON" });
chrome.action.setBadgeBackgroundColor({ color: "#5A3737" });
//TODO: add a condition where if (message sent (so scode ran) = clear.child.append() then rerun the script):
btn.addEventListener('click', async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  const tabs = await chrome.tabs.query(queryOptions);
  console.log("found tab:", tabs);

  if (tabs.length > 0) {
    const tabId = tabs[0].id;
    console.log("Found tabs id:", tabId);
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const fontFamilies = new Set();
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.style && rule.style.fontFamily && !rule.style.fontFamily.includes('var')) {
                fontFamilies.add(rule.style.fontFamily);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }
      chrome.runtime.sendMessage({ fontFamilies: Array.from(fontFamilies) });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const responseDiv = document.querySelector('.response');
  message.fontFamilies.forEach(fontFamily => {
    let p = document.createElement('p');
    p.classList.add("text");
    p.append("font family: " + fontFamily);
    responseDiv.appendChild(p);
  });
  chrome.action.setBadgeText({ text: "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: "#181818" });
});