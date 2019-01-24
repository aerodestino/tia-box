export class DateFormatter {
    /**
     * Formats a Date's into the correct string format.
     *
     * @param date The date to format.
     * @returns {string} The formatted Date.
     */
    static formatDate(date: any) {

        let month = '' + (date.month),
            day = '' + (date.day),
            year = date.year;

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}
