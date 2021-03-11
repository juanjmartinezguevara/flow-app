import React, { useEffect, useState, useRef } from "react";
import TheContext from "../TheContext";
import actions from "../api";
import follow from "../images/follow.svg";
import comments from "../images/comment.svg";
import heart2 from "../images/heart2.svg";
import mic from "../images/record2.svg";
import explore from "../images/explore.svg";
import social from "../images/social.svg";
import avatar3 from "../images/avatar3.svg";
import { Link } from "react-router-dom";

function ExploreFeed(props) {
  const { songs } = React.useContext(TheContext);
  const [topSongs, setTopSongs] = useState([{ songs }]);

  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );

  const [comment, setComment] = useState();
  const [poppedUp, setPoppedUp] = useState(false);
  const windowRef = useRef();
  const popUpRef = useRef();
  const trackInfo = useRef();
  const opacityRef1 = useRef();
  const opacityRef2 = useRef();
  const opacityRef3 = useRef();

  let [page, setPage] = useState(1);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((allSongs) => {
        console.log("Showing posts from database...", allSongs);
        setTopSongs(allSongs.data);
      })
      .catch(console.error);
  }, [5]);

  const showPosts = () => {
    return topSongs
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
                // height: "75vh",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "flex-end",
                // alignItmes: "center",
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
          </div>
        );
      });
  };

  const getSocialFeed = () => {
    page === 1 ? setPage(0) : setPage(1);
    console.log("GET SOCIAL FEED SONGS FUNCTION");
  };

  const popUpComments = () => {
    if (poppedUp == false) {
      opacityRef1.current.style.opacity = 1;
      opacityRef2.current.style.opacity = 1;
      opacityRef3.current.style.opacity = 1;
      popUpRef.current.style.height = "50%";
      windowRef.current.style.bottom = "46%";
      trackInfo.current.style.bottom = "8%";
      setPoppedUp(true);
    } else {
      popUpRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";
      trackInfo.current.style.bottom = "3%";
      opacityRef1.current.style.opacity = 0;
      opacityRef2.current.style.opacity = 0;
      opacityRef3.current.style.opacity = 0;
      setPoppedUp(false);
    }
  };

  const showNavBar = () => {
    return (
      <footer
        style={{ height: `${props.height}`, flexDirection: `${props.row}` }}
      >
        <div className="social-buttons" style={{ display: `${props.display}` }}>
          <div className="social-list">
            <div className="profile-container">
              <div className="individual-btn">
                <div className="individual-profile-pic">
                  {/* stuff it in my tiny hole! (user's profile img) */}
                </div>
              </div>
            </div>
            <div className="like-comment-container">
              <div className="individual-btn">
                <img className="social-icons follow" src={follow}></img>
              </div>
              <div className="individual-btn">
                <img className="social-icons heart" src={heart2}></img>
              </div>
              <div className="individual-btn" onClick={popUpComments}>
                <img className="social-icons comment" src={comments}></img>
              </div>
            </div>
          </div>
        </div>
        <div
          className="nav-buttons"
          style={{ boxShadow: `${props.shadowDisplay}` }}
        >
          <div className="nav-list">
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {userViewed._id ? (
                    <Link to="/recordingBooth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons bi-record" src={mic}></img> */}
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
                <div onClick={getSocialFeed} className="nav-buttons-inset">
                  <img className="button-icons" src={social}></img>
                </div>
              </div>
            </div>
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {user._id ? (
                    <Link to="/profile">
                      <img className="button-icons" src={avatar3}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons" src={avatar3}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons" src={avatar3}></img> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <div className="SocialFeed">
      <div ref={windowRef} className="social-panel">
        <ul className="video-scroll-container">{showPosts()}</ul>
      </div>
      <div ref={popUpRef} className="comment-pop-out">
        <div className="inner-com">
          <div
            ref={opacityRef1}
            style={{ opacity: "0" }}
            className="com-cont-1"
          >
            <div className="input-container">
              <div className="input-inset">
                <form className="social-comment-form">
                  <input
                    className="social-comment-input"
                    type="text"
                    value=""
                    placeholder="Drop yo comment"
                  ></input>
                </form>
              </div>
            </div>
          </div>

          <div
            ref={opacityRef2}
            style={{ opacity: "0" }}
            className="com-cont-2"
          >
            <div className="comments-container">
              <div className="comment-list-container">
                <div className="comment-list">
                  <div className="comment-list-inner">
                    <p className="comment-username">@username</p>
                    <p className="comment-date">12m</p>
                    <p className="comment-text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={opacityRef3} style={{ opacity: "0" }} className="bottom-bar">
          <div className="inner-bar"></div>
        </div>
      </div>
      {showNavBar()}
      {/* <NavBar 
              comments = {popUpComments}/> */}
    </div>
  );
}

export default ExploreFeed;
