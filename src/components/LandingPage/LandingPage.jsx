import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material'
// import '../../../public/LandingPageImages/Excelerator--XP Log.png'

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm'

function LandingPage() {
  const [heading, setHeading] = useState(`Let's EXCEL!`);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // functions that tab between whether the login and register forms showing
  const showRegister = () => {
    setShowRegisterForm(true);
  };
  const showLogin = () => {
    setShowRegisterForm(false)
  }

  // function to format the given props into the items for the carousel.
  function Item(props)
    {
        return (
            <Paper>
                  <img src={props.item.src} id='carouselImages' />
            </Paper>
        )
    }
    // our carousel pictures
  const items = [
    {
      src: '/LandingPageImages/Excelerator-Dashboard.png'
    },
    {
      src: '/LandingPageImages/Excelerator--Stats.png'
    },
    {
      src: '/LandingPageImages/Excelerator--XPLog.png'
    }
]

  return (
    <div className="container">

      <div className="grid">
        <div className="grid-col grid-col_8" id='carousel'>
        <h2>{heading}</h2>
          <Carousel
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                  backgroundColor: '#90ee90',
                  borderRadius: 17
              }
            }}
            indicatorIconButtonProps={{
              style: {
                  padding: '5px',    // 1
                  color: '#36454f'       // 3
              }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: '#c9cbcd' // 2
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '25px', // 5
                    textAlign: 'center' // 4
                }
        
            }}
          >
              {items.map( (item, i) => <Item key={i} item={item} /> )}
          </Carousel>
        </div>
        <div className="grid-col grid-col_4" id='loginForm'>
          {
            !showRegisterForm ? 
            <>
              <LoginForm />
              <center>
                <h4>Not yet a Member?</h4>
                <button className="btn btn_sizeSm" onClick={() => showRegister()}>
                  Register
                </button>
              </center> 
            </>
            
            : 
            
            <>
              <RegisterForm />
              <center>
                <h4>Already a Member?</h4>
                <button className="btn btn_sizeSm" onClick={() => showLogin()}>
                  Login
                </button>
              </center>
            </>
          }
         
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
