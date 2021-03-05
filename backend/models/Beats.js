const { Schema, model } = require('mongoose')
const Beats = model('Beats', new Schema({

    beatDate: Date,
    beatUser: { type: Schema.Types.ObjectId, ref: 'User' },
    beatURL: String,
    beatBPM: Number,
    beatPBR: Number,
    beatPublic: Boolean,
    
}))

module.exports = Beats 