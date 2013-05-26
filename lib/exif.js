var assert = require('assert');
var BufferStream = require('./bufferstream');

function readExifValue(format, stream) {
	switch(format) {
		case 1: return stream.nextUInt8();
		case 3: return stream.nextUInt16();
		case 4: return stream.nextUInt32();
		case 5: return [stream.nextUInt32(), stream.nextUInt32()];
		case 6: return stream.nextInt8();
		case 8: return stream.nextUInt16();
		case 9: return stream.nextUInt32();
		case 10: return [stream.nextInt32(), stream.nextInt32()];
		case 11: return stream.nextFloat();
		case 11: return stream.nextDouble();
		default: throw new Error('Invalid format while decoding: ' + format);
	}
}

function getBytesPerComponent(format) {
	switch(format) {
		case 1:
		case 2:
		case 6:
		case 7:
			return 1;
		case 3:
		case 8:
			return 2;
		case 4:
		case 9:
		case 11:
			return 4;
		case 5:
		case 10:
		case 12:
			return 8;
		default:
			throw new Error('Invalid format: ' + format);
	}
}

function readExifTag(tiffMarker, stream) {
	var tagType = stream.nextUInt16(),
		format = stream.nextUInt16(),
		bytesPerComponent = getBytesPerComponent(format),
		components = stream.nextUInt32(),
		valueBytes = bytesPerComponent * components,
		values,
		value,
		c;

	/* if the value is bigger then 4 bytes, the value is in the data section of the IFD
	and the value present in the tag is the offset starting from the tiff header. So we replace the stream
	with a stream that is located at the given offset in the data section. s*/
	if(valueBytes > 4) {
		stream = tiffMarker.openWithOffset(stream.nextUInt32());
	}
	//we don't want to read strings as arrays
	if(format === 2) {
		values = stream.nextString(components);
		//cut off \0 characters
		var lastNull = values.indexOf('\0');
		if(lastNull !== -1) {
			values = values.substr(0, lastNull);
		}
	}
	else {
		values = [];
		for(c = 0; c < components; ++c) {
			values.push(readExifValue(format, stream));
		}
	}
	return [tagType, values, format];
}

function readIFDSection(tiffMarker, stream, iterator) {
	var numberOfEntries = stream.nextUInt16(), tag;
	for(var i = 0; i < numberOfEntries; ++i) {
		tag = readExifTag(tiffMarker, stream);
		iterator(tag[0], tag[1], tag[2]);
	}
}

module.exports = {
	IFD0: 1,
	IFD1: 2,
	GPS: 3,
	SubIFD: 4,
	parseTags: function(buffer, offset, length, iterator) {
		var stream = new BufferStream(buffer, offset, length);
		
		var exifHeader = stream.nextString(6);
		assert.strictEqual(exifHeader, 'Exif\0\0', 'Invalid EXIF header');

		var tiffMarker = stream.mark();
		var tiffHeader = stream.nextUInt16();
		if(tiffHeader === 0x4949) {
			stream.setBigEndian(false);
		} else if(tiffHeader === 0x4D4D) {
			stream.setBigEndian(true);
		} else {
			throw new Error('Invalid TIFF header');
		}
		assert.strictEqual(stream.nextUInt16(), 0x002A, 'Invalid TIFF data');

		var subIfdOffset, gpsOffset;
		var ifd0Stream = tiffMarker.openWithOffset(stream.nextUInt32());
		readIFDSection(tiffMarker, ifd0Stream, function(tagType, value, format) {
			if(tagType === 0x8825) {
				gpsOffset = value;
			} else if(tagType === 0x8769) {
				subIfdOffset = value;
			} else {
				iterator(this.IFD0, tagType, value, format);
			}
		});

		if(gpsOffset) {
			var gpsStream = tiffMarker.openWithOffset(gpsOffset);
			readIFDSection(tiffMarker, gpsStream, iterator.bind(null, this.GPS));
		}

		if(subIfdOffset) {
			var subIfdStream = tiffMarker.openWithOffset(subIfdOffset);
			readIFDSection(tiffMarker, subIfdStream, iterator.bind(null, this.SubIFD));
		}
	}
};