var express = require('express');
var router = require('./routes/routers')
var app = express();
var bodyParser = require("body-parser")
var session = require('express-session')

//配置解析表单，post请求体插件，一定要在app.use之前
app.use(bodyParser.urlencoded({exteded: false}));
app.use(bodyParser.json());


// register the session with it's secret ID
app.use(session({secret: 'helloworld', resave: true}));


var userController = require('./routes/userController')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/assets'));


app.use('/userController', userController);
app.use(router);

app.listen(3000);