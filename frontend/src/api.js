import axios from 'axios'

const baseURL = `http://localhost:5000/api`
const token = localStorage.getItem('token')

const API = axios.create({ baseURL, headers: { Authorization: `Bearer ${token}` } });

let resetHead = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}


const actions = {

    getUser: async () => {
        //This will go get our user every time we refresh 
        return await axios.get(`${baseURL}/user`, resetHead())
    },

    getAllBeats: async () => {
        return await axios.get(`${baseURL}/getAllBeatsRT`, resetHead())
    },

    getBeat: async () => {
        return await axios.get(`${baseURL}/getBeatRT`, resetHead())
    },

    getUserSongs: async () => {
        return await axios.get(`${baseURL}/getUserSongsRT`, resetHead())
    },

    getSong: async () => {
        return await axios.get(`${baseURL}/getSongRT`, resetHead())
    },

    getUserLikedSongs: async () => {
        return await axios.get(`${baseURL}/getUserLikedSongsRT`, resetHead())
    },

    getMostLikedSongs: async () => {
        return await axios.get(`${baseURL}/getMostLikedSongsRT`, resetHead())
    },

    addLike: async () => {
        return await axios.get(`${baseURL}/addLikeRT`, resetHead())
    },

    addSong: async () => {
        return await axios.get(`${baseURL}/addSongRT`, resetHead())
    },

    addSongBG: async () => {
        return await axios.get(`${baseURL}/addSongBGRT`, resetHead())
    },

    getOneUser: async () => {
        return await axios.get(`${baseURL}/getOneUserRT`, resetHead())
    },

    addUserProf: async () => {
        return await axios.get(`${baseURL}/addUserProfRT`, resetHead())
    },

    addUserPhoto: async () => {
        return await axios.get(`${baseURL}/addUserPhotoRT`, resetHead())
    },

    getUsersFollowed: async () => {
        return await axios.get(`${baseURL}/getUsersFollowedRT`, resetHead())
    },

    getComments: async () => {
        return await axios.get(`${baseURL}/getCommentsRT`, resetHead())
    },

    addComment: async () => {
        return await axios.get(`${baseURL}/addCommentRT`, resetHead())
    },

    getUserComments: async () => {
        return await axios.get(`${baseURL}/getUserCommentsRT`, resetHead())
    },

    getMostFollowed: async () => {
        return await axios.get(`${baseURL}/getMostFollowedRT`, resetHead())
    },

    getMyPosts: async () => {
        return await axios.get(`${baseURL}/myPosts`, resetHead())
    },
    getAllPosts: async () => {
        return await axios.get(`${baseURL}/allPosts`, resetHead())
    },
    addPost: async (post) => {
        console.log('are we there yet')
        return await axios.post(`${baseURL}/addAPost`, { post }, resetHead())
    },
    logIn: async (data) => {

        localStorage.setItem('googleTokenId', data.tokenId)

        let headerObj = resetHead()
        headerObj.headers['X-Google-Token'] = data.tokenId

        let resFromOurDB = await axios.post(`${baseURL}/logMeIn`, data, headerObj)

        console.log(resFromOurDB)

        window.localStorage.setItem('token', resFromOurDB?.data?.token)



        return resFromOurDB
    }



}

export default actions