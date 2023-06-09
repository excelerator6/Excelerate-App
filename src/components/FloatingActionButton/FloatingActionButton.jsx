import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
//zoom import
import Zoom from '@mui/material/Zoom';


export default function FloatingActionButton() {

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
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
    </div>
  );
}