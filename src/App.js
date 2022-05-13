import React,{useEffect} from 'react';
import Login from './components/login/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        {/* <Route 
        path="*"
        component={NoMatch} /> */}
      </Routes>
    </div>
  );
}

export default App;
