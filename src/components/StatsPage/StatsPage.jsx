import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Stats.css';

// MUI components
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// components
import Calendar from './Calendar';

function StatsPage(props) {
    const dispatch = useDispatch();

    const [value, setValue] = useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch({
            type: "FETCH_USER_ACTIVITIES"
        })
    }, [])


    return (
        <Box sx={{width: '100%', typography: 'body1', padding: '1em'}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                    <Tab label="Item One" value='0' />
                    <Tab label="Item Two" value='1' />
                </TabList>
                </Box>
                <TabPanel value='0'>
                    <Calendar />
                </TabPanel>
                <TabPanel>
                    {/* Bar Graph Goes Here */}
                    <p>Hello There</p>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default StatsPage;
