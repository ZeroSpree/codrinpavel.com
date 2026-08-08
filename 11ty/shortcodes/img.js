/**
 * Shortcode: {% img %}
 * @link https://www.11ty.dev/docs/plugins/image/
 *
 * @param {string} src               - Image path and filename, relative to ./src/assets/img/
 * @param {string} [alt=""]          - Alt text (ignored when preload=true)
 * @param {string} [css_classes=""]  - CSS classes applied to the image (ignored when preload=true)
 * @param {string} [loading="lazy"]  - Image loading strategy: "lazy" or "eager" (ignored when preload=true)
 * @param {string|null} [strategy]   - "preload", "prefetch", or null
 *
 * Usage:
 * {% img "folder/filename.jpg" %}
 * {% img "folder/filename.jpg", "alt text", "css_classes", "eager" %}
 * {% img "folder/filename.jpg", "", "", "lazy", "preload" %}
 *
 * Notes:
 * - Generates responsive images using @11ty/eleventy-img.
 * - Generated AVIF files are stored in .cache/img.
 * - Netlify restores .cache/img between builds.
 * - Eleventy Image skips processing when the hashed output already exists.
 */

import Image from "@11ty/eleventy-img";
import Config from "../config.js";

export default async function (
  src,
  alt = "",
  css_classes = "",
  loading = "lazy",
  strategy = null
) {
  const metadata = await Image(`./src/assets/img/${src}`, {
    transformOnRequest: process.env.ELEVENTY_ENV === "dev",
    widths: [1024, 1920],
    formats: ["avif"],
    urlPath: `${Config.BASEPATH}/assets/img`,
    outputDir: ".cache/img",
  });

  const avif = metadata.avif;
  const sizes = "100vw";

  if (strategy === "url") {
    return avif.at(-1).url;
  }

  if (strategy === "preload") {
    const srcset = avif
      .map((img) => `${img.url} ${img.width}w`)
      .join(", ");

    return `<link
      rel="preload"
      as="image"
      fetchpriority="high"
      type="image/avif"
      imagesizes="${sizes}"
      href="${avif[0].url}"
      imagesrcset="${srcset}"
    >`;
  }

  if (strategy === "prefetch") {
    const avif = metadata.avif;

    return `<link
      rel="prefetch"
      as="image"
      type="image/avif"
      href="${avif[0].url}"
    >`;
  }

  return Image.generateHTML(metadata, {
    class: `image ${css_classes}`.trim(),
    alt,
    loading,
    fetchpriority: loading === "eager" ? "high" : "auto",
    decoding: "async",
    sizes,
  });
}