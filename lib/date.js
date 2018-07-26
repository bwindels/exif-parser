function parseExifDate(dateTimeStr) {
	//some easy checks to determine common date formats

	//is the date in the standard "YYYY:MM:DD hh:mm:ss" format?
	//if so, convert to ISO 8601 by replacing first two ':'s with '-'s
	if (dateTimeStr.length === 19 &&
		dateTimeStr.charAt(4) === ':' &&
		dateTimeStr.charAt(7) === ':') {
		dateTimeStr = dateTimeStr.slice(0, 4) + '-' +
			dateTimeStr.slice(5, 7) + '-' + dateTimeStr.slice(8);
    }

    return dateTimeStr;
}

module.exports = {
	parseExifDate: parseExifDate
};
