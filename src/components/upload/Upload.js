import React, { useState, useRef } from 'react'
import { Button, Divider } from '@mui/material';
import { Input } from '@mui/material';
import './Upload.css'
import { Card, CardContent, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { environment } from '../../baseUrl/Api';
import Snackbar from '@mui/material/Snackbar';

function Upload() {
    let resetRef = useRef();
    const [selectedFile, setSelectedFile] = useState('');

    const [state, setState] = useState({
        message: 'Somthing went wrong',
        open: false
      });
    
      const { vertical, horizontal, open, message } = state;
    
      const handleClick = (message) => {
        setState({ open: true, message: message });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };

    const reset = () => {
        resetRef.reset();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        var validExts = new Array(".xlsx", ".xls");
        var fileExt = selectedFile.name;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0) {
            alert("Invalid file selected, valid files are of " +
                validExts.toString() + " types.");
            return false;
        }
        else {
            if (selectedFile) {
                const formData = new FormData();
                formData.append(
                    'masterSheet',
                    selectedFile
                );
                await axios.post(environment.BaseUrlToUpload + 'uploadMasterSheet', formData)
                    .then(response => {
                        const message = response.data.message;
                        handleClick(message)
                    })
                    .catch(error => {
                        handleClick( error.message );
                    });
            }
        }
    };

    const handleChange = event => {
        setSelectedFile(event.target.files[0])
    };

    return (
        <>
            <Card >
                <CardContent>
                    <form onSubmit={handleSubmit} ref={(el) => resetRef = el}>
                        <div>
                            <strong className="upload-text">Upload a .xlsx File:</strong>
                            <Input className="upload-input" type="file"  onChange={handleChange}>Choose</Input>
                        </div>
                        <Stack spacing={6} direction="row">
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
        </>
    );
}

export default Upload
