import fs from 'fs';
import path from 'path';

// Valid minimalist 8x8 GIF binary header + color table buffers for each icon
const gifBase64 = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const gifBuffer = Buffer.from(gifBase64, 'base64');

const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const names = ['stay.gif', 'dine.gif', 'people.gif', 'admin.gif', 'payments.gif', 'inventory.gif'];

names.forEach(name => {
  const filePath = path.join(iconsDir, name);
  fs.writeFileSync(filePath, gifBuffer);
  console.log(`Created binary GIF file: ${filePath}`);
});
