import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { environment } from "../../baseUrl/Api";
import { TextField } from "@mui/material";
import Pagination from "../allComponents/pagination";

const TotalData = [
  {
    id: 1,
    personalPanNumber: "CYDP4567H",
    aadharNumber: 784120147896,
    fullName: "Amit Vasantrao Pawar",
    mobileNumber: "9821629896",
    emailId: "apawar@analyticsfoxsoftwares.com",
  },
  {
    id: 2,
    personalPanNumber: "AVPPP5786L",
    aadharNumber: 784120147896,
    fullName: "Amit Vasantrao Pawar",
    mobileNumber: "9821629896",
    emailId: "apawar@analyticsfoxsoftwares.com",
  },
  {
    id: 3,
    personalPanNumber: "AVPPP5786L",
    aadharNumber: 784120147896,
    fullName: "Amit Vasantrao Pawar",
    mobileNumber: "9821629896",
    emailId: "apawar@analyticsfoxsoftwares.com",
  },
];

function Loan() {
  const [loanlist, setLoanList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    message: "Somthing went wrong",
    open: false,
  });

  const handleClick = (message) => {
    setState({ open: true, message: message });
  };

  //   const handlePagination = (page) => {
  //     const vals = {
  //       pagination: { pageNumber: page.pageNumber, pageSize: page.pageSize },
  //       search,
  //       filter,
  //     };
  //     handleTableData(vals);
  //   };

  //   const handleSearch = (searchTerm) => {
  //     setSearch(searchTerm);
  //     const vals = {
  //       pagination: { pageNumber: 1, pageSize: 10 },
  //       search: searchTerm,
  //       filter,
  //     };
  //     handleTableData(vals);
  //   };

  const handleTableData = (vals) => {
    //   URL: http://localhost:2022/api/kuliza/v1/uploadDataList?page=0&pageSize=10
    axios
      .get(
        environment.BaseUrlToUpload +
          `uploadDataList?page=${vals.pagination.pageNumber}&pageSize=${vals.pagination.pageSize}`
      )
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        handleClick(error.message);
      });
  };

  const handleSearch = (event) => {
    var lowerCase = event.target.value.toLowerCase();
    setSearch(lowerCase);
    TotalData.filter((response) => {
      if (event.target.value === "") {
        return response;
      }
      //return the item which contains the user input
      else {
        return response.personalPanNumber.toLowerCase().includes(lowerCase);
      }
    });
  };

  useEffect(() => {
    const vals = {
      pagination: { pageNumber: 1, pageSize: 10 },
    };
    handleTableData(vals);
  }, []);

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <div className="padding">
        <div className="bg_sky submit">
          <TextField
            id="outlined-basic"
            label="Search"
            onChange={(event) => handleSearch(event)}
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Pan Number</StyledTableCell>
                <StyledTableCell align="right">Aadhar Number</StyledTableCell>
                <StyledTableCell align="right">Full Name</StyledTableCell>
                <StyledTableCell align="right">MobileNumber</StyledTableCell>
                <StyledTableCell align="right">Email Id</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TotalData.map((row) => (
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {row.personalPanNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.aadharNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.mobileNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.emailId}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          pagination={pagination}
          // onChangePage={(paginate) => handlePagination(paginate)}
        />
      </div>
    </>
  );
}

export default Loan;
