import { readFileSync, writeFileSync } from "fs"
import { execSync } from "child_process"

const pkg = JSON.parse(readFileSync("spica/package.json", "utf8").replaceAll("https://github.com/falsandtru/spica", "https://github.com/nopeless/spica-node"));

pkg.type = "module";
pkg.description = "Fork of @falsantru/spica, esm support";
pkg.name = "@nopeless/spica-node",
pkg.exports = {
    "./*": {
        "default": "./dist/*",
        "types": "./dist/*.d.ts"
    }
}

const newPkg = JSON.stringify(pkg, null, 2);

writeFileSync("spica/package.json", newPkg, "utf8");

const versions = JSON.parse(execSync("npm view spica versions --json").toString());

console.log(versions.includes(pkg.version) ? "true" : "false");
