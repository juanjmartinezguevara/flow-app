const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const axios = require('axios')
const jwt = require('jsonwebtoken')


router.get(`/user`, verifyToken, async (req, res, next) => {
    //GETTING OUR USER
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.status(403).json(err);
        } else {
            User.findById(authData.user._id).then(user => {
                console.log(user, '?!?!?!?')
                res.status(200).json(user)
            }).catch(err => res.status(500).json(err))

        }
    })
})

router.get(`/myPosts`, verifyToken, async (req, res, next) => {

    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        //I'm available via AuthData
        if (err) {
            res.status(403).json(err);
        } else {
            let posts = await Post.find({ userId: authData.user._id })
            res.status(200).json(posts)
        }
    })
})

router.post(`/addAPost`, verifyToken, async (req, res, next) => {
    
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        console.log('HERE WE ARE', req, res, next)
        if (err) {
            res.status(403).json(err);
        } else {
            let body = req.body
            body.userId = authData.user._id
            let post = await Post.create(body)
            res.status(200).json(post)
        }
    })
})

router.get(`/allPosts`, async (req, res, next) => {
    let allPosts = await Post.find({})
    res.status(200).json(allPosts)
})

router.post(`/logMeIn`, async (req, res, next) => {

    const tokenId = req.header('X-Google-Token')
    console.log(tokenId)

    if (!tokenId) {
        res.status(401).json({ msg: "Mising Google JWT" })
    }

    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${encodeURI(tokenId)}`)
    const { email, email_verified, picture, given_name, family_name, error_description } = googleResponse.data
    if (!email || error_description) {
        // console.log('email', email, 'err', error_description)
        res.status(400).json({ msg: error_description })
    } else if (!email_verified) {
        res.status(401).json({ msg: 'Email not verified with google' })
    }

    const userData = {
        email, email_verified, picture, given_name, family_name, error_description, googleId: req.body.googleId
    }

    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create(userData)
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30min' }, (err, token) => {
        res.status(200).json({ ...user._doc, token });
    })


})


// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbidden
        res.status(403).json({ err: 'not logged in' })
    }
}

var aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket
console.log(process.env)
// Now lets export this function so we can call it from somewhere else
// exports.sign_s3 = (req,res) => {
    router.post('/sign_s3', (req, res) => {
        console.log(req.body, 'favorit beer')
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 3000,
    ContentType: fileType,
    ACL: 'public-read'
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({data:{returnData}});
  });
})


module.exports = router