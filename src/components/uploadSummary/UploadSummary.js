import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Button, Typography, MenuItem } from '@mui/material';

function UploadSummary({ uploadSummary, alert, setAlert }) {

    return (
        <>
            <Dialog
                open={alert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Upload Summary Report :-"}
                </DialogTitle>
                <Divider></Divider>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>Total Records - {uploadSummary.totalRecords? uploadSummary.totalRecords : "0"}</Typography>
                        <Typography>Success - {uploadSummary.successfullyUploaded? uploadSummary.successfullyUploaded : "0"}</Typography>
                        <Typography>Exception - {uploadSummary.failedToUpload? uploadSummary.failedToUpload : "0"}</Typography>
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
