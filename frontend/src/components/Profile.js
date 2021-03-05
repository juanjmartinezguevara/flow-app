import React, { useState, useEffect } from "react";
// import actions from '../api'
import axios from "axios";
import NavBar from "./NavBar";
import TheContext from '../TheContext';

// TO USE CONTEXT DATA
// from inside a function
// const { user } = useContext(TheContext)

function Profile(props) {
  // const [myPosts, setMyPosts] = useState([])
  const [posts, setPosts] = useState([]);

  const { user } = React.useContext(TheContext)



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
      console.log(res.data.results);
      setPosts(res.data.results);
    });
  }, []);



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
          <h1>@blah</h1>
          <p>Optional profile bio goes here</p>
          <button>Edit profile</button>
        </div>
        <img
          className="profile-header-propic"
          src="https://assets.capitalxtra.com/2017/47/nicki-minaj-1511527250-view-0.jpg"
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
