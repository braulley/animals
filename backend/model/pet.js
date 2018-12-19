class Pet {

    constructor() { }

    //name
    set name(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }

    //type
    set type(type) {
        this._type = type;
    }
    get type() {
        return this._type;
    }

    //heigth
    set heigth(heigth) {
        this._heigth = heigth;
    }
    get heigth() {
        return this._heigth;
    }

    //width
    set width(width) {
        this._width = width;
    }
    get width() {
        return this._width;
    }

    //weigth
    set weigth(weigth) {
        this._weigth = weigth;
    }
    get weigth() {
        return this._weigth;
    }

    //breed
    set breed(breed) {
        this._breed = breed;
    }
    get breed() {
        return this._breed;
    }

    //user_id
    set user_id(user_id) {
        this._user_id = user_id;
    }
    get user_id() {
        return this._user_id;
    }


}

module.exports = Pet;