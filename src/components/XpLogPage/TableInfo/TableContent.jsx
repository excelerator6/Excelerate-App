import { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import { Table, TableBody, TableRow, TableCell, TablePagination, TableContainer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function TableContent() {

  const dispatch = useDispatch();
  const userActivities = useSelector(store => store.userActivities);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3)

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
  }, [])

  const handleRequestSort = (event, property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  function descendingComparator(a, b, orderBy) {
    if(b[orderBy] < a[orderBy]) {
      return -1
    }
    if(b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a,b) => descendingComparator(a, b, orderBy)
      : (a,b) => -descendingComparator(a, b, orderBy)
  }

  const sortedUserActivities = (rowArray, comparator) => {
    const stabilizeRowArray = rowArray.map((el, index) => [el, index])
    stabilizeRowArray.sort((a,b) => {
      const order = comparator(a[0], b[0])
      if(order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizeRowArray.map((el) => el[0])
  }

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
          {
            sortedUserActivities(userActivities, getComparator(orderDirection, valueToOrderBy))
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
        </Table>
      </TableContainer>
      </div>
    )
  }
}