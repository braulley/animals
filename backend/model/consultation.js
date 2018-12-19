class Consultation {

    constructor(){}

    //client_id
    set client_id(client_id) {
        this._client_id = client_id;
    }
    get client_id() {
        return this._client_id;
    }

    //pet_id
    set pet_id(pet_id) {
        this._pet_id = pet_id;
    }
    get pet_id() {
        return this._pet_id;
    }

    //veterinary_id
    set veterinary_id(veterinary_id) {
        this._veterinary_id = veterinary_id;
    }
    get veterinary_id() {
        return this._veterinary_id;
    }

    //scheduling
    set scheduling(scheduling) {
        this._scheduling = scheduling;
    }
    get scheduling() {
        return this._scheduling;
    }

    //enchiridion
    set enchiridion(enchiridion) {
        this._enchiridion = enchiridion;
    }
    get enchiridion() {
        return this._enchiridion;
    }

    //recipe
    set recipe(recipe) {
        this._recipe = recipe;
    }
    get recipe() {
        return this._recipe;
    }

    //clerk
    set clerk(clerk) {
        this._clerk = clerk;
    }
    get clerk() {
        return this._clerk;
    }
}

module.exports = Consultation;