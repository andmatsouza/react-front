import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Context } from "../Context/AuthContext";


import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";

function PrivateRoute({ children }) {
  const { authenticated } = useContext(Context);
  return authenticated ? children : <Navigate to="/" />;  
}

export default function RoutesAdm() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      <Route
        exact
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />      
    </Routes>
  );
}
