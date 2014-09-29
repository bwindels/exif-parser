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
		dateTags.forEach(function(t) {
			var dateStrVal = getTagValue(t);
			if(dateStrVal) {
				var parts = dateStrVal.split(' '),
					dateParts = parts[0].split(':'),
					timeParts = parts[1].split(':');
				var date = new Date();
				date.setUTCFullYear(dateParts[0]);
				date.setUTCMonth(dateParts[1] - 1);
				date.setUTCDate(dateParts[2]);
				date.setUTCHours(timeParts[0]);
				date.setUTCMinutes(timeParts[1]);
				date.setUTCSeconds(timeParts[2]);
				date.setUTCMilliseconds(0);
				var timestamp = date.getTime() / 1000;
				setTagValue(t, timestamp);
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
