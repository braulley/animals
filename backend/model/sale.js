class Sale {

    constructor(){}

    //salesman
    set salesman(salesman) {
        this._salesman = salesman;
    }
    get salesman() {
        return this._salesman;
    }

    //date_sale
    set date_sale(date_sale) {
        this._date_sale = date_sale;
    }
    get date_sale() {
        return this._date_sale;
    }

    //total_value
    set total_value(total_value) {
        this._total_value = total_value;
    }
    get total_value() {
        return this._total_value;
    }
}

module.exports = Sale;