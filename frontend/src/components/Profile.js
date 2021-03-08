import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
// import actions from '../api'
// import axios from "axios";
import TheContext from '../TheContext';
import actions from "../api";

function Profile(props) {
  // const [myPosts, setMyPosts] = useState([])
  // const [posts, setPosts] = useState([]);

  const { user } = React.useContext(TheContext);
  console.log("USER DATA FROM CONTEXT", user);

  const { user } = React.useContext(TheContext);

  const [thisUser, setThisUser] = useState([user]);

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

  // useEffect(() => {
  //   axios.get("https://rickandmortyapi.com/api/character").then((res) => {
  //     console.log(res.data.results);
  //     setPosts(res.data.results);
  //   });
  // }, []);

  const showPosts = () => {
    return thisUser.map((eachPost) => {
      return <img className="profile-post" src={eachPost.image} alt="" />;
    });
  };

  return (
    <div>
      {/* <h3>[database call: email]</h3>

            {showPosts()} */}
      <header className="profile-header">
        <div className='header-bio'>
          <h1>{thisUser.userName}</h1>
          <p>{thisUser.userAbout}</p>
          <Link to='/editprofile'>Edit Profile</Link>
        </div>
        <img
          className="profile-header-propic"
          src={thisUser.picture}
          alt=""
        />
      </header>
      <div className='profile-post-feed'>
        {/* {showPosts()} */}
      </div>
      {/* <NavBar/> */}
    </div>
  );
}

export default Profile;
