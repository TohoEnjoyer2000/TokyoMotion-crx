uglifyjs -c -m -o dist/index.js background/index.js

cp manifest.json dist/manifest.json
cp popup/index.html dist/index.html
cp -r icons dist/icons

sed -i 's+"background/index.js"+"index.js"+g' dist/manifest.json
sed -i 's+"popup/index.html"+"index.html"+g' dist/manifest.json