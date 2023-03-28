import React, {useContext} from 'react';
import { Link } from "react-router-dom";

import { Context} from '../../Context/AuthContext';

export const Dashboard = () => {
 

  const { authenticated, handleLogout } = useContext(Context);
  console.log("Situação do usuário na página dashboard: " + authenticated);

  return(
    <div>

      <Link to="/dashboard">Dashboard</Link><br />
      <Link to="/users">Usuários</Link><br />
      <h1>Dashboard</h1>
      
      <button type='button' onClick={handleLogout}>Sair</button>
    </div>
  );
}