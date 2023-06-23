import { Grid } from "@mui/material";
import React from "react";
import './AboutPage.css'
import AndersQrCode from './LinkedIn_QR_Codes/Anders_LinkedIn_QR_Code.png'
import IlhanQrCode from './LinkedIn_QR_Codes/Ilhan_LinkedIn_QR_Code (1).png'
import JoshuaQrCode from './LinkedIn_QR_Codes/Joshua_LinkedIn_QR_Code.png'
import VangQrCode from './LinkedIn_QR_Codes/Vang_LinkedIn_QR_Code.png'

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
          <Grid item xs={3} sx={{display:'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'}}>
            <img src="https://media.licdn.com/dms/image/D5635AQGtz7Rf8nXD_Q/profile-framedphoto-shrink_400_400/0/1686322739640?e=1688137200&v=beta&t=qGtHrnw0wdxb9lOjqD8-sIQd5f6pv_SuMdGyofgcVHE" />
            <br />
            <h2>Vang Vang</h2>
            <br />
            <img src={VangQrCode} className='QR-Code' />
          </Grid>
          <Grid item xs={3} sx={{display:'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'}}>
            <img src="https://media.licdn.com/dms/image/D5635AQGtd_BraqK_gg/profile-framedphoto-shrink_400_400/0/1685564432921?e=1688137200&v=beta&t=0CHjy2x_Lc8PHrM8xTGL8--ph4uaG69740wXiRcgORU" />
            <br />
            <h2>Anders Boyum</h2>
            <br />
            <img src={AndersQrCode} className='QR-Code' />
          </Grid>
          <Grid item xs={3} sx={{display:'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'}}>
            <img src="https://media.licdn.com/dms/image/D5635AQHld-4IRhlCFw/profile-framedphoto-shrink_400_400/0/1687546634082?e=1688151600&v=beta&t=mxhbJG0VJdeXqocfDJHYCxGt2CzHfoGmWQGN4WN_kb8" />
            <br />
            <h2>Ilhan Dahir</h2>
            <br />
            <img src={IlhanQrCode} className='QR-Code' />
          </Grid>
          <Grid item xs={3} sx={{display:'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'}}>
            <img src="https://media.licdn.com/dms/image/D5635AQFNJCANYIQJZA/profile-framedphoto-shrink_400_400/0/1687546446759?e=1688151600&v=beta&t=aEBs5gM2bFjXooDbNEFU8vWy9Lbxa_kxtsbngM9ZwQk" />
            <br />
            <h2>Joshua Engebretson</h2>
            <br />
            <img src={JoshuaQrCode} className='QR-Code' />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AboutPage;
