import React, {useRef,useState,useEffect} from 'react';

//

function Notification(props) {
    const [content,setContent] = useState('test')
    const popUp=useRef()

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

    useEffect(()=>{
        popUp.current.style.animation='none';
    })


    //when api succesfully posts or fails call notify

    return (
        <div>
        <div ref={popUp} className='notification'>
            {content}
        </div>
        <button onClick={notiUnfollow}>Unfollow</button>
        <button onClick={notiFollow}>Follow</button>
        <button onClick={notiLike}>Like</button>
        <button onClick={notiUnlike}>Unlike</button>
        <button onClick={notify}>notify</button>
        </div>
    );
}

export default Notification;