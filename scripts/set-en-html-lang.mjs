// Next's root layout is the only place that renders <html>, and it is Arabic
// (lang="ar" dir="rtl"). After the static export, set lang and dir on the
// pre-rendered English page so crawlers and screen readers see English.
import { readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const candidates = ["en.html", path.join("en", "index.html")];

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
  process.exit(0);
}

throw new Error("No pre-rendered English page found in out/ (expected en.html or en/index.html)");
