import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './HeatmapChart.css';

import { Paper, Box, Popover, Typography } from '@mui/material';

function HeatmapChart(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popupText, setPopupText] = useState('');

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //Set the users activity array to be mapped below
    const userActivity = useSelector((store) => store.userActivities)

    //   if (value) {
    //     const count = userActivity.filter(item => item.date === value.date);
    //     return alert(`You logged ${count.length} activities on ${value.date}`)
    // }

    const today = new Date();


    // function that takes a date and calculates how many activities were logged on that date, returning length of that array
    const countActivities = (date) => {
        const values = userActivity.filter(item => item.date === date).length;  
        if(values > 0){
            return values;
        } else {
            return 0;
        }
    }

    function shiftDate(date, numDays) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + numDays);
        return newDate;
    }

    // function getRange(count) {
    //     return Array.from({ length: count }, (_, i) => i);
    // }

    // function getRandomInt(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    const openPopover = (el, value) => {
        // * Need to find a way to get the position of the mouse click, and have the popover spring from there
        setAnchorEl(el);
        if (value && countActivities(value.date) > 0) {
            if(countActivities(value.date)===1){
                setPopupText(`You logged ${countActivities(value.date)} activity on ${value.date}`)
            } else if(countActivities(value.date) > 1){
                setPopupText(`You logged ${countActivities(value.date)} activities on ${value.date}`)
            } 
        }else{
            setPopupText(`You logged 0 activities on this date.`)
        }
      };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <h2>your activity</h2>
            <p></p>
            <CalendarHeatmap
                startDate={shiftDate(today, -150)}
                endDate={today}
                values={userActivity}
                classForValue={value => {
                    if (!value) {
                        return 'color-empty';
                    } else {
                        return `color-excelerator-${countActivities(value.date)}`;
                    }
                }}
                showWeekdayLabels={true}
                onClick={value => openPopover(event.target, value)}
            />
            <ReactTooltip />
            {
                anchorEl ? <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <Paper elevation={1}>
                    <Box 
                        width={250}
                        p={2}
                        >
                        {popupText}
                    </Box>
              </Paper>
            </Popover> : <></>
            }
        </div>
    );
}



export default HeatmapChart;
