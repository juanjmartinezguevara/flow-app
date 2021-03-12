import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import actions from '../api'

function TempHome(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    actions
      .getUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>TEMP HOME</h1>
      {/* <h4>{user.email}</h4> */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="all-posts">All Posts</Link>
        <Link to="add-posts">Add Post</Link>
        {!user.email ? (
          <Link to="/auth">Log in</Link>
        ) : (
          <Link to="/profile">Profile</Link>
        )}
      </nav>
    </div>
  );
}

export default TempHome;
