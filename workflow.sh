if [[ $(node patch-package.js) == "false" ]]
then
  node patch.js
  cd spica
  npm install
  npm install @babel/cli
  mv ../tsconfig.build.json .
  rm README.md
  mv ../README.md .
  npx tsc -p tsconfig.build.json && npx babel dist --plugins unassert --extensions .js --out-dir dist
  npm publish
else
  echo "No need to patch"
fi
