import React, { useEffect, useState } from "react";
import TheContext from "../TheContext";
import actions from "../api";

function ExploreFeed(props) {
//   const { user } = React.useContext(TheContext);
  const { post } = React.useContext(TheContext);

//   const [thisUser, setThisUser] = useState([user]);
  const [posts, setPosts] = useState(post);

  useEffect(() => {
    actions
      .getAllPosts()
      .then((allPosts) => {
        console.log("Showing posts from database...", allPosts);
        setPosts(allPosts.data);
      })
      .catch(console.error);
  }, []);

  const showPosts = () => {
      return posts.map(eachPost => {
          return (
            <div>
                CAPTION: {eachPost.post}
            </div>
          )
      })
  }

  return (
    <div>
        <h1>Explore</h1>
        {showPosts()}
    </div>
  )
}

export default ExploreFeed;
