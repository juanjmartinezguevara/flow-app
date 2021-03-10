import React, { useRef, useState, useEffect } from "react";
import actions from "../api";
import { Link } from "react-router-dom";

function Search(props) {
  const searchRef = useRef();
  const [suggestions, setSuggestions] = useState(
    <h4>Find friends & artists</h4>
  );

  useEffect(() => {});

  const listUsers = (e) => {
    if (e.target.value.length % 2 === 0 && e.target.value.length > 0) {
      grabUsers(e.target.value);
    }
  };
  const boxStyle = {
    display: "flex",
    height: "6vh",
    // padding: "10px",
    justifyContent: "space-evenly",
    marginLeft: "0px",
  };

  const suggestStyle1 = {
    display: "flex",
    justifyContent: "space-evenly",
    maxHeight: '100%',
    maxWidth: 'fit-content'
    
  };

  const imgStyle = {
      height: '5vh',
      width: 'auto'
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
          <div >
            <Link style={suggestStyle1} 
            to={{pathname:`/profile/${ele.profile._id}`,
                 profileInfo: ele
                 }}>
              <img style={imgStyle} src={ele.picture} alt=""></img>
              <p style={{display:'flex',
                          alignItems: 'center'}}>
                          {ele.userName}</p>
            </Link>
          </div>
        );
      });       ///this part is for cases where the search returns 2-4
    } else if (mappedRes.length >= 2 && mappedRes.length < 4) {
      return mappedRes.map((ele) => {
        return (
          <div style={suggestStyle1}>
            <img src={ele.picture} alt=""></img>
            <p>{ele.userName}</p>
          </div>
        );
      });       ///cases where there are many users with the same username
    } else if (mappedRes.length >= 4) {
      return mappedRes.map((ele) => {
        return (
          <div style={suggestStyle1}>
            <img src={ele.picture} alt=""></img>
            <p>{ele.userName}</p>
          </div>
        );
      });
    } else {
      return <h4>...thinking</h4>;
    }
  };

  const grabUsers = (theQuery) => {
    actions
      .getManyUsers({ search: theQuery })
      .then((res) => {
       
        setSuggestions(suggestionBox(res));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={boxStyle}>
      <input placeholder="search" ref={searchRef} onChange={listUsers}></input>
      {suggestions}
    </div>
  );
}

export default Search;
