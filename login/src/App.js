import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Route from "./routes/routersAdm";

import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div>
      {/* //Authprovider recebe os children (todas as rotas - import Route from "./routes/routersAdm") */}
      <AuthProvider>
        <Router>
          <Route />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
