import { useSelector} from "react-redux";

// MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import "./SkillTable.css";
// How do we calculate the level, current XP / XP to next level, etc.

// Badge Component
import LevelBadge from "./SkillTableComponents/LevelBadge";

function SkillTable() {
  // things needed from the store to calculate the user's skill levels
  const skills = useSelector((store) => store.skills);
  const userActivities = useSelector((store) => store.userActivities);

  // need to calculate the user's skill levels
  const calculateLevel = (skill) => {
    // use .filter to filter through the user's logged activites, returning any activity that used the same skill as the skill we're checking for.
    // If it matches, it copies that into the actInstances
    const actInstances = userActivities.filter(
      (item) => skill.skill_name === item.skill
    );
    // then, we loop through actInstances and extract ONLY the xp_value using .map
    // then we use .reduce to add each XP amount to the last (acc + current) to get our total XP.
    const totalXP = actInstances
      .map((activity) => activity.xp)
      .reduce((acc, current) => acc + current, 0);
    // then we divide by 10 and round up to get the actual level,
    // since all levels are 10 XP
    return Math.floor(totalXP / 10);
  };

  // calculate the current xp out of 10 -takes the modulo left and it shows it onto the progress bar
  const currentXP = (skill) => {
    const actInstances = userActivities.filter(
      (item) => skill.skill_name === item.skill
    );
    const totalXP = actInstances
      .map((activity) => activity.xp)
      .reduce((acc, current) => acc + current, 0);

    return totalXP % 10;
  };
  // calculate the total xp for each skills
  const totalXP = (skill) => {
    const actInstances = userActivities.filter(
      (item) => skill.skill_name === item.skill
    );
    const totalXP = actInstances
      .map((activity) => activity.xp)
      .reduce((acc, current) => acc + current, 0);

    return totalXP;
  };
  //it's here to set the boundaries of the leveling bar
  const normalise = (value) => ((value - 0) * 100) / (10 - 0);

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
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Skill */}
                  <TableCell align="center">{skill.skill_name}</TableCell>
                  {/* Level */}
                  <TableCell align="center">{calculateLevel(skill)}</TableCell>
                  {/* Total XP */}
                  <TableCell align="center">{totalXP(skill)}</TableCell>
                  {/* Current XP */}
                  <TableCell align="center">
                    <Box
                      className="progressBarContainer"
                      sx={{ display: "flex" }}
                    >
                      <Box className="progressBar" container="span">
                        <BorderLinearProgress
                          variant="determinate"
                          value={normalise(currentXP(skill))}
                          valueBuffer={10}
                        />
                        <Box className="progressText" container="span">
                          <Typography variant="body1">
                            {currentXP(skill)} / 10
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  {/* Badge */}
                  <TableCell align="center">{LevelBadge(calculateLevel(skill))}</TableCell>
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
