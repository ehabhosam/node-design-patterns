import path from "path";
import { URL } from "url";
import slug from "slug";

export function urlToFilename(url) {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split("/")
    .filter(function (component) {
      return component !== "";
    })
    .map(function (component) {
      return slug(component, { remove: null });
    })
    .join("/");
  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += ".html";
  }

  return filename;
}

export function printFilesTree(node, depth = 0) {
  if (node === null) return;

  // Print current node value with appropriate indentation
  console.log(" ".repeat(depth * 4) + node.val.split("\\").at(-1));

  // Recursively print children
  for (let child of node.children) {
    printFilesTree(child, depth + 1);
  }
}
