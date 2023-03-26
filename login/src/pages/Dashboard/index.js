import React, {useContext} from 'react';
//import { useLocation } from "react-router-dom";

import { Context} from '../../Context/AuthContext';

export const Dashboard = () => {
  const token = localStorage.getItem('token');

  const { authenticated, handleLogout } = useContext(Context);
  console.log("Situação do usuário na página dashboard: " + authenticated);

  return(
    <div>
      <h1>Dashboard</h1>
      <p>Token: {token}</p>
      <button type='button' onClick={handleLogout}>Sair</button>
    </div>
  );
}