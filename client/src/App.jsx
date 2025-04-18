// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom"; // No need for BrowserRouter here
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import ExploreStartUp from "./pages/ExploreStartUp";
<<<<<<< HEAD
import StartUpDetails from "./pages/StartUpDetails";

=======
import StartUpDetails from "./pages/StartupDetails";
import StartUpForm from "./pages/StartUpForm";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
>>>>>>> 0a604da0a4bad53e1438ccd7b1059b972bb1e573

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
