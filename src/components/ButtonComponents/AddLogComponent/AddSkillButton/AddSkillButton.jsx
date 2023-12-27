import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AddSkillButton() {
    const [open, setOpen] = React.useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [requiredSkill, setRequiredSkill] = useState(false);

    const dispatch = useDispatch();

    // useEffect for getting the activities
    useEffect(() => {
        getSkills();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // First, turn off the angry red boxes 
        setRequiredSkill(false)

        // Second, clear the input fields
        setNewSkill("");

        setOpen(false);
    };


    // Function to handle activity submission 
    function handleSubmit() {
        // If the required feild is not empty, proceed to submit the new skill
        if (newSkill !== '') {
            // create skill log object
            const skillToAdd = {
                skill: newSkill
            };

            // send that log object to the DB
            dispatch({
                type: "LOG_NEW_SKILL",
                payload: skillToAdd,
            });

            //Call Skills to get updated list
            getSkills();
            // Close the modal 
            handleClose();
        }
        // Else highlight the required fields so the user knows what they still need to do
        else {
            requiredInputField(newSkill, setRequiredSkill)
        }

    }

    // We'll need to call this function again when the user creates a new skill
    const getSkills = () => {
        dispatch({ type: "GET_SKILLS_LIST" });
    };



    /**
 * Test if a piece of required state is empty, if it is adjust the setter function
 * associated with that inputs error field. This will then highlight the box in red
 * @param {text} input - The state we are testing
 * @param {text} setRequiredInput - The setter function associated with the input
 */
    const requiredInputField = (input, setRequiredInput) => {
        if (input === '') {
            setRequiredInput(true)
        } else {
            setRequiredInput(false)
        }
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}
                style={{
                    borderRadius: 5,
                    backgroundColor: "#ccc",
                    text: "white",
                    padding: "13px 25px",
                    fontSize: "14px"
                }}
            >
                Add A New Skill
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>ADD A NEW SKILL</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        NAME OF A NEW SKILL TO TRACK
                    </DialogContentText>
                    {/*  New Skill text field */}
                    <TextField
                        sx={{ p: 0, maxWidth: "100%" }}
                        autoFocus
                        error={requiredSkill}
                        margin="dense"
                        id="name"
                        label="SKILL NAME"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSkill}
                        onChange={(event) => {
                            setNewSkill(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>ADD</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}