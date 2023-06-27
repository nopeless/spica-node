import { readFileSync, writeFileSync } from "fs"
import { execSync } from "child_process"

const pkg = JSON.parse(readFileSync("spica/package.json", "utf8").replaceAll("https://github.com/falsandtru/spica", "https://github.com/nopeless/spica-node"));

const { TARGET_VERSION_OVERRIDE } = process.env;

pkg.type = "module";
pkg.description = "Fork of @falsantru/spica, esm support";
pkg.name = "spica-node";
// esm hates this, idk why
// pkg.exports = {
//     "./*": {
//         "default": "./dist/*",
//         "types": "./dist/*.d.ts"
//     }
// };
pkg.files = [
    "LICENSE.*",
    "NOTICE.md",
    "package.json",
    "src",
    "dist"
];
if (TARGET_VERSION_OVERRIDE) {
    pkg.version = TARGET_VERSION_OVERRIDE
}
pkg.private = false;


const newPkg = JSON.stringify(pkg, null, 2);

writeFileSync("spica/package.json", newPkg, "utf8");

const versions = JSON.parse(execSync("npm view spica-node versions --json").toString());

console.log(newPkg.version && versions.includes(newPkg.version) ? "true" : "false");
