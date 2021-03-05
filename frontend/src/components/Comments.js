import React, { useEffect, useState } from "react";
import axios from "axios";

function Comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      console.log(res.data.results);
      setComments(res.data.results);
    });
  }, []);

  const loadComments = () => {
    return comments.map(eachComment => {
        return (
            <li>{eachComment.origin.name}</li>
        )
    })
  };

  return (
    <div style={{ backgroundColor: "gray" }}>
      Comments
      {loadComments()}
    </div>
  );
}

export default Comments;
