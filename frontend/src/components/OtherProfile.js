import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import actions from "../api";
import axios from "axios";
import TheContext from "../TheContext";

function Profile(props) {
  const [posts, setPosts] = useState([]);

  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );

  const [thisUser, setThisUser] = useState(props.location.profileInfo);
  
    console.log(props)
    
  useEffect(() => {
    
   
   
          setThisUser(props.location.profileInfo)
      
     
   
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
    );
  };

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setPosts(res.data.results);
    });
  }, []);

  const logout = () => {
    setUser({});
    setThisUser({});
    setUserViewed({});
    localStorage.clear();
  };

  const [thisUserSongs, setThisUserSongs] = useState([]);

  useEffect(() => {
    console.log("profile.js line 53 ", user);
    actions
      .getUserSongs(user)
      .then((usersSongs) => {
        setThisUserSongs(usersSongs.data);
      })
      .catch(console.error);
  }, []);

  const showSongs = () => {
    return thisUserSongs.map((eachSong) => {
      return (
        <div>
          <h1>Song Name: {eachSong.songName}</h1>
          <p>Song Lyrics: {eachSong.songLyricsStr}</p>
        </div>
      );
    });
  };

  const followUser = () => {
    console.log(user, userViewed);
    const followData = { user1: user.id, user2: userViewed.id };
    console.log("profile follow user function ", followData);
    actions
      .addFollow(followData)
      .then((somethingreturnedfromapi) => {
        alert("Follow Saved");
      })
      .catch(console.error);
  };

  return (
    <div>
      {/* <h3>[database call: email]</h3>

            {showPosts()} */}
      <header className="profile-header">
        <div className="header-bio">
          {showProfileDetails()}

          {user.id === userViewed.id ? (
            <Link to="/editProfile">
              <button>Edit profile</button>
            </Link>
          ) : null}
          {/* <Link  to="/editProfile">
          <button>Edit profile</button></Link> */}

          {user.id && userViewed.id && user.id === userViewed.id ? (
            <button onClick={logout}>Logout</button>
          ) : null}

          <button onClick={logout}>Logout</button>
        </div>
        <div>
          {/* NEED TO ADD TEST TO MAKE SURE USER AND USERVIEWED ARE NOT SAME TO DETERMINE IF FOLLOW BUTTON SHOULD BE DISPLAYED */}
          <button onClick={followUser}>Follow This User</button>
        </div>
        <img
          className="profile-header-propic"
          // src="https://assets.capitalxtra.com/2017/47/nicki-minaj-1511527250-view-0.jpg"
          src={thisUser.picture}
          alt=""
        />
      </header>
      <div className="profile-post-feed">{showSongs()}</div>
      {/* <NavBar/> */}
    </div>
  );
}

export default Profile;
