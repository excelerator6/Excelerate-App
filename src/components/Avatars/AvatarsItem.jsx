import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
//import for material ui button and stack spacing
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";

function AvatarsItem() {
  const colors = [
    "c9cbcd",
    "#90ee90",
    "#c3e3eb",
    "#061e45",
    "#3645f",
    "#303841",
  ];
  return (
    <div>
      <div>
      <Stack spacing={5} direction="row">
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="1"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="2"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="3"
          />
         
        </IconButton>
         </Stack>
            <br></br>
            <Stack spacing={5} direction="row">
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="4"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="5"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="6"
          />
        </IconButton>
        </Stack>
        <br></br>
        <Stack spacing={5} direction="row">
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="7"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="8"
          />
        </IconButton>
        <IconButton onClick={() => alert("Avatar Clicked")}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="9"
          />
        </IconButton>
        </Stack>
      </div>
    </div>
  );
}

export default AvatarsItem;
