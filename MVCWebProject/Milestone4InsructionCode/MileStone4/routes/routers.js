/*
router.js 路由模块，在这个routes 包里面的都是路由，因为模块职责要清晰而且单一，不要混用
职责：
1：处理路由
2：根据不同的请求方法+请求路径设置具体的请求处理函数

具体方法：
1：express 提供了一种专门用来包装路由的方式，创建一个路由容器，var router = express.Router()
2：把路由都挂载到router 路由容器中，router.get('/', function (req, res)
3：用这个方式把路由容器导出来，module.exports = router； 在app.js里面用这个路由：app.use(router)，

 */

var express = require('express')
var router = express.Router()
var user = express('../models/user.js');
var userConnection = require('../models/userConnection.js');
var ConnectionDB = require('../utility/ConnectionDB2')
var UserDB = require('../utility/UserDB2')

var connectionDao = new ConnectionDB()
var userDao = new UserDB()


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

//getConnections in the list
router.get('/connections', function (req, res) {
    // var getConnections = dbUtil.getConnections();
    connectionDao.getConnections().then(function (data) {
        console.log(data)
        res.render('connections', {qs: data})
    }, function (err) {
        console.log(err)
    })
})


//according connectionID to getConnection
router.get('/connection', function (req, res) {
    var id = req.query.connectionID
    // var connection = dbUtil.getConnection(id);
    connectionDao.getConnection(id).then(function (data) {
        console.log("print connection")
        console.log(data);
        res.render('connection', {qs: data})
    }, function (err) {
        console.log(err)
    })
})

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/loginError', function (req, res) {
    res.render('loginError')
})

// router.post('/login', function (req, res) {
//     console.log(req.body);
//     //1 获取表单数据
//     var body = req.body;
//     //2 查询数据库 email 和 密码是否正确
//     if (req.session.email == undefined) {
//         req.session.email = body.email;
//     }
//     //3 发送响应数据
//     if (req.session.profile == undefined) {
//         req.session.profile = new userProfile();
//     }
//     res.json({'status': 200});
//
// })
router.post('/login', function (req, res) {
    console.log(req.body);
    //1 获取表单数据
    var body = req.body;
    userDao.getUser(body.email, body.password).then(function (data) {
        //2 查询数据库 email 和 密码是否正确
        if (req.session.email == undefined) {
            req.session.email = body.email;
        }
        res.json({'status': 200});

    }, function (err) {
        console.log(err)
    })
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