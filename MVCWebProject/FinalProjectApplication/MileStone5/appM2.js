/*
app.js 入门模块，
职责：
1：创建服务
2：做一些服务相关的配置
3：模板引擎
4：body-parser解析表单 post请求提供静态资源服务
5：挂载路由
6：监听端口启动服务
 */
var express = require('express');
var router = require('./routes/routers')
var app = express();
var bodyParser = require("body-parser")
var session = require('express-session')

//配置解析表单，post请求体插件，可以用这个插件来处理post请求，这2句缺一不可，一定要在app.use（router）之前,即挂载路由之前
app.use(bodyParser.urlencoded({exteded: false}));
app.use(bodyParser.json());


// register the session with it's secret ID
app.use(session({secret: 'helloworld', resave: true}));


var userController = require('./routes/userController')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/assets'));


app.use('/userController', userController);
//把路由容器挂载到app服务中，这是express 提供的一种非常简单易操作的方法；
app.use(router);

app.listen(3000);