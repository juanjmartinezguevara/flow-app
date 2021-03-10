import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js'
import gradientbg from '../images/gradient-bg-2.png'
import play from '../images/play.svg'

function SocialFeed(props) {
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
            <NavBar 
                comments = {popUpComments}/>
        </div>
    );
}

export default SocialFeed;