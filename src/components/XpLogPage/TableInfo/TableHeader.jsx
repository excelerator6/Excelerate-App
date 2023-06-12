import React from "react";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";

export default function TableHeader({valueToOrderBy, orderDirection}) {

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key='date'
        >
          <TableSortLabel
            active={valueToOrderBy === 'date'}
            direction={valueToOrderBy === 'date' ? orderDirection:'asc'}
            // onClick={createSortHandler('date')}
          >
            Date
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='skill'
        >
          <TableSortLabel
            active={valueToOrderBy === 'skill'}
            direction={valueToOrderBy === 'skill' ? orderDirection:'asc'}
            // onClick={createSortHandler('skill')}
          >
            Skill
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='activity'
        >
          <TableSortLabel
            active={valueToOrderBy === 'activity'}
            direction={valueToOrderBy === 'activity' ? orderDirection:'asc'}
            // onClick={createSortHandler('activity')}
          >
            Activity
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='xp'
        >
          <TableSortLabel
            active={valueToOrderBy === 'xp'}
            direction={valueToOrderBy === 'xp' ? orderDirection:'asc'}
            // onClick={createSortHandler('xp')}
          >
            XP
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='source'
        >
          <TableSortLabel
            active={valueToOrderBy === 'source'}
            direction={valueToOrderBy === 'source' ? orderDirection:'asc'}
            // onClick={createSortHandler('source')}
          >
            Source
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='key-takeaways'
        >
          <TableSortLabel
            active={valueToOrderBy === 'key-takeaways'}
            direction={valueToOrderBy === 'key-takeaways' ? orderDirection:'asc'}
            // onClick={createSortHandler('key-takeaways')}
          >
            Key Takeaways
          </TableSortLabel>
        </TableCell>

      </TableRow>
    </TableHead>
  )
}