import React, {useContext} from "react";
import {Context} from '../../Context/AuthContext'; 

import { Link } from "react-router-dom";

export const Menu = () => {

  const { handleLogout } = useContext(Context);

  return(
    <div>
      <Link to="/dashboard"reloadDocument>Dashboard</Link>{" "}
      <Link to="/users" reloadDocument>Usuários</Link>{" "}
      <Link to="/view-profile" reloadDocument>Perfil</Link>{" "}      
      <Link to="#" onClick={handleLogout}>Sair</Link><br />      
    </div>
  ) 
}