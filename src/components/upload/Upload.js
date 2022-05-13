import React, { useState, useRef, useEffect } from 'react'
import { Button, Divider, Box, TextField, MenuItem } from '@mui/material';
import { Input } from '@mui/material';
import './Upload.css'
import { Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { environment } from '../../baseUrl/Api';
import Snackbar from '@mui/material/Snackbar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import UploadSummary from '../uploadSummary/UploadSummary';
import Loader from '../utils/Loader';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

function Upload() {
    let resetRef = useRef();
    const [uploadSummary, setUploadSummary] = useState('');
    const [currency, setCurrency] = useState('');
    const [loader, setLoader] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [userData, setUserData] = useState('');
    const [checked, setChecked] = useState(false);
    const [alert, setAlert] = useState(false);
    const [state, setState] = useState({
        message: 'Somthing went wrong',
        open: false
    });

    const { access_token } = userData;
    const { vertical, horizontal, open, message } = state;


    const handleDropdownValue1 = (event) => {
        setCurrency(event.target.value);
    };

    const handleDropdownValue2 = (event) => {
        setCurrency(event.target.value);
    };

    const handleCheckbox = (event) => {
        setChecked(event.target.checked);
    };

    const handleClick = (message) => {
        setState({ open: true, message: message });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const reset = () => {
        resetRef.reset();
        setChecked(false);
    };

    const handleChange = event => {
        setSelectedFile(event.target.files[0])
    };

    const handleAlert = (value) => {
        setAlert(value);
        reset();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);
        var validExts = new Array(".xlsx", ".xls");
        var fileExt = selectedFile.name;
        fileExt = fileExt ? fileExt.substring(fileExt.lastIndexOf('.')) : '';
        if (validExts.indexOf(fileExt) < 0) {
            setLoader(false);
            handleClick("Select valid files are of " +
                validExts.toString() + " types.");
            return false;
        }
        else {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('masterSheet', selectedFile);
                formData.append('access_token', access_token);
                formData.append('hitSuccessBre', checked);
                await axios.post(environment.BaseUrlToUpload + `uploadMasterSheet`, formData)
                    .then(response => {
                        const body = response.data.body;
                        setUploadSummary(body);
                        setSelectedFile('');
                        setLoader(false);
                        setAlert(true);
                    })
                    .catch(error => {
                        handleClick(error.message);
                        setLoader(false);
                    });
            }
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUserData(data);
    }, [])

    return (
        <>
            {loader && (
                <Loader />
            )}
            <Card >
                <CardContent>
                    <form onSubmit={handleSubmit} ref={(el) => resetRef = el}>
                        <Box
                            sx={{
                                '& .MuiTextField-root': { m: 1, mb: 3, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Partner Name"
                                value={currency}
                                // onChange={handleDropdownValue1}
                                helperText="Select Partner"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Product Type"
                                value={currency}
                                // onChange={handleDropdownValue2}
                                helperText="Select Product"
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <strong className="upload-text">Upload a .xlsx File:</strong>
                            <Input className="upload-input" type="file" onChange={handleChange}>Choose</Input>
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheckbox}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label='Hit Success BRE'
                            />
                        </Box>
                        <Stack spacing={6} direction="row" sx={{ m: 1 }}>
                            <Button variant="contained" type='submit'>Upload file</Button>
                            <Button variant="contained" color="error" onClick={reset}>
                                Reset
                            </Button>
                        </Stack>
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
                    </form>
                </CardContent>
            </Card>
            <UploadSummary
                uploadSummary={uploadSummary}
                alert={alert}
                setAlert={handleAlert}
            />
        </>
    );
}

export default Upload
