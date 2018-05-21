var express = require('express')
var app = new express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
var session = require("express-session");
//配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30
    },
    rolling:true
}))
var admin = require('./routers/admin')
app.use('/admin',admin)
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/upload',express.static('upload'));
app.use((req,res)=>{
    res.render('admin/error/error')
})
app.listen(8000)