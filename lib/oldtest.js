var ExifImage = require('exif').ExifImage;

var count = 0;
function printSection(s) {
	s.forEach(function(t) {
		++count;
		console.log('0x'+t.tag.toString('hex').toUpperCase(), t.tagName+':',Buffer.isBuffer(t.value) ? 'buffer with length ' + t.value.length : t.value);
	});
}

new ExifImage({image: process.argv[2]}, function(err, exif) {
	printSection(exif.thumbnail);
	
	console.log('count',count);
});