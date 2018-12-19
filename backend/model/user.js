class User {

    constructor(){}

      //Name
      set name(name) {
        this._name = name;
      }
      get name() {
        return this._name;
      } 

      //username
      set userName(userName) {
        this._userName = userName;
      }
      get userName() {
        return this._userName;
      }

      //registerCode
      set registerCode(registerCode) {
        this._registerCode = registerCode;
      }
      get registerCode() {
        return this._registerCode;
      }

    //date_birth
    set dateBirth(dateBirth) {
        this._dateBirth = dateBirth;
    }
    get dateBirth() {
        return this._dateBirth;
    }

    //hash
    set hash(hash) {
        this._hash = hash;
    }
    get hash() {
        return this._hash;
    }

    //password
    set password(password) {
        this._password = password;
    }
    get password() {
        return this.password;
    }

    //email
    set email(email) {
        this._email = email;
    }
    get email() {
        return this.email;
    }

    //telephone1
    set telephone1(telephone1) {
        this._telephone1 = telephone1;
    }
    get telephone1() {
        return this.telephone1;
    }

    //telephone2
    set telephone2(telephone2) {
        this._telephone2 = telephone2;
    }
    get telephone2() {
        return this.telephone2;
    }

    //crmv
    set crmv(crmv) {
        crmv ? this._crmv = crmv: this._crmv = '' ;
    }
    get crmv() {
        return this._crmv;
    }

    //commission
    set commission(commission) {
        commission ? this._commission = commission: this._commission = 0 ;
    }
    get commission() {
        return this._commission;
    }

    //nacionality
    set nacionality(nacionality) {
        nacionality ? this._nacionality = nacionality: this._nacionality = '' ;
    }
    get nacionality() {
        return this.nacionality;
    }

    //marital_status
    set marital_status(marital_status) {
        marital_status ? this._marital_status = marital_status: this._marital_status = '' ;
    }
    get marital_status() {
        return this._marital_status;
    }

    //sex
    set sex(sex) {
        sex ? this._sex = sex: this._sex = '' ;
    }
    get sex() {
        return this._sex;
    }

    //ocupation
    set ocupation(ocupation) {
        ocupation ? this._ocupation = ocupation: this._ocupation = '' ;
    }
    get ocupation() {
        return this._ocupation;
    }

    //salary
    set salary(salary) {
        salary ? this._salary = salary: this._salary = 0 ;
    }
    get salary() {
        return this._salary;
    }

    //address_id
    set address_id(address_id) {
        this._address_id = address_id;
    }
    get address_id() {
        return this._address_id;
    }
}

module.exports = User;