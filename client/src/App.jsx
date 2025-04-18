import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import SignIn from "./pages/SignIn";
import Card from "./components/Card";

export default function App() {
  return (
  
      <Routes>
         <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/card" element={<Card />} />
        </Route>

      </Routes>
  
  );
}
