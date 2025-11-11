import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, '../dist');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      console.log(`✓ Script already present in ${filePath}`);
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `${scriptTag}\n</head>`);
    } else if (content.includes('<body>')) {
      content = content.replace('<body>', `<body>\n${scriptTag}`);
    } else {
      console.log(`⚠ Could not find injection point in ${filePath}`);
      return;
    }
    
    writeFileSync(filePath, content);
    console.log(`✓ Injected script into ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  }
}

console.log('Starting console capture script injection...\n');
processDirectory(distDir);
console.log('\nConsole capture script injection complete!');