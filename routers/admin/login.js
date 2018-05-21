var express = require('express')
var router = express.Router();
var app = new express()
var md5 = require('md5-node')
var mongoApi  =  require('./../modules/mongoApi')
router.get('/',(req,res)=>{
    res.render('admin/login/login')
})

router.post('/doLogin',(req,res)=>{
        var name = req.body.username
        var password = md5(req.body.password)

        mongoApi.find('user',{
            username:name,
            password:password
        },(err,data)=>{
            if (!err){
                if (data.length>0){                   
                    req.session.userinfo = data[0];
                    res.redirect('/admin/product')
                }else{
                    res.send("<script>alert('登录失败');location.href='admin/login'</script>")
                }
            }
        })

})

router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if (!err){
            res.render('admin/login/login')
        }else{
            console.log(err)
        }
    })
})
module.exports=router