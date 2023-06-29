import Avatar from "boring-avatars";
import { useDispatch } from "react-redux";
//import material ui components
import { Box, Button, Card, CardActions, CardContent, Grid } from "@mui/material";

function AvatarsItem() {
  const dispatch = useDispatch();
  
  const handleUpdate = (event, avatarNewName) => {
    dispatch({
      type: "UPDATE_AVATAR_NAME",
      payload: avatarNewName,
    });
  };

  // Brand Colors for Excelerator
  const brandColors = [
    "#c9cbcd",
    "#90ee90",
    "#c3e3eb",
    "#061e45",
    "#36454f",
    "#303841",
  ];

  // The names within the avatarOptions array are selected from
  // a group of options found at the boring-avatars website https://boringavatars.com/
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
                    colors={brandColors}
                    name={option}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    style={{ margin: "0 auto", display: "flex" }}
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
                      handleUpdate(event, option);
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
