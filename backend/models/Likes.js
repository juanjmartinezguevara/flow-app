const { Schema, model } = require('mongoose')
const Likes = model('Likes', new Schema({

    likeDate: Date,
    likeUser: { type: Schema.Types.ObjectId, ref: 'User' },
    likerSong: { type: Schema.Types.ObjectId, ref: 'Songs' },
    
}))

module.exports = Likes 