import { readFileSync, writeFileSync, existsSync } from 'fs';
import { globSync } from 'glob';
import { resolve } from 'path';

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

for (const file of globSync("./spica/**/*.ts", { ignore: '**/node_modules/**' })) {
  const absolutePath = resolve(file)
  console.log(absolutePath)
  // this replacing syntax has an illegal syntax allowed called "import * from 'some-module'"
  // it also does not support import "" side effects
  replaceAllSync(file, /^((?:import|export)\s+(?:\*|\{[^}]+\}|\w[\d\w]*)\s+from\s+["'`])([^"'`]+)(["'`])/gms, (m, front, ident, back) => {
    // must be relative import
    if (!ident.match(/^\./)) return m;

    if (ident.match(/\.js$/)) {
      // don't edit
      return m;
    }

    function exists(...paths) {
      return existsSync(resolve(absolutePath, "..", ...paths))
    }

    // check if file import
    if (exists(ident + ".ts") || exists(ident + ".js")) {
      console.log("  ", m, "=>", ident + ".js")
      return front + ident + ".js" + back;
    }

    // check if dir import
    if (exists(ident, "index.ts") || exists(ident, "index.js")) {
      console.log("  ", m, "=>", ident + "/index.js")
      return front + ident + "/index.js" + back;
    }

    throw new Error(`Could not find import ${ident} in ${absolutePath}`);
  });
}
