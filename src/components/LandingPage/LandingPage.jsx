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
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  function Item(props)
    {
        return (
            <Paper>
                <h2>{props.item.name}</h2>
                
                  <img src={props.item.src} height={575}/>
                

                {/* <Button className="CheckButton">
                    Check it out!
                </Button> */}
            </Paper>
        )
    }
  const items = [
    {
      name: "Dashboard",
      src: '/LandingPageImages/Excelerator-Dashboard.png'
    },
    {
      name: "Stats",
      src: '/LandingPageImages/Excelerator--Stats.png'
    },
    {
      name: 'XP Log',
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
        <div className="grid-col grid-col_4">
          <LoginForm />

          <center>
            <h4>Not yet a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              {/* need to make this swap the login form with the register form */}
              Register
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
