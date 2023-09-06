import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

// MUI components
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialog(skill) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const deleteSkill = (skill) => {

    dispatch({
        type: 'DELETE_SKILL',
        payload: skill.skill
    });
    dispatch({type: 'GET_SKILLS_LIST'});
    handleClose();
  }
  console.log(skill);

  return (
    <div>
        <Button size="small" onClick={() => handleClickOpen()}>
            <DeleteForeverOutlinedIcon/>
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete your ${skill.skill.skill_name} skill?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Don't Delete</Button>
          <Button color='error' onClick={() => deleteSkill(skill)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}