// Get all font elements on the page
const fonts = document.querySelectorAll('font');

// Create a map to store the font names and their frequencies
const fontFrequencies = new Map();

fonts.forEach((font) => {
  const fontFamily = font.getAttribute('family');
  if (fontFamily && !fontFrequencies.has(fontFamily)) {
    fontFrequencies.set(fontFamily, 1);
  } else {
    const frequency = fontFrequencies.get(fontFamily);
    fontFrequencies.set(fontFamily, frequency + 1);
  }
});

// Find the most used font
let mostUsedFont;
if (fontFrequencies.size > 0) {
  mostUsedFont = [...fontFrequencies.entries()].sort((a, b) => b[1] - a[1])[0][0];
} else {
  mostUsedFont = 'Unknown';
}

// Get all color elements on the page
const colors = document.querySelectorAll('span, div, p, h1, h2, h3');

// Create a map to store the color names and their frequencies
const colorFrequencies = new Map();

colors.forEach((color) => {
  const colorName = getColorName(color);
  if (colorName && !colorFrequencies.has(colorName)) {
    colorFrequencies.set(colorName, 1);
  } else {
    const frequency = colorFrequencies.get(colorName);
    colorFrequencies.set(colorName, frequency + 1);
  }
});

// Find the most used color
let mostUsedColor;
if (colorFrequencies.size > 0) {
  mostUsedColor = [...colorFrequencies.entries()].sort((a, b) => b[1] - a[1])[0][0];
} else {
  mostUsedColor = 'Unknown';
}

// Get URLs to download or use the font and color
const urls = [
  `https://fonts.googleapis.com/css2?family=${mostUsedFont}&display=swap&family=${mostUsedFont}&text=+&size=24&weight=400`, // Font URL
  `https://www.w3schools.com w3school-colors-2019.asp` // Color URL
];

// Inject the results into the page
if (document.body) {
  const resultContainer = document.createElement('div');
  resultContainer.innerHTML = `
    <h2>Most Used Font:</h2>
    <p>${mostUsedFont}</p>
    <br>
    <h2>Most Used Color:</h2>
    <p>${mostUsedColor}</p>
    <br>
    <h2>Urls:</h2>
    <ul>
      ${urls.map((url) => `<li><a href="${url}">${url}</a></li>`).join('')}
    </ul>
  `;
  document.body.appendChild(resultContainer);
}

// Function to get the color name from a CSS color value
function getColorName(color) {
  const regex = /^rgb\((\d+),(\d+),(\d+)\)$/;
  const match = color.match(regex);
  if (match) {
    return `#${match[1]},${match[2]},${match[3]}`;
  } else {
    return '';
  }
}