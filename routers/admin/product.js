var express  = require('express')
var router = express.Router()
var mongoApi = require('./../modules/mongoApi')
var multiparty = require('multiparty')
var fs = require('fs')
router.get('/',(req,res)=>{
    mongoApi.find('product',{},(err,data)=>{
        res.render('admin/product/index',{
            list:data
        })
    })
})

router.get('/add',(req,res)=>{
    res.render('admin/product/add')
})

router.post('/doAdd',(req,res)=>{
    var form = new multiparty.Form()
    form.uploadDir = 'upload'
    form.parse(req,(err,fields,files)=>{
        var title = fields.title[0]
        var price = fields.price[0]
        var fee = fields.fee[0]
        var description = fields.description[0]
        var pic = files.pic[0].path;
        mongoApi.insert('product',{
            title,
            price,
            fee,
            description,
            pic
        },(err,data)=>{
            if (!err){
                res.redirect('/admin/product')
            }
        })
    })
})

router.get('/edit',(req,res)=>{
    var id = req.query.id;
    mongoApi.find('product',{'_id':new mongoApi.ObjectID(id)},(err,data)=>{
        res.render('admin/product/edit',{list:data[0]})
    })
})

router.post('/doEdit',(req,res)=>{
    var form = new multiparty.Form()
    form.uploadDir = 'upload'
    form.parse(req,(err,fields,files)=>{
        var _id=fields._id[0];   /*修改的条件*/
        var title = fields.title[0]
        var price = fields.price[0]
        var fee = fields.fee[0]
        var description = fields.description[0]
        var pic = files.pic[0].path;
        var originalFilename=files.pic[0].originalFilename;
        var setData;
        if (originalFilename){
            setData={
                title,
                price,
                fee,
                description,
                pic 
            }
        }else{
            setData={
                title,
                price,
                fee,
                description,
            }
            fs.unlink(pic)
        }
        mongoApi.update('product',{"_id":new mongoApi.ObjectID(_id)},setData,(err,data)=>{
            if (!err){
                    res.redirect('/admin/product')
            }
        })
    })
})

router.get('/delete',(req,res)=>{
    console.log('^^^^^^^^^^^',req.url)
    var id = req.query.id
    mongoApi.delete('product',{'_id':new mongoApi.ObjectID(id)},(err,data)=>{
        if (!err){
            res.redirect('/admin/product')
        }
    })
})

module.exports = router