import React, { useEffect, useState } from "react";
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

  const showPosts = () => {
    return mostLikedSongs.sort((a, b) => b - a).map((eachSong) => {
      return (
      <audio controls>
      <source src={eachSong.songURL} type='audio/mp3'/>
      </audio>
    )
    });
  };

  return (
    <div>
      <h1>Explore</h1>
      {showPosts()}
    </div>
  );
}

export default ExploreFeed;
