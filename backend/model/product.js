class Product {

    constructor(){}

    //name
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    //value
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }

    //amount
    set amount(amount) {
        this._amount = amount;
    }
    get amount() {
        return this._amount;
    }
}

module.exports = Product;