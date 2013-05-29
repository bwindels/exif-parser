var assert = require('assert');
var jpeg = require('./jpeg'),
	exif = require('./exif');

function simplifyValue(values, format) {
	if(Array.isArray(values)) {
		values = values.map(function(value) {
			if(format === 10 || format === 5) {
				return value[0] / value[1];
			}
			return value;
		});
		if(values.length === 1) {
			values = values[0];
		}
	}
	return values;
}

function Parser(stream) {
	this.stream = stream;
	this.flags = {
		readBinaryTags: false,
		resolveTagNames: true,
		simplifyValues: true,
		imageSize: true,
		hidePointers: true,
		returnTags: true
	};
}

Parser.prototype = {
	enableBinaryFields: function(enable) {
		this.flags.readBinaryTags = !!enable;
		return this;
	},
	enablePointers: function(enable) {
		this.flags.hidePointers = !enable;
		return this;
	},
	enableTagNames: function(enable) {
		this.flags.resolveTagNames = !!enable;
		return this;
	},
	enableImageSize: function(enable) {
		this.flags.imageSize = !!enable;
		return this;
	},
	enableReturnTags: function(enable) {
		this.flags.returnTags = !!enable;
		return this;
	},
	enableSimpleValues: function(enable) {
		this.flags.simplifyValues = !!enable;
		return this;
	},
	parse: function() {
		var start = this.stream.mark(),
			stream = start.openWithOffset(0),
			flags = this.flags,
			tags,
			imageSize,
			thumbnailOffset,
			thumbnailLength,
			thumbnailType,
			app1Offset;
		
		if(flags.resolveTagNames) {
			tags = {};
		} else {
			tags = [];
		}
		
		jpeg.parseSections(stream, function(sectionType, sectionStream) {
			if(sectionType === 0xE1) {
				app1Offset = sectionStream.offsetFrom(start);
				exif.parseTags(sectionStream, function(ifdSection, tagType, value, format) {
					//ignore binary fields if disabled
					if(!flags.readBinaryTags && format === 7) {
						return;
					}

					if(tagType === 0x0201) {
						thumbnailOffset = value[0];
						if(flags.hidePointers) return;
					} else if(tagType === 0x0202) {
						thumbnailLength = value[0];
						if(flags.hidePointers) return;
					} else if(tagType === 0x0103) {
						thumbnailType = value[0];
						if(flags.hidePointers) return;
					}
					//if flag is set to not store tags, return here after storing pointers
					if(!flags.returnTags) {
						return;
					}

					if(flags.simplifyValues) {
						value = simplifyValue(value, format);
					}
					if(flags.resolveTagNames) {
						tagNames = require('./exif-tags');
						var sectionTagNames = ifdSection === exif.GPSIFD ? tagNames.gps : tagNames.exif;
						var name = sectionTagNames[tagType];
						if(!name) {
							name = tagNames.exif[tagType];
						}
						tags[name] = value;
					} else {
						tags.push({
							section: ifdSection,
							type: tagType,
							value: value
						});
					}
				});
			}
			else if(flags.imageSize && jpeg.getSectionName(sectionType).name === 'SOF') {
				imageSize = jpeg.getSizeFromSOFSection(sectionStream);
			}
		});

		return new ExifResult(start, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset);
	}
};

function ExifResult(startMarker, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset) {
	this.startMarker = startMarker;
	this.tags = tags;
	this.imageSize = imageSize;
	this.thumbnailOffset = thumbnailOffset;
	this.thumbnailLength = thumbnailLength;
	this.thumbnailType = thumbnailType;
	this.app1Offset = app1Offset;
}

ExifResult.prototype = {
	hasThumbnail: function(mime) {
		if(!this.thumbnailOffset || !this.thumbnailLength) {
			return false;
		}
		if(typeof mime !== 'string') {
			return true;
		}
		if(mime.toLowerCase().trim() === 'image/jpeg') {
			return this.thumbnailType === 6;
		}
		if(mime.toLowerCase().trim() === 'image/tiff') {
			return this.thumbnailType === 1;
		}
		return false;
	},
	getThumbnailBuffer: function() {
		return this._getThumbnailStream().nextBuffer(this.thumbnailLength);
	},
	_getThumbnailStream: function() {
		return this.startMarker.openWithOffset(this.app1Offset + 6 + this.thumbnailOffset);
	},
	getImageSize: function() {
		return this.imageSize;
	},
	getThumbnailSize: function() {
		var stream = this._getThumbnailStream(), size;
		jpeg.parseSections(stream, function(sectionType, sectionStream) {
			if(jpeg.getSectionName(sectionType).name === 'SOF') {
				size = jpeg.getSizeFromSOFSection(sectionStream);
			}
		});
		return size;
	}
};

module.exports = Parser;