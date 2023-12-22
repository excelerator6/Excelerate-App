import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// Our imports to create the Congratulations Modal
import{ Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function LevelUpModal(open, skill) {
    // * This modal will need to be procc'd when a user's skill passes the next 
    // * milestone of 10 xp. This will mean the user's skill has increased to the next level.
    // * The problem is, it will almost never land ON 10 exactly, so we need to account for them
    // * overshooting the mark. 
    // * ANYTIME a user's skill passes 10 upon an entry submission, it needs to say "Congratulations for leveling up!"
    // * AND it needs to be able to happen anywhere that the Add Log button exists, meaning throughout the whole app. 
    // * BUT I don't want it attached to the action of submitting an entry, since there is wayyyy too much weight on that function already. 
    // * ALSO ALSO, I need the skill name and level in order to display the congratulations message.

    const [modalOpen, setModalOpen] = useState(open);


    const checkForLevelUp = () => {
        // this function will check if there's been a level up (somehow), and if so, open the congrats box.
        // setModalOpen(true);
    }
    if(modalOpen == true) {
        return (
            <>
                <Dialog
                    PaperProps={{ sx: { width: "75%", height: "75%" } }}
                    fullWidth
                    maxWidth="lg"
                    open={modalOpen}
                    // onClose={handleClose}
                >
                    <DialogTitle sx={{fontSize: "45px"}}>Congratulations!</DialogTitle>
                    <DialogContent sx={{ p: 1, m: 1, textAlign: "center", margin:"auto" }}>
                        <Typography>
                            You've just leveled up!
                        </Typography>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}