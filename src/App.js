import React, { useState, useEffect } from 'react';
import Login from './components/login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import './App.css';
import Upload from './components/upload/Upload';
import Loan from './components/loan/loan';
// import Main from './components/main/Main';

function App() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setToken(token);
  }, [token])
  return (
    <>
      {!token &&
        (<Routes>
          <Route
          exact
            path="/"
            element={<Login authenticate={() => setToken(true) }/>}
          />
        </Routes>)}
      {token &&
        <Box sx={{ display: 'flex' }}>
          <Dashboard logout={() => setToken(false) }/>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              {/* <Route
                exact
                path="/dashboard"
                element={<Main/>}
              /> */}
              <Route
                exact
                path="/upload"
                element={<Upload />}
              />
              <Route
                exact
                path="/uploadSummary"
                element={<Loan />}
              />
              <Route path="*" element={<Navigate to={token ? '/upload' : "/"} />}></Route>
            </Routes>
          </Box>
        </Box>
      }
    </>
  );
}

export default App;
