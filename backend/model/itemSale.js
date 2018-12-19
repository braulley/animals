class ItemSale {

    constructor() {}

    //sale_id
    set sale_id(sale_id) {
        this._sale_id = sale_id;
    }
    get sale_id() {
        return this._sale_id;
    }

    //product_id
    set product_id(product_id) {
        this._product_id = product_id;
    }
    get product_id() {
        return this._product_id;
    }

    //amount
    set amount(amount) {
        this._amount = amount;
    }
    get amount() {
        return this._amount;
    }

    //unitValue
    set unitValue(unitValue) {
        this._unitValue = unitValue;
    }
    get unitValue() {
        return this._unitValue;
    }

    //totalValue
    set totalValue(totalValue) {
        this._totalValue = totalValue;
    }
    get totalValue() {
        return this._totalValue;
    }

}

module.exports = ItemSale;