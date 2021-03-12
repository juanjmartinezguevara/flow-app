import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gradientbg from "../images/gradient-bg-2.png";
import play from "../images/play.svg";
import TheContext from "../TheContext";
import actions from "../api";
import mic from "../images/record2.svg";
import avatar3 from "../images/avatar3.svg";
import social from "../images/social.svg";
import follow from "../images/follow.svg";
import comments from "../images/comment.svg";
import search from "../images/search.svg";
import heart2 from "../images/heart2.svg";
import explore from "../images/explore.svg";
import Search from "../components/Search";
import { useInView } from "react-intersection-observer";
import gifsArr from "../images/gifs.json"

let SONG = {};
let songLikez = ''

function SocialFeed(props) {
  const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );

  // axios.get();

  
  const [comment, setComment] = useState();
  const [poppedUp, setPoppedUp] = useState(false);
  const [searchPoppedUp, setSearchPoppedUp] = useState(false);
  const [likes, setLikes] = useState(0)
  const windowRef = useRef();
  const popUpRef = useRef();

  const opacityRef1 = useRef();
  const opacityRef2 = useRef();
  const opacityRef3 = useRef();
  const popUpSearchRef = useRef();
  const opacitySearchRef3 = useRef();

  const popUpComments = () => {
   
    if (poppedUp == false) {
      opacityRef1.current.style.opacity = 1;
      opacityRef2.current.style.opacity = 1;
      opacityRef3.current.style.opacity = 1;
      popUpRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";

      setPoppedUp(true);
    } else {
      popUpRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";

      opacityRef1.current.style.opacity = 0;
      opacityRef2.current.style.opacity = 0;
      opacityRef3.current.style.opacity = 0;
      setPoppedUp(false);
    }
  };

  const popUpSearch = () => {
    if (searchPoppedUp == false) {
      opacitySearchRef3.current.style.opacity = 1;
      popUpSearchRef.current.style.height = "50%";
      windowRef.current.style.bottom = "50%";

      setSearchPoppedUp(true);
    } else {
      popUpSearchRef.current.style.height = "0px";
      windowRef.current.style.bottom = "0";

      opacitySearchRef3.current.style.opacity = 0;
      setSearchPoppedUp(false);
    }
  };

  const [thisFeedSongs, setThisFeedSongs] = useState([]);
  let page = 1;
  let userUser = "";
  let songUsersArr = [];

  //TEMPORARY CODE TO SHOW ALL SONGS JUST TO GET SOME LIKES ADDED
  // useEffect(() => {
  //   actions
  //     .getUserSongs(user)
  //     .then((usersSongs) => {
  //       setThisFeedSongs(usersSongs.data);
  //       console.log("inside useffect", thisFeedSongs);
  //     })
  //     .catch(console.error);
  // }, [page]);

  useEffect(() => {
    actions
      .getMostLikedSongs()
      .then((usersSongs) => {
        setThisFeedSongs(usersSongs.data);
        console.log("inside useffect", thisFeedSongs);
      })
      .catch(console.error);
  }, [page]);


  const [userForSong, setUserForSong] = useState({})

  const [activeSong,setActiveSong]=useState({})

  
// const getSongUsers = (theUserId) => {
//     console.log('HEY HEY HEY HEY HEY HEY', theUserId )
//     actions
//     .getAUser(theUserId)
//     .then((useUser) => {
//         setUserForSong(useUser.data)
//     })
//     .catch(console.error)
// }git add

