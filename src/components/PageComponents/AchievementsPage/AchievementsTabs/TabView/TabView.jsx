import { useSelector } from "react-redux"
import { Card, CardContent, Grid, Typography } from "@mui/material";
import GreyStarSharp from '../StarPngs/grey_star_sharp.png'
import GoldStarSharp from '../StarPngs/gold_star_sharp.png'
import WhiteStarSharp from '../StarPngs/white_star_sharp.png'

export default function AchievementTabView({pageAchievements, pageHeader}) {
  const completedAchievements = useSelector(store =>
    store.achievements.userAchievementsReducer.completedAchievements
  )

  const CompletedStarImage = (achievement) => {
    // Check to see if this achievement has been completed and render a different star and
    // render the date it was completed if it has been.
    const completed = completedAchievements.find(achieve => achieve.achievement === achievement);
    return (
      <>
        {/* If compelted is true, show a GoldStarSharp, ELSE show a GreyStarSharp */}
        <img src={completed ? GoldStarSharp : WhiteStarSharp} className='star-image' />
        <Typography sc={{fontSize:14}} color="text.secondary">
          {/* If completed is true, show the date this achievement was completed
              Otherwise, don't show a date.
          */}
          Completed Date: {completed ? completed.date : ''}
        </Typography>
      </>
    )
  }

  const AchievementCard = (achievement) => (
    <CardContent 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography sx={{fontSize:20}} gutterBottom>
        {achievement}
      </Typography>
      {CompletedStarImage(achievement)}
    </CardContent>
  )

  return (
    <>
      <h2>{pageHeader} Achievements</h2>
      <Grid container spacing={2}>
        {pageAchievements && pageAchievements.length > 0 ?
          pageAchievements.map((achievement, index) => {
            return (
              <Grid item xs={3} key={index}>
                <Card 
                  sx={{
                    bgcolor:'#c3e3eb',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  elevation={4}
                >
                  {AchievementCard(achievement)}
                </Card>
              </Grid>
            )
          })
          :
          ''
        }
      </Grid>
    </>
  )
}