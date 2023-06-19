import { useSelector } from 'react-redux';
import { useState } from 'react';

// calendar plugins
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Paper, Box, Popover, Typography } from '@mui/material';


// * STRETCH GOAL: I'd like to have activities on the calendar be clickable,
// * revealing a popup of more info about that specific event

function Calendar(){
    const [activitiesReceived, setActivitiesReceived] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popupText, setPopupText] = useState('');

    const userActivities = useSelector(store => store.userActivities);

    const formatDate = (date) => {
        const year = date.slice(-4); // -4 starts 4 from the end of the string and extracts that to the end.
        const month = date.slice(0, 2);
        const day = date.slice(3, 5);
        return `${year}-${month}-${day}`;
    } 

    const formattedActivities = userActivities.map(item => {
        return{
            id: `${item.id}`,
            date: `${formatDate(item.date)}`,
            title:`${item.activity} // ${item.source}`
        }
    }) 

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const openPopover = (event) => {
        setAnchorEl(event.el);
        setPopupText(event.event.title);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
        setPopupText('');
    };


    return(
        <div id='fullCalendar'>
            <Paper>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    aspectRatio={2.4}
                    events={formattedActivities}
                    eventClick = {(info) => openPopover(info)}
                    eventColor='#90ee90'
                    eventTextColor='black'
                    eventBorderColor='gray'
                    
                />
            </Paper>
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
    )
    
}

export default Calendar;