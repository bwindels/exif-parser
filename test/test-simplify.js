var simplify = require('../lib/simplify');

function parseDate(date) {
	// Force UTC time for testing purposes.
	if (date.indexOf(':') >= 0 &&
		(date.indexOf('Z') < 0 && date.indexOf('T') < 0)) {
		date += 'Z';
    }
	return new Date(date).getTime();
}

module.exports = {
	'test castDateValues': function(test) {
		var values = {
			'DateTimeOriginal': '1970:01:01 00:00:00',
			'CreateDate': '1970-01-01T00:00:00-05:00',
			'ModifyDate': '1970-01-01T00:00:00-05:00'
		};
		var setValues = {};
		function getTagValue(tag) {
			return values[tag.name];
		}
		function setTagValue(tag, value) {
			setValues[tag.name] = value;
		}
		simplify.castDateValues(getTagValue, setTagValue);
		test.strictEqual(Object.keys(setValues).length, 3);
		test.strictEqual(parseDate(setValues.DateTimeOriginal), 0);
		test.strictEqual(parseDate(setValues.CreateDate), 5 * 3600 * 1000);
		test.strictEqual(parseDate(setValues.ModifyDate), 5 * 3600 * 1000);
		test.done();
	}
}
