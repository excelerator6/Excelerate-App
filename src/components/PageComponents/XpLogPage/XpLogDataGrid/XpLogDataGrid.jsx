import { memo, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

/**
 * Function to check if the current "element's" contents are wider than allowed
 * @param {*} element What is being checked
 */
function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

/**
 * Allows the cell to display an ellipsis if it is wider than the current
 * computedWidth of that column. It will then allow the user to expand out that
 * column to view all of the information associated with that cell.
 */
const GridCellExpand = memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleCellClick = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }
    // Set up key listener to know if the user has clicked Esc to close out of the popup
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {document.removeEventListener('keydown', handleKeyDown)};
  }, [setShowFullCell, showFullCell]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    return;
  };

  return (
    <Box
      ref={wrapper}
      onClick={handleCellClick}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {value}
      </Box>
      {showPopper && (
        <>
          <Link
            href='/#/xp-log'
            onClick={handleClick}
          >
            View All
          </Link>
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        </>
      )}
    </Box>
  );
});

/**
 * @param {*} params The information being passed down to each column's cell.
 */
function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

/**
 * The header columns for the MUI DataGrid displaying the XpLog information
 * - This is an array of objects.
 */
const columns = [
  {
    field: 'date',
    renderHeader: () => (
      <strong>{'Date'}</strong>
    ),
    minWidth: 100,
    flex: .4,
    editable: false,
    renderCell: renderCellExpand,
  },
  {
    field: 'skill',
    renderHeader: () => (
      <strong>{'Skill'}</strong>
    ),
    minWidth: 120,
    flex: .8,
    editable: false,
    renderCell: renderCellExpand,
  },
  {
    field: 'activity',
    renderHeader: () => (
      <strong>{'Activity'}</strong>
    ),
    minWidth: 130,
    flex: 1,
    editable: false,
    renderCell: renderCellExpand,
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
    renderCell: renderCellExpand,
  },
  {
    field: 'source',
    renderHeader: () => (
      <strong>{'Source'}</strong>
    ),
    minWidth: 130,
    flex: 1,
    editable: false,
    renderCell: renderCellExpand,
  },
  {
    field: 'takeaways',
    renderHeader: () => (
      <strong>{'Key Takeaways'}</strong>
    ),
    minWidth: 130,
    flex: 1,
    editable: false,
    renderCell: renderCellExpand,
  },
];

/**
 * @returns MUI DataGrid containing the XpLog information
 */
export default function XpLogDataGrid() {
  const dispatch = useDispatch();
  const userActivities = useSelector(store => store.userActivities)
  const [logIDS, setLogIDS] = useState([]);
  const [checkboxShown, setCheckboxShown] = useState(false);
  // const [logSelected, setLogSelected] = useState(false);

  const deleteLogs = (id) => {
    dispatch({
      type: 'DELETE_LOGS',
      payload: id
    })
  }

  return (
    <>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: "row",
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ mb: 1 }}
          variant='outlined'
          onClick={() => {
            setCheckboxShown(!checkboxShown);
            // setDeleteBoxShown(!checkboxShown);
          }}
        >
            <Typography>
              Delete Logs
            </Typography>
        </Button>
        {
          checkboxShown ?
            <Typography ml={2} mb={1} color={red[300]}>
              - Select Logs You Wish To Delete
            </Typography>
            :
            ""
        }
        {
          logIDS.length !== 0 && checkboxShown ?
          <Button 
            variant='outlined' 
            color='error' 
            sx={{mb:1, ml:'auto', mr:0}}
            onClick = {() => deleteLogs(logIDS)}
          >
            Delete
          </Button>
          :
          ''
        }
      </Box>
      <Box sx={{ height: '74vh', width: '100%' }}>
        <DataGrid
          rows={userActivities}
          columns={columns}
          rowHeight={49}
          checkboxSelection={checkboxShown}
          // on log selection, need a delete button to show up and that delete button to send a dispatch to delete selected items.
          onRowSelectionModelChange={(id) => {
              // setLogSelected(!logSelected);
              setLogIDS(id);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>
      {/* {
        logSelected && checkboxShown ?
        <Button variant='outlined' color='error'>
          Delete
        </Button>
        :
        ''
      } */}
    </>
  );
}