// useEffect(() => {
//     actions
//     .getAUser(userUser)
//     .then((useUser) => {
//         setUserForSong(useUser.data)
//     })
//     .catch(console.error)
// }, [userUser]);



  // const [userForSong, setUserForSong] = useState({});

  // const [activeSong, setActiveSong] = useState({});

  // const getUserName = (id) => {
  //   actions
  //     .getAUser(id)
  //     .then((name) => {
  //       console.log(`@${name.data.userName}`);
  //     })
  //     .catch(console.error);
  // };



  let gifsCopy = [...gifsArr]

  const getRandomBackground = () => {
    let index = Math.floor(Math.random()*gifsCopy.length)
    // gifsCopy.splice(index, 1)
    // while (!gifsCopy.includes(gifsCopy[index])) {
      return gifsCopy[index].url
    // }
  }

  const audioRef=useRef()

  const handlePlayPause=()=>{
    
    if(audioRef.current.paused){
     audioRef.current.play()
 
    }else
    {
     audioRef.current.pause()
   }
  }

let profilePicRef=useRef()

  function DisplaySong(eachSong) {
    const [ref, inView] = useInView({
      threshold: 0.5,
    });
    if (inView) {
      // eachSong.setActiveSong(eachSong)
      SONG = eachSong;
      audioRef.current.src=eachSong.songURL
      profilePicRef.current.src=eachSong.songUser.picture
      songLikez = eachSong.songLikes.length
      console.log(songLikez, '>>>>>>>><<<<<<<<<', eachSong.songLikes)
    } else {
    }
    console.log("scrolling", inView, eachSong);
    return (
      <li
        ref={ref}
        className="video-pane"
        style={{
          backgroundImage: `url('${getRandomBackground()}')`
        }}
      >
        <div className="text-container">
          <h5 className="ud-text udt-1">
            <span style={{ color: "#ec6aa0" }}>
              {eachSong.songUser.userName}
            </span>{" "}
          </h5>
          <h6 className="ud-text udt-2">{eachSong.songName}</h6>
          <h6 className="ud-text udt-3">
            {eachSong.caption ? (
              <p>{eachSong.caption}</p>
            ) : (
              <p>NO CAPTION FOR THIS FLOW</p>
            )}
          </h6>
        </div>
      </li>
    );
  }

  const showSongs = () => {
    return thisFeedSongs.map((eachSong, i) => {
      // setUserUser(eachSong)
      // console.log(userForSong)
      return <DisplaySong i={i} {...eachSong} />;
    });
  };


  const getSocialFeed = () => {
    page === 1 ? (page = 0) : (page = 1);
    console.log("GET SOCIAL FEED SONGS FUNCTION");
  };

  const followUser = () => {
    console.log(user, userViewed);
    document.getElementById("notify").click();
    const followData = { user1: user.id, user2: userViewed.id };
    console.log("profile follow user function ", followData);
    actions
      .addFollow(followData)
      .then((somethingreturnedfromapi) => {
        document.getElementById("notify").click();
      })
      .catch(console.error);
  };

  // const likePost = () => {
  //   setLikes(likes + 1)
  // }

  const likePost = () => {
    console.log(user, userViewed);
    document.getElementById("notify").click();
    const likeData = { user1: user._id, songLiked: SONG._id };
    actions
      .addLike(likeData)
      .then((whatever) => {
        document.getElementById("notify").click();
      })
      .catch(console.error);
  }

  const showNavBar = () => {
    return (
      <footer
        style={{ height: `${props.height}`, flexDirection: `${props.row}` }}
      >
        <div className="social-buttons" style={{ display: `${props.display}` }}>
          <div className="social-list">
            <div className="individual-btn">
              <div className="individual-profile-pic">
                <img  src={SONG.songUser?.picture} ref={profilePicRef} alt=''/>
              </div>
            </div>
            <div className="like-comment-container">
              <div className="individual-btn" onClick={followUser}>
                <img className="social-icons follow" src={follow}></img>
              </div>
              <div className="individual-btn" onClick={popUpSearch}>
                <img className="social-icons heart" src={search}></img>
              </div>
              <div className="individual-btn">
                <img className="social-icons heart" onClick={(() => likePost())} src={heart2}></img><p>{songLikez}</p>
              </div>
              <div className="individual-btn" onClick={popUpComments}>
                <img className="social-icons comment" src={comments}></img>
              </div>
            </div>
          </div>
        </div>
        <div
          className="nav-buttons"
          style={{ boxShadow: `${props.shadowDisplay}` }}
        >
          <div className="nav-list">
            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {userViewed._id ? (
                    <Link to="/recordingBooth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons bi-record" src={mic}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons bi-record" src={mic}></img> */}
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  <img className="button-icons bi-explore" src={explore}></img>
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div onClick={getSocialFeed} className="nav-buttons-inset">
                  <img className="button-icons bi-social" src={social}></img>
                </div>
              </div>
            </div>

            <div className="nav-buttons-rim">
              <div className="nav-buttons-outset">
                <div className="nav-buttons-inset">
                  {user._id ? (
                    <Link to="/profile">
                      <img className="button-icons bi-profile-social" src={avatar3}></img>
                    </Link>
                  ) : (
                    <Link to="/auth">
                      <img className="button-icons bi-profile-social" src={avatar3}></img>
                    </Link>
                  )}
                  {/* <img className="button-icons" src={avatar3}></img> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const displaySearch = () => {
    return (
      <div ref={popUpSearchRef} className="comment-pop-out">
        <Search />

        <div
          ref={opacitySearchRef3}
          style={{ opacity: "0" }}
          className="bottom-bar"
        >
          <div className="inner-bar"></div>
        </div>
      </div>
    );
  };

  //prevent default

  const handleSubmit =(e)=>{

    e.preventDefault()
    actions.addComment({comment,SONG})
   
  }


  const [writer,setWriter]=useState()

  const getCommentWriter=(num)=>{
    actions
    .getAUser({id: num})
    .then((res)=>{
      setWriter( `@${res.data.userName}`)
      
    }).catch((e)=>{
      console.log('failed to get name')
    })
  }

  const renderEachComment = ()=>{

    console.log(SONG)
    if(!SONG.songComments){

    }else{

    return SONG.songComments.map((each)=>{
      getCommentWriter(each.commUser)
      return (
        <div className="comment-list">
      <div className="comment-list-inner">
      <p className="comment-username">
          {writer}
      </p>
      <p className="comment-text">
        {each.comment}
      </p>
    </div>
    </div>
    )
  })
}
}

  const displayComments=()=>{
    return(
    <div ref={popUpRef} className="comment-pop-out">
      <div className="inner-com">

        <div ref={opacityRef1} style={{opacity: '0'}} className="com-cont-1">
          <div className="input-container">
            <div className="input-inset">
              <form className="social-comment-form" onSubmit={handleSubmit}>
                <input
                    className="social-comment-input" 
                    type='text' 
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder='Drop yo comment' 
                    ></input>
                  <button></button>
              </form>
            </div>
          </div>
          </div>

        <div ref={opacityRef2} style={{opacity: '0'}} className="com-cont-2">
          <div className="comments-container">
            <div className="comment-list-container">
              

               {renderEachComment()}

             
            </div>
          </div>
        </div>
        <div ref={opacityRef3} style={{ opacity: "0" }} className="bottom-bar">
          <div className="inner-bar"></div>
        </div>
      </div>
      </div>
    

    )
  }

  return (
    <div className="SocialFeed">
      <div ref={windowRef} className="social-panel">
        <ul className="video-scroll-container">
          {showSongs()}
          <div className="video-details-container">
            <div className="transparent-test">
              <div className="user-details-container">
                <div className="user-details-inset"></div>
              </div>

              <div className="user-profile-image">
                <div className="user-profile-inset social-p">
                  <div className="nav-buttons-inset inset-social-p">
                    <img className="button-icons bi-play" src={play} onClick={handlePlayPause}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
      {displayComments()}
      {displaySearch()}
      {showNavBar()}
      <audio ref={audioRef} id='damn' ></audio>
      </div>
    )
  }

export default SocialFeed;