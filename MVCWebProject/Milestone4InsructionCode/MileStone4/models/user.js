/*
User - represents a user of the application with the following properties:

User ID
First Name
Last Name
Email Address
Optional fields
Address 1 Field
Address 2 Field
City
State
Zip Code
Country
Any other fields you find necessary
 */
class user {

    constructor(nickName,  firstName, lastName, email, password, city, state, zip, country) {


        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        // this._address1 = address1;
        // this._address2 = address2;
        this._city = city;
        this._state = state;
        this._zip = zip;
        this._country = country;
        this._nickName = nickName;
        this._password = password;
    }

    get nickName() {
        return this._nickName;
    }

    set nickName(value) {
        this._nickName = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }


    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    // get address1() {
    //     return this._address1;
    // }
    //
    // set address1(value) {
    //     this._address1 = value;
    // }

    // get address2() {
    //     return this._address2;
    // }
    //
    // set address2(value) {
    //     this._address2 = value;
    // }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    get state() {
        return this._state;
    }

    set state(value) {
        this._state = value;
    }

    get zip() {
        return this._zip;
    }

    set zip(value) {
        this._zip = value;
    }

    get country() {
        return this._country;
    }

    set country(value) {
        this._country = value;
    }
   getUserDataDetails(){
        return {
            nickName: this._nickName,
            firstName: this._firstName,
            lastName: this._lastName,
            email:this._email,
            password: this._password,
            // address1: this._address1,
            // address2:this._address2,
            city: this._city,
            state: this._state,
            zip: this._zip,
            country: this._country,

        }
   }
}
module.exports = user;