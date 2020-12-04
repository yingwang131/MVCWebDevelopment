//email, connectionID, rsvpStatus, userConnectionID?
let UserProfile = require("../models/userConnection")

var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/db')
var userProfileSchema = new Schema({
    // userConnectionID: {
    //     type: String
    // },
    email: {
        type: String,
        required: true
    },
    connectionID: {//关联到Connection Document的主键_id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connection'
        // type: String,
        // required: true
    },
    rsvpStatus: {
        type: String,
    }
}, {collection: "userprofile"})
var userProfileDB = mongoose.model('UserProfile', userProfileSchema, 'userprofile')

// let userprofile = new userProfileDB({
//     email: "gigi131@gmail.com",
//     connectionID: "5e9c7be7fa074a69199e322a",
//     rsvpStatus: "yes"
// })
// userprofile.save(function (err, data) {
//     console.log("new connection added")
//     if (data) {
//         console.log(data)
//     } else {
//         console.log(err)
//     }
// })

class userProfileDB2 {

    //add new connection to the list of available connections
    addNewConnection(userConnection) {
        return new Promise((resolve, reject) => {
            let newConnection = new userProfileDB({
                userConnectionID: userConnection.userConnectionID,
                email: userConnection.email,
                connectionID: userConnection.connectionID,
                rsvpStatus: userConnection.rsvpStatus
            })
            newConnection.save(function (err, data) {
                console.log("new connection added")
                console.log(data)
                if (data) resolve(data)
                else return reject(err)
            })
        })
    }//end add new connection

    //add/update a user rsvp to a connection
    updateUserRsvp(userConn) {
        return new Promise((resolve, reject) => {
            userProfileDB
                .findOneAndUpdate({
                        $and: [
                            // {userConnectionID: userConnection.userConnectionID},
                            {email: userConn.email},
                            {connectionID: userConn.connectionID}
                        ]
                    },
                    {$set: {rsvpStatus: userConn.rsvpStatus}},
                    {new: true, upsert: true},
                    function (err, data) {
                        console.log("connection either updated or added")
                        console.log(data)
                        resolve(data)
                    }
                )
                .catch((err) => {
                    return reject(err);
                })
        })
    }// end updateUserRsvp


    //find all connections a user has rsvp's (a list of userConnection objects)
    findAll(email) {
        return new Promise((resolve, reject) => {
            userProfileDB
                .find({email: email}).populate('connectionID').exec(function (err, doc) {
                if (err) {
                    return reject(err)
                } else {

                    //把结果转成对象list
                    let userCons = new Array();
                    console.log(doc)
                    doc.forEach((item) => {
                        let userCon = new UserProfile()
                        userCon.rsvpStatus = item.rsvpStatus
                        userCon.userConnectionID = item._id
                        userCon.connectionID = item.connectionID._id
                        userCon.connectionName = item.connectionID.connectionName
                        userCon.connectionTopic = item.connectionID.connectionTopic
                        userCons.push(userCon)
                    })
                    resolve(userCons)
                }
            })
        })
    }

    //remove a rsvp connection
    // deletes all data the database
    remove(id) {
        return new Promise((resolve, reject) => {
            userProfileDB
                .find({_id: id})
                .deleteMany()
                .exec()
                .then(function () {
                    resolve();
                })
                .catch((err) => {
                    return reject(err);
                });
        }); // end remove
    }
}


module.exports = userProfileDB2