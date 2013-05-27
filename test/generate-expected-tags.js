var jpeg = require('./jpeg'),
	exif = require('./exif'),
	tags = require('./exif-tags');

console.log('reading',process.argv[2]);
var buf = require('fs').readFileSync(process.argv[2]);
var count = 0;

function hex(t) {
	var h = t.toString(16).toUpperCase();
	while(h.length !== 4) {
		h = '0' + h;
	}
	return '0x'+h;
}

var foundTags = [];

jpeg.parseSections(buf, function(sectionType, offset, len) {
	if(sectionType === 0xE1) {
		console.log('APP1',	offset, len);
		exif.parseTags(buf, offset, len, function(ifdSection, tagType, value, format) {
			var t = ifdSection === exif.GPSIFD ? tags.gps : tags.exif;
			var tagName = t[tagType];
			if(!tagName) {
				tagName = tags.exif[tagType];
			}
			value = Buffer.isBuffer(value) ? 'b:' + value.length : value;
			foundTags.push({ifdSection: ifdSection, tagType: tagType, value: value, format: format});
		});
	}
});

console.log(JSON.stringify(foundTags));