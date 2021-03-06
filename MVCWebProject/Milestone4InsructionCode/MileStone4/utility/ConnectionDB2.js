let Connection = require("../models/connection")
var mongoose = require('mongoose')
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/db')
var connectionSchema = new Schema({
    connectionName: {
        type: String,
        required: true
    },
    connectionTopic: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {collection: "connection"})

var connectionDB = mongoose.model('Connection', connectionSchema, 'connection')
// var conOne = new connectionDB({
//     connectionName: 'database ',
//     connectionTopic: 'study',
//     details: 'learn something about db',
//     dateTime: 7182020,
//     address: '2310 mallard dr'
// })
// conOne.save(function (err, ret) {
//     if (err) {
//         console.log("fail")
//     } else {
//         console.log(ret)
//     }
// })

class connectionDB2 {
    //getConnections() -
    // this function returns an array of Connection objects of all the connections
    getConnections() {
        return new Promise((resolve, reject) => {
            connectionDB
                .find({})
                .then((data) => {
                    let connections = [];
                    let visitedTopics = new Array()

                    //先遍历有多少个topic
                    data.forEach((connection) => {
                        let topic = connection.connectionTopic
                        if (visitedTopics.indexOf(topic) == -1) {
                            visitedTopics.push(topic)
                            connections.push({topic: topic, data: new Array()})
                        }
                    })

                    //再遍历，将connection放到对应的topic下面
                    data.forEach((connection) => {
                        let connectionObj = new Connection()
                        connectionObj.setConnectionTopic(connection.connectionTopic)
                        connectionObj.setConnectionName(connection.connectionName)
                        connectionObj.setDetails(connection.details)
                        connectionObj.setDateTime(connection.dateTime)
                        connectionObj.setAddress(connection.address)
                        connectionObj.setConnectionID(connection._id)

                        connections.forEach((item) => {
                            if (item['topic'] == connection.connectionTopic) {
                                item['data'].push(connectionObj)
                            }
                        })

                    })
                    resolve(connections);
                })
                .catch((err) => {
                    return reject(err);
                })
        })
    }//end getconnections

    //getConnection(connectionID) this function returns a Connection object for the provided connection code
    getConnection(connectionID) {
        return new Promise((resolve, reject) => {
            connectionDB
                .find({
                    _id: connectionID
                })
                .then((data) => {
                    if (data.length == 0) {
                        return;
                    }
                    let connection = data[0]
                    let connectionObj = new Connection()
                    connectionObj.setConnectionID(connectionID)
                    connectionObj.setConnectionTopic(connection.connectionTopic)
                    connectionObj.setConnectionName(connection.connectionName)
                    connectionObj.setDetails(connection.details)
                    connectionObj.setDateTime(connection.dateTime)
                    connectionObj.setAddress(connection.address)

                    resolve(connectionObj)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }// end getConnection(connectionID)

    add(connection) {
        return new Promise((resolve, reject) => {
            var conOne = new connectionDB({
                connectionName: connection.connectionName,
                connectionTopic: connection.connectionTopic,
                details: connection.details,
                dateTime: connection.dateTime,
                address: connection.address
            })
            conOne.save(function (err, ret) {
                if (err) {
                    reject(err)
                } else {
                    console.log(ret)
                    resolve()
                }
            })
        })
    }
}


module.exports = connectionDB2