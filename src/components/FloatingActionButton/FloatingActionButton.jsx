import * as React from "react";
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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "@mui/material";
//text field import
import MenuItem from "@mui/material/MenuItem";
//date and calendar imports
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import for states
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
//import spacing from material ui
import { spacing } from "@mui/system";

//  * Should be refactored out to components, + needs to be formatted nicely
export default function FloatingActionButton() {
  const dispatch = useDispatch();
  const activitiesList = useSelector((store) => store.activities);
  const skillsList = useSelector((store) => store.skills);

  //local state
  const [date, setDate] = useState(dayjs()); //dayjs() is basically Date.now();
  const [activities, setActivities] = useState("");
  const [skills, setSkills] = useState("");
  const [xp, setXp] = useState("");
  const [source, setSource] = useState("");
  const [takeaways, setTakeaways] = useState("");
  const [requiredSkill, setRequiredSkill] = useState(false);
  const[requiredActivity, setRequiredActivity] = useState(false);
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

  const handleClose = () => {
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
          } else if (skill.enterprise_id) {
            newActivity.enterpriseId = skill.enterprise_id;
          }
        }
      }

      // send that log object to the DB
      dispatch({
        type: "LOG_ACTIVITY",
        payload: newActivity,
      });

      // Close the modal 
      handleClose();
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
    if(input === '') {
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
        <Box sx={{ "& > :not(style)": { m: 1 } }} onClick={handleClickOpen}>
          <Zoom in={true} timeout={{ enter: 500, exit: 500 }} unmountOnExit>
            <Fab
              id="fab"
              variant="extended"
              size="large"
              // color="primary"
              aria-label="add"
              sx={{
                fontSize:'1.3em',
                position: "fixed",
                bottom: 16,
                right: 16,
                // backgroundColor: "primary.green",
                backgroundColor: "skyblue",
                "&:hover": {
                  backgroundColor: "#90ee90",
                },
              }}
            >
              <AddIcon />
              Add Log
            </Fab>
          </Zoom>
        </Box>
        {/* dialog box */}
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
            {/* text fields that auto field with the XP they get */}
            <TextField
              sx={{
                p: 1,
                mt: 1,
                width: "8%",
                typography: "body1",
              }}
              // disabled makes the box unselectable, since a user will not
              // have the option to change the associated xp value
              //  However this does grey out the box currently. May need
              //  to adjust the className so that it doesn't show grey...
              disabled
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
              type="email"
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
              type="email"
              fullWidth
              variant="standard"
              value={takeaways}
              onChange={(event) => {
                setTakeaways(event.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <p></p>;
  }
}
