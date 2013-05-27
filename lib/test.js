var jpeg = require('./jpeg'),
	exif = require('./exif'),
	tags = require('./exif-tags');

console.log('reading',process.argv[2]);
var buf = require('fs').readFileSync(process.argv[2]);
var count = 0;
jpeg.parseSections(buf, function(sectionType, offset, len) {
	if(sectionType === 0xE1) {
		exif.parseTags(buf, offset, len, function(ifdSection, tagType, value, format) {
			var t = ifdSection === exif.GPSIFD ? tags.gps : tags.exif;
			var tagName = t[tagType];
			if(!tagName) {
				tagName = tags.exif[tagType];
			}
			++count;
			console.log('0x'+tagType.toString(16).toUpperCase(), tagName+':',Buffer.isBuffer(value) ? 'buffer with length ' + value.length : value);
		});
	}
});

console.log('count',count);