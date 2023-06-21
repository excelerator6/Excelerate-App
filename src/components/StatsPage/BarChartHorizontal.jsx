import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChartHorizontal() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_TOTAL_XP_POINTS' })
    }, [])

    const userXpPoints = useSelector((store) => store.userActivities)


    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
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
                borderColor: 'rgb(100, 212, 253)',
                backgroundColor: 'rgba(100, 212, 253, 0.5)',
            },
        ],
    };

    return (<Bar options={options} data={data} />);
}
export default BarChartHorizontal;