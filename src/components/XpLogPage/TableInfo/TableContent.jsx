import { useState } from "react";
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

  const handleRequestSort = (event, property) => {
    const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? 'desc' : 'asc')
  }

  if (userActivities && userActivities.length > 0) {
    return (
      <TableContainer>
        <Table>
          <TableHeader
            valueToOrderBy={valueToOrderBy}
            orderDirection={orderDirection}
            handleRequestSort={handleRequestSort}
          />
        </Table>
      </TableContainer>
    )
  }
}