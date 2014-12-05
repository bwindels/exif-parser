VERSION=$(node --eval "console.log(require('./package.json').version)")
BUNDLE=dist/exif-parser-$(VERSION).js
MIN_BUNDLE=dist/exif-parser-$(VERSION)-min.js
BROWSERIFY=node_modules/.bin/browserify
UGLIFY=node_modules/.bin/uglifyjs

build-browser-bundle: setup
	echo "building $VERSION ..." && \
	mkdir -p dist/ && \
	$(BROWSERIFY) --bare browser-global.js -o $(BUNDLE) && \
	$(UGLIFY) --compress $(BUNDLE) -o $(MIN_BUNDLE)
setup:
	npm install --no-optional --loglevel error --development
clean:
	rm -rf dist/