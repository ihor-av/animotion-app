import { readFileSync } from "node:fs";

const pages = ["build/index.html", "build/gallery.html"];
let failed = false;

for (const page of pages) {
  let html;

  try {
    html = readFileSync(page, "utf8");
  } catch (error) {
    console.error(`${page}: could not read (${error.message})`);
    failed = true;
    continue;
  }

  const count = (html.match(/<meta\s+name=["']description["']/gi) ?? []).length;
  console.log(`${page}: ${count} meta description tag(s)`);

  if (count !== 1) failed = true;
}

process.exit(failed ? 1 : 0);
