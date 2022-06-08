import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { environment } from '../../baseUrl/Api';
import { Details } from '@mui/icons-material';

function UploadSummary({ uploadSummary, alert, uuId, setAlert, handleClick, status }) {
    const { validationFailures, uploadFailures } = uploadSummary;

    const handleDownloadSummary = async () => {
        await axios.get(environment.BaseUrlToUpload + `sheetUploadStatusDownload/${uuId}`, {
            responseType: 'blob',
        })
            .then(response => {
                console.log(response.data);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'SummaryReport.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                handleClick("Something went wrong");
            });
    }


    return (
        <>
            <Dialog
                open={alert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Upload Summary Report :-"}
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <>
                            <Typography><span><b>Total Records</b></span> - {uploadSummary.totalRecords ? uploadSummary.totalRecords : "0"}</Typography>
                            <Typography><span><b>Validation Passed</b></span>  - {uploadSummary.validationPassed ? uploadSummary.validationPassed : "0"}</Typography>
                            <Typography><span><b>Success</b></span> - {uploadSummary.successfullyUploaded ? uploadSummary.successfullyUploaded : "0"}</Typography>
                            <Typography><span><b>Exception</b></span>  - {uploadSummary.failedToUpload ? uploadSummary.failedToUpload : "0"}</Typography>
                            {uuId ? (<Typography><span><b>Click Here To Download</b></span> - <Button variant="text" onClick={handleDownloadSummary}>Summary Report</Button></Typography>) : ''}
                            <Divider sx={{m:2}}></Divider>
                            {uploadFailures?.map((fail) => (
                                <>
                                    <Typography><span><b>PAN Number</b></span> - {fail.personalPanNumber ? fail.personalPanNumber : ""}</Typography>
                                    <Typography sx={{mb:2}}><span><b>Process Failure</b></span> - {fail.processFailure ? fail[fail.processFailure] : ""}</Typography>
                                </>
                            ))}
                            <Divider sx={{m:2}}></Divider>
                            {validationFailures?.map((valid) => {
                                let message = []
                                valid?.details?.map((data) => (
                                    message.push(data.message)
                                ))
                                return < Typography sx={{mb:2}}> <span><b>{valid._original.personalPanNumber}</b></span> : {message.join()} </Typography>
                            })}
                        </>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAlert(false)} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UploadSummary