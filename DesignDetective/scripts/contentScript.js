/*
8888888b.                    d8b                   
888  "Y88b                   Y8P                   
888    888                                         
888    888  .d88b.  .d8888b  888  .d88b.  88888b.  
888    888 d8P  Y8b 88K      888 d88P"88b 888 "88b 
888    888 88888888 "Y8888b. 888 888  888 888  888 
888  .d88P Y8b.          X88 888 Y88b 888 888  888 
8888888P"   "Y8888   88888P' 888  "Y88888 888  888 
                                      888          
                                 Y8b d88P          
                                  "Y88P"           
8888888b.           888                      888    d8b                   
888  "Y88b          888                      888    Y8P                   
888    888          888                      888                          
888    888  .d88b.  888888  .d88b.   .d8888b 888888 888 888  888  .d88b.  
888    888 d8P  Y8b 888    d8P  Y8b d88P"    888    888 888  888 d8P  Y8b 
888    888 88888888 888    88888888 888      888    888 Y88  88P 88888888 
888  .d88P Y8b.     Y88b.  Y8b.     Y88b.    Y88b.  888  Y8bd8P  Y8b.     
8888888P"   "Y8888   "Y888  "Y8888   "Y8888P  "Y888 888   Y88P    "Y8888  
*/                                                           
// JavaScript of my web extension: Retrieve & print out Font and Color palette of the last active tab.
const btn = document.getElementById("btn");

// Draw 'thanks.html' when installing the extension:
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
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
  const lineBreak = document.createElement('hr');
  const responseFont = document.querySelector('.response-font');
  if (message.fontFamilies) {
    message.fontFamilies.forEach(fontFamily => {
      let p = document.createElement('p');
      p.classList.add("text");
      p.append("font family: " + fontFamily);
      responseFont.appendChild(p);
    });
  } else {
    responseFont.appendChild(lineBreak);
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

/* TODO: Clear Dynamicly added hr tags :)
document.getElementById('clear-btn').addEventListener("click", function() {
  let textElements = document.getElementsByClassName("text");
  for (let i = 0; i < textElements.length; i++) {
    textElements[i].innerHTML=''; 
  }
});
*/