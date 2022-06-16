import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, Button, Typography, MenuItem } from "@mui/material";
import axios from "axios";
import { environment } from "../../baseUrl/Api";
import { Details } from "@mui/icons-material";

function UploadSummary({
  uploadSummary,
  alert,
  uuId,
  setAlert,
  handleClick,
  status,
}) {
  const { validationFailures, failures, successes } =
    uploadSummary;

  const handleDownloadSummary = async () => {
    await axios
      .get(environment.BaseUrlToUpload + `sheetUploadStatusDownload/${uuId}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "SummaryReport.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        handleClick("Something went wrong");
      });
  };

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
            <Typography>
              <span>
                <b>Total Records</b>
              </span>{" "}
              - {uploadSummary.totalRecords ? uploadSummary.totalRecords : "0"}
            </Typography>
            <Typography>
              <span>
                <b>Validation Passed </b>(Data Format and Unique Partner Id)
              </span>{" "}
              -{" "}
              {uploadSummary.validationPassed
                ? uploadSummary.validationPassed
                : "0"}
            </Typography>
            <Typography>
              <span>
                <b>Success</b>
              </span>{" "}
              -{" "}
              {uploadSummary.fullyProcessed
                ? uploadSummary.fullyProcessed
                : "0"}
            </Typography>
            <Typography>
              <span>
                <b>Exception</b>
              </span>{" "}
              - {uploadSummary.totalRecords - uploadSummary.fullyProcessed}
            </Typography>
            {uuId ? (
              <Typography>
                <span>
                  <b>Click Here To Download</b>
                </span>{" "}
                -{" "}
                <Button variant="text" onClick={handleDownloadSummary}>
                  Summary Report
                </Button>
              </Typography>
            ) : (
              ""
            )}
            {failures?.length > 0 ? <Divider sx={{ m: 2 }}></Divider> : ""}
            {failures?.map((fail) => (
              <>
                <Typography>
                  <span>
                    <b>Partner Loan Id</b>
                  </span>{" "}
                  - {fail.partnerLoanId ? fail.partnerLoanId : ""}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <span>
                    <b>Process Failure</b>
                  </span>{" "}
                  - {fail.processFailure ? fail[fail.processFailure] : ""}
                </Typography>
              </>
            ))}
            {validationFailures?.length > 0 ? (
              <Divider sx={{ m: 2 }}></Divider>
            ) : (
              ""
            )}
            {validationFailures?.map((item) => {
              console.log(item);
              if (item.validationResponse) {
                return (
                  <>
                    <Typography sx={{ mb: 2 }}>
                      <span>
                        <b>{item.partnerLoanId}</b>
                      </span>{" "}
                      :- <span>{item.validationResponse}</span>
                    </Typography>
                  </>
                );
              } else {
                let valid = item;
                let message = [];
                valid?.details?.map((data) => message.push(data.message));
                return (
                  <>
                    <Typography sx={{ mb: 2 }}>
                      <span>
                        <b>{item._original.partnerLoanId}</b>
                      </span>{" "}
                      :- <span>{message.join()}</span>
                    </Typography>
                  </>
                );
              }
            })}
            {successes?.length > 0 ? <Divider sx={{ m: 2 }}></Divider> : ""}
            {successes?.map((success) => (
              <>
                <Typography>
                  <span>
                    <b>Partner Loan Id</b>
                  </span>{" "}
                  - {success.partnerLoanId ? success.partnerLoanId : ""}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  <span>
                    <b>Last Stage</b>
                  </span>{" "}
                  -{" "}
                  {success.loanDisbursementResponse
                    ? "Loan Approved Successfully - " +
                      JSON.parse(success.loanCreationResponse).data
                        .outputVariables.loanNumber +
                      "(Loan Number)"
                    : success.loanApproveResponse
                    ? "Loan Approved Successfully - " +
                      JSON.parse(success.loanCreationResponse).data
                        .outputVariables.loanNumber +
                      "(Loan Number)"
                    : success.loanCreationResponse
                    ? "Loan Created Successfully - " +
                      JSON.parse(success.loanCreationResponse).data
                        .outputVariables.loanNumber +
                      "(Loan Number)"
                    : success.userCreationResponse
                    ? "Client Created Successfully - " +
                      JSON.parse(success.userCreationResponse).data
                        .outputVariables.clientNumber +
                      "(Client Number)"
                    : success.kulizaBREResponse
                    ? "BRE Passed Successfully - " + success.kulizaBREResponse
                    : success.validationResponse
                    ? success.validationResponse
                    : success[success.processFailure]}
                </Typography>
              </>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlert(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadSummary;