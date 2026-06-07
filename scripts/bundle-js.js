const fs = require('fs');
const path = require('path');

const filesToBundle = [
  'assets/js/config.js',
  'assets/js/nav-config.js',    // Navigation structure configurations (must come before config-loader)
  'assets/js/config-loader.js', // Injects header/footer components using SITE_CONFIG + NAV_CONFIG
  'assets/js/global-data.js',   // Class-based injection for phone, price, email, etc.
  'assets/js/form-handler.js',
  'assets/js/nav-inject.js',
  'assets/js/script.js',
  'assets/js/enhancements.js',
  'assets/js/color-dynamics.js',
  'assets/js/futuristic-global.js'
];

const outputFile = path.join(__dirname, '../assets/js/bundle.min.js');

console.log('=== STARTING JS BUNDLING ===');

let bundledContent = '';

filesToBundle.forEach(filePath => {
  const absolutePath = path.join(__dirname, '../', filePath);
  if (fs.existsSync(absolutePath)) {
    console.log(`Bundling: ${filePath}`);
    const content = fs.readFileSync(absolutePath, 'utf8');
    bundledContent += `/* ${path.basename(filePath)} */\n${content}\n;\n`;
  } else {
    console.warn(`Warning: File not found: ${filePath}`);
  }
});

try {
  fs.writeFileSync(outputFile, bundledContent, 'utf8');
  console.log(`\nSuccessfully bundled ${filesToBundle.length} files into: ${outputFile}`);
  console.log('=== JS BUNDLING COMPLETE ===');
} catch (err) {
  console.error('Error writing bundle file:', err);
  process.exit(1);
}
