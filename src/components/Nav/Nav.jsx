import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
// import './Nav.css';
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, Paper } from "@mui/material";

//import Avatars
import Avatars from "../Avatars/Avatars";

const drawerWidth = 200;

function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((store) => store.user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const navTheme = createTheme({
    palette:{
      type: 'light',
      primary: {
        main: '#303841',
      },
      secondary: {
        main: '#90ee90',
      },
      success: {
        main: '#ffe801',
      },
      background:{
        default: '#303841'
      }
      // divider: 'rgba(255,255,255,0.12)',
    }
  })
  const drawer = (
    <div>
      {/* <ThemeProvider theme={navTheme}> */}
        {/* <Paper> */}
        <Avatars />
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#/about">
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>

            {/* // If there's no user, show login/registration links */}
            {
              user.id ? <></> : <ListItem disablePadding>
              <ListItemButton component="a" href="#/login">
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            }
            



            {/* //If a user is logged in, show these links */}
            <>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#/dashboard">
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#/xp-log">
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="XP LOG" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#/StatsPage">
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Stats" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton component="a" href="#/Achievements">
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Achievements" />
                </ListItemButton>
              </ListItem>

              <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="fixed"
                bottom="0"
                margin="50px"
              >
                <LogOutButton className="btn" />
              </Box>
            </>
          {/* // )} */}
        </List>
        {/* </Paper> */}
      {/* </ThemeProvider> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


    // functions to calculate width of App bar depending on whether or not the drawer is rendering, which is based upon if the user is logged in.
  const appBarWidth = (width) => {
    if(user.id){
      return `calc(100% - ${width}px)`;
    } else{
      return '100%';
    }
  }
  const appMargin = (width) => {
    if(user.id){
      return `${width}px`
    } else{
      return '100%';
    }
  }

  return (
    <div className="drawerRoot">
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: appBarWidth(drawerWidth) },
            ml: { sm: appMargin(drawerWidth) },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Excelerator
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          {
            user.id ? 
          <>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer> </>: <></>
          }
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <Toolbar />
          <Typography paragraph>

          </Typography>
          <Typography paragraph> */}

          {/* </Typography> */}
        </Box>
      </Box>
    </div>
  );
}

// Nav.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default Nav;
