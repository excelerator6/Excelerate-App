import React, { useState } from 'react';
import './LandingPage.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material'

// CUSTOM COMPONENTS
import RegisterForm from '../LoginAndRegisterPages/RegisterPage/RegisterForm/RegisterForm';
import LoginForm from '../LoginAndRegisterPages/LoginPage/LoginForm/LoginForm'

export default function LandingPage() {
  const [heading, setHeading] = useState(`Let's EXCEL!`);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Function that toggles between whether the login or register form is showing
  const toggleRegister = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  // Function to format the given props into the items for the carousel.
  function Item(props) {
    return (
      <Paper>
        <img src={props.item.src} id='carouselImages' />
      </Paper>
    )
  }
  // The carousel pictures
  const items = [
    {src: '/LandingPageImages/Excelerator::Dashboard.png'},
    {src: '/LandingPageImages/Excelerator::StatsCal.png'},
    {src: '/LandingPageImages/Excelerator::StatsGraph.png'},
    {src: '/LandingPageImages/Excelerator::XPLog.png'}
  ]

  return (
    <div className="container">

      <div className="grid">

        <div className="grid-col grid-col_8" id='carousel'>
        <h2>{heading}</h2>
          <Carousel
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
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
        </div> {/* End carousel */}

        <div className="grid-col grid-col_4" id='loginForm'>
          {
            !showRegisterForm ? 
            <>
              <LoginForm />
              <center>
                <h4>Not yet a Member?</h4>
                <button className="btn btn_sizeSm" onClick={() => toggleRegister()}>
                  Register
                </button>
              </center> 
            </>
            
            : 
            
            <>
              <RegisterForm />
              <center>
                <h4>Already a Member?</h4>
                <button className="btn btn_sizeSm" onClick={() => toggleRegister()}>
                  Login
                </button>
              </center>
            </>
          }
        </div> {/* End loginForm */}

      </div>
    </div>
  );
}
