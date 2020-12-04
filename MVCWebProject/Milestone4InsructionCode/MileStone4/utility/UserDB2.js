//nickName,  firstName, lastName, email, password,  city, state, zip, country

let User = require("../models/user")

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/db')
var userSchema = new Schema({
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    nickName: {
        type: String,
        default: "newUser"
    },
    firstName: {
        type: String,
        default: 'ying'
    },
    lastName: {
        type: String,
        default: 'Gi'
    },
    city: {
        type: String,
        default: "charlotte"
    },
    state: {
        type: String,
        default: "NC"
    },
    zip: {
        type: String,
        default: "28262"
    },
    country: {
        type: String,
        default: "US"
    }

}, {collection: "user"})
var userDB = mongoose.model('User', userSchema, 'user')

// if you try to login my application, you should use gigi131@gmail.com as email and 3345 as password
// var userOne = new userDB({
//     email: 'gigi131@gmail.com',
//     password: '3345',
//     nickName: 'SuperGirl',
//     firstName: "Gia",
//     lastName: "Guo",
//     city: "New York",
//     state: "NY",
//     zip: "26534",
//     country: "US"
//
// })
// userOne.save(function (err, ret) {
//     if (err) {
//         console.log("fail")
//     } else {
//         console.log(ret)
//     }
// })

class userDB2 {
    //getUser(email/userID) - this function returns a User object for the provided user identifier
    getUser(email, password) {
        return new Promise((resolve, reject) => {
            userDB
                .find({
                    $and: [
                        {email: email},
                        {password: password}
                    ],
                })
                .then((data) => {
                    if (data.length == 0) {
                        return;
                    }
                    let item = data[0]
                    let userObj = new User()
                    userObj.email = data.email

                    resolve(userObj)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }//end the getUser by email
}


module.exports = userDB2