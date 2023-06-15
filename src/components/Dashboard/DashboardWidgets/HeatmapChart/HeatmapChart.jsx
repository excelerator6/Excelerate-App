import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './HeatmapChart.css';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
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
                    }
                    return `color-gitlab-${value.count}`;
                }}
                tooltipDataAttrs={value => {
                    return {
                        // 'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count
                        //     }`,
                        'data-tip': `${value.date} has count: ${value.count
                            }`,
                    };
                }}
                showWeekdayLabels={true}
                onClick={value => {
                    if (value) {
                        return alert(`You logged ${value.count} activities on ${value.date}`)
                    }
                }
                }
            />
            <ReactTooltip />
        </div>
    );
}



export default HeatmapChart;
