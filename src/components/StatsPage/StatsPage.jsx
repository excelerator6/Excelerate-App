import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Stats.css';

// MUI components
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// components
import Calendar from './Calendar';

function StatsPage(props) {
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        dispatch({
            type: "FETCH_USER_ACTIVITIES"
        })
    }, [])


    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="User Activity Calendar">
                    <Calendar />
                </Tab>

            </Tabs>
        </Box>
    );
}

export default StatsPage;
