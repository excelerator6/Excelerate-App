import { useState } from 'react';

import './Stats.css';

// MUI components
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// components
import Calendar from './Calendar';
import BarChartHorizontal from './BarChartHorizontal';

function StatsPage(props) {

    const [value, setValue] = useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', padding: '1em' }}>
            <TabContext value={value}>
            
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered sx={{mt:2}}>
                        <Tab label="Daily logs" value='0' />
                        <Tab label="XP Chart" value='1' />
                    </TabList>
                </Box>

                <TabPanel value='0'>
                    <Calendar />
                </TabPanel>

                <TabPanel value='1'>
                    <BarChartHorizontal />
                </TabPanel>

            </TabContext>
        </Box >
    );
}

export default StatsPage;
