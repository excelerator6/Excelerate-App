import Avatar from "boring-avatars";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import for material ui button
import Button from "@mui/material/Button";
import { Box, Card, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function AvatarsItem() {

  const dispatch = useDispatch();
  //handleUpdate takes in 2 parameters, the new avatarOptions and dispatch called when clicked on
  const handleUpdate = (event, avatarNewName, message) => {
    dispatch({
      type: message,
      payload: avatarNewName,
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
    "Abigail Adams",
    "Margaret Fuller",
    "Ellen Swallow",
    "Alicia Dickerson",
    "Mahalia Jackson",
    "Emma Lazarus",
    "Coretta Scott",
    "Annie Jump",
    "Irene Morgan",
    "Susan B",
    "Sojourner Truth",
    "Georgia O",
  ];

  return (
    <Box 
    sx={{ flexGrow: 1 }}
    >
      <Grid
        container
        spacing={3}
        // spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}

        // direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {avatarOptions.map((option, index) => {
          return (
            <Grid
            item
            //   columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            //   xs={2}
            //   sm={4}
            //   md={4}
            //   key={index}
            >
              <Card 
            //   sx={{ }} 
            //   variant="outlined"
              >
                <CardContent>
                  <Avatar
                    size={100}
                    variant="beam"
                    colors={colors}
                    name={option}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="lg"
                    variant="outlined"
                    sx={{ borderline: "" }}
                    onClick={(event) => {
                      handleUpdate(event, option, "UPDATE_AVATAR_NAME");
                    }}
                  >
                    Click Here!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default AvatarsItem;
