import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

import AvatarsItem from "./AvatarsItem";
import Stack from '@mui/material/Stack';
//import AvatarsUsername
import AvatarsUsername from "./AvatarsUsername";

import './Avatars.css'

function AvatarsPage(){
    
    return(
        <div id='AvatarsPage'>
            
            <AvatarsUsername />
            <h3> Choose New Avatar</h3>
            
            
            {/* 9 new different avatars to choose from */}
            <Stack spacing={5} direction="row">
            <AvatarsItem />
           
            </Stack>
            <br></br>
           



        </div>
    )

}

export default AvatarsPage;