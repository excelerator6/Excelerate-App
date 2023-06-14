import { useSelector, useDispatch } from "react-redux";
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
        // * Total XP earned* 
        // * Total number of entries 
        // * Total levels achieved acoss all skills
        // * Total achievements met (STRETCH GOAL)
        // * Latest entry by date
        // * Total number of skills
        // * Number of Levels that are Maxed out (lvl 50) 
function Overall() {
    const skills = useSelector(store => store.skills);
    const activities = useSelector(store => store.activities);
    const userActivities = useSelector(store => store.userActivities);

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
    

    // might not need this, but I think it's here to set the boundaries of the leveling bar
    const normalise = (value) => ((value - 0) * 100) / (10 - 0)
    // need to calculate the xp needed to reach the next level;
    const calculateNextLevelXP = (skill) => {
        // call the calculateXP function to grab the total XP
        const totalXP = calculateXP(skill);

        // then we divide by 10 and grab the remainder, using modulo %
        // finally, we take that and subtract it from 10 to get the amount needed until the next level
        return 10 - (totalXP % 10);
    }

    // * Will want to add a condition to this render -- If user has any skill maxed out, render Total Maxed Levels column
    return(
        <>
            <h2>Totals</h2>
             <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead id='skillTableHeader'>
                    <TableRow>
                        <TableCell>XP Earned</TableCell>
                        <TableCell align="right"># of Entries</TableCell>
                        <TableCell align="center"># of Levels</TableCell>
                        <TableCell align="right"># of Skills</TableCell>
                        <TableCell align="right">Badge</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      
                    </TableBody>
                </Table>
            </TableContainer> 
        </>
    )
}
export default Overall;


{/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead id='skillTableHeader'>
                    <TableRow>
                        <TableCell>Skill</TableCell>
                        <TableCell align="right">Level</TableCell>
                        <TableCell align="center">Total XP</TableCell>
                        <TableCell align="right">XP Until Next Level</TableCell>
                        <TableCell align="right">Badge</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      
                    </TableBody>
                </Table>
            </TableContainer> */}