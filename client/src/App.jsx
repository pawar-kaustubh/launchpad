import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import ExploreStartUp from "./pages/ExploreStartUp";
import StartUpDetails from "./pages/StartUpDetails";
import StartUpForm from "./pages/StartUpForm";

import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explorestartups" element={<ExploreStartUp />} />
        <Route path="/startupdetails" element={<StartUpDetails />} />
        <Route path="/startupform" element={<StartUpForm />} />

        <Route element={<PrivateRoute />}>
           <Route path='/profile' element={<Profile />} />
         </Route>
      </Routes>
    </>
  );
}
