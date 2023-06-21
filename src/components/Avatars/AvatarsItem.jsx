import Avatar from "boring-avatars";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import for material ui button and stack spacing
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";

function AvatarsItem() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleUpdate = (event, avatarName) => {

        dispatch({
            type: avatarName,
            payload: event.target.value
        })
    }


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
        <IconButton onClick={(event) => {handleUpdate(event, 'UPDATE_AVATAR_NAME')}}>
          <Avatar
            size={100}
            variant="beam"
            color={colors}
            src="https://source.boringavatars.com/beam"
            name="1"
          />
        </IconButton>
        </Stack>
      </div>
      
    </div>
  );
}

export default AvatarsItem;
