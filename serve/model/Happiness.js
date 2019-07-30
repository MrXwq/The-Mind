const mongoose = require('mongoose')

var happinessSchema = new mongoose.Schema({
        hid:{type:String},
        moodId: {type: Number},
        url: {type: String},
        theme: {type: String},
        place: {type: String},
        time: {type: String},
        privacy: {type: String},
        content: {type: String},
        },{
        // 加个时间戳，可以自己生成时间字段，一个创建时间，一个是更新时间
        timestamps: true
    })

// 参数1：模型名称，参数2：表结构，参数3：数据在真正的数据库中存的集合的名字，关系数据库的表明，是他默认生成的，一般是模型的名称小写加复数
module.exports = mongoose.model('Happiness', happinessSchema);
