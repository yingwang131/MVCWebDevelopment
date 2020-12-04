//要用connectionID 找到connectionId 来显示对应用户的connections即event
var express = require('express')
var router = express.Router()

// var session = require('express-session');
// var bodyParser = require('body-parser');
//
// // register the bodyParser middleware for processing forms
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));
//
// // register the session with it's secret ID
// router.use(session({secret: 'exercisefour', resave: true}));

var userProfile = require('../models/userProfile.js');
var userConnection = require('../models/userConnection.js');
var userConnectionUtil = require('../utility/UserConectionUtil');
var dbUtil = require('../utility/connectionDB')


//1login a user by initializing a userporfile model and  storing in the session


//2store a users current profile


//3 save a users rsvp for a connection - add new connection to the user profile
// connectionID, RSVP, email 入参
//先新建一个userconnection，然后调用userproile类里面的addconnection方法
router.post('/addUserConnection', function (request, response) {
    let email = request.session.email;
    //用户未登录，跳转到登录页面
    if (email == undefined) {
        response.json({'status': 4001});
    }
    let connectionID = request.body.connectionID;
    let rsvpStatus = request.body.rsvpStatus;

    var userConnection1 = new userConnection(email, connectionID, rsvpStatus);

    let profile = request.session.profile;
    userConnectionUtil.addConnection(userConnection1, profile);
    request.session.profile = profile;

    response.json({'status': 200});
    // response.redirect('/savedConnections', {qs:userConnection});

})


//4 update a user rsvp for a connection - update the value for the rsvp for the user


//5 delete a user rsvp for a connection - delete a specififc user connection
router.get('/deleteUserConnection', function (request, response) {
    console.log(request.query.userConnectionID);
    let userConnectionIDs = request.query.userConnectionID;
    let profile = request.session.profile;
    userConnectionUtil.removeConnection(parseInt(userConnectionIDs), profile);

    request.session.profile = profile;
    response.json({'status': 200});
})


//7 logout a user--remove a user form the session


module.exports = router