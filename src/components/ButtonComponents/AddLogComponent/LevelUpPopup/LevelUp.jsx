import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// Our imports to create the Congratulations Modal
import{ Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function LevelUpModal(props) {
    let open = props.isOpen;
    let handleClose = props.handleClose;
    let skill = props.skill;
    let skillLevel = props.skillLevel;

    if(open === true) {
        return (
            <>
                <Dialog
                    PaperProps={{ sx: { width: "75%", height: "75%" } }}
                    fullWidth
                    maxWidth="lg"
                    open={open}
                >
                    <DialogTitle sx={{fontSize: "45px"}}>Congratulations!</DialogTitle>
                    <DialogContent sx={{ p: 1, m: 1, textAlign: "center", margin:"auto" }}>
                        <Typography>
                            You've just leveled up!
                            Here's the skill that leveled up:
                            {skill.skill_name}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}