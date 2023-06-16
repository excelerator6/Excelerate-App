import { useSelector } from 'react-redux';

// calendar plugins
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Paper } from '@mui/material';

function Calendar(){
    const userActivites = useSelector(store => store.userActivites);


    return(
        <div id='fullCalendar'>
            <Paper>
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    aspectRatio={2.4}
                />
            </Paper>
        </div>
    )
}

export default Calendar;