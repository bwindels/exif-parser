export class DateUtil {
    private static parseNumber(s) {
        return parseInt(s, 10);
    }

    //in seconds
    static hours = 3600;
    static minutes = 60;

    /**
     * take date (year, month, day) and time (hour, minutes, seconds) digits in UTC
     * and return a timestamp in seconds
     * @param dateParts
     * @param timeParts
     * @returns {number}
     */
    public static parseDateTimeParts(dateParts, timeParts) {
        dateParts = dateParts.map(DateUtil.parseNumber);
        timeParts = timeParts.map(DateUtil.parseNumber);
        let year = dateParts[0];
        let month = dateParts[1] - 1;
        let day = dateParts[2];
        let hours = timeParts[0];
        let minutes = timeParts[1];
        let seconds = timeParts[2];
        let date = Date.UTC(year, month, day, hours, minutes, seconds, 0);
        let timestamp = date / 1000;
        return timestamp;
    }


    /**
     * parse date with "2004-09-04T23:39:06-08:00" format,
     * one of the formats supported by ISO 8601, and
     * convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    public static parseDateWithTimezoneFormat(dateTimeStr) {

        let dateParts = dateTimeStr.substr(0, 10).split('-');
        let timeParts = dateTimeStr.substr(11, 8).split(':');
        let timezoneStr = dateTimeStr.substr(19, 6);
        let timezoneParts = timezoneStr.split(':').map(DateUtil.parseNumber);
        let timezoneOffset = (timezoneParts[0] * DateUtil.hours) +
            (timezoneParts[1] * DateUtil.minutes);

        let timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);
        //minus because the timezoneOffset describes
        //how much the described time is ahead of UTC
        timestamp -= timezoneOffset;

        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    }


    /**
     * parse date with "YYYY:MM:DD hh:mm:ss" format, convert to utc timestamp in seconds
     * @param dateTimeStr
     * @returns {number}
     */
    public static parseDateWithSpecFormat(dateTimeStr) {
        let parts = dateTimeStr.split(' '),
            dateParts = parts[0].split(':'),
            timeParts = parts[1].split(':');

        let timestamp = DateUtil.parseDateTimeParts(dateParts, timeParts);

        if (typeof timestamp === 'number' && !isNaN(timestamp)) {
            return timestamp;
        }
    }

    public static parseExifDate(dateTimeStr) {
        //some easy checks to determine two common date formats

        //is the date in the standard "YYYY:MM:DD hh:mm:ss" format?
        let isSpecFormat = dateTimeStr.length === 19 &&
            dateTimeStr.charAt(4) === ':';
        //is the date in the non-standard format,
        //"2004-09-04T23:39:06-08:00" to include a timezone?
        let isTimezoneFormat = dateTimeStr.length === 25 &&
            dateTimeStr.charAt(10) === 'T';
        let timestamp;

        if (isTimezoneFormat) {
            return DateUtil.parseDateWithTimezoneFormat(dateTimeStr);
        }
        else if (isSpecFormat) {
            return DateUtil.parseDateWithSpecFormat(dateTimeStr);
        }
    }


}



