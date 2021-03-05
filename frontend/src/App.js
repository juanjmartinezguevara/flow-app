import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
import './otherstyles.css';
import Home from './components/Home'
import AddPost from './components/AddPost'
import AllPosts from './components/AllPosts'
import Auth from './components/Auth'
import Profile from './components/Profile'
import TempHome from './components/TempHome'
import actions from './api'
import { Switch, Route, Link } from 'react-router-dom'
import TestAudio from './components/TestAudio'
import Comments from './components/Comments'
import Likes from './components/Likes'
import UploadFile from './components/UploadFile'
import EditProfile from './components/EditProfile'
import TheContext from './TheContext'

function App() {
  const [navDisplayed, setNavDisplayed] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    actions.getUser().then(res => {
      setUser(res.data)
    }).catch(console.error)
  }, [])

  const navDisplayCheck = () => {
    console.log("ok")
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = '0'
      document.querySelector('#menu').style.opacity = '0'
      setNavDisplayed(false)
    }
    else {
      document.querySelector('nav').style.height = '40vh'
      document.querySelector('#menu').style.opacity = '1'
      setNavDisplayed(true)
    }
  }
  const hideNavBar = () => {
    document.querySelector('nav').style.height = '0'
    document.querySelector('#menu').style.opacity = '0'
    setNavDisplayed(false)
  }
  return (
    <TheContext.Provider value={{user}}>
    <div className="App">
      {/* <h4>{user.email}</h4> */}
      {/* <nav className="navigation">
          <ul id="menu">
              <Link to="/" onClick={hideNavBar}><li>Home</li></Link>
              <Link to="all-posts" onClick={hideNavBar}><li>All Posts</li></Link>
              <Link to="add-posts" onClick={hideNavBar}><li>Add Post</li></Link>
              <Link to="/auth" onClick={hideNavBar}><li>Log in</li></Link>
              <Link to="/profile" onClick={hideNavBar}><li>Profile</li></Link>
              <Link to="/recordingBooth" onClick={hideNavBar}><li>Recording Booth</li></Link>
              <Link to="/comments" onClick={hideNavBar}><li>TEMP Comments</li></Link>
              <Link to="/likes" onClick={hideNavBar}><li>TEMP Likes</li></Link>
          </ul>
      </nav> */}
      <div className="hamburger-button" onClick={navDisplayCheck}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/all-posts" render={(props) => <AllPosts {...props} />} />
        <Route exact path="/add-posts" render={(props) => <AddPost {...props} />} />
        <Route exact path="/auth" render={(props) => <Auth setUser={setUser} {...props} />} />
        {/* <Route exact path="/auth" render={(props) => <Auth {...props} />} /> */}
        <Route exact path="/profile" render={(props) => <Profile user={user} {...props} />} />
        {/* <Route exact path="/profile" render={(props) => <Profile {...props} />} /> */}
        <Route exact path="/recordingBooth" render={(props) => <TestAudio {...props} />} />
        <Route exact path="/tempHome" render={(props) => <TempHome {...props} />} />
        <Route exact path="/comments" render={(props) => <Comments {...props} />} />
        <Route exact path="/likes" render={(props) => <Likes {...props} />} />
        <Route exact path="/uploadFile" render={(props) => <UploadFile {...props} />} />
        <Route exact path="/editprofile" render={(props) => <EditProfile {...props} />} />
      </Switch>
    </div>
    </TheContext.Provider>
  );
}

export default App;
