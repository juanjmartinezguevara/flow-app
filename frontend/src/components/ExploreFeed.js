import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import TheContext from "../TheContext";
import actions from "../api";

function ExploreFeed(props) {
  const { songs } = React.useContext(TheContext);
  const [mostLikedSongs, setMostLikedSongs] = useState([{ songs }]);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((allSongs) => {
        console.log("Showing posts from database...", allSongs);
        setMostLikedSongs(allSongs.data);
      })
      .catch(console.error);
  }, []);

  //   <audio controls>
  //   <source src={eachSong.songURL} type='audio/mp3'/>
  //   </audio>

  const showPosts = () => {
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
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      });
  };
  return (
    <div className="SocialFeed">
      {/* <div ref={windowRef} className="social-panel"> */}
      <div className="social-panel">
        <ul className="video-scroll-container">
          {showPosts()}
          <NavBar />
        </ul>
      </div>
    </div>
  );
}

export default ExploreFeed;
