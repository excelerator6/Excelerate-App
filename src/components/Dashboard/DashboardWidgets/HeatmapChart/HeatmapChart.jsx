import { useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './HeatmapChart.css';

import { Paper, Box, Popover } from '@mui/material';

function HeatmapChart() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [popupText, setPopupText] = useState('');

    const open = Boolean(anchorEl);
    const id = (open ? 'simple-popover' : undefined); // if open is true, id = 'simple-popover', else id = undefined

    //Set the users activity array to be mapped below
    const userActivity = useSelector((store) => store.userActivities)

    const today = new Date();

    // function that takes a date and calculates how many activities were logged on that date, returning length of that array
    const countActivities = (date) => {
        const values = userActivity.filter(item => item.date === date).length;  
        if(values > 0) {
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

    const openPopover = (el, value) => {
        setAnchorEl(el);
        // If value exists AND the number of activities associated with value.date is greater than 0
        if (value && countActivities(value.date) > 0) {
            // If only 1 activity logged, user should see "activity"
            if(countActivities(value.date) === 1){
                setPopupText(`You logged ${countActivities(value.date)} activity on ${value.date}`)
            }
            // If more than 1 acitivity logged, user should see "activities"
            else if(countActivities(value.date) > 1){
                setPopupText(`You logged ${countActivities(value.date)} activities on ${value.date}`)
            } 
        }
        else {
            setPopupText(`You logged 0 activities on this date.`)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <h2>your activity</h2>
            <br />  {/* Add additional line of spacing between Widget title and the actual Heatmap */}
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
            {anchorEl ?
                <Popover
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
                </Popover>
                : <></>
            }
        </div>
    );
}

export default HeatmapChart;
