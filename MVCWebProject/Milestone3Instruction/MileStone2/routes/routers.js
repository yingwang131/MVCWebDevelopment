var express = require('express')
var router = express.Router()
var user = express('../models/user.js');
var userProfile = require('../models/userProfile.js');
var userConnection = require('../models/userConnection.js');
var userConnectionUtil = require('../utility/UserConectionUtil');

var dbUtil = require('../utility/connectionDB')

router.get('/', function (req, res) {
    res.render('index');
})
router.get('/index', function (req, res) {
    res.render('index');
})

router.get('/contact', function (req, res) {
    res.render('contact')
})

router.get('/about', function (req, res) {
    res.render('about')
})

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
    res.render('connection', {qs: connection, email: 'ywang131@uncc.edu'})
})

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/loginError', function (req, res) {
    res.render('loginError')
})

router.post('/login', function (req, res) {
    console.log(req.body);
    //1 获取表单数据
    var body = req.body;
    //2 查询数据库 email 和 密码是否正确
    if (req.session.email == undefined) {
        req.session.email = body.email;
    }
    //3 发送响应数据
    if (req.session.profile == undefined) {
        req.session.profile = new userProfile();
    }
    res.json({'status': 200});

})

router.get('/register', function (req, res) {
    res.render('register')
})

router.post('/register', function (req, res) {
    //1 获取表单的数据
    //console.log(req.body);
    //2 操作数据库,给点假数据
    //判断该用户是否已存在，如果存在不允许注册，如果不存在，才注册新用户
    /*
    var body = req.body;
    user.findOne({
        email: body.email
    }, function (err, data) {
        if(err){
            return res.status(500).send("server error")
        }
        console.log(data);
        return res.status(200).send('ok')
    })
    //3 发送响应

     */

})

router.get('/savedConnections', function (req, res) {
    //接收前端传递过来的email， 或者在session中保存登录用户的email
    let email = req.session.email;
    //没登录跳转到登录页面
    if (email == undefined) {
        res.redirect('/login');
    }
    //查询数组
    let profile = req.session.profile;
    let userConnections = userConnectionUtil.getUserConnections(email, profile);
    let connections = [];

    if (userConnections != null) {
        for (let i = 0; i < userConnections.length; i++) {
            //根据connectionId 去查询相应的connection
            let item = dbUtil.getConnection(userConnections[i]._connectionID);
            if (item != undefined) {
                item['rsvpStatus'] = userConnections[i]._rsvpStatus;
                item['userConnectionID'] = userConnections[i]._userConnectionID;
                connections.push(item);
            }

        }
    }
    //传递到页面，渲染出来
    res.render('savedConnections', {'data': connections});
})

router.get('/newConnection', function (req, res) {
    res.render('newConnection');
})


router.get('/logout', function (req, res) {
    //清除登陆状态
    // 重新定向到登陆页面
    // req.session.id = null;
    req.session.destroy();
    res.redirect('/login');
})

router.get('/*', function (req, res) {
    res.render('index');
})


module.exports = router