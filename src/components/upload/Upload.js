import React, { useState, useRef, useEffect } from "react";
import { Button, Divider, Box } from "@mui/material";
import { Input } from "@mui/material";
import "./Upload.css";
import { Card, CardContent, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { environment } from "../../baseUrl/Api";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    id: 1,
    partnerName: "FtCash",
    products: [
      {
        id: 1,
        partnerName: "UBL",
        breId: "1",
      },
    ],
  },
  {
    id: 2,
    partnerName: "Bhartpe",
    products: [
      {
        id: 1,
        partnerName: "UBL",
        breId: "2",
      },
    ],
  },
];

function Upload() {
  let resetRef = useRef();
  const [currency, setCurrency] = useState("Select");
  const [productName, setProductName] = useState("Select");
  const [product, setProduct] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [userData, setUserData] = useState("");

  const [state, setState] = useState({
    message: "Somthing went wrong",
    open: false,
  });

  const { vertical, horizontal, open, message } = state;

  const handleDropdownValue = (event) => {
    setCurrency(event.target.value);
    console.log("value", event.target.value);
    let productValue = currencies.find(
      (o) => o.partnerName === event.target.value
    );

    setProduct(productValue.products);

    console.log("productValue", productValue);
  };

  const handleProductDropdown = (event) => {
    setProductName(event.target.value);
  };

  const handleClick = (message) => {
    setState({ open: true, message: message });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const reset = () => {
    resetRef.reset();
  };

  console.log("currency", currency);
  const handleSubmit = async (event) => {
    event.preventDefault();
    var validExts = new Array(".xlsx", ".xls");
    var fileExt = selectedFile.name;
    fileExt = fileExt ? fileExt.substring(fileExt.lastIndexOf(".")) : "";
    if (validExts.indexOf(fileExt) < 0) {
      handleClick(
        "Select valid files are of " + validExts.toString() + " types."
      );
      return false;
    } else {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("masterSheet", selectedFile);
        const access_token = userData.access_token;
        await axios
          .post(environment.BaseUrlToUpload + `uploadMasterSheet`, formData)
          .then((response) => {
            const message = response.data.message;
            handleClick(message);
          })
          .catch((error) => {
            handleClick(error.message);
          });
      }
    }
  };

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUserData(data);
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} ref={(el) => (resetRef = el)}>
            <Box
              component="form"
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
                value={currency}
                onChange={handleDropdownValue}
                helperText="Partner Name"
              >
                {currencies.map((option) => (
                  <MenuItem key={option.partnerName} value={option.partnerName}>
                    {option.partnerName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                label="Product Type"
                value={productName}
                onChange={handleProductDropdown}
                helperText="Product Type"
                disabled={currency === "Select"}
              >
                {product.map((option) => (
                  <MenuItem key={option.partnerName} value={option.partnerName}>
                    {option.partnerName}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ m: 1, mb: 2 }}>
              <strong className="upload-text">Upload a .xlsx File:</strong>
              <Input
                className="upload-input"
                type="file"
                onChange={handleChange}
              >
                Choose
              </Input>
            </Box>
            <Stack spacing={6} direction="row" sx={{ m: 1 }}>
              <Button variant="contained" type="submit">
                Upload file
              </Button>
              <Button variant="contained" color="error" onClick={reset}>
                Reset
              </Button>
            </Stack>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
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

export default Upload;
