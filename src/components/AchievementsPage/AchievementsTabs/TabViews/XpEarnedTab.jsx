import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function XpEarnedTab() {
  const xpEarned = useSelector(store => store.achievements.allAchievementsReducer.xpEarned)
  const completedAchievements = useSelector(store => store.achievements.userAchievementsReducer.completedAchievements)
  console.log(completedAchievements);

  const starImage = (completedStatus) => {
    if (completedStatus) {
      return (
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLk5OitGOwjZv42-jzEM_bg15TTmymPxOE5lQ5z53vsg&s" />
      )
    } else {
      return (
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTar8F5Cer-XnpSbIGj2Y8rQ1IiNPRGNkvhESdPUtxakg&s" />
      )
    }
  }

  const card = (achievement) => (
    <>
      <CardContent>
        <Typography sx={{fontSize:20}} gutterBottom>
          {achievement}
        </Typography>
        {starImage()}
        <Typography sc={{fontSize:14}} color="text.secondary">
          Completed Date
        </Typography>
      </CardContent>
    </>
  )

  return (
    <>
      <h2>XP Earned Achievements</h2>
      <Grid container spacing={2}>
        {xpEarned && xpEarned.length > 0 ?
          xpEarned.map((achievement, index) => (
            <Grid item xs={3} key={index}>
              <Card sx={{bgcolor:'#c3e3eb'}}>
                {card(achievement)}
              </Card>
            </Grid>
          ))
          : ''
        }
      </Grid>
    </>
  )
}