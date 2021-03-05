const { Schema, model } = require('mongoose')
const Comments = model('Comments', new Schema({

    commDate: Date,
    commUser: { type: Schema.Types.ObjectId, ref: 'User' },
    commSong: { type: Schema.Types.ObjectId, ref: 'Songs' },
    comment: String
    
}))

module.exports = Comments 