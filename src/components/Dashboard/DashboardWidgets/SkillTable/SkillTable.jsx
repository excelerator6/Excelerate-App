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

//import skillTable css
import "./SkillTable.css";

// Badge Component
import LevelBadge from "./SkillTableComponents/LevelBadge";

function SkillTable() {
  // State needed from the store to calculate the user's skill levels
  const skills = useSelector((store) => store.skills);
  const userActivities = useSelector((store) => store.userActivities);


  // Calculate the total xp for each skills
  const calculateTotalSkillXp = (skill) => {
    // Use .filter to filter through the user's logged activites,
    //  returning any activity that used the same skill as the skill we're checking for.
    // If it matches, it copies that into the resulting array
    const actInstances = userActivities.filter(
      (item) => skill.skill_name === item.skill
    );
    return actInstances
      // Loop through activitiesArray and extract ONLY the xp_value using .map
      .map((activity) => activity.xp)
      // Then use .reduce to add each XP amount to the last (acc + current) to get our total XP.
      .reduce((acc, current) => acc + current, 0);
    // return calculateTotalXp(actInstances)
  };

    // Function to calculate the user's skill levels
    const calculateLevel = (skill) => {
      // Divide totalXp by 10 and round up to get the actual level, all levels are 10 XP
      return Math.floor(calculateTotalSkillXp(skill) / 10)
    };
  
    // Calculate the current xp out of 10
    const currentXpForLevel = (skill) => {
      // Takes the modulo left and it shows it on the progress bar
      return (calculateTotalSkillXp(skill) % 10)
    };
  
  // Returns a percentage to fill in the leveling bar based on the provided value
  const currentXpPercentage = (value) => ((value * 100) / 10);

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
              <TableCell align="center">Current XP</TableCell>
              <TableCell align="center">Badge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill, index) => {
              const currentXp = currentXpForLevel(skill)
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
                    {calculateTotalSkillXp(skill)}
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
                        value={currentXpPercentage(currentXp)}
                        valueBuffer={10}
                      />
                      {/* The written out progress. example "2/10" */}
                      <Typography variant="body1">
                        {currentXp} / 10
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Badge Column */}
                  <TableCell align="center">
                    {LevelBadge(currentLevel)}
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SkillTable;
