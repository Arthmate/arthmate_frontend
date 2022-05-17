import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const sampleJSON = {
    "object": {
        "name": "Pluralsight",
        "number": 1,
        "address": "India",
        "website": "https://www.pluralsight.com/"
    }
}

const rows = {
    "id": 1,
    "fileUniqueId": "b188c46a-4340-4f5a-9814-021f4db4887a",
    "partnerLoanId": "FTC_100",
    "bgdvjeb": null
}

export default function CustomizedTables() {
    return (
        <>
            <Typography sx={{ pb: 2 }}>Summary Details :</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                        {
                            Object.keys(rows).map((key, i) => (
                                rows[key] !== null ? 
                                (
                                    <TableRow key={i}>
                                    <TableCell sx={{ fontWeight: "bold" }} align="left">{key}</TableCell>
                                    <TableCell align="left">{rows[key]}</TableCell>
                                </TableRow>
                                ):
                                ""
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
