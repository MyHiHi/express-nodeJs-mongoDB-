var mongoApi = require('./mongoApi')
mongoApi.find('user',{},(err,data)=>{
    console.log(data)
})