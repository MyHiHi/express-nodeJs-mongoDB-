var mongoClient = require('mongodb').MongoClient
var dbUrl = 'mongodb://localhost:27017/'
var dbName = 'productManager'
var ObjectID = require('mongodb').ObjectID
exports.ObjectID=ObjectID
function connectDB(callback){
    mongoClient.connect(dbUrl,(err,client)=>{
        if (err){
            console.log('数据库连接失败')
            return
        }else{
            callback(client)
        }
    })
}

exports.find=(table,msg,callback)=>{
    connectDB((db)=>{
        var result = db.db(dbName).collection(table).find(msg);
        result.toArray((err,data)=>{
            callback(err,data);
            db.close()
        })
    })
}

exports.insert=(table,msg,callback)=>{
    connectDB((db)=>{
        var result = db.db(dbName).collection(table)
        result.insert(msg,(err,data)=>{
            callback(err,data)
            db.close()
        })
    })
}

exports.delete = (table,msg,callback)=>{
    connectDB((db)=>{
        var result = db.db(dbName).collection(table)
        result.deleteOne(msg,(err,data)=>{
            callback(err,data)
            db.close()
        })
    })
}

exports.update = (table,msg1,msg2,callback)=>{
    connectDB((db)=>{
        var result = db.db(dbName).collection(table)
        result.update(msg1,{$set:msg2},(err,data)=>{
            callback(err,data);
            db.close()
        })
    })    
}