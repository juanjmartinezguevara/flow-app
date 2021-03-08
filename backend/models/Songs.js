const { Schema, model } = require('mongoose')
const Songs = model('Songs', new Schema({

    songBeattrack: { type: Schema.Types.ObjectId, ref: 'Beats' },
    songDate: Date,
    songUser: { type: Schema.Types.ObjectId, ref: 'User' },
    songTotLikes: Number,
    songURL: String,
    songPBR: Number,
    songLyricsStr: [String],
    songLyricsAudio: String,
    songBG: String,
    songCaption: String

}))

module.exports = Songs 