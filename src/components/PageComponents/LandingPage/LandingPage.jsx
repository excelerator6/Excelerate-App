import React, { useState } from 'react';
import './LandingPage.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material'

// import CarouselImageOne from "./images/Excelerator_Image_1.png"
// import CarouselImageTwo from "./images/Excelerator_Image_2.png"

// CUSTOM COMPONENTS
import RegisterForm from '../LoginAndRegisterPages/RegisterPage/RegisterForm/RegisterForm';
import LoginForm from '../LoginAndRegisterPages/LoginPage/LoginForm/LoginForm'

export default function LandingPage() {
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
    {src: `./images/Excelerator_Image_1.png`},
    {src: `./images/Excelerator_Image_2.png`}
  ]

  return (
    <div className="container">

      <div className="grid" id='landingPage'>

        <div className="grid-col grid-col_8" id='carousel'>
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
                  padding: '5px',
                  color: '#36454f'
              }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: '#c9cbcd'
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '25px',
                    textAlign: 'center'
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
