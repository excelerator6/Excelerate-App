import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// Our imports to create the Congratulations Modal
import{ Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TryRounded } from "@mui/icons-material";

export default function LevelUpModal(props) {
    // prop containing boolean value for whether or not this modal should be open
    let open = props.isOpen;
    // prop containing prop handler function for closing modal
    let handleClose = props.handleClose;
    // two props containing relevant skill & level
    let skill = props.skill;
    let skillLevel = props.skillLevel;

    // quick check if this modal is supposed to be open or not
    if(open === true) {
        return (
            <>
                <Dialog
                    PaperProps={{ sx: { width: "50%", height: "45%", } }}
                    fullWidth
                    maxWidth="lg"
                    open={open}
                    
                >
                    <DialogTitle sx={{fontSize: "40px"}}>Congratulations!</DialogTitle>
                    <DialogContent sx={{ p: 1, m: 1, textAlign: "center", margin:"auto" }}>
                        <Typography sx={{fontSize: 30,}}>
                            Your {skill.skill_name} just leveled up.
                        </Typography>
                            <Typography sx={{position:"absolute",left: 0, right: 0, top: "50%", fontSize: 35 }}>
                                {skillLevel - 1} → {skillLevel}
                            </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => handleClose()}
                            variant="contained"    
                        >Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}