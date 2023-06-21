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
import BarChart from './BarChart';
import BarChartHorizontal from './BarChartHorizontal';

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
        <Box sx={{ width: '100%', typography: 'body1', padding: '1em' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="Daily logs" value={0} />
                        <Tab label="XP Points 1" value={1} />
                        <Tab label="XP Points 2" value={2} />
                    </TabList>
                </Box>
                <TabPanel value='0'>
                    <Calendar />
                </TabPanel>
                <TabPanel value={1}>
                    {/* Bar ChartJS Goes Here */}
                    <BarChart />
                </TabPanel>
                <TabPanel value={2}>
                    {/* Bar ChartJS Goes Here */}
                    <BarChartHorizontal />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default StatsPage;
