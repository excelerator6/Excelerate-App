import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Link } from '@mui/material';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('props:', props);
    return;
  };

  return (
    <Box
      ref={wrapper}
      onClick={handleMouseEnter}
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

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
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

export default function RenderExpandCellGrid() {
  const userActivities = useSelector(store => store.userActivities)
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={userActivities} columns={columns} />
    </div>
  );
}