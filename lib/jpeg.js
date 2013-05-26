var assert = require('assert');

module.exports = {
	parseSections: function(buffer, iterator) {
		var offset = 0, len, markerType, info, dataOffset;
		//stop reading the stream at the SOS (Start of Stream) marker,
		//because it's length is not stored in the header so we can't
		//know where to jump to. The only marker after  that is just EOI (End Of Image) anyway
		while(offset < buffer.length && markerType !== 0xDA) {
			assert.strictEqual(buffer[offset], 0xFF);
			++offset;
			markerType = buffer[offset];
			++offset;
			//don't read size from markers that have no datas
			if((markerType >= 0xD0 && markerType <= 0xD9) || markerType === 0xDA) {
				len = 0;
				dataOffset = offset;
			} else {
				len = buffer.readUInt16BE(offset) - 2;
				dataOffset = offset + 2;
			}
			iterator(markerType, dataOffset, len);
			offset = dataOffset + len;
		}
	},
	getSizeFromSOFSection: function(buffer, sectionDataOffset, sectionLength) {
		return {
			width: buffer.readUInt16BE(sectionDataOffset + 3),
			height: buffer.readUInt16BE(sectionDataOffset + 1)
		};
	},
	getSectionName: function(markerType) {
		var name, index;
		switch(markerType) {
			case 0xD8: name = 'SOI'; break;
			case 0xC4: name = 'DHT'; break;
			case 0xDB: name = 'DQT'; break;
			case 0xDD: name = 'DRI'; break;
			case 0xDA: name = 'SOS'; break;
			case 0xFE: name = 'COM'; break;
			case 0xD9: name = 'EOI'; break;
			default:
				if(markerType >= 0xE0 && markerType <= 0xEF) {
					name = 'APP';
					index = markerType - 0xE0;
				}
				else if(markerType >= 0xC0 && markerType <= 0xCF && markerType !== 0xC4 && markerType !== 0xC8 && markerType !== 0xCC) {
					name = 'SOF';
					index = markerType - 0xC0;
				}
				else if(markerType >= 0xD0 && markerType <= 0xD7) {
					name = 'RST';
					index = markerType - 0xD0;
				}
				break;
		}
		var nameStruct = {
			name: name
		};
		if(typeof index === 'number') {
			nameStruct.index = index;
		}
		return nameStruct;
	}
};