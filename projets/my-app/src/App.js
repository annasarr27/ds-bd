
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './navbar';
import Footer from './footer';
import Login from './login';
import Dashboard from './dashboard';
import Exam from './exam';
import Submission from './submission';
import Results from './results';
import Statistics from './statistics';
import Home from './acceuil';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/submission" element={<Submission />} />
        <Route path="/results" element={<Results />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;