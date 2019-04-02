var JDateUtil = (function (window, $) { // datejs based
    var ins = {};
    ins.DATE = 'date';
    ins.WEEK_OF_YEAR = 'week_of_year';
    ins.MONTH = 'month';
    ins.QUARTER = 'quarter';
    ins.HALF_YEAR = 'half_year';
    ins.YEAR = 'year';
    ins.DAY_VALUE = 'd';
    ins.MONTH_VALUE = 'M';
    ins.YEAR_VALUE = 'yyyy';

    // for default
    ins.FORMAT_DATE_JSON = 'yyyy/MM/dd';
    ins.FORMAT_DATE_TIME_JSON = 'yyyy/MM/dd HH:mm:ss';
    ins.FORMAT_DATE_LOCALE = {
        'vi': 'dd/MM/yyyy',
        'in': 'MM dd, yyyy'
    };
    ins.FORMAT_DATE_MINUTE_LOCALE = {
        'vi': 'dd/MM/yyyy HH:mm',
        'in': 'MM/dd/yyyy HH:mm'
    };
    ins.FORMAT_DATE_TIME_LOCALE = {
        'vi': 'dd/MM/yyyy HH:mm:ss',
        'in': 'MM/dd/yyyy HH:mm:ss'
    };
    ins.MONTH_TEXT_LOCAL = {
        'vi': 'T',
        'in': 'M'
    };
    ins.QUARTER_TEXT_LOCAL = {
        'vi': 'Q',
        'in': 'Q'
    };

    ins.NUM_QUARTER_OF_YEAR = 4;
    ins.NUM_MONTH_OF_YEAR = 12;
    ins.NUM_MONTH_OF_HALF_YEAR = 6;
    ins.NUM_MONTH_OF_QUARTER = ins.NUM_MONTH_OF_YEAR / ins.NUM_QUARTER_OF_YEAR;

    ins.SUNDAY = 0;
    ins.MONDAY = 1;

   // ins.DAY_MINI_SECONDS = JGlobal.ONE_DAY_IN_MILLIS;

    // ins.dateFormat = function () {
    //     var format = ins.FORMAT_DATE_LOCALE[JGlobal.language];
    //     return $bean.isNotEmpty(format) ? format : ins.FORMAT_DATE_LOCALE['in'];
    // }
    // ins.dateMinuteFormat = function () {
    //     var format = ins.FORMAT_DATE_MINUTE_LOCALE[JGlobal.language];
    //     return $bean.isNotEmpty(format) ? format : ins.FORMAT_DATE_MINUTE_LOCALE['in'];
    // }
    // ins.dateTimeFormat = function () {
    //     var format = ins.FORMAT_DATE_TIME_LOCALE[JGlobal.language];
    //     return $bean.isNotEmpty(format) ? format : ins.FORMAT_DATE_TIME_LOCALE['in'];
    // }
//    ins.dateMinuteFormat = function () {
//        var format = ins.FORMAT_DATE_TIME_JSON[JGlobal.language];
//        return $bean.isNotEmpty(format) ? format : ins.FORMAT_DATE_TIME_JSON['in'];
//    }
//    ins.dateTimeFormat = function () {
//        var format = ins.FORMAT_DATE_MINUTE_LOCALE[JGlobal.language];
//        return $bean.isNotEmpty(format) ? format : ins.FORMAT_DATE_MINUTE_LOCALE['in'];
//    }
    // chuyển [date_string] -> [date] theo format
    // vd: JDateUtil.getDateFormat('11/01/1990', 'dd/mm/yy') -> Thu Jan 11 1990 00:00:00 GMT+0700 (SE Asia Standard Time)
    ins.getDateFormat = function (string, format) {
        if ($bean.isEmpty(string)) {
            return null;
        }
        if ($bean.isEmpty(format)) {
            format = ins.dateFormat();
        }
        return ins.parseExact(string, format);
    }

    ins.parseExact = function (string, format) {
        var date = Date.parseExact(string, format);
        if (format == ins.FORMAT_DATE_TIME_JSON && $bean.isNil(date)) {
            return Date.parseExact(string, ins.FORMAT_DATE_JSON);
        }
        if (format == ins.FORMAT_DATE_TIME_JSON && $bean.isNil(date)) {
            return Date.parseExact(string, ins.FORMAT_DATE_JSON);
        }
        return date;
    }

    // chuyển [date_string] -> [other_date_string] theo format
    // vd: JDateUtil.toDateFormat('11/01/1990', 'dd/MM/yyyy', 'MM/yyyy') - > '01/1990'
    ins.toDateFormat = function (dateText, fromFormat, toFormat) {
        var date = ins.getDateFormat(dateText, fromFormat);
        if ($bean.isEmpty(date)) {
            return null;
        }
        return ins.toString(date, toFormat);
    }

    ins.dateLocalToJsonString = function (dateText) {
        return ins.toDateFormat(dateText, ins.dateFormat(), ins.FORMAT_DATE_JSON);
    }

    ins.dateMinuteLocalToJsonString = function (dateText) {
        return ins.toDateFormat(dateText, ins.dateMinuteFormat(), ins.FORMAT_DATE_TIME_JSON);
    }

    ins.dateTimeLocalToJsonString = function (dateText) {
        return ins.toDateFormat(dateText, ins.dateTimeFormat(), ins.FORMAT_DATE_TIME_JSON);
    }

    ins.toDateLocalFormat = function (dateText, format) {
        if ($bean.isEmpty(format)) {
            format = ins.FORMAT_DATE_JSON;
        }
        return ins.toDateFormat(dateText, format, ins.dateFormat());
    }

    ins.toDateTimeLocalFormat = function (dateText, format) {
        if ($bean.isEmpty(format)) {
            format = ins.FORMAT_DATE_TIME_JSON;
        }
        return ins.toDateFormat(dateText, format, ins.dateTimeFormat());
    }

    ins.toDateMinuteLocalFormat = function (dateText, format) {
        if ($bean.isEmpty(format)) {
            format = ins.FORMAT_DATE_TIME_JSON;
        }
        return ins.toDateFormat(dateText, format, ins.dateMinuteFormat());
    }

    ins.toString = function (date, format) {
        if ($bean.isEmpty(format)) {
            format = ins.dateFormat();
        }
        if (date instanceof Date) {
            return date.toString(format);
        } else {
            return new Date(date).toString(format);
        }

    }

    ins.toDateMinuteString = function (date, format) {
        if ($bean.isEmpty(format)) {
            format = ins.dateMinuteFormat();
        }
        return date.toString(format);
    }

    ins.toDateTimeString = function (dateTime, format) {
        if ($bean.isEmpty(format)) {
            format = ins.dateTimeFormat();
        }
        return dateTime.toString(format);
    }

    ins.thisToday = function () {
        return JDateUtil.today().toString(ins.FORMAT_DATE_TIME_JSON);
    }
    // cal spec
    //TODO Vong lặp???
//    ins.today = function () {
//        return JDateUtil.today().toString(ins.dateFormat());
//    }

    ins.thisDayValue = function () {
        return JDateUtil.today().toString(ins.DAY_VALUE);
    }

    ins.thisMonthValue = function () {
        return JDateUtil.today().toString(ins.MONTH_VALUE);
    }

    ins.thisYearValue = function () {
        return JDateUtil.today().toString(ins.YEAR_VALUE);
    }

    ins.thisMonth = function () {
        return JDateUtil.today().toString(ins.MONTH_VALUE);
    }

    ins.thisQuarter = function () {
        return (Math.floor((ins.thisMonth() - 1) / ins.NUM_MONTH_OF_QUARTER)) + 1;
    }

    ins.lastQuarter = function () {
        var lastQuarter = 4;
        var thisQuarter = ins.thisQuarter();
        lastQuarter = (thisQuarter > 1) ? thisQuarter - 1 : lastQuarter;
        return lastQuarter;
    }

    ins.lastSevenDaysStart = function () {
        return JDateUtil.today().add(-6).days().toString(ins.dateMinuteFormat());
    }

    ins.lastThirtyDaysStart = function () {
        return JDateUtil.today().add(-29).days().toString(ins.dateMinuteFormat());
    }

    ins.thisWeekDateStart = function () {
        return JDateUtil.today().last().monday().toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.currentWeekDateStart = function () {

        var curr = new Date; // get current date
        curr.setHours(0);
        curr.setMinutes(0);
        curr.setSeconds(0);
        var currDayOfWeek = curr.getDay() == 0 ? 7 : curr.getDay()// First day is the day of the month - the day of the week
        var firstDate = new Date(curr.addDays(1 - currDayOfWeek));
        return firstDate.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.copyDayMonthYear = function (source, target) {
        target.setDate(source.getDate());
        target.setMonth(source.getMonth());
        target.setFullYear(source.getFullYear());
    }
    ins.copyHoursMinute = function (source, target) {
        target.setHours(source.getHours());
        target.setMinutes(source.getMinutes());
    }
    ins.thisWeekDateEnd = function () {
        return JDateUtil.today().last().monday().add(6).days().toString(ins.FORMAT_DATE_TIME_JSON);
    }

    ins.lastWeekDateStart = function () {
        return JDateUtil.today().add(-6).days().last().monday().toString(ins.FORMAT_DATE_TIME_JSON);
    }

    ins.lastWeekDateEnd = function () {
        return JDateUtil.today().add(-6).days().last().monday().add(6).days().toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.firstDayOfWeekRecent = function () {
        return JDateUtil.today().add(-6).day().toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.thisMonthDateStart = function () {
        return JDateUtil.today().moveToFirstDayOfMonth().toString(ins.FORMAT_DATE_TIME_JSON);
    }

    ins.thisMonthDateEnd = function () {
        return JDateUtil.today().moveToLastDayOfMonth().toString(ins.FORMAT_DATE_TIME_JSON);
    }

    ins.lastMonthDateStart = function () {
        return JDateUtil.today().add(-1).months().moveToFirstDayOfMonth().toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.lastMonthDateEnd = function () {
        return JDateUtil.today().add(-1).months().moveToLastDayOfMonth().toString(ins.FORMAT_DATE_TIME_JSON);
    }

    ins.monthDateStart = function (year, month) {
        return new Date(year, month, 1, 0, 0, 0);
    }

    ins.monthDateEnd = function (year, month) {
        var monthDateStart = ins.monthDateStart(year, month);
        return monthDateStart.moveToLastDayOfMonth();
    }

    ins.quarterDateStart = function (year, quater) {
        return new Date(year, quater * ins.NUM_MONTH_OF_QUARTER, 1, 0, 0, 0);
    }

    ins.quarterDateEnd = function (year, quarter) {
        var lastMonthOfQuaterDateStart = new Date(year, (quarter + 1) * ins.NUM_MONTH_OF_QUARTER - 1, 1, 0, 0, 0);
        return lastMonthOfQuaterDateStart.moveToLastDayOfMonth();
    }

    ins.halfYearDateStart = function (year, half) {
        return new Date(year, half * ins.NUM_MONTH_OF_HALF_YEAR, 1, 0, 0, 0);
    }

    ins.halfYearDateEnd = function (year, half) {
        var lastMonthDateStart = new Date(year, (half + 1) * ins.NUM_MONTH_OF_HALF_YEAR - 1, 1, 0, 0, 0);
        return lastMonthDateStart.moveToLastDayOfMonth();
    }

    ins.yearDateStart = function (year) {
        return new Date(year, 0, 1, 0, 0, 0);
    }

    ins.yearDateEnd = function (year) {
        return new Date(year, 11, 31, 0, 0, 0);
    }

    ins.weekOfYearDateStart = function (week) {
        return JDateUtil.today().moveToFirstDayOfMonth().toString(ins.dateFormat());
    }

    ins.firstMonthOfThisQuarter = function () {
        return (Math.floor((ins.thisMonth() - 1) / ins.NUM_MONTH_OF_QUARTER) * ins.NUM_MONTH_OF_QUARTER) + 1;
    }
    ins._firstMonthOfThisQuarter = function () {
        var d = new Date(), y = d.getFullYear();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var quarter = Math.floor((d.getMonth() / 3));
        var firstDate = new Date(y, quarter * 3, 1);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        return firstDate.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins._lastMonthOfThisQuarter = function () {
        var d = new Date(), y = d.getFullYear();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var quarter = Math.floor((d.getMonth() / 3));
        var firstDate = new Date(y, quarter * 3, 1);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        return endDate.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins._firstMonthOfLastQuarter = function () {
        var d = new Date(), y = d.getFullYear();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var quarter = Math.floor((d.getMonth() / 3) + 1);
        var lastQuarter = quarter - 1;
        if (lastQuarter == 0) {
            lastQuarter = 4;
            y--;
        }
//        var firstDate = new Date(y, ((lastQuarter * 3)+1));
        var firstDate = new Date(y, (lastQuarter * 3) - 3);
        return firstDate.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins._lastMonthOfLastQuarter = function () {
        var d = new Date(), y = d.getFullYear();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var quarter = Math.floor((d.getMonth() / 3) + 1);
        var lastQuarter = quarter - 1;
        if (lastQuarter == 0) {
            lastQuarter = 4;
            y--;
        }
        var firstDate = new Date(y, (lastQuarter * 3) - 3);
        var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
        return endDate.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.getRecentlyMonth = function () {
        var d = new Date();
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        var lastMonth = new Date(d.setMonth(d.getMonth() - 1));
        return lastMonth.toString(ins.FORMAT_DATE_TIME_JSON);

    }
    ins.getFirstDayOfYear = function () {
        var d = new Date(new Date().getFullYear(), 0, 1);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        return d.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.getLastDayOfYear = function () {
        var d = new Date(new Date().getFullYear(), 11, 31);
        d.setHours(0);
        d.setMinutes(0);
        d.setSeconds(0);
        return d.toString(ins.FORMAT_DATE_TIME_JSON);
    }
    ins.getQuarter = function (date) {
        return Math.floor(date.getMonth() / ins.NUM_MONTH_OF_QUARTER);
    }

    ins.getHalfYear = function (date) {
        return Math.floor(date.getMonth() / ins.NUM_MONTH_OF_HALF_YEAR);
    }

    ins.getDays = function (year) {
        var formatDate = "dd/MM/yyyy";
        var date = new Date(), y = date.getFullYear();
        var firstDay = new Date(y + parseInt(year), 0, 1);
        var lastDay = new Date(y + parseInt(year), ins.NUM_MONTH_OF_YEAR, 0);
        return {"firstDayYear": firstDay.toString(formatDate), "lastDayYear": lastDay.toString(formatDate)};
    }

    // ins.today = function () {
    //     var today = new Date(JGlobal.serverTime);
    //     today.setHours(0);
    //     today.setMinutes(0);
    //     today.setSeconds(0);
    //     today.setMilliseconds(0)
    //     return today;
    // }

    ins.getDateRanges = function (key) {
        var today = ins.today();
        var dateRanges = {
            'today': {start: ins.toDateMinuteString(today), end: ins.toDateMinuteString(today)},
            'yesterday': {
                start: ins.toDateMinuteString(ins.today().add(-1).days()),
                end: ins.toDateMinuteString(today)
            },
            '1week': {start: ins.toDateMinuteString(ins.today().add(-1).weeks()), end: ins.toDateMinuteString(today)},
            '2weeks': {start: ins.toDateMinuteString(ins.today().add(-2).weeks()), end: ins.toDateMinuteString(today)},
            '1month': {start: ins.toDateMinuteString(ins.today().add(-1).months()), end: ins.toDateMinuteString(today)}
        };
        return dateRanges[key];
    }

    // getDate('25/06/2016') - format: dd/mm/yyyy
    ins.getDate = function (dateString) {
        if ('undefined' === typeof dateString || '' === dateString) {
            return null;
        }
        var parts = dateString.split('/');
        if (3 !== parts.length) {
            return null;
        }
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        if (month < 1 || year < 1 || day < 1) {
            return null;
        }
        return new Date(year, (month - 1), day);
    }

    //Kiểm tra date string với format từ server trả về : yyyy/MM/dd HH:mm:ss
    ins.isDateValue = function (dateText) {
        if ($bean.isEmpty(dateText)) {
            return false;
        }
        var date = ins.parseExact(dateText, ins.FORMAT_DATE_TIME_JSON);
        return date instanceof Date && isFinite(date);
    }

    ins.isBetweenDate = function (date, fromDate, toDate) {
        var _date = ins.parseDateTime(date);
        var _fromDate = ins.parseDateTime(fromDate);
        var _toDate = ins.parseDateTime(toDate);
        return (_date.getTime() >= _fromDate.getTime()) && (_date.getTime() <= _toDate.getTime());
    }

    ins.isContainDate = function (fromDate1, toDate1, fromDate2, toDate2) {
        var _fromDate1 = ins.parseDateTime(fromDate1);
        var _toDate1 = ins.parseDateTime(toDate1);
        var _fromDate2 = ins.parseDateTime(fromDate2);
        var _toDate2 = ins.parseDateTime(toDate2);
        return !(_toDate1.getTime() < _fromDate2.getTime() || _toDate2.getTime() < _fromDate1.getTime());
    }

    ins.parseDateTime = function (date) {
        return $.datepicker.parseDateTime('yy/mm/dd', 'hh:mm:ss', date);
    }

    // ins.getWeekOfYear = function (date) {
    //     var fyd = new Date(date.getFullYear(), 0, 1);
    //     return Math.ceil((date.getTime() - fyd.getTime()) / 7 / JGlobal.ONE_DAY_IN_MILLIS);
    // };
    ins.getEndDate = function(date){
        var date1 = JDateUtil.getDateFormat(date, JDateUtil.FORMAT_DATE_TIME_JSON);
        date1.setHours(23);
        date1.setMinutes(59);
        date1.setSeconds(59);
        return JDateUtil.toString(date1, JDateUtil.FORMAT_DATE_TIME_JSON);
    }
    return ins;
})(window, jQuery);
