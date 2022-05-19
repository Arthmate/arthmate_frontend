import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import axios from 'axios';
import { environment } from '../../baseUrl/Api';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom';

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

export default function CustomizedTables() {
    const params = useParams();
    const [listingData, setListingData] = useState('');
    const [state, setState] = useState({
        message: 'Somthing went wrong',
        open: false
    });
    const { vertical, horizontal, open, message } = state;
    const {id} = params;


    const handleClick = (message) => {
        setState({ open: true, message: message });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const getListingData = async () => {
        await axios.get(environment.BaseUrlToUpload + `uploadDetails/${id}`)
            .then(response => {
                const res = response.data.body;
                setListingData(res);
                handleClick(response.data.message);
            })
            .catch(error => {
                handleClick(error.message);
            });
    }

    useEffect(() => {
        getListingData();
    }, [])

    return (
        <>
            <Typography sx={{ pb: 2 }}>Summary Details :</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableBody>
                        { listingData && (
                            Object.keys(listingData).map((key, i) => (
                                listingData[key] !== null ?
                                    (
                                        <TableRow key={i}>
                                            <TableCell sx={{ fontWeight: "bold" }} align="left">{key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}</TableCell>
                                            <TableCell align="left">{listingData[key]}</TableCell>
                                        </TableRow>
                                    ) :
                                    ""
                            )))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </>
    );
}
