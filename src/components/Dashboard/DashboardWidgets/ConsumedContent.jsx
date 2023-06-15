

// mui components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


function ConsumedContent() {

    return(
        <>
            <h2>Content</h2>
            <TableContainer>
                <Table size='small' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Content</TableCell>
                            <TableCell align="center">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    )
}
export default ConsumedContent;