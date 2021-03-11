import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import TheContext from "../TheContext";
import actions from "../api";
import follow from "../images/follow.svg";
import comment from "../images/comment.svg";
import heart2 from "../images/heart2.svg";
import mic from '../images/record2.svg'
import explore from '../images/explore.svg'
import social from '../images/social.svg'
import avatar3 from '../images/avatar3.svg'

function ExploreFeed(props) {
  const { songs } = React.useContext(TheContext);
  const [top10Songs, setTop10Songs] = useState([{ songs }]);
  const [otherTopSongs, setOtherTopSongs] = useState([{ songs }]);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((allSongs) => {
        console.log("Showing posts from database...", allSongs);
        setTop10Songs(allSongs.data);
      })
      .catch(console.error);
  }, [5]);

  //   <audio controls>
  //   <source src={eachSong.songURL} type='audio/mp3'/>
  //   </audio>

  //   <audio controls>
  //   <source src={eachSong.songURL} type='audio/mp3'/>
  //   </audio>

  const showPosts = () => {
<<<<<<< HEAD
    //   let videoPane = document.querySelector(".video-pane")
    return top10Songs
      .splice(0, 10)
      .sort((a, b) => b.songDate - a.songDate)
      .map((eachSong) => {
        console.log(eachSong._id, eachSong);
        return (
          <div>
            <li
              className="video-pane"
              style={{
                backgroundColor: `rgba(${Math.random() * 255},${
                  Math.random() * 255
                },${Math.random() * 255},1.0)`,
              }}
            >
              <div
                className="video-details-container"
                style={{ position: "relative" }}
              >
                <div className="transparent-test">
                  <div className="user-details-container">
                    <div className="user-details-inset">
                      <h5 className="ud-text udt-1">
                        <span style={{ color: "#ec6aa0" }}>
                          @USERNAME {eachSong.userName}
                        </span>
                      </h5>
                      <h6 className="ud-text udt-2">
                        SONG TITLE MAYBE GOES HERE? {eachSong.songName}
                      </h6>
                      <h6 className="ud-text udt-3">
                        CAPTION GOES HERE {eachSong.songCaption}
                      </h6>
                    </div>
                  </div>
                  <div className="user-profile-image">
                    <div className="user-profile-inset social-p">
                      <div className="nav-buttons-inset inset-social-p">
                        <img className="button-icons bi-play" alt=""></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <div
              className="social-buttons"
              style={{ display: `${props.display}` }}
            >
              <div className="social-list">
                <div className="individual-btn">
                  <div className="individual-profile-pic">
                    {/* stuff it in my tiny hole! (user's profile img) */}
                  </div>
                </div>
                <div className="like-comment-container">
                  <div className="individual-btn">
                    <img className="social-icons follow" src={follow}></img>
                  </div>
                  <div className="individual-btn">
                    <img className="social-icons heart" src={heart2}></img>
                  </div>
                  <div className="individual-btn" onClick={props.comments}>
                    <img className="social-icons comment" src={comment}></img>
=======
    return mostLikedSongs
      .splice(0, 10)
      .sort((a, b) => b - a)
      .map((eachSong) => {
        console.log(eachSong._id);
        return (
          <li
            className="video-pane"
            style={{
              backgroundColor: `rgba(${Math.random() * 255},${
                Math.random() * 255
              },${Math.random() * 255},1.0)`,
            }}
          >
            <div
              className="video-details-container"
              style={{ position: "relative" }}
            >
              <div className="transparent-test">
                <div className="user-details-container">
                  <div className="user-details-inset">
                    <h5>
                      <span style={{ color: "#ec6aa0", fontSize: "10px" }}>
                        {eachSong._id}
                      </span>
                    </h5>
                    {/* <h6>User stating that this is dope</h6> */}
                    <h6>Caption</h6>
                  </div>
                </div>
                <div className="user-profile-image">
                  <div className="user-profile-inset social-p">
                    <div className="nav-buttons-inset inset-social-p">
                      <img className="button-icons bi-play" alt=""></img>
                    </div>
>>>>>>> 503204b7a1c598eb0971cf27c16a8998c13dcd0d
                  </div>
                </div>
              </div>
            </div>
<<<<<<< HEAD
          </div>
=======
          </li>
>>>>>>> 503204b7a1c598eb0971cf27c16a8998c13dcd0d
        );
      });
  };
  return (
    <div className="SocialFeed">
      {/* <div ref={windowRef} className="social-panel"> */}
      <div className="social-panel">
<<<<<<< HEAD
        <ul className="video-scroll-container">{showPosts()}</ul>
        <div
          className="nav-buttons"
          style={{ boxShadow: `${props.shadowDisplay}` }}
        >
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
=======
        <ul className="video-scroll-container">
          {showPosts()}
          <NavBar />
        </ul>
>>>>>>> 503204b7a1c598eb0971cf27c16a8998c13dcd0d
      </div>
    </div>
  );
}

export default ExploreFeed;
