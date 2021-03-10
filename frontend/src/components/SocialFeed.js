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
    const trackInfo = useRef()
    const opacityRef1 = useRef()
    const opacityRef2 = useRef()
    const opacityRef3 = useRef()

    const popUpComments = () => {
        if(poppedUp == false) {
            opacityRef1.current.style.opacity = 1 
            opacityRef2.current.style.opacity = 1 
            opacityRef3.current.style.opacity = 1 
            popUpRef.current.style.height = '50%'
            windowRef.current.style.bottom = '57%'
            trackInfo.current.style.bottom = '8%'
            setPoppedUp(true)
        }
        else {
            popUpRef.current.style.height = '0px'
            windowRef.current.style.bottom = '0'
            trackInfo.current.style.bottom = '3%'
            opacityRef1.current.style.opacity = 0 
            opacityRef2.current.style.opacity = 0 
            opacityRef3.current.style.opacity = 0 
            setPoppedUp(false)
        }
    }
    // const showSongs = () => {
    //     userInfo.map((each) => {
    //         return (
    //             <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/l3b01SFaxG0V0GqV6N/source.gif')`}}>
    //                 <div className="video-details-container">
    //                     <div className="transparent-test">
    //                         <div className="user-details-container">
    //                             <div className="user-details-inset">
    //                                 <h5><span style={{color: '#ec6aa0'}}>@Username</span> - Super Dope Track</h5>
    //                                 <h6>User stating that this is dope</h6>
    //                                 <h6>caption</h6>
    //                             </div>
    //                         </div>
    //                         <div className="user-profile-image">
    //                             <div className="user-profile-inset social-p">
    //                                <div className="nav-buttons-inset inset-social-p">
    //                                  <img className="button-icons bi-play" src={play}></img>
    //                              </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </li>
    //         )
    //     })
    // }

    return (
        <div className="SocialFeed">
            <div ref={windowRef} className="social-panel">
                <ul className="video-scroll-container">
                    {/* {showSongs} */}
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/l3b01SFaxG0V0GqV6N/source.gif')`}}>
                        <div ref={trackInfo} className="video-details-container">
                            <div className="transparent-test">
                                <div className="user-details-container">
                                    <div className="user-details-inset">
                                        <div className="text-container">
                                            <h5 className="ud-text udt-1"><span style={{color: '#ec6aa0'}}>@Usernamesernamese</span> - Super Dope Track Super Dope Track Super</h5>
                                            <h6 className="ud-text udt-2">User stating that this is dopeUser stating that this is dopeUse</h6>
                                            <h6 className="ud-text udt-3">caption</h6>
                                        </div>
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

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/s2fB8Mv2UYBPLC041d/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/2xDcfbqistol0Ox63h/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/13hSJauZ5CUJ0c/source.gif')`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/3o7btZxS1IFtwrgfQY/source.gif`}}>

                    </li>
                    <li className="video-pane" style={{backgroundImage: `url('${gradientbg}'), url('https://media.giphy.com/media/t7QSxX3Ebs2OE9cOfG/source.gif')`}}>

                    </li>
                </ul>
            </div>
            <div ref={popUpRef} className="comment-pop-out">
                <div className="inner-com">
                    <div ref={opacityRef1} style={{opacity: '0'}} className="com-cont-1">
                        <div className="input-container">
                            <div className="input-inset">
                                <form className="social-comment-form">
                                    <input
                                        className="social-comment-input" 
                                        type='text' 
                                        value='' 
                                        placeholder='Drop yo comment' 
                                        ></input>
                                </form>
                            </div>
                        </div>
                    </div>

                <div ref={opacityRef2} style={{opacity: '0'}} className="com-cont-2">
                    <div className="comments-container">
                        <div className="comment-list-container">

                            <div className="comment-list">
                                <div className="comment-list-inner">
                                    <p className="comment-username">
                                        @username
                                    </p>
                                    <p className="comment-date">12m</p>
                                    <p className="comment-text">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </p>
                                </div>
                            </div>

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