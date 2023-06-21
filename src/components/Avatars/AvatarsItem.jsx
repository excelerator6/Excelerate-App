import Avatar from "boring-avatars";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import for material ui button and stack spacing
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import { Box, Card, Grid } from "@mui/material";

function AvatarsItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUpdate = (event, avatarName) => {
    dispatch({
      type: avatarName,
      payload: event.target.value,
    });
  };

  const colors = [
    "#c9cbcd",
    "#90ee90",
    "#c3e3eb",
    "#061e45",
    "#36454f",
    "#303841",
  ];

  const avatarOptions = [
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar4",
    "avatar5",
    "avatar6",
    "avatar7",
    "avatar8",
    "avatar9",
    "avatar21",
    "avatar22",
    "avatar23",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {avatarOptions.map((option, index) => {
          return (
            <Grid item xs={3} sm={3} md={3} key={index}>
              <Card sx={{ width: "20vw" }}>
                
                <Avatar
                  size={100}
                  variant="beam"
                  colors={colors}
                  name={option}
                />
                
                <Button
                  variant="outlined"
                  sx={{ borderline: "2" }}
                  onClick={(event) => {
                    handleUpdate(event, "UPDATE_AVATAR_NAME");
                  }}
                >
                  Pick me!
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default AvatarsItem;
