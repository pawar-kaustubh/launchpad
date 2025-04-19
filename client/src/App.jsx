import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import ExploreStartUp from "./pages/ExploreStartUp";
import StartUpDetails from "./pages/StartUpDetails";
import StartUpForm from "./pages/StartUpForm";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import InvestorForm from "./pages/InvestorForm";
import UpdateStartup from "./pages/UpdateStartup";
// import StartupDashboard from "./pages/StartupDashboard";

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
        <Route path="/investorform" element={<InvestorForm />} />
        <Route path="/login" element={<Login/>} />
        <Route element={<PrivateRoute />}>
           <Route path='/profile' element={<Profile />} />
         </Route>
         <Route
             path='/startup/:startupId'
             element={<UpdateStartup />}
           />
      </Routes>
    </>
  );
}
