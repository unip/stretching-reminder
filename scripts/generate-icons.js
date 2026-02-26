import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '..', 'assets', 'icons');

// Create ICO file (Windows) - multiple sizes in one file
async function createIco() {
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const icoBuffer = await sharp(join(iconsDir, 'icon.svg'))
    .resize(256, 256)
    .toFormat('png')
    .toBuffer();
  
  // For ICO, we need to use a special format
  // Sharp doesn't directly support ICO, so we'll create a PNG and rename
  // Actually, let's create multiple PNGs and use a proper ICO encoder
  
  // Create ICO with embedded PNG
  const pngData = await sharp(join(iconsDir, 'icon.svg')).png().toBuffer();
  
  // ICO header structure
  // We'll create a simple ICO with one 256x256 image
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);  // Reserved
  icoHeader.writeUInt16LE(1, 2);  // Type (1 = icon)
  icoHeader.writeUInt16LE(1, 4);  // Count (1 image)
  
  // ICO directory entry (16 bytes)
  const icoDir = Buffer.alloc(16);
  icoDir.writeUInt8(0, 0);   // Width (0 = 256)
  icoDir.writeUInt8(0, 1);   // Height (0 = 256)
  icoDir.writeUInt8(0, 2);   // Colors
  icoDir.writeUInt8(0, 3);   // Reserved
  icoDir.writeUInt16LE(1, 4);  // Color planes
  icoDir.writeUInt16LE(32, 6); // Bits per pixel
  icoDir.writeUInt32LE(pngData.length, 8);  // Image size
  icoDir.writeUInt32LE(22, 12);  // Image offset (6 + 16 = 22)
  
  const icoBuffer_final = Buffer.concat([icoHeader, icoDir, pngData]);
  writeFileSync(join(iconsDir, 'icon.ico'), icoBuffer_final);
  console.log('✓ Created icon.ico');
}

// Create ICNS file (macOS)
async function createIcns() {
  // ICNS header
  const icnsHeader = Buffer.alloc(8);
  icnsHeader.writeUInt32BE(0x69636E73, 0);  // 'icns' magic
  icnsHeader.writeUInt32BE(0, 4);  // File size (will update later)
  
  const iconData = await sharp(join(iconsDir, 'icon.svg')).toBuffer();
  
  // We need to create multiple icon sizes for ICNS
  const iconSizes = [
    { name: 'ic07', size: 128 },
    { name: 'ic08', size: 256 },
    { name: 'ic09', size: 512 },
    { name: 'ic10', size: 1024 },
  ];
  
  let icnsData = Buffer.from(icnsHeader);
  
  for (const { name, size } of iconSizes) {
    const pngBuffer = await sharp(join(iconsDir, 'icon.svg'))
      .resize(size, size)
      .png()
      .toBuffer();
    
    // Icon entry header (8 bytes)
    const entryHeader = Buffer.alloc(8);
    entryHeader.writeUInt32BE(stringToFourCC(name), 0);  // Icon type
    entryHeader.writeUInt32BE(pngBuffer.length + 8, 4);  // Entry size
    
    icnsData = Buffer.concat([icnsData, entryHeader, pngBuffer]);
  }
  
  // Update file size in header
  icnsData.writeUInt32BE(icnsData.length, 4);
  
  writeFileSync(join(iconsDir, 'icon.icns'), icnsData);
  console.log('✓ Created icon.icns');
}

function stringToFourCC(str) {
  return str.split('').reduce((acc, char, i) => {
    return acc | (char.charCodeAt(0) << (24 - i * 8));
  }, 0);
}

// Run
(async () => {
  try {
    await createIco();
    await createIcns();
    console.log('\n✓ All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
})();
