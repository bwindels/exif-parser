var jpeg = require('../lib/jpeg'),
	exif = require('../lib/exif'),
	BufferStream = require('../lib/bufferstream.js');

var buf = require('fs').readFileSync(process.argv[2]);
var thumbOffset, thumbLength, app1Offset, jpegStream = new BufferStream(buf), start = jpegStream.mark();
jpeg.parseSections(jpegStream, function(sectionType, sectionStream) {
	if(sectionType === 0xE1) {
		app1Offset = sectionStream.offsetFrom(start);
		exif.parseTags(sectionStream, function(ifdSection, tagType, value, format) {
			if(tagType === 0x0201) {
				thumbOffset = value[0];
			} else if(tagType === 0x0202) {
				thumbLength = value[0];
			}
		});
	}
});

if(!thumbOffset || !thumbLength) {
	console.log('no thumbnail in this image');
} else {
	thumbOffset += 6 + app1Offset;
	require('fs').writeFileSync(process.argv[3], buf.slice(thumbOffset, thumbOffset + thumbLength));
}