import { useSelector } from 'react-redux';
import { useState } from 'react';

// calendar plugins
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Paper } from '@mui/material';

function Calendar(){
    const [activitiesReceived, setActivitiesReceived] = useState(false);

    const userActivities = useSelector(store => store.userActivities);

    const formatDate = (date) => {
        const year = date.slice(-4);
        const month = date.slice(0, 2);
        const day = date.slice(3, 5);

        return `${year}-${month}-${day}`;
    } 

    const formattedActivities = userActivities.map(item => {
        return{
            // id: `${item.id}`,
            date: `${formatDate(item.date)}`,
            title:`${item.activity} / ${item.source}`
        }
    }) 

    // console.log(userActivities)
    return(
        <div id='fullCalendar'>
            <Paper>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    aspectRatio={2.4}
                    events={formattedActivities}
                />
            </Paper>
        </div>
    )
    
}

export default Calendar;