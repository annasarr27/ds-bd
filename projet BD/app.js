import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Exam from './pages/Exam';
import Submission from './pages/Submission';
import Results from './pages/Results';
import Statistics from './pages/Statistics';

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;