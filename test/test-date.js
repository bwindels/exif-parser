var date = require('../lib/date');

var minutes = 60;
var hours = minutes * 60;
var days = hours * 24;
var years = days * 365;
var leapYears = days * 366;

module.exports = {
	'test parse unix epoch without timezone': function(test) {
		var dateStr = '1970:01:01 00:00:00';
		var timestamp = date.parseDateWithSpecFormat(dateStr);
		test.strictEqual(timestamp, 0);
		test.done();
	},
	'test parse given date without timezone': function(test) {
		var dateStr = '1990:02:14 14:30:14';
		var timestamp = date.parseDateWithSpecFormat(dateStr);
		//between 1970 and 1990 there were 5 leap years: 1972, 1976, 1980, 1984, 1988
		var expectedTimestamp = (15 * years) + (5 * leapYears) +
			((31 + 13) * days) + (14 * hours) + (30 * minutes) + 14;
		test.strictEqual(timestamp, expectedTimestamp);
		test.done();
	}
}