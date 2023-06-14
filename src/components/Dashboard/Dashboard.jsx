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
import Overall from './Overall';

function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} direction="row" justifyContent='center' alignItems='left'>
        <Grid item xs={12} sm={12} md={10}>
          <Paper>
            <Overall />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <Paper  id="dboard-skill-table">
            <SkillTable />
          </Paper>
        </Grid>
        <Grid item  xs={8} sm={8} md={5}>
          {/* Heatmap and Total Content Consumed go here */}
          <p>something else goes here</p> 
        </Grid>
      </Grid>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
