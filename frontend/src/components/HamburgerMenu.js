import React from 'react';
import TheContext from '../TheContext';
const { user } = React.useContext(TheContext)

function HamburgerMenu(props) {

    <div className="hamburger-button" onClick={navDisplayCheck}>
    <div></div>
    <div></div>
    <div></div>
  </div>
    return (
        <nav className="navigation">
        <div id="menu">
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
              <Link to="/recordingBooth" onClick={hideNavBar}>Recording Booth</Link>
              </div>
            </div>
          </div>
          <div className="menu-route mr-7">
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
          </div>
        </div>
    </nav>
    );
}

export default HamburgerMenu;