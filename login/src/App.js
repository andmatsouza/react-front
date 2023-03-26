import React from "react";
import { BrowserRouter, Routes, Route,} from "react-router-dom";

import { Login } from "./pages/Login";
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
