var express = require('express')
var router = express.Router()

// router.get('/connections', function (req, res) {
//     //get data objects
//     let connectionData = require("../models/connection")
//     console.log("query string is")
//     console.log(req.query)
//
//     console.log('request  query stirng was sent')
//     let connectModel = new connectionData();
//     connectModel.setConnectionID(req.query.connectionID);
//     connectModel.setConnectionName(req.query.connectionName);
//     connectModel.setConnectionTopic(req.query.connectionTopic);
//
//
//     console.log(connectModel.getConnectionID());
//
//     console.log("connection data object is ")
//     console.log(connectModel);
//
//     res.render("connections", {qs: connectModel});
// })


var dbUtil = require('../utility/connectionDB')
router.get('/connections', function (req, res) {
    var getConnections = dbUtil.getConnections();
    console.log("print getConnections")
    console.log(getConnections);
    // const aExamp = dbUtil.getConnection(2);
    // console.log("print aEamp")
    // console.log(aExamp);
    res.render('connections', {qs: getConnections})
})


router.get('/connection', function (req, res) {
    var id = req.query.connectionID
    var connection = dbUtil.getConnection(id);
    console.log("print connection")
    console.log(connection);
    res.render('connection', {qs: connection})
})


router.get('/savedConnections', function (req, res) {
    res.render('savedConnections')
})

router.get('/newConnection', function (req, res) {
    res.render('newConnection')
})

module.exports = router