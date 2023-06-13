import { TableBody, TableCell, TableRow } from '@mui/material'

export default function XpLogTableBody({emptyRows, dense, sortedUserActivities}) {
  return (
    <TableBody>
      {sortedUserActivities.map((event) => {
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
            <TableCell align="left">{event.key_takeaways}</TableCell>
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