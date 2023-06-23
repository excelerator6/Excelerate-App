import { Grid } from "@mui/material";
import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>The Excelerator Team</h2>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <img src="https://media.licdn.com/dms/image/D5635AQGtz7Rf8nXD_Q/profile-framedphoto-shrink_400_400/0/1686322739640?e=1688137200&v=beta&t=qGtHrnw0wdxb9lOjqD8-sIQd5f6pv_SuMdGyofgcVHE" />
            <br />
            <h2>Vang Vang</h2>
          </Grid>
          <Grid item xs={3}>
            <img src="https://media.licdn.com/dms/image/D5635AQGtd_BraqK_gg/profile-framedphoto-shrink_400_400/0/1685564432921?e=1688137200&v=beta&t=0CHjy2x_Lc8PHrM8xTGL8--ph4uaG69740wXiRcgORU" />
            <br />
            <h2>Anders Boyum</h2>
          </Grid>
          <Grid item xs={3}>
            <img src="https://media.licdn.com/dms/image/C5603AQGxTb9GcN0FcQ/profile-displayphoto-shrink_400_400/0/1553711884700?e=1692835200&v=beta&t=nTEvO7HQTKkXblB3nQUpYg-f-0EA5O1eRM49WL6LUig" />
            <br />
            <h2>Ilhan Dahir</h2>
          </Grid>
          <Grid item xs={3}>
            <img src="https://media.licdn.com/dms/image/C5603AQF3JVuV9zDGKQ/profile-displayphoto-shrink_400_400/0/1564343673697?e=1692835200&v=beta&t=ro9AvOLIdGQQTNqBmmzRBd6pMfx9vsmAwAE44DKSLdk" />
            <br />
            <h2>Joshua Engebretson</h2>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AboutPage;
