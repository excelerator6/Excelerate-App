import { TableBody, TableCell, TableRow } from '@mui/material'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function XpLogTableBody(props) {
  const userActivities = useSelector(store => store.userActivities);

  const {
    page, dense, order,
    orderBy, rowsPerPage,
  } = props

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userActivities.length) : 0;

  const sortedUserActivities = useMemo(
    () =>
      stableSort(userActivities, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );
  return (
    <TableBody>
      {sortedUserActivities.map((event) => {
        console.log(event);
        return (
          <TableRow
            hover
            key={event.id}
          >
            <TableCell align="left">{event.date}</TableCell>
            <TableCell align="left">{event.skill}</TableCell>
            <TableCell align="left">{event.activity}</TableCell>
            <TableCell align="right">{event.xp}</TableCell>
            <TableCell align="left">{event.source}</TableCell>
            <TableCell align="left">{event.takeaways}</TableCell>
            <TableCell align="left">{event.id}</TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}