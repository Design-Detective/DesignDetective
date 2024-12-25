const styleRules = document.styleSheets;

let mostUsedFont;
let mostUsedColor;
const designAnalysis = document.getElementById("btn")

styleRules.forEach(rule => {
  const cssText = rule.cssText;
  // Parse the CSS text using a library like jsdom or parsecss
  const parser = new domParser();
  const doc = parser.parseFromString(cssText, 'text/css');
  const styles = getStyles(doc);
  // populate the variable if found desired values.
  styles.forEach(style => {
    if (style.property === 'font-family') {
      mostUsedFont = style.value;
    } else if (style.property === 'color') {
      // Check if the color is in hex format
      if (/^#([0-9A-F]{6}|[0-9A-F]{3})$/.test(style.value)) {
        mostUsedColor = style.value;
      }
    }
  });
});

// Get the URL of the most used font from Google Fonts
if (mostUsedFont && mostUsedColor) {
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${mostUsedFont.split('-').map(family => family.charAt(0).toUpperCase() +
family.slice(1)).join('-')}`;

  // Create a link to download the font
  const downloadLink = document.createElement('a');
  downloadLink.href = googleFontsUrl;
  downloadLink.download = mostUsedFont.replace('-', ' ').toLowerCase() + '.woff2';
  downloadLink.rel = 'stylesheet';

  document.body.appendChild(downloadLink);
}

function getStyles(doc) {
  // Use a library like parsecss to extract styles from the CSS doc
  const parser = new parsecss.Parser();
  return parser.parse(doc.body).map(style => ({ property: style.property, value: style.value }));
}

if (designAnalysis.onclick) {

}