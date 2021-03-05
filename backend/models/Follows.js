const { Schema, model } = require('mongoose')
const Follows = model('Follows', new Schema({

    followDate: Date,
    followed: { type: Schema.Types.ObjectId, ref: 'User' },
    follower: { type: Schema.Types.ObjectId, ref: 'User' },
    
}))

module.exports = Follows 