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
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      document.querySelector('.menu').style.opacity = '0'
      setNavDisplayed(false)
    }
    else {
      document.querySelector('nav').style.height = "325px"
      document.querySelector('nav').style.transition = "height .5s"
      document.querySelector('nav').style.animation = "massiveMenuAnimation 1s .5s linear forwards"
      document.querySelector('.menu').style.opacity = '1'
      setNavDisplayed(true)
    }
  }
  const hideNavBar = () => {
    if (navDisplayed == true) {
      document.querySelector('nav').style.height = "0px"
      document.querySelector('nav').style.animation = 'none'
      document.querySelector('.menu').style.opacity = '0'
      setNavDisplayed(false)
    }    
  }
  return (
    <TheContext.Provider value={{user}}>
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
            {/* <div className="menu-route mr-7">
              <div className="menu-outset mo-7">
                <div className="menu-inset mi-7">
                <Link to="/comments" onClick={hideNavBar}>TEMP Comments</Link>
                </div>
              </div>
            </div>
            <div className="menu-route mr-8">
              <div className="menu-outset mo-8">
                <div className="menu-inset mi-8">
                <Link to="/likes" onClick={hideNavBar}>TEMP Likes</Link>
                </div>
              </div>
            </div> */}
          </div>
      </nav>
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
