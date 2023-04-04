import React, {useContext } from "react";
import {Context} from '../../Context/AuthContext';
import { Link } from "react-router-dom";

export const Sidebar = () => {
   const { handleLogout } = useContext(Context);

  return (
    <div id="barsSidebar" className="sidebar">
      <Link to="/dashboard" reloadDocument className="sidebar-nav active">
        <i className=" icon fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </Link>

      <Link to="/users" reloadDocument className="sidebar-nav">
        <i className="icon fas fa-users"></i>
        <span>Usuários</span>
      </Link>      

      <Link to="/view-profile" reloadDocument className="sidebar-nav">
        <i className="icon fas fa-user"></i>
        <span>Perfil</span>
      </Link>     

      <Link to="#" onClick={handleLogout} className="sidebar-nav">
        <i className="icon fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </Link>
    </div>
  );
};
