import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from './NavBar.js'
import actions from "../api";
import axios from "axios";
import TheContext from "../TheContext";
import mic from '../images/record2.svg'
import avatar3 from '../images/avatar3.svg'
import social from '../images/social.svg'
import follow from '../images/follow.svg'
import comment from '../images/comment.svg'
import heart2 from '../images/heart2.svg'
import explore from '../images/explore.svg'


function Profile(props) {
  const [posts, setPosts] = useState([]);

  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );

  console.log(user, userViewed)

  const [thisUser, setThisUser] = useState([userViewed]);

  useEffect(() => {
    if(props.location.profileInfo){
   setThisUser(props.location.profileInfo)
    }else{
    actions
      .getOneUser()
      .then((thisUserDbData) => {
        setThisUser(thisUserDbData.data);
      })
      .catch(console.error);
    }
  }, []);

  // const showProfileDetails = () => {
  //   return (
  //     <div className="users-details-container">
  //       <p>About {thisUser.userAbout}</p>
  //       <p>Instagram {thisUser.Instagram}</p>
  //       <p>Twitter {thisUser.userTwitter}</p>
  //       <p>SoundCloud {thisUser.userSoundCloud}</p>
  //     </div>
  //   );
  // };

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
    console.log('profile.js line 53 ', user)
    actions
      .getUserSongs(user)
      .then((usersSongs) => {
        setThisUserSongs(usersSongs.data);
      })
      .catch(console.error);
  }, []);
  
  const showLyrics = (lyrics) => {
    return lyrics.map((eachLine) => {
      return (
        <p>{eachLine}</p>
      )
    })
  }

  const showSongs = () => {
    return thisUserSongs.map((eachSong) => {
      return (
        <div className="your-track-container">
          <h4>{eachSong.songName}</h4>
          <div className="lyrics-container">
            {showLyrics(eachSong.songLyricsStr)}
          </div>
        </div>
      )
    })
  }

  return (
    <div className="Profile">
      <header className="profile-header">
        <div className="upper-filler">
          <div className="inner-filler"></div>
        </div>
        <div className="username-pic-container">
          <div className="username-pic-outset">
            <div className="profile-pic-container">
              <div className="profile-pic-outset">
                <img className="profile-pic" src={thisUser.picture}/>
              </div>
            </div>
            <div className="username-container">
              <div className="username-outset">
                <div className="username-inset">
                  <h3>User Name {thisUser.userName}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bio">
          <div className="users-details-container">
            <div className="users-details-outset">
              <div className="users-details-inset">
                <p>About {thisUser.userAbout}</p>
                <p>Instagram {thisUser.Instagram}</p>
                <p>Twitter {thisUser.userTwitter}</p>
                <p>SoundCloud {thisUser.userSoundCloud}</p>
              </div>
            </div>
          </div>
          <div className="edit-logout-container">
            <div className="edit-profile-container">
              <div className="edit-profile-outset">
                <div className="edit-profile-inset">
                  <div className="edit-profile-button">
                    edit
                  </div>
                </div>
              </div>
            </div>
            <div className="log-profile-container">
              <div className="log-profile-outset">
                <div className="log-profile-inset">
                  <div className="log-profile-button">
                    log out
                  </div>
                </div>
              </div>
            </div>
            {/* <Link to="/editProfile">
              <button>Edit profile</button>
            </Link> */}
            {/* <button onClick={logout}>Logout</button> */}
          </div>
        </div>
      </header>

      <div className="profile-post-feed">
        <div className="profile-post-inner">
          <div className="profile-post-inner-inner">
            <div className="profile-post-innerest">
              {showSongs()}
            </div>
          </div>
        </div>
      </div>

      <div className="nav-buttons nb-profile" style={{boxShadow: `${props.shadowDisplay}`}}>
        <div className="nav-list">

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <img className="button-icons bi-record" src={mic}></img>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <img className="button-icons" src={explore}></img>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <img className="button-icons" src={social}></img>
            </div>
          </div>
        </div>

        <div className="nav-buttons-rim">
          <div className="nav-buttons-outset">
            <div className="nav-buttons-inset">
              <img className="button-icons" src={avatar3}></img>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

      // {/* <h3>[database call: email]</h3>

      //       {showPosts()} */}
      //       <header className="profile-header">

      //       <div className="header-bio">
      //         {showProfileDetails()}
    
      //         {user.id === userViewed.id ? (
      //           <Link to="/editProfile">
      //             <button>Edit profile</button>
      //           </Link>
      //         ) : null}
      //         {/* <Link  to="/editProfile">
      //         <button>Edit profile</button></Link> */}
      //         {user.id && userViewed.id && user.id === userViewed.id ? (
      //           <button onClick={logout}>Logout</button>
      //         ) : null}
    
      //         <button onClick={logout}>Logout</button>
      //       </div>
      //       <div>
      //       {/* NEED TO ADD TEST TO MAKE SURE USER AND USERVIEWED ARE NOT SAME TO DETERMINE IF FOLLOW BUTTON SHOULD BE DISPLAYED */}
      //       <button onClick={followUser}>Follow This User</button>
      //       </div>
      //       <img
      //         className="profile-header-propic"
      //         // src="https://assets.capitalxtra.com/2017/47/nicki-minaj-1511527250-view-0.jpg"
      //         src={thisUser.picture}
      //         alt=""
      //       />
      //     </header>
      //     <div className="profile-post-feed">{showSongs()}</div>
    