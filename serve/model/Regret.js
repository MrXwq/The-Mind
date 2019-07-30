const mongoose = require('mongoose')

const regretSchema = new mongoose.Schema({
    url: {type: String},
    theme: {type: String},
    place: {type: String},
    time: {type: String},
    privacy: {type: Boolean},
    content: {type: String},
    rid: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('Regret', regretSchema)