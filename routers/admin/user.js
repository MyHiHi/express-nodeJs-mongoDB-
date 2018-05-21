var express  = require('express')
var router = express.Router()
var mongoApi = require('./../modules/mongoApi')
var md5 = require('md5-node')
router.get('/',(req,res)=>{
    mongoApi.find('user',{},(err,data)=>{
        res.render('admin/user/index',{list:data})
    })
})

router.get('/delete',(req,res)=>{
    var id = req.query.id
    mongoApi.delete('user',{'_id':new mongoApi.ObjectID(id)},(err,data)=>{
        if (!err){
            res.redirect('/admin/user')
        }
    })
})

router.get('/add',(req,res)=>{
    res.render('admin/user/add')
})

router.post('/doAdd',(req,res)=>{
    var name = req.body.username
    var password = md5(req.body.password)
    mongoApi.insert('user',{username:name,password:password},(err,data)=>{
        if (!err){
            res.redirect('/admin/user')
        }
    })
})

router.get('/delete',(req,res)=>{
    var id = req.query.id
    mongoApi.delete('user',{'_id':new mongoApi.ObjectID(id)},(err,data)=>{
        if (!err){
            res.redirect('/admim/user')
        }
    })
})

router.get('/edit',(req,res)=>{
    var id = req.query.id
    mongoApi.find('user',{"_id":new mongoApi.ObjectID(id)},(err,data)=>{
        if (!err){
            res.render('admin/user/edit',{'list':data[0]})
        }
    })
})

router.post('/doEdit',(req,res)=>{
    var id = req.body._id
    var username = req.body.username
    var password1 = md5(req.body.password1)
    
    mongoApi.find('user',{'_id':new mongoApi.ObjectID(id)},(err,data)=>{
        var pwd = data[0].password;
        if (pwd==password1){
            var password2 = md5(req.body.password2)
            mongoApi.update('user',{'_id':new mongoApi.ObjectID(id)},{
                username,
                password:password2
            },(err,data)=>{
                if (!err) res.redirect('/admin/user')
            })

        }else{

                res.send('<script>alert("修改失败");location.href="/admin/user"</script>')
        }

    })

    
})

module.exports = router