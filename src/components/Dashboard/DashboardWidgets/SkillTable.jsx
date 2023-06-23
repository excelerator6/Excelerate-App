import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

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
// How do we do badges?
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

  const levelBadge = (currentLevel) => {
    switch (true) {
      case currentLevel === 50:
        return "҉ | 50 | ҉";
      case currentLevel === 49:
        return "««| 49 |»»";
      case currentLevel === 48:
        return "««| 48 |»»";
      case currentLevel === 47:
        return "««| 47 |»»";
      case currentLevel === 46:
        return "««| 46 |»»";
      case currentLevel === 45:
        return "««| 45 |»»";
      case currentLevel === 44:
        return "««| 44 |»»";
      case currentLevel === 43:
        return "««| 43 |»»";
      case currentLevel === 42:
        return "««| 42 |»»";
      case currentLevel === 41:
        return "««| 41 |»»";
      case currentLevel === 40:
        return "««| 40 |»»";
      case currentLevel === 39:
        return "‹«| 39 |»›";
      case currentLevel === 38:
        return "‹«| 38 |»›";
      case currentLevel === 37:
        return "‹«| 37 |»›";
      case currentLevel === 36:
        return "‹«| 36 |»›";
      case currentLevel === 35:
        return "‹«| 35 |»›";
      case currentLevel === 34:
        return "‹«| 34 |»›";
      case currentLevel === 33:
        return "‹«| 33 |»›";
      case currentLevel === 32:
        return "‹«| 32 |»›";
      case currentLevel === 31:
        return "‹«| 31 |»›";
      case currentLevel === 30:
        return "‹«| 30 |»›";
      case currentLevel === 29:
        return "‹«| 29 |»›";
      case currentLevel === 28:
        return "‹«| 28 |»›";
      case currentLevel === 27:
        return "‹«| 27 |»›";
      case currentLevel === 26:
        return "‹«| 26 |»›";
      case currentLevel === 25:
        return "‹«| 25 |»›";
      case currentLevel === 24:
        return "«| 24 |»";
      case currentLevel === 23:
        return "«| 23 |»";
      case currentLevel === 22:
        return "«| 22 |»";
      case currentLevel === 21:
        return "«| 21 |»";
      case currentLevel === 20:
        return "«| 20 |»";
      case currentLevel === 19:
        return "«| 19 |»";
      case currentLevel === 18:
        return "«| 18 |»";
      case currentLevel === 17:
        return "«| 17 |»";
      case currentLevel === 16:
        return "«| 16 |»";
      case currentLevel === 15:
        return "«| 15 |»";
      case currentLevel === 14:
        return "‹| 14 |›";
      case currentLevel === 13:
        return "‹| 13 |›";
      case currentLevel === 12:
        return "‹| 12 |›";
      case currentLevel === 11:
        return "‹| 11 |›";
      case currentLevel === 10:
        return "‹| 10 |›";
      case currentLevel === 9:
        return "‹| 9 |›";
      case currentLevel === 8:
        return "‹| 8 |›";
      case currentLevel === 7:
        return "‹| 7 |›";
      case currentLevel === 6:
        return "‹| 6 |›";
      case currentLevel === 5:
        return "‹| 5 |›";
      case currentLevel === 4:
        return "‹| 4 |›";
      case currentLevel === 3:
        return "‹| 3 |›";
      case currentLevel === 2:
        return "‹| 2 |›";
      case currentLevel === 1:
        return "‹| 1 |›";
      case currentLevel === 0:
        return "‹| 0 |›";
    }
  };

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
                  <TableCell align="center">{levelBadge(calculateLevel(skill))}</TableCell>
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
