import React, {useState, useEffect} from 'react';
import axios from 'axios'

function Likes(props) {
    const [likes, setLikes] = useState([]);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      console.log(res.data.results);
      setLikes(res.data.results);
    });
  }, []);

  const showLikes = () => {
    return likes.map(eachLike => {
        return (
            <li><img style={{width: '10vw'}} src={eachLike.image} alt=''/>{eachLike.origin.name}</li>
        )
    })
  };

    return (
        <div>
            LIKES WILL GO HERE
            {showLikes()}
        </div>
    );
}

export default Likes;