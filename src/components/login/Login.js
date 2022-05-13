import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../copyright/CopyRight';
import { useNavigate } from 'react-router-dom';
import { environment } from '../../baseUrl/Api';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';


const theme = createTheme();

export default function SignIn() {
  const [loginData, setLoginData] = useState();
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCedentials = {
      email: data.get('email'),
      password: data.get('password'),
    };
    if (userCedentials.email !== "" && userCedentials.password !== "") {
      axios.post(environment.BaseUrl + '/auth/login', userCedentials)
        .then(response => {
          const result = response.data.data;
          setLoginData(result);
          localStorage.setItem("user", JSON.stringify(result));
          if(result){
            navigate('/dashboard');
          }else{
            navigate('/');
          }
          handleClick(response.data.message);
        })
        .catch(error => {
          handleClick(error.message);
        });
    }else{
      handleClick(" Please Enter Username and Password")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mt: 2, border: '1px solid grey' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <img src="/images/arthmate.jpeg"></img>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}