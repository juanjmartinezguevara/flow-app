import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TheContext from "../TheContext";
import actions from "../api";

function ExploreFeed(props) {
  const { songs } = React.useContext(TheContext);
  const [songz, setSongz] = useState([{ songs }]);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((allSongs) => {
        console.log("Showing posts from database...", allSongs);
        setSongz(allSongs.data);
      })
      .catch(console.error);
  }, []);

  const showPosts = () => {
    return songz.map((eachSong) => {
      return <div>SongURL: {eachSong.songURL}</div>;
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
