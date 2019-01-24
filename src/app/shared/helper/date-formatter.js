"use strict";
var DateFormatter = (function () {
    function DateFormatter() {
    }
    /**
     * Formats a Date's into the correct string format.
     *
     * @param date The date to format.
     * @returns {string} The formatted Date.
     */
    DateFormatter.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    return DateFormatter;
}());
exports.DateFormatter = DateFormatter;
