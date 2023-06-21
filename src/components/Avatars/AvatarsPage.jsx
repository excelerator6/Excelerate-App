import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

import AvatarsItem from "./AvatarsItem";
import Stack from '@mui/material/Stack';

import './Avatars.css'

function AvatarsPage(){
    return(
        <div id='AvatarsPage'>
            <h3> Choose New Avatar</h3>
            
            
            {/* 9 new different avatars to choose from */}
            <Stack spacing={5} direction="row">
            <AvatarsItem />
            <AvatarsItem />
            <AvatarsItem />
            </Stack>
            <br></br>
            <Stack spacing={5} direction="row">
            <AvatarsItem />
            <AvatarsItem />
            <AvatarsItem />
            </Stack>
            <br></br>
            <Stack spacing={5} direction="row">
            <AvatarsItem />
            <AvatarsItem />
            <AvatarsItem />
            </Stack>



        </div>
    )

}

export default AvatarsPage;