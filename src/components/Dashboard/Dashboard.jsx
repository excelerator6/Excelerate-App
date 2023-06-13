import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

// material UI grid components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './Dashboard.css'

// dashboard widget components
import SkillTable from './SkillTable';

function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item>
          <SkillTable />
        </Grid>
      </Grid>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
