import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import StartUpDetails from "./pages/StartupDetails"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/startd" element={<StartUpDetails />} />
    </Routes>
  );
}
