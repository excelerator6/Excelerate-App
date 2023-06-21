import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//import Avatars Css
import "./Avatars.css";

function Avatars() {
  const userName = useSelector((store) => store.user);

  return (
    <div id="avatarContainer">
      <div id="avatar">
      <Link to='/AvatarsPage'>
        <Avatar
          size={100}
          name={userName.username}
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
