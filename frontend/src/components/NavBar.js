import React from 'react';
import mic from '../images/record2.svg'
import avatar3 from '../images/avatar3.svg'
import social from '../images/social.svg'
import follow from '../images/follow.svg'
import comment from '../images/comment.svg'
import heart2 from '../images/heart2.svg'
import explore from '../images/explore.svg'


function NavBar(props) {
    return (
        <footer style={{height: `${props.height}`, flexDirection: `${props.row}`}}>
          <div className="social-buttons" style={{display: `${props.display}`}}>
              <div className="social-list">
                  <div className="individual-btn">
                    <div className="individual-profile-pic">
                      {/* stuff it in my tiny hole! (user's profile img) */}
                    </div>
                  </div>
                  <div className="like-comment-container">
                      <div className="individual-btn"><img className="social-icons follow" src={follow}></img></div>
                      <div className="individual-btn"><img className="social-icons heart" src={heart2}></img></div>
                      <div className="individual-btn" onClick={props.comments}><img className="social-icons comment" src={comment}></img></div>
                  </div>
              </div>
          </div>

          <div className="nav-buttons" style={{boxShadow: `${props.shadowDisplay}`}}>
            <div className="nav-list">
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons bi-record" src={mic}></img>
                </div>
              </div>
            </div>
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons" src={explore}></img>
                </div>
              </div>
            </div>
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons" src={social}></img>
                </div>
              </div>
            </div>
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons" src={avatar3}></img>
                </div>
              </div>
            </div>
            </div>
          </div>
        </footer>
    );
}

export default NavBar;