import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
//zoom import
import Zoom from "@mui/material/Zoom";

//dialog imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

//date and calendar imports
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

//Add Skill button component
import AddSkillButton from "./AddSkillButton/AddSkillButton"
import LevelUpModal from "./LevelUpPopup/LevelUp";
import calculateTotalSkillXp from "../../PageComponents/Dashboard/DashboardWidgets/ReusedCalculationFunctions/calculateTotalSkillXp";


//  * Should be refactored out to components, + needs to be formatted nicely
export default function AddLogButton() {
  const dispatch = useDispatch();
  const activitiesList = useSelector((store) => store.activities);
  const skillsList = useSelector((store) => store.skills);
  const userActivities = useSelector((store) => store.userActivities);

  //local state
  const [date, setDate] = useState(dayjs()); //dayjs() is basically Date.now();
  const [activities, setActivities] = useState("");
  const [skills, setSkills] = useState("");
  const [xp, setXp] = useState("");
  const [source, setSource] = useState("");
  const [takeaways, setTakeaways] = useState("");
  const [requiredSkill, setRequiredSkill] = useState(false);
  const [requiredActivity, setRequiredActivity] = useState(false);
  const [requiredSource, setRequiredSource] = useState(false);

  // useEffect for getting the activities
  useEffect(() => {
    dispatch({ type: "GET_ACTIVITY_LIST" });
    getSkills();
  }, []);

  //handle opening of dialog box
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  // function for calculating whether or not a skill has leveled up
  const levelUpCheck = (chosenSkill) => {
    // * What does this function need to operate? 
      // * 1. The calculateXP function
      // - Got it 
      // * 1. The skills along with their current XP
      // - Got it, but need to extract it to perform the calculations
      // * 1. Two global variables (or pieces of state) to put:
        // * a. Whether or not the LevelUpPopup should be open
        // * b. The skill & skill level that needs to be congratulated
    

  }

  const handleClose = (chosenSkill) => {
    // First, turn off the angry red boxes 
    setRequiredSkill(false)
    setRequiredActivity(false)
    setRequiredSource(false)

    // Second, clear the input fields
    setActivities("");
    setSkills("");
    setXp("");
    setSource("");
    setTakeaways("");

    // Finally, close the Modal
    setOpen(false);
    
    // upon the Add Entry Modal closing, will check if the submitted skill was leveled up.
    levelUpCheck(chosenSkill);
  };

  // Function to handle activity submission ===> sending that to the DB
  function handleSubmit() {
    // If the required fields aren't empty, proceed to submit the new activity
    if (skills !== '' && activities !== '' && source !== '') {
      // create activity log object
      const newActivity = {
        date: date.format("MM/DD/YYYY"), // * <--- this formats the date as a string like so: 25-DEC-2023
        activity: activities,
        xp: xp,
        source: source,
        takeaway: takeaways,
      };

      // conditionally set new key=value pair of newActivity object, based on
      // whether the skill came from the skills_enterprise table
      // or the skills_user table
      for (let skill of skillsList) {
        if (skill.skill_name === skills) {
          if (skill.user_skill_id) {
            newActivity.skillUserId = skill.user_skill_id;
            newActivity.skillName = skill.skill_name;
          } else if (skill.enterprise_id) {
            newActivity.enterpriseId = skill.enterprise_id;
            newActivity.skillName = skill.skill_name;
          }
        }
      }

      // send that log object to the DB
      dispatch({
        type: "LOG_ACTIVITY",
        payload: newActivity,
      });

      // Close the modal 
      handleClose(newActivity);
    }
    // Else highlight the required fields so the user knows what they still need to do
    else {
      requiredInputField(skills, setRequiredSkill)
      requiredInputField(activities, setRequiredActivity)
      requiredInputField(source, setRequiredSource)
    }

  }

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

  // We'll need to call this function again when the user creates a new skill
  const getSkills = () => {
    dispatch({ type: "GET_SKILLS_LIST" });
  };

  // function for handling activity Select menu
  const handleActivitySelect = (event) => {
    const activityId = event.target.value;
    setActivities(activityId);
    // autofill the XP field with the XP amount associated with the activity
    setXp(activitiesList[activityId - 1].xp_value);
  };

  if (activitiesList.length > 0 && skillsList.length > 0) {
    return (
      <div>
        {/* 
          // * vvvvv Add Entry Button vvvvv
        */}
        <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleClickOpen}>
          <Fab
            id="fab"
            variant="extended"
            size="large"
            aria-label="add"
            sx={{
              fontSize: '1.3em',
              position: "fixed",
              bottom: 16,
              right: 16,
              backgroundColor: "skyblue",
              "&:hover": {
                backgroundColor: "#90ee90",
              },
            }}
          >
            <AddIcon /> Add Entry
          </Fab>
        </Box>

        {/* 
          // * vvvvv Add Entry Modal vvvvv
        */}
        <Dialog
          PaperProps={{ sx: { width: "75%", height: "75%" } }}
          fullWidth
          maxWidth="lg"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle>Add New Log</DialogTitle>
          <DialogContent sx={{ p: 1, m: 1, textAlign: "center" }}>
            {/* Date */}
            <DatePicker
              sx={{
                p: 1,
                mt: 1,
              }}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />

            {/* Skills Select Field */}
            <TextField
              sx={{
                p: 1,
                mt: 1,
              }}
              select
              error={requiredSkill}
              label="Skills"
              helperText="Please select your Skill (Required)"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              onClick={() => { getSkills() }}
            >
              {skillsList.map((skill, index) => {
                return (
                  <MenuItem key={index} value={skill.skill_name}>
                    {skill.skill_name}
                  </MenuItem>
                );
              })}
            </TextField>

            {/* Activities Select Field */}
            <TextField
              sx={{
                p: 1,
                mt: 1,
              }}
              select
              error={requiredActivity}
              label="Activities"
              helperText="Please select your Activity (Required)"
              value={activities}
              onChange={handleActivitySelect}
            >
              {activitiesList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.activity}
                  </MenuItem>
                );
              })}
            </TextField>

            {/* XP Field, autofills based on the selected activity */}
            <TextField
              sx={{
                p: 1,
                mt: 1,
                width: "8%",
                typography: "body1",
              }}
              disabled  // Makes the box unselectable, since a user will not
                        // have the option to change the associated xp value
              box="true"
              label="XP"
              value={xp}
            />

            {/*  Source text field */}
            <TextField
              sx={{ p: 1, maxWidth: "90%" }}
              autoFocus
              error={requiredSource}
              helperText="(Required)"
              margin="dense"
              id="name"
              label="Source"
              type="text"
              fullWidth
              variant="standard"
              value={source}
              onChange={(event) => {
                setSource(event.target.value);
              }}
            />

            {/* Takeaways text field */}
            <TextField
              sx={{ p: 1, maxWidth: "90%" }}
              autoFocus
              helperText="(Optional)"
              margin="dense"
              id="name"
              label="Takeaways"
              type="text"
              fullWidth
              variant="standard"
              value={takeaways}
              onChange={(event) => {
                setTakeaways(event.target.value);
              }}
            />

            {/* Add New Skill Button */}
            <div>
              <AddSkillButton />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>

        </Dialog>

        {/*
          // * IF THE USER LEVELS UP A SKILL, THEN PROC THIS COMPONENT vvvvv

          // * When the handleClose() func is run, I will have the levelUpCheck() func run. If it returns "true", we will set the global variables "levelUp" (which we will use to set <LevelUpModal /> to "open") and "leveledSkill" (to be passed to <LevelUpModal /> as a prop) to their proper values.


          // * 1. I need to add the xp / level key-value pair to the skill that's being submitted, and save that info.
          // * 2. I need to save the submitted skill to a "global" variable. Then, if it's decided that it levels up, I can use that info in this vvvv component.
        */}
        {/* <LevelUpModal 
          skill = {leveledSkill}
        /> */}
      </div >
    );
  } else {
    return <p></p>;
  }
}
