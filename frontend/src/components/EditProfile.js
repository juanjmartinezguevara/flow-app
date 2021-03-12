import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { Redirect, useHistory } from "react-router";
import TheContext from "../TheContext";
import actions from "../api";

function EditProfile(props) {
  const { user } = React.useContext(TheContext);

  const [thisUser, setThisUser] = useState([user]);
  let redirectRef=useRef()

  const handleChange = (e) => {
    setThisUser({
      ...thisUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    actions
      .getOneUser()
      .then((thisUserDbData) => {
        setThisUser(thisUserDbData.data);
      })
      .catch(console.error);
  }, []);

  const submit = (e) => {
    e.preventDefault();

    actions
      .addUserProf(thisUser)
      .then((newUserUpdate) => {
        // console.log('new new user update!', newUserUpdate)
        //Redirect to all-posts page
       redirectRef.current.click()

      })
      .catch(console.error);

  };

  return (
      <div className="mid-inset profile-mi">
          <div className="login-container profile-lc">
              <div className="input-sections-container">
                <form onSubmit={submit} style={{height: '100%', width: '80%'}}>
                  <div className="input-sections">
                    UserName
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="userName" placeholder={thisUser.userName}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    First Name
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="given_name" placeholder={thisUser.given_name}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Last Name
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="family_name" placeholder={thisUser.family_name}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Email
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="email" placeholder={thisUser.email}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Bio
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="userAbout" placeholder={thisUser.userAbout}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Twitter
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="userTwitter" placeholder={thisUser.userTwitter}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Instagram
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="userInstagram" placeholder={thisUser.userInstagram}></input>
                    </div>
                  </div>
                  <div className="input-sections">
                    Soundcloud
                    <div className="user-input profile-user-i">
                      <input className="user-text profile-user-t" type="text" autoComplete='off' onChange={handleChange} name="userSoundCloud" placeholder={thisUser.userSoundCloud}></input>
                    </div>
                  </div>
                    <button type="submit" className="submit-button-edit">
                        Submit
                    </button>
                    <Link to={`/profile/${user._id}`}>
                    <p style={{display: 'none'}} ref={redirectRef}></p>
                    </Link>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default EditProfile;
