/*
router.js 路由模块，在这个routes 包里面的都是路由，因为模块职责要清晰而且单一，不要混用
职责：
1：处理路由
2：根据不同的请求方法+请求路径设置具体的请求处理函数
 */

//要用connectionID 找到connectionId 来显示对应用户的connections即event
var express = require('express')
var router = express.Router()
var userConnection = require('../models/userConnection.js');
var userProfileDB2 = require('../utility/UserProfileDB2.js')
let Connection = require("../models/connection")
var ConnectionDB = require('../utility/ConnectionDB2')

var connectionDao = new ConnectionDB()


//1login a user by initializing a userporfile model and  storing in the session
//这个login 的function 在 routers.js 里面的login.post已经写了

//2store a users current profile
//这个function 也在 routers.js 里面的login.post已经写了


//3 save a users rsvp for a connection - add new connection to the user profile
// connectionID, RSVP, email 入参

var userProfileDao = new userProfileDB2()
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
    userProfileDao.updateUserRsvp(userConnection1).then(function (data) {
        response.json({'status': 200});

    }, function (err) {
        console.log(err)
    })
})


//4 update a user rsvp for a connection - update the value for the rsvp for the user
//在 router.js 里面的 router.get('/savedConnections') 写的第4条的逻辑

//5 delete a user rsvp for a connection - delete a specififc user connection
router.get('/deleteUserConnection', function (request, response) {
    console.log(request.query.userConnectionID);
    let userConnectionIDs = request.query.userConnectionID;
    userProfileDao.remove(userConnectionIDs).then(function (data) {
        response.json({'status': 200});
    }, function (err) {
        console.log(err)
    });
})

//6 Display a user's list of saved connections - list all user connections on the savedConnections view
// 在router.js 里面已经写了 get all connections list

router.get('/savedConnections', function (req, res) {
    //接收前端传递过来的email， 或者在session中保存登录用户的email
    let email = req.session.email;
    //没登录跳转到登录页面
    if (email == undefined) {
        res.redirect('/login');
    }
    userProfileDao.findAll(email).then(function (data) {
        //传递到页面，渲染出来
        res.render('savedConnections', {'data': data});
    }, function (err) {
        console.log(err)
    });
})

//add newConnection 的post 接口
router.post('/newConnection', function (req, res) {
    let connectionTopic = req.body.topic
    let connectionName = req.body.name
    let details = req.body.details
    let address = req.body.address
    let dateTime = req.body.dateTime
    let con = new Connection()
    con.connectionTopic = connectionTopic
    con.connectionName = connectionName
    con.details = details
    con.address = address
    con.dateTime = dateTime
    connectionDao.add(con).then(function (data) {
        //传递到页面，渲染出来
        res.redirect('/connections')
    }, function (err) {
        console.log(err)
    })
})

//7 logout a user--remove a user form the session
// 在router.js 里面已经写了logout a user 并从session中删除


module.exports = router