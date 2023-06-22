import Avatar from "boring-avatars";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import React from 'react';

import { Paper } from "@mui/material";

//import Avatars Css
import "./Avatars.css";

function Avatars() {

  const userAvatar = useSelector((store) => store.user.user_avatar_path);
  const username = useSelector((store) => store.user.username)
  
  const colors = [
    "#c9cbcd",
    "#90ee90",
    "#c3e3eb",
    "#061e45",
    "#36454f",
    "#303841",
  ];

  return (
    <div id="avatarContainer">
      <div id="avatar">
      <Link to='/AvatarsPage'>
        <Paper sx={{backgroundColor:'white', p:.2, borderRadius: 17, display:'flex', justifyContent:'center', alignContent:'center'}}>
          <Avatar
            size={100}
            name={userAvatar}
            variant="beam"
            // color scheme
            colors={colors}
            className="avatar"
          />
        </Paper>
        </Link>
      </div>
      <div id="username">{username}</div>
    </div>
  );
}

export default Avatars;
