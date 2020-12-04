class User {
    constructor(
        userId,
        firstName,
        lastName,
        email,
        address1,
        city,
        state,
        zip,
        country
    ) {
        this._userId = userId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._address1 = address1;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this._country = country;
    }

    getUserId() {
        return this._userId;
    }

    setUserId(value) {
        this._userId = value;
    }

    getFirstName() {
        return this._firstName;
    }

    setFirstName(value) {
        this._firstName = value;
    }

    getLastName() {
        return this._lastName;
    }

    setLastName(value) {
        this._lastName = value;
    }

    getEmail() {
        return this._email;
    }

    setEmail(value) {
        this._email = value;
    }

    getAddress1() {
        return this._address1;
    }

    setAddress1(value) {
        this._address1 = value;
    }

    getCity() {
        return this._city;
    }

    setCity(value) {
        this._city = value;
    }

    getState() {
        return this._state;
    }

    setState(value) {
        this._state = value;
    }

    getZip() {
        return this._zip;
    }

    setZip(value) {
        this._zip = value;
    }

    getCountry() {
        return this._country;
    }

    setCountry(value) {
        this._country = value;
    }
}

module.exports = User;
