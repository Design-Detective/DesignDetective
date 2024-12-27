// JavaScript of my web extension: Retrive and print ou Font and Color palette of the last active tab.
const btn = document.getElementById("btn");
// Draw 'thanks.html' when installing the extension:
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
//TODO: add a condition where: if (message sent (so scode ran) = clear.child.append() then rerun the script):
btn.addEventListener('click', async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  const tabs = await chrome.tabs.query(queryOptions);
  // if [tabs] > 0, execute the code, otherwise, throw out an error.
  if (tabs.length > 0) {
    const tabId = tabs[0].id;
    
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const fontFamilies = new Set();
        const colorPalette = new Set();
        for (const sheet of document.styleSheets) {
          try {
            for (const rule of sheet.cssRules) {
              if (rule.style) {
                if (rule.style.fontFamily && !rule.style.fontFamily.includes('var')) {
                  fontFamilies.add(rule.style.fontFamily);
                }
                if (rule.style.color && !rule.style.color.includes('var') && (rule.style.color.includes('#') || rule.style.color.includes('rgba') || rule.style.color.includes('hsl') || rule.style.color.includes('rgb'))) {
                  colorPalette.add(rule.style.color);
                  console.log(colorPalette);
                }
              }
            }
          } catch (e) {
            alert(e);
          }
        }
        chrome.runtime.sendMessage({ fontFamilies: Array.from(fontFamilies) });
        chrome.runtime.sendMessage({ colorPalette: Array.from(colorPalette) });
      }
    });

  }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  const responseFont = document.querySelector('.response-font');
  if (message.fontFamilies) {
    message.fontFamilies.forEach(fontFamily => {
      let p = document.createElement('p');
      p.classList.add("text");
      p.append("font family: " + fontFamily);
      responseFont.appendChild(p);
    });
  }

  const responseColor = document.querySelector('.response-color');
  if (message.colorPalette) {
    message.colorPalette.forEach(color => {
      let p = document.createElement('p');
      p.classList.add("text");
      p.append('colors: ' + color);
      responseColor.appendChild(p);
    });
  }

  chrome.action.setBadgeText({ text: "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: "#181818" });
});