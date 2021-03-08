import React, { useState, useEffect } from "react";
// import actions from '../api'
import axios from "axios";
import NavBar from "./NavBar";
import TheContext from '../TheContext';
import actions from "../api";
import { Link } from 'react-router-dom'


function Profile(props) {

  const [posts, setPosts] = useState([]);

  const { user, setUser, userViewed, setUserViewed } = React.useContext(TheContext)

  const [thisUser, setThisUser] = useState([userViewed]);

  useEffect(() => {
    actions
      .getOneUser()
      .then((thisUserDbData) => {
        setThisUser(thisUserDbData.data);
      })
      .catch(console.error);
  }, []);

  const showProfileDetails = () => {
    return (
      <div>

      <h1>User Name {thisUser.userName}</h1>
      <p>About {thisUser.userAbout}</p>
      <p>Instagram {thisUser.Instagram}</p>
      <p>Twitter {thisUser.userTwitter}</p>
      <p>SoundCloud {thisUser.userSoundCloud}</p>
      </div>
    )
  }

  // useEffect(() => {
  //     console.log(props)
  //     if (!props.user.email) {
  //         props.history.push('/')
  //     }
  //     actions.getMyPosts().then(res => setMyPosts(res.data))
  // }, [])

  // const showPosts = () => {
  //     return myPosts.map(post => {
  //         return (
  //             <li key={post._id}>{post.post}</li>
  //         )
  //     })
  // }

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setPosts(res.data.results);
    });
  }, []);

const logout = () => {
  setUser({})
  setThisUser({})
  setUserViewed({})
  localStorage.clear()
}

  const showPosts = () => {
    return posts.map((eachPost) => {

      return <img className="profile-post" src={eachPost.image} alt="" />;
    });
  };

  return (
    <div>
      {/* <h3>[database call: email]</h3>

            {showPosts()} */}
      <header className="profile-header">
        <div className='header-bio'>
        {showProfileDetails()}
          <h1>@blah</h1>
          <p>Optional profile bio goes here</p>
          { user.id === userViewed.id ? (<Link  to="/editProfile">
          <button>Edit profile</button></Link>) : (null)}
          {/* <Link  to="/editProfile">
          <button>Edit profile</button></Link> */}

            { user.id && userViewed.id && user.id === userViewed.id ? (<button onClick={logout}>Logout</button>) : (null) }

          <button onClick={logout}>Logout</button>
        </div>
        <img
          className="profile-header-propic"
          // src="https://assets.capitalxtra.com/2017/47/nicki-minaj-1511527250-view-0.jpg"
          src={thisUser.picture}
          alt=""
        />
      </header>
      <div className='profile-post-feed'>
        {showPosts()}
      </div>
      {/* <NavBar/> */}
    </div>
  );
}

export default Profile;
