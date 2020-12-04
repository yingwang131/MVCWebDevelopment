var express = require('express');
var router = require('./routes/routers')
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
// console.log(__dirname)

// //set the path for static resource to be accessible
app.use(router)

app.get('/index', function (req, res) {
    res.render('index');
})

app.get('/contact', function (req, res) {
    res.render('contact')
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000);