import React, { Component } from 'react';
//import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart() {

    const dispatch = useDispatch();
    // const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_TOTAL_XP_POINTS' })
    }, [])

    const userXpPoints = useSelector((store) => store.userActivities)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                text: 'Total XP Points',
            },
        },
    };

    const labels = userXpPoints.map((skill) => { return (skill.skill) });

    const data = {
        labels,
        datasets: [
            {
                label: 'XP Skill Points',
                data: userXpPoints.map((skill) => { return (skill.xp_points) }),
                backgroundColor: 'rgba(100, 212, 253, 0.5)',
            },
        ],
    };


    return (<Bar options={options} data={data} />);
}

export default BarChart;
