var exif = require('./exif');

var degreeTags = [{
	section: exif.GPSIFD,
	type: 0x0002,
	name: 'GPSLatitude',
	refType: 0x0001,
	refName: 'GPSLatitudeRef',
	posVal: 'N'
},
{
	section: exif.GPSIFD,
	type: 0x0004,
	name: 'GPSLongitude',
	refType: 0x0003,
	refName: 'GPSLongitudeRef',
	posVal: 'E'
}];
var dateTags = [{
	section: exif.SubIFD,
	type: 0x9003,
	name: 'DateTimeOriginal'
},
{
	section: exif.SubIFD,
	type: 0x9004,
	name: 'CreateDate'
}];

module.exports = {
	castDegreeValues: function(getTagValue, setTagValue) {
		degreeTags.forEach(function(t) {
			var degreeVal = getTagValue(t);
			if(degreeVal) {
				var degreeRef = getTagValue({section: t.section, type: t.refType, name: t.refName});
				var degreeNumRef = degreeRef === t.posVal ? 1 : -1;
				var degree = (degreeVal[0] + (degreeVal[1] / 60) + (degreeVal[2] / 3600)) * degreeNumRef;
				setTagValue(t, degree);
			}
		});
	},
	castDateValues: function(getTagValue, setTagValue) {
		var dateTimePattern = /^(\d{4})[-:](\d{2})[-:](\d{2})[\sT]{1}(\d{2}):(\d{2}):(\d{2})(([-+]\d{1,2}):(\d{2}))?$/i;
		dateTags.forEach(function(t) {
			var dateStrVal = getTagValue(t);
			if(dateStrVal) {
				var parts = dateTimePattern.exec(dateStrVal);
				if (parts) {
					// discard the full match
					parts.shift();
					// parse zero-padded number strings in base 10
					parts = parts.map(function(i) {
						var val = parseInt(i, 10);
						return isNaN(val) ? i : val;
					});
					// zero-index the month
					parts[1] -= 1;
					// adjust for timezone if found
					if (parts[7] || parts[8]) {
						if (parts[7] < 0) {
							parts[8] *= -1;
						}
						parts[3] -= parts[7];
						parts[4] -= parts[8];
					}
					// create the date object
					var date = new Date(Date.UTC.apply(this, parts.slice(0,6)));
					date.setUTCMilliseconds(0);
					var timestamp = date.getTime() / 1000;
					setTagValue(t, timestamp);
				}
			}
		});
	},
	simplifyValue: function(values, format) {
		if(Array.isArray(values)) {
			values = values.map(function(value) {
				if(format === 10 || format === 5) {
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
};
