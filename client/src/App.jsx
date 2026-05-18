import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AboutDevelopers from "./components/AboutDevelopers";
import MyBooking from "./components/MyBooking";
import EditBooking from "./components/EditBooking";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutDevelopers />} />
        <Route path="/mybooking" element={<MyBooking />} />
        <Route path="/editbooking" element={<EditBooking />} />
        <Route path="/search" element={<Search />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;