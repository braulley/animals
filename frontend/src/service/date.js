class DateFormat {

    static formatDate(date) {
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let fullDate = day + '/' + month + '/' + year
        //console.log('FULLDATE',fullDate)
        return fullDate
    }

}

export default DateFormat;