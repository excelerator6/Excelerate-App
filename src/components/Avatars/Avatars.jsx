import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

//import Avatars Css
import "./Avatars.css";

function Avatars() {
  const userName = useSelector((store) => store.user);

  return (
    <div id="avatarContainer">
      <div id="avatar">
        <Avatar
          size={100}
          name={userName.username}
          variant="beam"
          // color scheme
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </div>
      <div id="username">{userName.username}</div>
    </div>
  );
}

export default Avatars;