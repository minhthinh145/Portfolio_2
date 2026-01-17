import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIFE_IMAGES_DIR = path.join(__dirname, "../public/images/life");
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const originalSize = fs.statSync(inputPath).size;

  try {
    await sharp(inputPath)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const saved = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

    console.log(
      `✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (saved ${saved}%)`,
    );

    // Remove original file after successful conversion
    fs.unlinkSync(inputPath);

    return outputPath;
  } catch (err) {
    console.error(`❌ Error converting ${inputPath}:`, err.message);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      await processDirectory(fullPath);
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        await optimizeImage(fullPath);
      }
    }
  }
}

console.log("🖼️  Optimizing images to WebP...\n");
console.log(`Max width: ${MAX_WIDTH}px | Quality: ${QUALITY}%\n`);

processDirectory(LIFE_IMAGES_DIR).then(() => {
  console.log("\n✨ Done! All images converted to WebP.");
  console.log("💡 Remember to run: npm run sync-images");
});
