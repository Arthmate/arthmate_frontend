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
    "fullName": "Ravinder Singh",
    "firstName": "Ravinder",
    "middlName": "Singh",
    "lastName": "Yadav",
    "fatherName": "Yadav Singh",
    "residentialPinCode": 283135,
    "residentialAddress": "Current residence addressCurrent residence addressCurrent residence addressCurrent residence",
    "residentialCity": "Indore",
    "residentialState": "Madhya Pradesh",
    "permanentAddress": "Permanent addressPermanent addressPermanent addressPermanent addressPermanent addressPermanent address",
    "residentialstatus": "Self",
    "personalPanNumber": "ADTPY2677D",
    "poaType": "Driving License",
    "poaNumber": "1212",
    "applicationDate": "2022-02-12T06:50:43.000Z",
    "mobileNumber": "8882568884",
    "dob": "1989-02-27T00:00:00.000Z",
    "emailId": "mailto:yadavrs999@gmail.com",
    "gender": "Male",
    "purpose": "Business",
    "industrySegment": "Infrastructure",
    "repaymentJson": "[{\"int\": 91.0, \"prin\": 607.0, \"emi_no\": 1, \"due_date\": \"2021-11-19\", \"emi_amount\": 773.0}, {\"int\": 91.0, \"prin\": 608.0, \"emi_no\": 2, \"due_date\": \"2021-12-20\", \"emi_amount\": 743.0}]",
    "installmentType": "EDI",
    "firstRepaymentDate": "2022-06-02",
    "allowPartialPeriodInterestCalcualtion": null,
    "principal": null,
    "numberOfRepayments": null,
    "repaymentEvery": null,
    "repaymentFrequencyType": null,
    "loanTermFrequency": null,
    "loanTermFrequencyType": null,
    "amortizationType": null,
    "interestCalculationPeriodType": null,
    "interestType": null,
    "activationDate": null,
    "submittedOnDate": null,
    "expectedDisbursementDate": null,
    "transactionProcessingStrategyId": null,
    "chargesTable": null,
    "disbursementData": null,
    "isEqualAmortization": null,
    "approvedOnDate": null,
    "isTransactional": null,
    "actualDisbursementDate": null,
    "paymentTypeId": null,
    "paymentTypeId2": null,
    "applyCharge": null,
    "repaymentMode": null,
    "approvedAmount": null,
    "loanType": null,
    "instrumentType": null,
    "text0": null,
    "text1": null,
    "text2": null,
    "text3": null,
    "text4": null,
    "numeric0": null,
    "numeric1": null,
    "numeric2": null,
    "numeric3": null,
    "numeric4": null,
    "date0": null,
    "date1": null,
    "date2": null,
    "date3": null,
    "date4": null,
    "boolean0": null,
    "boolean1": null,
    "boolean2": null,
    "boolean3": null,
    "boolean4": null,
    "kulizaBREResponse": "{\"message\":\"Request failed with status code 401\",\"name\":\"AxiosError\",\"config\":{\"transitional\":{\"silentJSONParsing\":true,\"forcedJSONParsing\":true,\"clarifyTimeoutError\":false},\"transformRequest\":[null],\"transformResponse\":[null],\"timeout\":0,\"xsrfCookieName\":\"XSRF-TOKEN\",\"xsrfHeaderName\":\"X-XSRF-TOKEN\",\"maxContentLength\":-1,\"maxBodyLength\":-1,\"env\":{},\"headers\":{\"Accept\":\"application/json, text/plain, */*\",\"Content-Type\":\"application/json\",\"authorization\":\"Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJoLURnV0E3bXFhUGpKd3BFeUtSSEFuSXFBSGFPSlAxRFRZX0FnT1lXWG5nIn0.eyJleHAiOjE2NTIzNTUzODYsImlhdCI6MTY1MjM1MzU4NiwianRpIjoiYjU4MTkwZTMtOTg2NS00OGQ5LWE2NjUtMDUzZjFiOTE3ZmMzIiwiaXNzIjoiaHR0cDovL2xtcy1pYW0tYXBwL2F1dGgvcmVhbG1zL2t1bGl6YV9yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1YmY5NDMyNS01Y2I5LTQ3ZTAtYTk2OS0xNzNiMTRlMmY1ZTUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJsZW5kaW5nIiwic2Vzc2lvbl9zdGF0ZSI6IjI2ZDAzMDRhLTA2OTktNGE3Yi04MGFjLTJkMTQ4NzZjMzg5ZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImxlbmRpbmciOnsicm9sZXMiOlsiY2VfYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwidXNlcl9pZCI6IjEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjZS11c2VyQGt1bGl6YS5jb20iLCJlbWFpbCI6ImNlLXVzZXJAa3VsaXphLmNvbSJ9.KKlugcGrY_y1v9lKCgPCILVQbdr33SvvlSTkSxo0Fmc-xxym2A8AZ6sNMaLLeWF5l332dvP85yhIlUVKR9ibeteJoXlgTLK98Gch5qVS_wyvVjdYSFEp_T0pZZb7y2sCMw0yNGhGV62Wtz4oJ_LoIQIUGd0_YX3EzPSo4Bw_j5zMOhan1JyfkC_9ZhfUUlR55-vaP20DZmGgg23D4rr-_GQdBU-2qEKahoen9iPyBgkhFbxV9QWY_TBXVCzQU0HqitbOcFSH789zeKLaFSZXUYYb3LX0lECnacW47wmNklSxyqijV3JQYT1RDt3kv_r28-xlRhfMUGpLI6JTasrhnw\",\"User-Agent\":\"axios/0.27.2\",\"Content-Length\":3880},\"method\":\"post\",\"url\":\"http://k8s-default-devingre-6cc6540f26-504905718.ap-south-1.elb.amazonaws.com/configurator/product/api/test/fire-rules\",\"data\":\"{\\\"inputData\\\":{\\\"partnerLoanId-String\\\":\\\"FTC_100\\\",\\\"fullName-String\\\":\\\"Ravinder Singh\\\",\\\"First_Name-String\\\":\\\"Ravinder\\\",\\\"middlName-String\\\":\\\"Singh\\\",\\\"lastName-String\\\":\\\"Yadav\\\",\\\"fatherName-String\\\":\\\"Yadav Singh\\\",\\\"residentialPinCode-Numerical\\\":283135,\\\"residentialAddress-String\\\":\\\"Current residence addressCurrent residence addressCurrent residence addressCurrent residence\\\",\\\"residentialCity-String\\\":\\\"Indore\\\",\\\"residentialState-String\\\":\\\"Madhya Pradesh\\\",\\\"permanentAddress-String\\\":\\\"Permanent addressPermanent addressPermanent addressPermanent addressPermanent addressPermanent address\\\",\\\"residentialstatus-String\\\":\\\"Self\\\",\\\"personalPanNumber-String\\\":\\\"ADTPY2677D\\\",\\\"poaType-String\\\":\\\"Driving License\\\",\\\"poaNumber-String\\\":1212,\\\"applicationDate-String\\\":\\\"2022-02-12 mailto:12:20:43\\\",\\\"mobilenumber-numerical\\\":8882568884,\\\"dob-string\\\":\\\"1989-02-27\\\",\\\"emailid-string\\\":\\\"yadavrs999@gmail.com\\\",\\\"gender-String\\\":\\\"Male\\\",\\\"purpose-String\\\":\\\"Business\\\",\\\"industrySegment-String\\\":\\\"Infrastructure\\\",\\\"businessType-String\\\":\\\"Bakery\\\",\\\"businessVintageOverall-Numerical\\\":36,\\\"businessAddress-String\\\":\\\"abc\\\",\\\"retailerName-String\\\":\\\"ABZ\\\",\\\"businessState-String\\\":\\\"Haryana\\\",\\\"businessCity-String\\\":\\\"Gurugram\\\",\\\"businessPinCode-Numerical\\\":110016,\\\"montlySales-Numerical\\\":120.2,\\\"monthlyNumberOfTransactions-Numerical\\\":100,\\\"shopActivityStatus-Numerical\\\":5.6,\\\"typeOfDisbursement-String\\\":\\\"Cash Transfer\\\",\\\"coBorrowerName-String\\\":\\\"Yadav Singh\\\",\\\"coApplicantPan-String\\\":\\\"ADTPY2677D\\\",\\\"coApplicantDob-String\\\":\\\"1989-04-28\\\",\\\"coApplicantAadhar-Numerical\\\":1212,\\\"gstNumber-String\\\":\\\"121212121212\\\",\\\"shopStatus-String\\\":\\\"owned\\\",\\\"maritalStatus-String\\\":\\\"Married\\\",\\\"aadharNumber-Numerical\\\":\\\"111122223333\\\",\\\"annualIncome-Numerical\\\":200000,\\\"dailyIncome-Numerical\\\":1000.11,\\\"bureauScore-Numerical\\\":750,\\\"coApplicantScore-Numerical\\\":735,\\\"partnerScore-Numerical\\\":200.21,\\\"bankName-String\\\":\\\"State Bank of India\\\",\\\"bankAccountHolderName-String\\\":\\\"ABC test\\\",\\\"bankAccountType-String\\\":\\\"Savings\\\",\\\"bankAccountNumber-String\\\":\\\"123456789123456\\\",\\\"ifscCode-String\\\":\\\"HSCS1123322\\\",\\\"programType-String\\\":\\\"POS\\\",\\\"medianOfBankingTransaction-Numerical\\\":100.1,\\\"averageOfBankingTransaction-Numerical\\\":100.5,\\\"productType-String\\\":\\\"TopUp\\\",\\\"loanAmount-Numerical\\\":350000,\\\"tenureMonths-Numerical\\\":24,\\\"tenureDays-Numerical\\\":24,\\\"installmentsOrTenor-Numerical\\\":2,\\\"interestRateMonthly-Numerical\\\":4,\\\"interestRate-Numerical\\\":32,\\\"processingFeeIncludingGst-Numerical\\\":2.5,\\\"upfrontInterestForFirstMonth-Numerical\\\":100.1,\\\"processingFee-Numerical\\\":300,\\\"gstOnProcessingFee-Numerical\\\":20.6,\\\"additionalCharges-Numerical\\\":120.9,\\\"insuranceAmount-Numerical\\\":1200,\\\"disbursementAmount-Numerical\\\":348500,\\\"brokenPeriodInterest-Numerical\\\":15.5,\\\"panImage-String\\\":\\\"Pan\\\",\\\"poaFront-String\\\":\\\"Aadhar Front\\\",\\\"poaBack-String\\\":\\\"Aadhar Back\\\",\\\"selfieImage-String\\\":\\\"Photo.jpg\\\",\\\"coApplicantPanImage-String\\\":\\\"Pan\\\",\\\"coApplicantPoaFront-String\\\":\\\"Aadhar Front\\\",\\\"coApplicantPoaBack-String\\\":\\\"Aadhar Back\\\",\\\"coApplicantSelfie-String\\\":\\\"Photo.jpg\\\",\\\"retailerShopPhotoInside-String\\\":\\\"Photo.jpg\\\",\\\"retailerShopPhotoOutside-String\\\":\\\"Photo.jpg\\\",\\\"aadhaarCardDoc-String\\\":\\\"Aadhar\\\",\\\"agreementS3Path-String\\\":\\\"Agreement\\\",\\\"sanctionLetterPdf-String\\\":\\\"Sanction\\\",\\\"businessVintageProof-String\\\":\\\"Business Vintage proof\\\",\\\"moa-String\\\":\\\"MOA\\\",\\\"aoa-String\\\":\\\"AOA\\\",\\\"kycDirector-String\\\":\\\"KYC(Zip File)\\\",\\\"businessProofS3Path-String\\\":\\\"Electricity Bill.pdf\\\",\\\"agreementPdf-String\\\":\\\"Agreement\\\",\\\"soaFile-String\\\":\\\"Bank Statement\\\",\\\"poiValidation-String\\\":\\\"VERIFIED\\\",\\\"poaValidation-String\\\":\\\"VERIFIED\\\",\\\"residenceVerification-String\\\":\\\"[Yes / No / Verified / Not Verified]\\\",\\\"businessVerification-String\\\":\\\"[Yes / No / Verified / Not Verified]\\\",\\\"repaymentJson-String\\\":\\\"[{\\\\\\\"int\\\\\\\": 91.0, \\\\\\\"prin\\\\\\\": 607.0, \\\\\\\"emi_no\\\\\\\": 1, \\\\\\\"due_date\\\\\\\": \\\\\\\"2021-11-19\\\\\\\", \\\\\\\"emi_amount\\\\\\\": 773.0}, {\\\\\\\"int\\\\\\\": 91.0, \\\\\\\"prin\\\\\\\": 608.0, \\\\\\\"emi_no\\\\\\\": 2, \\\\\\\"due_date\\\\\\\": \\\\\\\"2021-12-20\\\\\\\", \\\\\\\"emi_amount\\\\\\\": 743.0}]\\\",\\\"installmentType-String\\\":\\\"EDI\\\",\\\"firstRepaymentDate-String\\\":\\\"2022-06-02\\\"},\\\"productIds\\\":[\\\"e83f4a66-9300-4674-b317-868166f873d0\\\"]}\"},\"code\":\"ERR_BAD_REQUEST\",\"status\":401}",
    "userCreationResponse": "{}",
    "loanCreationResponse": null,
    "loanApproveResponse": null,
    "loanDisbursementResponse": null,
    "repaymentResponse": null,
    "remark": null,
    "createdBy": null,
    "updatedBy": null,
    "isProcessSuccess": null,
    "processFailure": null,
    "createdAt": "2022-05-12T12:01:23.000Z",
    "updatedAt": "2022-05-12T12:01:24.000Z"

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
