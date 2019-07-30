const mongoose = require('mongoose')

const gratitudeSchema = new mongoose.Schema({
    url: {type: String},
    theme: {type: String},
    place: {type: String},
    time: {type: String},
    privacy: {type: Boolean},
    content: {type: String},
    gid: {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('Gratitude', gratitudeSchema)