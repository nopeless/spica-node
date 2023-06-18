import { readFileSync, writeFileSync } from 'fs';

function replaceAllSync(file, target, replacement) {
    const content = readFileSync(file, "utf8");
    const newContent = content.replaceAll(target, replacement);
    writeFileSync(file, newContent, "utf8");
}

// I don't care how its done just do it
replaceAllSync("spica/src/url.ts",
  "export { StandardURL, standardize } from './url/format'",
  "export { type StandardURL, standardize } from './url/format'"
)
