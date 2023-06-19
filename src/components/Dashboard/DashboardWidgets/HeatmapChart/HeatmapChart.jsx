import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './HeatmapChart.css';


function HeatmapChart(props) {

    //Set the users activity array to be mapped below
    const userActivity = useSelector((store) => store.userActivities)

    const today = new Date();



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


    // * the problem is that the activities are undefined for some reason
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
                        const count = userActivity.filter(item => item.date === value.date);
                        return `color-gitlab-${count.length}`;
                    }
                }}
                tooltipDataAttrs={value => {
                    const count = userActivity.filter(item => item.date === value.date);
                    return {
                        // 'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
                        //     }`,
                        'data-tip': `${value.date} has count: ${count.length}`,
                    };
                }}
                showWeekdayLabels={true}
                onClick={value => {
                    if (value) {
                        const count = userActivity.filter(item => item.date === value.date);
                        return alert(`You logged ${count.length} activities on ${value.date}`)
                    }
                }
                }
            />
            <ReactTooltip />
        </div>
    );
}



export default HeatmapChart;
