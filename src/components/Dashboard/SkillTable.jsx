import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


        // How do we calculate the level, current XP / XP to next level, etc. 
        // How do we do badges?
function SkillTable() {
    // things needed from the store to calculate the user's skill levels
    const skills = useSelector(store => store.skills);
    const activities = useSelector(store => store.activities);
    const userActivities = useSelector(store => store.userActivities);
    console.log("Activities, userActivities", activities, userActivities);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_USER_ACTIVITIES'})
    }, [])

    // need to calculate the user's skill levels 
    const calculateLevel = (skill) => {
        const actInstances = userActivities.filter(item => skill.skill_name === item.skills_enterprise_name || skill.skill_name === item.skills_user_name)
        const totalXP = actInstances.map(activity => activity.xp_value).reduce((acc, current) => acc + current, 0);
        return Math.ceil(totalXP / 10)
    }
    
    // need to calculate total XP
    const calculateXP = (skill) => {
        const actInstances = userActivities.filter(item => skill.skill_name === item.skills_enterprise_name || skill.skill_name === item.skills_user_name)
        const totalXP = actInstances.map(activity => activity.xp_value).reduce((acc, current) => acc + current, 0);
        return totalXP;
    }

    // need to calculate the xp needed to reach the next level;
    const calculateNextLevelXP = (skill) => {
        const totalXP = calculateXP(skill);
        return 10 - (totalXP % 10);
    }

    return(
        <div id="dboard-skill-table">
            <h2>Skills</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead id='skillTableHeader'>
                    <TableRow>
                        <TableCell>Skill</TableCell>
                        <TableCell align="right">Level</TableCell>
                        <TableCell align="right">Total XP</TableCell>
                        <TableCell align="right">XP Until Next Level</TableCell>
                        <TableCell align="right">Badge</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        skills.map((skill, index) => {
                            return(
                                <TableRow 
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{skill.skill_name}</TableCell>
                                        <TableCell align='right'>{calculateLevel(skill)}</TableCell>
                                        <TableCell align='right'>{calculateXP(skill)}</TableCell>
                                        <TableCell align='right'>{calculateNextLevelXP(skill)}</TableCell>
                                        <TableCell align='right'>🤘</TableCell>
                                </TableRow>
                            )
                        })
                      }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default SkillTable;