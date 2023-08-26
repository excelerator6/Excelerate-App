import { useSelector} from "react-redux";

// MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Button } from "@mui/material";

//import skillTable css
import "./SkillTable.css";

// Badge Component
import LevelBadge from "./SkillTableComponents/LevelBadge";
import calculateTotalSkillXp from "../ReusedCalculationFunctions/calculateTotalSkillXp";

// Alert to Delete Skills Component
import AlertDialog from "./SkillTableComponents/DeleteSkill";

export default function SkillTable() {
  // State needed from the store to calculate the user's skill levels
  const skills = useSelector((store) => store.skills);
  const userActivities = useSelector((store) => store.userActivities);

    // Function to calculate the user's skill levels
    const calculateLevel = (skill) => {
      // Divide totalXp by 10 and round up to get the actual level, all levels are 10 XP
      return Math.floor(calculateTotalSkillXp(skill, userActivities) / 10)
    };
  
    // Calculate the current xp out of 10
    const currentXpForLevel = (skill) => {
      // Takes the modulo left and it shows it on the progress bar
      return (calculateTotalSkillXp(skill, userActivities) % 10)
    };
  
  // Returns a percentage to fill in the leveling bar based on the provided value
  const currentXpPercentage = (value) => ((value * 100) / 10);

  // Set styling for the progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundColor: theme.palette.mode === "light" ? "#5982c4" : "#308fe8",
    },
  }));

  // sort skills by total xp in ascending order
  const sortedSkills = skills.map(skill => {
    // adding an xp key to each skill object
    skill = {...skill}
    skill.xp = calculateTotalSkillXp(skill, userActivities);
    return skill;
    // then sort the skills by comparing their xp to each other.
  }).sort((a, b) => {return b.xp - a.xp});

  return (
    <div>
      <h2>skills</h2>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead id="skillTableHeader">
            <TableRow>
              <TableCell align="center">Skill</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Total XP</TableCell>
              <TableCell align="center">XP Until Level Up</TableCell>
              <TableCell align="center">Badge</TableCell>
              <TableCell align="center">Delete Skill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {sortedSkills.map((skill, index) => {
                const currentLevel = calculateLevel(skill)
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* Skill Column */}
                    <TableCell align="center">
                      {skill.skill_name}
                    </TableCell>

                    {/* Level Column */}
                    <TableCell align="center">
                      {currentLevel}
                    </TableCell>

                    {/* Total XP Column */}
                    <TableCell align="center">
                      {calculateTotalSkillXp(skill, userActivities)}
                    </TableCell>

                    {/* Current XP Column */}
                    <TableCell align="center">
                      <Box
                        className="progressBarContainer"
                        sx={{ display: "flex" }}
                      >
                        {/* The progress bar for current XP */}
                        <BorderLinearProgress
                          variant="determinate"
                          value={currentXpPercentage(currentXpForLevel(skill))}
                          valueBuffer={10}
                        />
                        {/* The written out progress. example "2/10" */}
                        <Typography variant="body1">
                          {skill.xp > 1 ? (10 - currentXpForLevel(skill)) : 0}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Badge Column */}
                    <TableCell align="center">
                      {LevelBadge(currentLevel)}
                    </TableCell>
                   {/* Delete Button Column */}
                   <TableCell align="center">
                      {/* this is actually the delete skill component, but onClick creates 'Are You Sure' modal */}
                      <AlertDialog 
                        skill = {skill}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


