// Next's root layout is the only place that renders <html>, and it is Arabic
// (lang="ar" dir="rtl"). After the static export, set lang and dir on the
// pre-rendered English pages so crawlers and screen readers see English.
import { readFile, writeFile, access, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

// Every pre-rendered HTML file under out/en/ (home, vision, projects and case studies), plus out/en.html.
async function collectHtml(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtml(full)));
    } else if (entry.name.endsWith(".html")) {
      files.push(path.relative(outDir, full));
    }
  }
  return files;
}

const candidates = ["en.html", ...(await collectHtml(path.join(outDir, "en")))];

let updatedCount = 0;
for (const rel of candidates) {
  const file = path.join(outDir, rel);
  try {
    await access(file);
  } catch {
    continue;
  }
  const html = await readFile(file, "utf8");
  const updated = html.replace(/<html lang="ar" dir="rtl"/, '<html lang="en" dir="ltr"');
  if (updated === html) {
    throw new Error(`Expected <html lang="ar" dir="rtl"> in ${file}`);
  }
  await writeFile(file, updated, "utf8");
  console.log(`set lang="en" dir="ltr" in out/${rel}`);
  updatedCount += 1;
}

if (updatedCount === 0) {
  throw new Error("No pre-rendered English page found in out/ (expected en.html or en/**/*.html)");
}
