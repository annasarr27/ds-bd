
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './navbar';
import Footer from './footer';
import Login from './login';
import Dashboard from './dashboard';
import Exam from './exam';
import Submission from './submission';
import Results from './results';
import Statistics from './teacherstatistics';
import Home from './acceuil';
import Signup from './signup';
import TeacherBoard from "./teacherboard";
import TeacherExam from "./teacherexams";
import TeacherSubmissions from "./teachersubmissions";
import TeacherCorrections from "./teachercorrections";
import TeacherValidation from "./teachervalidation";
import TeacherStatistics from "./teacherstatistics";



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
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacherboard" element={<TeacherBoard />} />
        <Route path="/teacherexams" element={<TeacherExam />} />
        <Route path="/teachersubmissions" element={<TeacherSubmissions />} />
        <Route path="/teachercorrections" element={<TeacherCorrections />} />
        <Route path="/teachervalidation" element={<TeacherValidation />} />
        <Route path="/teacherstatistics" element={<TeacherStatistics />} />
      




      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;