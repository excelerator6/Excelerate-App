import Avatar from "boring-avatars";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

//import Avatars Css
import "./Avatars.css";

function Avatars() {

 
  const dispatch = useDispatch();

  const username = useSelector((store) => store.user);

//   useEffect(() => {
//     dispatch ({ type: 'POST_AVATAR', payload: userName.username });
// }, []);

  return (
    <div id="avatarContainer">
      <div id="avatar">
      <Link to='/AvatarsPage'>
        <Avatar
          size={100}
          name={username.username}
          variant="beam"
          // color scheme
          colors={[
            "c9cbcd",
            "#90ee90",
            "#c3e3eb",
            "#061e45",
            "#3645f",
            "#303841",
          ]}
        />
        </Link>
      </div>
      <div id="username">{userName.username}</div>
    </div>
  );
}

export default Avatars;
