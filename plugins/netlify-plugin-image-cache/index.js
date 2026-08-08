const CACHE_DIR = ".cache/img";

export async function onPreBuild({ utils }) {
  const restored = await utils.cache.restore(CACHE_DIR);

  console.log(
    restored
      ? `Restored image cache: ${CACHE_DIR}`
      : `No existing image cache found: ${CACHE_DIR}`
  );
}

export async function onPostBuild({ utils }) {
  const saved = await utils.cache.save(CACHE_DIR);

  console.log(
    saved
      ? `Saved image cache: ${CACHE_DIR}`
      : `No image cache to save: ${CACHE_DIR}`
  );
}