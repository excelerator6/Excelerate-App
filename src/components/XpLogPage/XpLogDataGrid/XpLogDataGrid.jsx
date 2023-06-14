import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";

const columns = [
  // { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'date',
    renderHeader: () => (
      <strong>{'Date'}</strong>
    ),
    minWidth: 100,
    flex: .4,
    editable: true,
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
    minWidth: 30,
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

export default function XpLogDataGrid() {
  const userActivities = useSelector(store => store.userActivities);
  console.log(userActivities);
  return (
    <Box sx={{ height: 540, width: '100%' }}>
      <DataGrid
        rows={userActivities}
        columns={columns}
        getRowHeight={() => 'auto'}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}