import { useSelector } from "react-redux";

// MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


 // * What does this component need to do?
    // * 1. It needs a "Skills" Header
    // * 2. It needs to map through and list each user skill
        // * a. Each skill needs it's current level, current XP, XP to next Level, and Badge

        // How do we calculate the level, current XP / XP to next level, etc. 
        // How do we do badges?
function SkillTable() {
    // things needed from the store to calculate the user's skill levels
    const skills = useSelector(store => store.skills);
    const activities = useSelector(store => store.activites);
    const userActivities = useSelector(store => store.userActivities);


    console.log("Skills", skills);
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
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
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

{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Skill</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Total XP</TableCell>
            <TableCell align="right">XP Until Next Level</TableCell>
            <TableCell align="right">Badge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        //   Here goes the skills
        </TableBody>
      </Table>
    </TableContainer> */}