import React, {useRef,useState,useEffect} from 'react';
import check from '../images/checkMark.jpeg'
//

function Notification(props) {
    const [content,setContent] = useState()
    const popUp=useRef()
    const popUpLike=useRef()

    const notiFollow=()=>{
        setContent(
            (<div>Followed</div>)
        )
    }

    const notiUnfollow=()=>{
        setContent(
            (<div>Unfollowed</div>)
        )
    }

    const notiLike=()=>{
        setContent(
            (<div>Liked</div>)
        )
    }

    const notiUnlike=()=>{
        setContent(
            (<div>Unliked</div>)
        )
    }
    const notify=()=>{
        popUp.current.style.animation='notify 2s ease 0s 1 normal'

    }
    const notifyLike=()=>{
        popUpLike.current.style.animation='notify 2s ease 0s 1 normal'

    }
    useEffect(()=>{
        popUp.current.style.animation='none';
        popUpLike.current.style.animation='none';

    })


    //when api succesfully posts or fails call notify

    return (
        <div>
        <div ref={popUp} className='notification'>
            <div className="notification-inset">
                <div className="notification-outset">
                    <p>followed</p>
                </div>
            </div>
        </div>
        <div ref={popUpLike} className='notification'>
            <div className="notification-inset">
                <div className="notification-outset">
                    <p>Liked</p>
                </div>
            </div>
        </div>
        <button style={{display: 'none'}} id='unfollowN' onClick={notiUnfollow}>Unfollow</button>
        <button style={{display: 'none'}} id='followN' onClick={notiFollow}>Follow</button>
        <button style={{display: 'none'}} id='likeN' onClick={notiLike}>Like</button>
        <button style={{display: 'none'}} id='unlikeN' onClick={notiUnlike}>Unlike</button>
        <button style={{display: 'none'}} id='notify' onClick={notify}>notify</button>
        <button style={{display: 'none'}} id='notifyLike' onClick={notifyLike}>notify</button>
        </div>
    );
}

export default Notification;