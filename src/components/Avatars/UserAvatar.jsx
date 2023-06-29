import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

import { Paper } from "@mui/material";

//import Avatars Css
import "./UserAvatar.css";

//import stylebadge on avatar
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

export default function UserAvatar() {
  const userAvatar = useSelector((store) => store.user.user_avatar_path);
  const username = useSelector((store) => store.user.username);

  // Brand Colors for Excelerator
  const brandColors = [
    "#c9cbcd",
    "#90ee90",
    "#c3e3eb",
    "#061e45",
    "#36454f",
    "#303841",
  ];

  // Badge to help draw attention to the avatar being editable within the NavBar
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#36454f",
      color: "white",
      boxShadow: `0 0 0 0px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "100%",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div id="avatarContainer">
      <div id="avatar">
        <Link to="/avatars-page">
          <Paper
            sx={{
              backgroundColor: "white",
              p: 0.2,
              borderRadius: 17,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              "&:hover": {
                color: "#36454f",
                backgroundColor: "#90ee90",
              },
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<SwitchAccessShortcutAddIcon />}
            >
              <Avatar
                size={100}
                name={userAvatar}
                variant="beam"
                colors={brandColors}
                className="avatar"
              />
            </StyledBadge>
          </Paper>
        </Link>
      </div>
      <div id="username">{username}</div>
    </div>
  );
}
