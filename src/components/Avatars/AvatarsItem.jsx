import Avatar from "boring-avatars";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import for material ui button
import Button from "@mui/material/Button";
import { Box, Card, Grid, CardActionArea } from "@mui/material";
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        spacing={{ xs: 3, md: 4 }}
        columns={{ xs: 3, sm: 8, md: 14 }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {avatarOptions.map((option, index) => {
          return (
            <Grid item xs={3} key={index}>
              <Card variant="outlined" sx={{}}>
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
                    style={{ margin: "0 auto", display: "flex" }}
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    size="lg"
                    variant="outlined"
                    sx={[
                      {
                        "&:hover": {
                          color: "#36454f",
                          backgroundColor: "#90ee90",
                        },
                      },
                    ]}
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
