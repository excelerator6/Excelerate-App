import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Stats.css';

// components
import Calendar from './Calendar';
function StatsPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "FETCH_USER_ACTIVITIES"
        })
    }, [])
    return (
        <div>
            <Calendar />
        </div>
    );
}

export default StatsPage;
