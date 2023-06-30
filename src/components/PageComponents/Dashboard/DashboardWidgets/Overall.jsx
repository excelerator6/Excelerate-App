import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
// MUI components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import calculateTotalSkillXp from "./ReusedCalculationFunctions/calculateTotalSkillXp";

    // * Displays:
        // * Total XP earned 
        // * Total number of entries (userActivities.length)
        // * Total levels achieved acoss all skills
        // * Total achievements met 
        // * Latest entry by date 
        // * Total number of skills (skills.length)
        // * Number of Levels that are Maxed out (lvl 50) (conditional render)

export default function Overall() {
    const skills = useSelector(store => store.skills);
    const userActivities = useSelector(store => store.userActivities);

    // Function to calculate the user's skill levels
    const calculateLevel = (skill) => {
        // Divide totalXp by 10 and round up to get the actual level, all levels are 10 XP
        return Math.floor(calculateTotalSkillXp(skill, userActivities) / 10)
    };

    // Total Levels variable
    const totalLevels = skills
        .map(skill => calculateLevel(skill))
        .reduce((acc, current) => acc + current, 0); 
    
    // Total XP Earned Variable
    const totalXpEarned = skills
        .map(skill => calculateTotalSkillXp(skill, userActivities))
        .reduce((acc, current) => acc + current, 0); 
    
    // Function to check if the total XP of a skill is greater than or equal to 500, the xp cap
    const checkForMax = (skill) => {
        if(calculateTotalSkillXp(skill, userActivities) >= 500){
            return skill;
        }
    }

    // Variable for storing every Max Level skill
    const maxedLevels = skills.filter(skill => checkForMax(skill))

    return (
        <Paper id="overallTable">
            <h2 id="overallHeader">totals</h2>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead id='skillTableHeader'>
                    <TableRow>
                        <TableCell align="center">XP Earned</TableCell>
                        <TableCell align="center"># of Entries</TableCell>
                        <TableCell align="center"># of Levels</TableCell>
                        <TableCell align="center"># of Skills</TableCell>
                        {// if there are any maxed levels, then render this additional column
                            maxedLevels.length > 0 ? <TableCell align="center"># of Maxed Levels</TableCell> : <></>
                        }
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{totalXpEarned}</TableCell>
                            <TableCell align="center">{userActivities.length}</TableCell>
                            <TableCell align="center">{totalLevels}</TableCell>
                            <TableCell align="center">{skills.length}</TableCell>
                            {// if there are any maxed levels, then render this additional cell
                                maxedLevels.length > 0 ? <TableCell align="center">{maxedLevels.length}</TableCell> : <></>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> 
        </Paper>
    )
};