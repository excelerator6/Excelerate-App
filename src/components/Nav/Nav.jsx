import { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../ButtonComponents/LogOutButton/LogOutButton";
import './Nav.css';
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

import SmallerExceleratorLogo from "./Logo/SmallerExceleratorLogo.png";
import ExceleratorLogo from './Logo/ExceleratorWhiteLogo.png';

//import Avatars
import UserAvatar from "../PageComponents/Avatars/UserAvatar";

const drawerWidth = 200;

function Nav(props) {
  const [currentWindow, setCurrentWindow] = useState('DASHBOARD')
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((store) => store.user);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const GreyLineDivider = () => (
    <Divider sx={{backgroundColor: '#c9cbcd', borderBottomWidth: 2}}/>
  )

  const ListItemButtonStyling = (window) => {
    const styling = {
      height: 80,
      backgroundColor: `${currentWindow === `${window}` ? 'primary.navy' : 'primary.main'}`,
      color:'white'
    }
    return styling
  }

  const drawer = (
    <div>
        <UserAvatar/>
          <List
            sx={{marginLeft:-3}}
          >
          <GreyLineDivider />
          {/* //If a user is logged in, show these links */}
            <ListItem disablePadding>
              <ListItemButton
                component="a" 
                sx={ListItemButtonStyling('DASHBOARD')}
                href="#/dashboard" 
                onClick={() => setCurrentWindow('DASHBOARD')}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="DASHBOARD" />
              </ListItemButton>
            </ListItem>

            <GreyLineDivider />

            <ListItem disablePadding>
              <ListItemButton
                component="a" 
                sx={ListItemButtonStyling('XP LOG')}
                href="#/xp-log"
                onClick={() => setCurrentWindow('XP LOG')}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="XP LOG" />
              </ListItemButton>
            </ListItem>
            
            {/* <GreyLineDivider /> */}
            {/* 
            // ** THE NAV BUTTON TO THE STATS PAGE vvvvvvvvv
            // * --- temporarily disabled
            <ListItem disablePadding>
              <ListItemButton
                component="a" 
                sx={ListItemButtonStyling('STATS')}
                href="#/stats-page"
                onClick={() => setCurrentWindow('STATS')}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="STATS" />
              </ListItemButton>
            </ListItem>

            // * vvvvvv THE NAV BUTTON TO THE ACHIEVEMENTS PAGE vvvvvv*
            // * --- temporarily disabled
            <GreyLineDivider />
            <ListItem disablePadding>
              <ListItemButton
                component="a" 
                sx={ListItemButtonStyling('ACHIEVEMENTS')}
                href="#/achievements"
                onClick={() => setCurrentWindow('ACHIEVEMENTS')}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary="ACHIEVEMENTS"/>
              </ListItemButton>
            </ListItem> */}

            <GreyLineDivider />

            <Box
              m={1}
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
              position="fixed"
              bottom="0"
              left={-75}
              margin="50px"
              // marginLeft="63px"
            >
                {/* This is the link in the lower-left corner to the How To Guide, right above
                the Log Out button. It uses the ListItem component, then sets the ListItemText
                of the ListItemButton to be an <a></a> tag, linking to the guide. */}
              <ListItem disablePadding>
                <ListItemButton
                  sx={{textDecoration:"underline", marginRight:7, marginBottom:1 }}
                >
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={<a target="_blank" href="https://www.canva.com/design/DAFx6Ca-WeA/kIpdYjQPe85EMDEd0fRx1w/view?utm_content=DAFx6Ca-WeA&utm_campaign=designshare&utm_medium=link&utm_source=editor#2">How-To Guide</a>}/>

                </ListItemButton>
              </ListItem>
              <LogOutButton 
                className="btn" 
              />
            </Box>
        </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;


  // Functions to calculate width of App bar depending on whether or
  // not the drawer is rendering, which is based upon if the user is logged in.
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
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: appBarWidth(drawerWidth) },
            ml: { sm: appMargin(drawerWidth) },
            backgroundColor: 'primary.main'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }}}
            >
              <MenuIcon />
            </IconButton>
              <Link to='/home'>
                <img id="ExceleratorLogo" src={SmallerExceleratorLogo} className="logo"/>
              </Link>
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
        </Box>
      </Box>
    </div>
  );
}

export default Nav;
