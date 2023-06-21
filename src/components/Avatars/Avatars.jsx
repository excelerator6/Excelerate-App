import Avatar from "boring-avatars";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

//import Avatars Css
import "./Avatars.css";

function Avatars() {

  const userAvatar = useSelector((store) => store.user.user_avatar_path);
  const username = useSelector((store) => store.user.username)

  return (
    <div id="avatarContainer">
      <div id="avatar">
      <Link to='/AvatarsPage'>
        <Avatar
          size={100}
          name={userAvatar}
          variant="beam"
          // color scheme
          colors={[
            "#c9cbcd",
            "#90ee90",
            "#c3e3eb",
            "#061e45",
            "#36454f",
            "#303841",
          ]}
        />
        </Link>
      </div>
      <div id="username">{username}</div>
    </div>
  );
}

export default Avatars;
