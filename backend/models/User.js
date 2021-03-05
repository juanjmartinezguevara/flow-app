const { Schema, model } = require('mongoose')
const User = model('User', new Schema({

    email: String,
    googleId: String,
    picture: String,
    given_name: String,
    family_name: String,
    userPhoto: String,
    userSignUpDate: Date,
    userAbout: String,
    userTwitter: String,
    userInstagram: String,
    userSoundCLoud: String

}))
module.exports = User 