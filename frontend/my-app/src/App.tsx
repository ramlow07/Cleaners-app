import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import Header from "./components/homepage/Header";
import CleanerProfile from "./components/cleanerProfile/profilePage";
import CleanerList from "./components/cleanerList/cleanerList";
// TODO: @COMPONENTS: REGISTER AND HOME PAGE.

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/cleanerlist" element={<CleanerList />} />
        <Route path="/cleanerprofile" element={<CleanerProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
