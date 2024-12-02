import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEmployee from './components/AddEmployee';
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/add-employee" element={<AddEmployee/>}/>
            </Routes>
        </Router>
    );
}

export default App;
