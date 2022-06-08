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
import UploadSummary from '../uploadSummary/UploadSummary';
import Loader from '../utils/Loader';

function Upload() {
    let resetRef = useRef();
    const [uploadSummary, setUploadSummary] = useState('');
    const [currency, setCurrency] = useState('');
    const [loader, setLoader] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [userData, setUserData] = useState('');
    const [alert, setAlert] = useState(false);
    const [uuId, setUuId] = useState('');
    const [partner, setPartner] = useState("");
    const [product, setProduct] = useState('')
    const [productName, setProductName] = useState([])
    const [partnerData, setPartnerData] = useState([]);
    const [status, setStatus] = useState('');
    const [state, setState] = useState({
        message: 'Somthing went wrong',
        open: false
    });

    const { access_token } = userData;
    const { vertical, horizontal, open, message } = state;


    const getDetailPartner = async () => {
        console.log(environment.BaseUrlToUpload+ `detailedPartners`,"url");
        await axios.get(environment.BaseUrlToUpload + `detailedPartners`)
            .then(response => {
                const res = response.data.body;
                setPartnerData(res);
            })
            .catch(error => {
                handleClick("Somthing went wrong");
            });
    }


    const handleDropdownValue = (event) => {
        event.preventDefault();
        setPartner(event.target.value);
        let productValue = partnerData?.find((val) => val.id === event.target.value);
        setProductName(productValue.product)
    };

    const handleProductDropdown = (event) => {
        setProduct(event.target.value);
    };

    const handleClick = (message) => {
        setState({ open: true, message: message });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const reset = () => {
        resetRef.reset();
        setProduct('');
        setPartner('');
    };

    const handleChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const handleAlert = (value) => {
        setAlert(value);
        reset();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoader(true);
        if (!partner && !product) {
            handleClick("Please Select Partner Name and Product Type");
            setLoader(false);
        } else {
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
                    formData.append('productId', product);
                    formData.append('partnerId', partner);
                    await axios.post(environment.BaseUrlToUpload + `uploadMasterSheet`, formData)
                        .then(response => {
                            const status = response.data.status;
                            const body = response.data.body;
                            const uuid = response.data.uuid;
                            if (response.data.status === true) {
                                setUuId(uuid);
                                setUploadSummary(body);
                                setSelectedFile('');
                                setLoader(false);
                                setAlert(true);
                            } else {
                                setUploadSummary(body);
                                setStatus(status);
                                setSelectedFile('');
                                setAlert(true);
                                handleClick(response.data.message);
                                setLoader(false);
                            }
                        })
                        .catch(error => {
                            handleClick(error.message);
                            setLoader(false);
                        });
                }
            }
        }
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUserData(data);
        getDetailPartner();
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
                                "& .MuiTextField-root": { m: 1, mb: 3, width: "25ch" },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Partner Name"
                                value={partner}
                                onChange={handleDropdownValue}
                                helperText="Select Partner Name"
                            >
                                {partnerData?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.partnerName}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Product Type"
                                value={product}
                                onChange={handleProductDropdown}
                                helperText="Select Product Type"
                                disabled={currency === "Select"}
                            >
                                {productName?.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ m: 1 }}>
                            <strong className="upload-text">Upload a .xlsx File:</strong>
                            <Input className="upload-input" type="file" onChange={handleChange}>Choose</Input>
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
                uuId={uuId}
                setAlert={handleAlert}
                handleClick={handleClick}
                status={status}
            />
        </>
    );
}

export default Upload;
