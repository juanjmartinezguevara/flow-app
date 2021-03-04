import React from 'react';
import mic from '../images/mic.svg'
import avatar from '../images/avatar.svg'
import avatar2 from '../images/avatar2.svg'
import social from '../images/social.svg'
import social2 from '../images/social2.svg'
import comment from '../images/comment.svg'
import heart from '../images/heart.svg'

function NavBar(props) {
    return (
        <footer>
            <div className="social-buttons">
                <div className="social-list">
                    <div className="individual-btn"><img className="social-icons" src={avatar2}></img></div>
                    <div className="like-comment-container">
                        <div className="individual-btn"><img className="social-icons" src={heart}></img></div>
                        <div className="individual-btn"><img className="social-icons" src={comment}></img></div>
                    </div>
                </div>
            </div>
            <div className="nav-buttons">
                <div className="nav-list">
                    <div><img className="button-icons" src={mic}></img></div>
                    <div><img className="button-icons" src={social2}></img></div>
                    <div><img className="button-icons" src={avatar2}></img></div>
                </div>
            </div>
        </footer>
    );
}

export default NavBar;