var jpeg = require('./jpeg'),
	exif = require('./exif'),
	tags = require('./exif-tags');

console.log('reading',process.argv[2]);
var buf = require('fs').readFileSync(process.argv[2]);

jpeg.parseSections(buf, function(sectionType, offset, len) {
	if(sectionType === 0xE1) {
		exif.parseTags(buf, offset, len, function(ifdSection, tagType, value) {
			var t = ifdSection === exif.GPS ? tags.gps : tags.exif;
			var tagName = t[tagType];
			console.log(tagName,value);
		});
	}
});