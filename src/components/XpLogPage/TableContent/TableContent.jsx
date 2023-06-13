import { useEffect, useState } from "react";
import TableHeader from "./TableComponents/TableHeader";
// import { Table, TableBody, TableRow, TableCell, TablePagination, TableContainer, TableFooter } from "@mui/material";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, TableFooter } from "@mui/material";
import CustomTablePagination from "./TableComponents/CustomTablePagination";
import { useDispatch, useSelector } from "react-redux";

export default function TableContent() {

  const dispatch = useDispatch();
  const userActivities = useSelector(store => store.userActivities);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
  }, [])

  const handleRequestSort = (event, property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
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

  const sortedUserActivities = (array, comparator) => {
    const stabilizedArray = array.map((el, index) => [el, index]);
    stabilizedArray.sort((a,b) => {
      const order = comparator(a[0], b[0]);
      if(order !== 0) {
        return order;
      }
      return a[1] - b[1];
    })
    return stabilizedArray.map((el) => el[0]);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value), 10)
    setPage(0)
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userActivities.length) : 0;

  if (userActivities && userActivities.length > 0) {
    return (
      <div>
      <TableContainer>
        <Table>
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? sortedUserActivities(userActivities, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedUserActivities(userActivities, getComparator(orderDirection, valueToOrderBy))
              )
              .map((event) => {
                return (
                  <TableRow key={event.id}>
                    <TableCell>
                      {event.date}
                    </TableCell>
                    <TableCell>
                      {/*
                        If there is a skills_enterprise_name show that,
                        else show the skills_user_name
                      */}
                      {event.skills_enterprise_name ?
                        event.skills_enterprise_name
                        : event.skills_user_name
                      }
                    </TableCell>
                    <TableCell>
                      {event.activity_name}
                    </TableCell>
                    <TableCell>
                      {event.xp_value}
                    </TableCell>
                    <TableCell>
                      {event.source}
                    </TableCell>
                    <TableCell>
                      {event.key_takeaways}
                    </TableCell>
                  </TableRow>
                )
              })
            }
            {/* Add empty rows to the table to avoid jumps in table height when at the last page */}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <CustomTablePagination
                rowsPerPageOptions={[5,10, {label: 'All', value: -1}]}
                colSpan={6}
                count={userActivities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
        </TableFooter>
        </Table>
      </TableContainer>

      </div>
    )
  }
}