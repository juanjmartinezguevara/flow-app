import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import NavBar from './NavBar.js'
import gradientbg from '../images/gradient-bg-2.png'
import play from '../images/play.svg'
import TheContext from "../TheContext";
import actions from "../api";
import mic from '../images/record2.svg'
import avatar3 from '../images/avatar3.svg'
import social from '../images/social.svg'
import follow from '../images/follow.svg'
import comment from '../images/comment.svg'
import heart2 from '../images/heart2.svg'
import explore from '../images/explore.svg'

function SocialFeed(props) {

    const { user, setUser, userViewed, setUserViewed } = React.useContext(
        TheContext
      );

    axios.get()

    const [comment, setComment] = useState()
    const [poppedUp, setPoppedUp] = useState(false)
    const windowRef = useRef()
    const popUpRef = useRef()
    const opacityRef1 = useRef()
    const opacityRef2 = useRef()
    const opacityRef3 = useRef()

    const popUpComments = () => {
        if(poppedUp == false) {
            opacityRef1.current.style.opacity = 1 
            opacityRef2.current.style.opacity = 1 
            opacityRef3.current.style.opacity = 1 
            windowRef.current.style.bottom = '60%'
            popUpRef.current.style.height = '50%'
            setPoppedUp(true)
        }
        else {
            windowRef.current.style.bottom = '0'
            popUpRef.current.style.height = '0px'
            opacityRef1.current.style.opacity = 0 
            opacityRef2.current.style.opacity = 0 
            opacityRef3.current.style.opacity = 0 
            setPoppedUp(false)
        }
    }

    const [thisFeedSongs, setThisFeedSongs] = useState([]);
    let [page, setPage] = useState(1);


    //TEMPORARY CODE TO SHOW ALL SONGS JUST TO GET SOME LIKES ADDED
    useEffect(() => {
        actions
          .getUserSongs(user)
          .then((usersSongs) => {
            setThisFeedSongs(usersSongs.data);
          })
          .catch(console.error);
      }, [page]);

      console.log('thisFeedSongs', thisFeedSongs)

    //   const showSongs = () => {
    //       return(

    //       )
    //   }

// REAL CODE TO REPLACE TEMPORARY GET ALL SONGS CODE ABOVE HERE
    // useEffect(() => {
    //   actions
    //     .getUserLikedSongs(user)
    //     .then((usersSongs) => {
    //       setThisFeedSongs(usersSongs.data);
    //     })
    //     .catch(console.error);
    // }, [page]);

    const getSocialFeed = () => {
        page === 1 ? setPage(0) : setPage(1)
        console.log('GET SOCIAL FEED SONGS FUNCTION')
    }

    const showNavBar = () => {
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
                          <div className="individual-btn" onClick={popUpComments}><img className="social-icons comment" src={comment}></img></div>
                      </div>
                  </div>
              </div>
              <div className="nav-buttons" style={{boxShadow: `${props.shadowDisplay}`}}>
                <div className="nav-list">
                  <div className="nav-buttons-outset">
                    <div className="nav-buttons-inset">
                    { userViewed._id ? (<Link to="/recordingBooth">
                                        <img className="button-icons bi-record" src={mic}></img>
                                    </Link>) : (<Link to="/auth">
                                        <img className="button-icons bi-record" src={mic}></img>
                                    </Link>) }
                      {/* <img className="button-icons bi-record" src={mic}></img> */}
                    </div>
                  </div>
                  <div className="nav-buttons-outset">
                    <div className="nav-buttons-inset">
                      <img className="button-icons" src={explore}></img>
                    </div>
                  </div>
                  <div className="nav-buttons-outset">
                    <div onClick={getSocialFeed} className="nav-buttons-inset">
                      <img className="button-icons" src={social}></img>
                    </div>
                  </div>
                  <div className="nav-buttons-outset">
                    <div className="nav-buttons-inset">
                    { user._id ? (<Link to="/profile">
                                        <img className="button-icons" src={avatar3}></img>
                                    </Link>) : (<Link to="/auth">
                                        <img className="button-icons" src={avatar3}></img>
                                    </Link>)}
                      {/* <img className="button-icons" src={avatar3}></img> */}
                    </div>
                  </div>
                </div>
              </div>
            </footer>
        );
    }

    return (
        <div className="SocialFeed">
            <div ref={windowRef} className="social-panel">
                <ul className="video-scroll-container">
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/l3b01SFaxG0V0GqV6N/source.gif')`}}
>
                        <div className="video-details-container">
                            <div className="transparent-test">
                                <div className="user-details-container">
                                    <div className="user-details-inset">
                                        <h5><span style={{color: '#ec6aa0'}}>@Username</span> - Super Dope Track</h5>
                                        <h6>User stating that this is dope</h6>
                                        <h6>caption</h6>
                                    </div>
                                </div>
                                <div className="user-profile-image">
                                    <div className="user-profile-inset social-p">
                                       <div className="nav-buttons-inset inset-social-p">
                                         <img className="button-icons bi-play" src={play}></img>
                                     </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/RLQaZ8LeuqrTx0Eeat/source.gif')`}}>
                    {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/s2fB8Mv2UYBPLC041d/source.gif')`}}>
                        {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/2xDcfbqistol0Ox63h/source.gif')`}}>
                        {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/13hSJauZ5CUJ0c/source.gif')`}}>
                        {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/3o7btZxS1IFtwrgfQY/source.gif`}}>
                        {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/t7QSxX3Ebs2OE9cOfG/source.gif')`}}>
                        {/* <div className="video-details-container">
                            <div className="transparent-test">
                                
                            </div>
                        </div> */}
                    </li>
                </ul>
            </div>
            <div ref={popUpRef} className="comment-pop-out">
                <div className="inner-com">

                <div ref={opacityRef1} style={{opacity: '0'}} className="com-cont-1">
                    <div className="input-container">
                        <div className="input-inset">
                            <form>
                                <input type='text' 
                                    value='' 
                                    placeholder='Drop yo comment' 
                                    onChange={(e) => {setComment(e.target.value)}}></input>
                            </form>
                        </div>
                    </div>
                </div>

                <div ref={opacityRef2} style={{opacity: '0'}} className="com-cont-2">
                    <div className="comments-container">
                    <div className="comment-list cl-1">
                    </div>
                    <div className="comment-list cl-2">
                    </div>
                    <div className="comment-list cl-3">
                    </div>
                    </div>
                </div>
                </div>
            
                <div ref={opacityRef3} style={{opacity: '0'}} className="bottom-bar">
                    <div className="inner-bar"></div>
                </div>
          </div>
          {showNavBar()}
            {/* <NavBar 
                comments = {popUpComments}/> */}
        </div>
    );
}

export default SocialFeed;