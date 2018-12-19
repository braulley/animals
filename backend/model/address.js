class Address {

    constructor() {
    }
    //Street
    set street(street) {
      this._street = name;
    }
    get street() {
      return this._street;
    } 
    
    //number
    set street(number) {
        this._number = number;
    }
    get street() {
        return this._number;
    } 
    
    //ZipCOde
    set zipCode(zipCode) {
        this._zipCode = zipCode;
    }
    get zipCode() {
        return this._zipCode;
    }  
    
    //Complement
    set complement(complement) {
        this._complement = complement;
    }
    get complement() {
        return this._complement;
    }
    
    //Complement
    set complement(complement) {
        this._complement = complement;
    }
    get complement() {
        return this._complement;
    }

    //Neighborhood
    set neighborhood(neighborhood) {
        this._neighborhood = neighborhood;
    }
    get neighborhood() {
        return this._neighborhood;
    }

    //City
    set city(city) {
        this._city = city;
    }
    get city() {
        return this._city;
    }

    //State
    set state(state) {
        this._state = state;
    }
    get state() {
        return this._state;
    }

    //Location
    set location(location) {
        this._location = location;
    }
    get location() {
        return this._location;
    }
}

module.exports = Address;