var express = require('express')
var router = express.Router();
var app = new express()
var login = require('./admin/login')
var user = require('./admin/user')
var product = require('./admin/product')
router.use((req,res,next)=>{
    var url = req.url;
    if (url=='/login' || url=='/login/doLogin' || url=='/user/add' || url=='/user/doAdd'){
        next()
    }else if (req.session.userinfo && req.session.userinfo.username!=''){
        req.app.locals['userinfo'] = req.session.userinfo
        next();
    }else{
        res.redirect('/admin/login')
    }
})

router.use('/login',login)
router.use('/user',user)
router.use('/product',product)
module.exports = router

