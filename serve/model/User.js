const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    tel: {type: Number},
    password: {
        type: String,
        // 让数据不被显示出来，因为每次保存都会对密码进行散列
        select: false,
        set(val) {
            // 密码散列，不可逆,第二个参数是加密指数，越高安全性越高，但耗时越多
            return require('bcrypt').hashSync(val,10)
        }
    },
    avatar: {type: String},
    info: {
        username: {type: String},
        sex: {type: String},
        birth: {type: String},
        address: {type: Array},
    },
    
    happiness: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Happiness'}],
    gratitude: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Gratitude'}],
    regret: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Regret'}],
})

module.exports = mongoose.model('users',userSchema)