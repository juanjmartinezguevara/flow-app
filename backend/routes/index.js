const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Songs = require("../models/Songs");
const Beats = require("../models/Beats");
const Comments = require("../models/Comments");
const Likes = require("../models/Likes");
const Follows = require("../models/Follows");
const axios = require("axios");
const jwt = require("jsonwebtoken");


router.get(`/user`, verifyToken, async (req, res, next) => {
  //GETTING OUR USER
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

router.get(`/getOneUserRT`, verifyToken, async (req, res, next) => {
  //GETTING ONE USER
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findById(authData.user._id)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

router.get(`/getUserSongsRT`, async (req, res, next) => {
    console.log('getUserSongs Route', req)
    Songs.find({ })
    .then((songs) => {
        res.status(200).json(songs);
    })
    .catch((err) => res.status(500).json(err))
})

router.post(`/addFollowRT`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let follow = {followed: req.body.user2, follower: req.body.user1}
      Follows.create(follow)
        .then((foll) => {
          res.status(200).json(foll);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});


router.post(`/addUserProfRT`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      User.findByIdAndUpdate(authData.user._id, req.body)
        .then((ppl) => {
          res.status(200).json(ppl);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

router.post(`/addAPost`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let body = req.body;
      body.userId = authData.user._id;
      let post = await Post.create(body);
      res.status(200).json(post);
    }
  });
});

router.get(`/getMostLikedSongsRT`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let body = req.body;
      body.userId = authData.user._id;
      let songs = await Songs.find({$sort: {"songTotLikes": -1}});
      res.status(200).json(songs);
    }
  });
});

router.post(`/addSongRT`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      // console.log('body variable from the backend', body)
      console.log('req data from backend', req.body)
      let song = {
        songURL: req.body.songURL,
        songUser: req.body.songUser,
        songBG: req.body.songBG,
        songDate: req.body.songDate,
        songName: req.body.songName,
        songLyricsStr: req.body.songLyricsStr,
        songPBR: req.body.songPBR,
        songBPM: null,
        songTotLikes: req.body.songTotLikes,
        songCaption: req.body.songCaption,
        songBeatTrack: req.body.songBeatTrack,
      };
      // console.log('song variable from backend', song)
     
      Songs.create(song)
        .then((theSong) => {
          
          res.status(200).json(theSong);
          console.log('pineapple',theSong)
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

router.post(`/addBeatRT`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      let beat = { beatUser: authData.user._id, beatURL: req.body.url };
      Beats.create(beat)
        .then((beet) => {
          res.status(200).json(beet);
        })
        .catch((err) => res.status(500).json(err));
    }
  });
});

// router.get(`/getAllBeats`, verifyToken, async (req, res, next) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.status(403).json(err);
//         } else {
//             User.find({}).then(beats => {
//                 res.status(200).json(beats)
//             }).catch(err => res.status(500).json(err))

//         }
//     })
// })

// router.get(`/getBeat`, verifyToken, async (req, res, next) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.status(403).json(err);
//         } else {
//             User.findById({??????????}).then(beats => {
//                 res.status(200).json(beats)
//             }).catch(err => res.status(500).json(err))

//         }
//     })
// })

router.get(`/myPosts`, verifyToken, async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    //I'm available via AuthData
    if (err) {
      res.status(403).json(err);
    } else {
      let posts = await Post.find({ userId: authData.user._id });
      res.status(200).json(posts);
    }
  });
});

router.get(`/allPosts`, async (req, res, next) => {
  let allPosts = await Post.find({});
  res.status(200).json(allPosts);
});

router.post(`/logMeIn`, async (req, res, next) => {
  const tokenId = req.header("X-Google-Token");
  if (!tokenId) {
    res.status(401).json({ msg: "Mising Google JWT" });
  }

  const googleResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${encodeURI(
      tokenId
    )}`
  );
  const {
    email,
    email_verified,
    picture,
    given_name,
    family_name,
    error_description,
  } = googleResponse.data;
  if (!email || error_description) {
    // console.log('email', email, 'err', error_description)
    res.status(400).json({ msg: error_description });
  } else if (!email_verified) {
    res.status(401).json({ msg: "Email not verified with google" });
  }

  const userData = {
    email,
    email_verified,
    picture,
    given_name,
    family_name,
    error_description,
    googleId: req.body.googleId,
  };

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create(userData);
  }
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.status(200).json({ ...user._doc, token });
  });
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({ err: "not logged in" });
  }
}

var aws = require("aws-sdk");
require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "us-east-2", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const S3_BUCKET = process.env.Bucket;
console.log(process.env);
// Now lets export this function so we can call it from somewhere else
// exports.sign_s3 = (req,res) => {
router.post("/sign_s3", verifyToken, (req, res) => {
  let incoming= req.body
  console.log(incoming,'THhhhhhhhhhhhhhhhere!!!')
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      const s3 = new aws.S3(); // Create a new instance of S3
      const fileName = req.body.fileName;
      const fileType = req.body.fileType;
      const file = req.body.file;
      const kind = req.body.kind;

      // Set up the payload of what we are sending to the S3 api
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 3000,
        ContentType: fileType,
        ACL: "public-read",
      };
      // Make a request to the S3 API to get a signed URL which we can use to upload our file
      s3.getSignedUrl("putObject", s3Params, async (err, data) => {
        if (err) {
          console.log(err);
          res.json({ error: err });
        }
        // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
        const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        };
        console.log("AWS FILE SAVE RESULTS>>>>>>>>>", returnData);
        console.log(authData.user);
        console.log("pancakes", req.body, kind);

        if (kind == "song") {
          // Songs.create(  PASS IN DATA  )
        } else if (kind == "profilePic") {
          // User.update (  PASS IN DATA  )
        } else if (kind == "beatTrack") {
          // Beats.create(  PASS IN DATA  )
        }
        res.json({ data: { returnData } });
      });
    }
  });
});

module.exports = router;
