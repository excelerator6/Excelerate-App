import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch({ type: 'LOGOUT' })} className={props.className}>
      LOG OUT
    </button>
  );
}

export default LogOutButton;
