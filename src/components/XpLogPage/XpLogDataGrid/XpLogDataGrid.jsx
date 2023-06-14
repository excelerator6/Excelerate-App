import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";

const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'skill',
    headerName: 'Skill',
    width: 150,
    editable: false,
  },
  {
    field: 'activity',
    headerName: 'Activity',
    width: 110,
    editable: false,
  },
  {
    field: 'xp',
    headerName: 'XP',
    numer: true,
    width: 110,
    editable: false,
  },
  {
    field: 'source',
    headerName: 'Source',
    width: 110,
    editable: false,
  },
  {
    field: 'takeaways',
    headerName: 'Key Takeaways',
    width: 110,
    editable: false,
  },
];

export default function XpLogDataGrid() {
  const userActivities = useSelector(store => store.userActivities);
  console.log(userActivities);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={userActivities}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}