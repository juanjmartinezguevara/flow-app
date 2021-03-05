import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
// import User from "../../../backend/models/User";

function EditProfile(props) {
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // console.log("Form data", data);
    // axios.post("/movie/create", data).then((resp) => {
    //   console.log("woo movie created go to page", resp.data.user._id);
    //   history.push("/" + resp.data.user._id);
    // });
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={submit}>
        <label> Username <input name="username" placeholder='{User.userName}'></input></label><br />
        <label> First Name <input name="firstName" placeholder='{User.given_name}'></input></label><br />
        <label> Last Name <input name="lastName" placeholder='{User.family_name}'></input></label><br />
        <label> Bio <input name="bio" placeholder='{User.userAbout}'></input></label><br />
        <label> Twitter <input name="twitter" placeholder='{User.userTwitter}'></input></label><br />
        <label> Instagram <input name="instagram" placeholder='{User.userInstagram}'></input></label><br />
        <label> SoundCloud <input name="soundcloud" placeholder='{User.userSoundcloud}'></input></label><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditProfile;
