import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import ExploreStartUp from "./pages/ExploreStartUp";
import StartUpDetails from "./pages/StartUpDetails";


export default function App() {
  return (
  <>
  <Navbar/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explorestartups" element={<ExploreStartUp />} />
        <Route path="/startupdetails" element={<StartUpDetails />} />
      </Routes>

      </>
  );
}
