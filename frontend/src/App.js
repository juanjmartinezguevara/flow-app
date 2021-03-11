import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './App.css'
import './otherstyles.css'
import actions from './api'
import Home from './components/Home'
import AddPost from './components/AddPost'
import AllPosts from './components/AllPosts'
import Auth from './components/Auth'
import Profile from './components/Profile'
import SocialFeed from './components/SocialFeed'
import TestAudio from './components/TestAudio'
import Comments from './components/Comments'
import Likes from './components/Likes'
import UploadFile from './components/UploadFile'
import EditProfileScreen from './components/EditProfileScreen'
import EditProfile from './components/EditProfile'
import TheContext from './TheContext'
import ExploreFeed from './components/ExploreFeed'
import Notification from './components/Notification'
import OtherProfile from './components/OtherProfile'

function App() {
  const [navDisplayed, setNavDisplayed] = useState(false)
  const [user, setUser] = useState({})
  const [userViewed, setUserViewed] = useState({})

  useEffect(() => {
    actions.getUser().then(res => {
      setUser(res.data)
    }).catch(console.error)
  }, [])

  //console.log('app.js user', user)

  const fixProfile =()=>{
    hideNavBar()
  }

  const navDisplayCheck = () => {
    //console.log("ok")
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      setNavDisplayed(false)
    }
    else {
      document.querySelector('nav').style.height = "325px"
      document.querySelector('nav').style.transition = "height .5s"
      document.querySelector('nav').style.animation = "massiveMenu .8s linear forwards"
      setNavDisplayed(true)
    }
  }
  const hideNavBar = () => {
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      setNavDisplayed(false)
    }    
  }
  return (
    <TheContext.Provider value={{user, setUser, userViewed, setUserViewed}}>
    <div className="App">
      {/* <h4>{user.email}</h4> */}
      <nav className="navigation">
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
                <Link to="/social-feed" onClick={hideNavBar}>Social</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-3">
              <div className="menu-outset mo-3">
                <div className="menu-inset mi-3">
                <Link to="/editprofile-screen" onClick={hideNavBar}>Edit Profile</Link>
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
                {user._id ? (<Link to={`/profile/${user._id}`} onClick={fixProfile}>Profile</Link>) : (<Link to="/auth" onClick={hideNavBar}>Profile</Link>) }
                {/* <Link to="/profile" onClick={hideNavBar}>Profile</Link> */}
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
      <div className="hamburger-button" onClick={navDisplayCheck}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <Notification/> */}
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/all-posts" render={(props) => <AllPosts {...props} />} />
        <Route exact path="/add-posts" render={(props) => <AddPost {...props} />} />
        <Route exact path="/auth" render={(props) => <Auth setUser={setUser} {...props} />} />
        <Route exact path="/profile/:id" render={(props) => <Profile user={user} {...props} />} />
        <Route exact path="/profile" render={(props) => <Profile user={user} {...props} />} />
        <Route exact path="/recordingBooth" render={(props) => <TestAudio {...props} />} />
        <Route exact path="/comments" render={(props) => <Comments {...props} />} />
        <Route exact path="/likes" render={(props) => <Likes {...props} />} />
        <Route exact path="/uploadFile" render={(props) => <UploadFile {...props} kind='song' />} />
        <Route exact path="/uploadProfilePic" render={(props) => <UploadFile {...props} kind='profilePic' />} />
        <Route exact path="/uploadBeatTrack" render={(props) => <UploadFile {...props} kind='beatTrack' />} />
        <Route exact path="/editprofile-screen" render={(props) => <EditProfileScreen {...props} />} />
        <Route exact path="/editprofile" render={(props) => <EditProfile {...props} />} />
        <Route exact path="/social-feed" render={(props) => <SocialFeed {...props} />} />
        <Route exact path="/explore-feed" render={(props) => <ExploreFeed {...props} />} />
        <Route exact path="/profile/other/:id" render={(props) => <OtherProfile {...props} />} />
      </Switch>
    </div>
    </TheContext.Provider>
  );
}

export default App;
