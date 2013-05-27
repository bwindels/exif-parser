var ExifImage = require('exif').ExifImage;

new ExifImage({image: process.argv[2]}, function(err, exif) {
	console.log(exif.image.length);
	console.log(exif.exif.length);
	console.log(exif.gps.length);
	console.log(exif.interoperability.length);
	console.log(exif.gps);
});