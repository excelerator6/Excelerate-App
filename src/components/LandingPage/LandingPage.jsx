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

  const history = useHistory();

  const showRegister = () => {
    setShowRegisterForm(true);
  };
  const showLogin = () => {
    setShowRegisterForm(false)
  }

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
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8" id='carousel'>
          <Carousel>
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
