import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function XpEarnedTab() {
  const xpEarned = useSelector(store => store.achievements.allAchievementsReducer.xpEarned)
  console.log(xpEarned);

  return (
    <>
      <h3>Inside Xp Earned Tab</h3>
      <h4>Achievements:</h4>
      <Grid container spacing={2}>
        {xpEarned && xpEarned.length > 0 ?
          xpEarned.map((achievement, index) => (
            <Grid item xs={3} key={index}>
              {achievement}
            </Grid>
          ))
          : ''
        }
      </Grid>
    </>
  )
}