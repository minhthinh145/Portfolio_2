import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIFE_IMAGES_DIR = path.join(__dirname, "../public/images/life");
const LIFE_DATA_DIR = path.join(__dirname, "../src/data/life");

const categories = ["my-cat", "hcmue", "daily", "travel"];

function getImageFiles(folderPath) {
  if (!fs.existsSync(folderPath)) return [];

  const files = fs.readdirSync(folderPath);
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file, ext);
      return imageExtensions.includes(ext) && baseName !== "featured";
    })
    .sort((a, b) => {
      // Sort numerically if possible (1.jpg, 2.jpg, 3.jpg...)
      const numA = parseInt(path.basename(a, path.extname(a)));
      const numB = parseInt(path.basename(b, path.extname(b)));
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
}

function updateCategoryJson(category) {
  const jsonPath = path.join(LIFE_DATA_DIR, `${category}.json`);
  const imagesBasePath = path.join(LIFE_IMAGES_DIR, category);

  if (!fs.existsSync(jsonPath)) {
    console.log(`⚠️  ${category}.json not found, skipping...`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  let updated = false;

  data.posts.forEach((post) => {
    const postFolder = post.folder;
    const postImagesDir = path.join(imagesBasePath, postFolder);

    if (!fs.existsSync(postImagesDir)) {
      console.log(`📁 Folder ${postFolder} not found for ${category}`);
      return;
    }

    const imageFiles = getImageFiles(postImagesDir);
    const newImages = imageFiles.map((file, index) => ({
      src: `/images/life/${category}/${postFolder}/${file}`,
      caption: `Photo ${index + 1}`,
    }));

    // Only update if images changed
    const currentSrcs = post.images
      .map((img) => img.src)
      .sort()
      .join(",");
    const newSrcs = newImages
      .map((img) => img.src)
      .sort()
      .join(",");

    if (currentSrcs !== newSrcs) {
      // Preserve existing captions if available
      const captionMap = {};
      post.images.forEach((img) => {
        captionMap[img.src] = img.caption;
      });

      post.images = newImages.map((img) => ({
        ...img,
        caption: captionMap[img.src] || img.caption,
      }));

      updated = true;
      console.log(
        `✅ ${category}/${postFolder}: Found ${imageFiles.length} images`,
      );
    }
  });

  if (updated) {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
    console.log(`💾 Updated ${category}.json`);
  } else {
    console.log(`✓  ${category}.json - no changes needed`);
  }
}

console.log("🔍 Scanning life image folders...\n");

categories.forEach((category) => {
  updateCategoryJson(category);
});

console.log("\n✨ Done! Images synced with JSON files.");
