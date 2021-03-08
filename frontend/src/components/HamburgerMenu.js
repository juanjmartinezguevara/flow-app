import React from 'react';
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import '../App.css';
import '../otherstyles.css';
import Home from './Home'
import AddPost from './AddPost'
import AllPosts from './AllPosts'
import Auth from './Auth'
import Profile from './Profile'
import TempHome from './TempHome'
import SocialFeed from './SocialFeed'
import TestAudio from './TestAudio'
import Comments from './Comments'
import Likes from './Likes'
import UploadFile from './UploadFile'
import EditProfile from './EditProfile'

function HamburgerMenu(props) {
  const [navDisplayed, setNavDisplayed] = useState(false)

  const navDisplayCheck = () => {
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      // document.querySelector('.menu').style.opacity = '0'
      setNavDisplayed(false)
    }
    else {
      document.querySelector('nav').style.height = "325px"
      document.querySelector('nav').style.transition = "height .5s"
      document.querySelector('nav').style.animation = "massiveMenu .8s linear forwards"
      // document.querySelector('.menu').style.opacity = '1'
      setNavDisplayed(true)
    }
  }
  const hideNavBar = () => {
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      // document.querySelector('.menu').style.opacity = '0'
      setNavDisplayed(false)
    }    
  }
    return (
      <nav className="navigation">
          <div className="hamburger-button" onClick={navDisplayCheck}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="menu">
            <div className="menu-route mr-1">
              <div className="menu-outset mo-1">
                <div className="menu-inset mi-1">
                  <Link to="/" onClick={hideNavBar}>Home</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-2">
              <div className="menu-outset mo-2">
                <div className="menu-inset mi-2">
                <Link to="all-posts" onClick={hideNavBar}>All Posts</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-3">
              <div className="menu-outset mo-3">
                <div className="menu-inset mi-3">
                <Link to="add-posts" onClick={hideNavBar}>Add Post</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-4">
              <div className="menu-outset mo-4">
                <div className="menu-inset mi-4">
                <Link to="/auth" onClick={hideNavBar}>Log in</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-5">
              <div className="menu-outset mo-5">
                <div className="menu-inset mi-5">
                <Link to="/profile" onClick={hideNavBar}>Profile</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-6">
              <div className="menu-outset mo-6">
                <div className="menu-inset mi-6">
                <Link to="/recordingBooth" onClick={hideNavBar}>Record</Link>
                </div>
              </div>
            </div>
          </div>
      </nav>
    );
}

export default HamburgerMenu;