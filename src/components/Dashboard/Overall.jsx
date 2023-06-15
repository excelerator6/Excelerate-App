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


//  * What does this component do?
    // * Displays: 
        // * Total XP earned* (dunno if we should have this stat
        // * Total number of entries (userActivities.length)
        // * Total levels achieved acoss all skills
        // * Total achievements met (STRETCH GOAL)
        // * Latest entry by date (array.sort somehow?)
        // * Total number of skills (skills.length)
        // * Number of Levels that are Maxed out (lvl 50) (conditional render)

function Overall() {
    const skills = useSelector(store => store.skills);
    const userActivities = useSelector(store => store.userActivities);

    // boolean State used for rendering # of Levels Maxed column
    const [anythingMaxed, setAnythingMaxed] = useState(false)


        // function to calculate total levels of a specific skill
    const calculateLevel = (skill) => {
        // use .filter to filter through the user's logged activites, returning any activity that used the same skill as the skill we're checking for.
        // If it matches, it copies that into the actInstances
        const actInstances = userActivities.filter(item => skill.skill_name === item.skill)
        // then, we loop through actInstances and extract ONLY the xp_value using .map
        // then we use .reduce to add each XP amount to the last (acc + current) to get our total XP.
        const totalXP = actInstances.map(activity => activity.xp).reduce((acc, current) => acc + current, 0);

        // then we divide by 10 and round up to get the actual level,
        // since all levels are 10 XP 
        return Math.floor(totalXP / 10)
    }
    const totalLevels = skills.map(skill => calculateLevel(skill)).reduce((acc, current) => acc + current, 0); // * Total Levels variable
    
    // need to calculate total XP
    const calculateXP = (skill) => {
        const actInstances = userActivities.filter(item => skill.skill_name === item.skill)
        const totalXP = actInstances.map(activity => activity.xp).reduce((acc, current) => acc + current, 0);

        return (totalXP);
    }
    const totalXpEarned = skills.map(skill => calculateXP(skill)).reduce((acc, current) => acc + current, 0); // * Total XP Earned Variable
    
    const checkForMax = (skill) => {
        if(calculateXP(skill) >= 500){
            setAnythingMaxed(true);
            return skill;
        }
    }
    const maxedLevels = skills.filter(skill => checkForMax(skill))


    return(
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
                        {
                            // if there are any maxed levels, then render this column
                            anythingMaxed ? <TableCell align="center"># of Maxed Levels</TableCell> : <></>
                        }
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{totalXpEarned}</TableCell>
                            <TableCell align="center">{userActivities.length}</TableCell>
                            <TableCell align="center">{totalLevels}</TableCell>
                            <TableCell align="center">{skills.length}</TableCell>
                            {
                                // if there are any maxed levels, then render this column
                                anythingMaxed ? <TableCell align="center">{maxedLevels.length}</TableCell> : <></>
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> 
        </Paper>
    )

}
export default Overall;