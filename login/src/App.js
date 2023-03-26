import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Route from "./routes/routersAdm";

import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Route />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
