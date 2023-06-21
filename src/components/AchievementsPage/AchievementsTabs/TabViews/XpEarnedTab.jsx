import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@mui/material";
import GreyStarRound from '../StarPngs/grey_star_round.png'
import GreyStarSharp from '../StarPngs/grey_star_sharp.png'
import GoldStarRound from '../StarPngs/gold_star_round.png'
import GoldStarSharp from '../StarPngs/gold_star_sharp.png'


export default function XpEarnedTab() {
  const xpEarned = useSelector(store => store.achievements.allAchievementsReducer.xpEarned)
  const completedAchievements = useSelector(store => store.achievements.userAchievementsReducer.completedAchievements)
  console.log(completedAchievements);

  const starImage = (completedStatus) => {
    if (completedStatus) {
      return (
        <img src={GoldStarSharp} className='star-image' />
      )
    } else {
      return (
        <img src={GreyStarSharp} className='star-image' />
      )
    }
  }

  const AchievementCard = (achievement) => (
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
              <Card 
                sx={{bgcolor:'#c3e3eb'}}
                className='achievement-card'
              >
                {AchievementCard(achievement)}
              </Card>
            </Grid>
          ))
          : ''
        }
      </Grid>
    </>
  )
}