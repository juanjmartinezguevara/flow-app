import axios from "axios";

const baseURL = `http://localhost:5000/api`;
const token = localStorage.getItem("token");

const API = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

let resetHead = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

const actions = {
  getUser: async () => {
    //This will go get our user every time we refresh
    return await axios.get(`${baseURL}/user`, resetHead());
  },

  getAllBeats: async () => {
    return await axios.get(`${baseURL}/getAllBeatsRT`, resetHead());
  },

  getBeat: async () => {
    return await axios.get(`${baseURL}/getBeatRT`, resetHead());
  },

  getUserSongs: async () => {
    return await axios.get(`${baseURL}/getUserSongsRT`, resetHead());
  },

  getSong: async () => {
    return await axios.get(`${baseURL}/getSongRT`, resetHead());
  },

  getUserLikedSongs: async () => {
    return await axios.get(`${baseURL}/getUserLikedSongsRT`, resetHead());
  },

  getMostLikedSongs: async () => {
    return await axios.get(`${baseURL}/getMostLikedSongsRT`, resetHead());
  },

  addLike: async () => {
    return await axios.get(`${baseURL}/addLikeRT`, resetHead());
  },

  addSong: async () => {
    return await axios.get(`${baseURL}/addSongRT`, resetHead());
  },

  addSongBG: async () => {
    return await axios.get(`${baseURL}/addSongBGRT`, resetHead());
  },

  getOneUser: async () => {
    return await axios.get(`${baseURL}/getOneUserRT`, resetHead());
  },

  addUserProf: async (person) => {
    console.log('hello from the action')
    return await axios.post(`${baseURL}/addUserProfRT`, person, resetHead());
    
  },

  addUserPhoto: async () => {
    return await axios.get(`${baseURL}/addUserPhotoRT`, resetHead());
  },

  getUsersFollowed: async () => {
    return await axios.get(`${baseURL}/getUsersFollowedRT`, resetHead());
  },

  getComments: async () => {
    return await axios.get(`${baseURL}/getCommentsRT`, resetHead());
  },

  addComment: async () => {
    return await axios.get(`${baseURL}/addCommentRT`, resetHead());
  },

  getUserComments: async () => {
    return await axios.get(`${baseURL}/getUserCommentsRT`, resetHead());
  },

  getMostFollowed: async () => {
    return await axios.get(`${baseURL}/getMostFollowedRT`, resetHead());
  },

  getMyPosts: async () => {
    return await axios.get(`${baseURL}/myPosts`, resetHead());
  },
  getAllPosts: async () => {
    return await axios.get(`${baseURL}/allPosts`, resetHead());
  },
  addPost: async (post) => {
    console.log("are we there yet");
    return await axios.post(`${baseURL}/addAPost`, { post }, resetHead());
  },
  logIn: async (data) => {
    localStorage.setItem("googleTokenId", data.tokenId);

    let headerObj = resetHead();
    headerObj.headers["X-Google-Token"] = data.tokenId;

    let resFromOurDB = await axios.post(`${baseURL}/logMeIn`, data, headerObj);

    console.log(resFromOurDB);

    window.localStorage.setItem("token", resFromOurDB?.data?.token);

    return resFromOurDB;
  },

  uploadFile: async ({ fileName, fileType, file, kind }) => {
    axios
      .post(`${baseURL}/sign_s3`, {
        fileName: fileName,
        fileType: fileType,
      }, resetHead())
      .then((response) => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        var options = {
          headers: {
            "Content-Type": fileType,
          },
        };
        console.log(response);



        // return response

        axios
          .put(signedRequest, file, options)
          .then(async (result) => {
              console.log(result, ' kindddd', kind, url )
              if(kind === 'song'){
                return await axios.post(`${baseURL}/addSongRT`, {  url }, resetHead())
              }
              if(kind === 'beat'){

              }
            //this.setState({ audio: url }, () => console.log(this.state.audio));
            //post url to mongoose here??  or better do it from backend index.js before sending response to here???
            alert("File uploaded");
          })
          .catch((error) => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  },
};

export default actions;
