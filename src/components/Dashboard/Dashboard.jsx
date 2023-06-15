import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

// material UI grid components
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './Dashboard.css'

// dashboard widget components
import SkillTable from './SkillTable';
import Overall from './Overall';
import HeatmapChart from '../HeatmapChart/HeatmapChart';

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({type: 'FETCH_USER_ACTIVITIES'})
    }, [])

    
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
        <Grid item  xs={8} sm={8} md={4} mr={1}>
          {/* Heatmap and Total Content Consumed go here */}
          <Paper>
            <HeatmapChart />
          </Paper>
          <p>something else goes here</p>
        </Grid>
      </Grid>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
