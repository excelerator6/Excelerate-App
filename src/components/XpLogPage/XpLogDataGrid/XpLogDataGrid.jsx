import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link, Paper, Popover } from '@mui/material';



export default function XpLogDataGrid() {
  const userActivities = useSelector(store => store.userActivities);

  const RenderExpandSource = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCurrentlyOverflown, setCurrentlyOverflown] = useState(false)
    const cellValueRef = useRef(null)
    // Set width for the Popover
    const width = 200

    useEffect(() => {
      setCurrentlyOverflown(isOverflown(cellValueRef));
    }, [isCurrentlyOverflown, props.value]);
    
    function isOverflown(element) {
      return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      );
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      // console.log('props:', props);
      return;
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
      <div>
        <Box
          ref={cellValueRef}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
        >
          {props.value}
        </Box>
        {/* {isCurrentlyOverflown && ( */}
          <>
            <Link
              href='/#/xp-log'
              onClick={handleClick}
            >
              View All
            </Link>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Paper elevation={1}>
                <Box 
                  width={width}
                  p={2}
                >
                  {props.value}
                </Box>
              </Paper>
            </Popover>
          </>
        {/* )} */}

      </div>
    )
  }
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'date',
      renderHeader: () => (
        <strong>{'Date'}</strong>
      ),
      minWidth: 100,
      flex: .4,
      editable: false,
      
    },
    {
      field: 'skill',
      renderHeader: () => (
        <strong>{'Skill'}</strong>
      ),
      minWidth: 120,
      flex: .8,
      editable: false,
    },
    {
      field: 'activity',
      renderHeader: () => (
        <strong>{'Activity'}</strong>
      ),
      minWidth: 130,
      flex: 1,
      editable: false,
    },
    {
      field: 'xp',
      renderHeader: () => (
        <strong>{'XP'}</strong>
      ),
      numer: true,
      minWidth: 50,
      flex: .2,
      editable: false,
    },
    {
      field: 'source',
      renderHeader: () => (
        <strong>{'Source'}</strong>
      ),
      minWidth: 130,
      flex: 1,
      editable: false,
      renderCell: RenderExpandSource
    },
    {
      field: 'takeaways',
      renderHeader: () => (
        <strong>{'Key Takeaways'}</strong>
      ),
      minWidth: 130,
      flex: 1,
      editable: false,
    },
  ];
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDeleteSelected = () => {
    console.log('ids to delete', selectedIds);
  }

  return (
    <Box sx={{ height: 540, width: '100%' }}>
      <DataGrid
        rows={userActivities}
        columns={columns}
        // rowHeight={50}
        // getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          setSelectedIds(ids)
        }}
      />
      <button onClick={handleDeleteSelected}>Delete Selected</button>
    </Box>
  );
}
