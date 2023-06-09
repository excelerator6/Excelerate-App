import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
//zoom import
import Zoom from '@mui/material/Zoom';
//dialog imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//text field import
import MenuItem from '@mui/material/MenuItem';
//date and calendar imports
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FloatingActionButton() {

    //handle opening of dialog box
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={handleClickOpen}>
        <Zoom
        in = {true}
        timeout = {{enter: 500, exit: 500}}
        unmountOnExit
        >
          <Fab
          id = 'fab' 
          variant="extended" 
          size="large" 
          color="primary" 
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          >
          <AddIcon />
            Add Log
          </Fab>
        </Zoom>
      </Box>
      {/* dialog box */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Log</DialogTitle>
        <DialogContent>
          
        {/* Date */}
        <DatePicker />
          {/* Activities Select Field */}
          <TextField
          select
          label="Activities"
          helperText="Please select your activities"
        ></TextField>
        {/* Skills Select Field */}
        <TextField
          select
          label="Skills"
          helperText="Please select your skills"
        ></TextField>
        {/* text fields that auto field with the XP they get */}
        <TextField
            box
            label='XP'
          />
        {/*  Source text field */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Source"
            type="email"
            fullWidth
            variant="standard"
          />
          {/* Takeaways text field */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Takeaways"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






