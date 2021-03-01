const { Schema, model } = require('mongoose')
const Post = model('Post', new Schema({
    post: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}))
module.exports = Post 