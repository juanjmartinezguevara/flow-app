import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import NavBar from './NavBar.js'

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