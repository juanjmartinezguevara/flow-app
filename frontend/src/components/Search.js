import React, { useRef, useState, useEffect } from "react";
import actions from "../api";
import { Link } from "react-router-dom";
import TheContext from '../TheContext'

function Search(props) {
 const { user, setUser, userViewed, setUserViewed } = React.useContext(
    TheContext
  );


  const searchRef = useRef();
  const [suggestions, setSuggestions] = useState(
    <h4>Find Friends & Artists</h4>
  );

  useEffect(() => {});


  const listUsers = (e) => {
    if (e.target.value.length > 0) {
      grabUsers(e.target.value);
    }else{
      setSuggestions(<h4>Find Friends & Artists</h4>)
    }
  };
  const boxStyle = {
    display: "flex",
    height: "8vh",
    padding: "10px",
    justifyContent: "space-evenly",
    marginLeft: "0px",
    borderBottom: 'solid 1px black'
  };

  const suggestStyle1 = {
    display: "flex",
    justifyContent: "space-evenly",
    maxHeight: '100%',
    maxWidth: 'fit-content',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: 'large'
  };

  const imgStyle = {
      height: '8vh',
      width: 'auto',
      borderRadius: '80px'
  }

  const userStyle = {
      padding: '10px',
      textDecoration: 'none'
  }
  

  const suggestionBox = (info) => {
    //render top 1, 2 or 4 suggestions
    const mappedRes = info.data.map((ele) => {
        return { userName: ele.userName, picture: ele.picture, profile: ele};
      });

    if (mappedRes.length === 1) {
      return mappedRes.map((ele) => {
       console.log(ele)
        return (
          <div style={boxStyle}>
          <Link style={suggestStyle1} 
            to={{pathname:`/profile/other/${ele.profile._id}`,
                 profileInfo: ele.profile
                 }} >
                 <p style={userStyle} className="comment-username">{`@${ele.userName}`}</p>                              
                <img style={imgStyle} src={ele.picture} alt=""></img>
            </Link>
          </div>
        );
      });       ///this part is for cases where the search returns 2-4
    }else {
      return <h4>...thinking</h4>;
    }
  };

  const grabUsers = (theQuery) => {
    actions
      .getManyUsers({ search: theQuery })
      .then((res) => {
       console.log(res)
        setSuggestions(suggestionBox(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <>
            <div className="input-container">
                <div className="input-inset">
                    <form className="social-comment-form">
                        <input onChange={listUsers}
                            className="social-comment-input" 
                            type='text' 
                            placeholder='       Search' 
                            ></input>
                    </form>
                </div>
            </div>
            <div className="comments-container">
            <div className="comment-list-container">

                {suggestions}

            </div>
        </div>
</>
      // {suggestions}
   
    
  );
}

export default Search;
