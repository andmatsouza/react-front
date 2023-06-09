import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { servDeleteUser } from '../../services/servDeleteUser';

import api from '../../config/configApi';
import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';

export const Users = () => {

  const { state } = useLocation();
  //console.log(state);

  const [data, setData] = useState([]);
  const [page, setPage] = useState("");
  const [lastPage, setLastPage] = useState("");


  const[status, setStatus] = useState({
    type: state ? state.type : "",
    mensagem: state ? state.mensagem : ""
  })

  const getUsers = async (page) => {
    if(page === undefined){
      page = 1;
    }
    setPage(page);
    const headers = {
      'headers': {
          'Authorization': "Bearer " + localStorage.getItem('token')          
      }
    }
    await api.get("/users/" + page, headers)
    .then((response) => {      
      setData(response.data.users);
      setLastPage(response.data.lastPage);      
    }).catch((err) => {
      if(err.response){
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem
        });      
      }else{        
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde!"
        })  
      }
    })

  }  

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (idUser) => {
    const response = await servDeleteUser(idUser);

    if(response){
        setStatus({ type: response.type, mensagem: response.mensagem });
        getUsers();
    }else{
        setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!"
        });
    }
}

  return(   

<div>
      <Navbar/>
    <div className="content">
          <Sidebar active="users"/>

          <div class="wrapper">
          <div class="row">
          <div class="top-content-adm">
            <span class="title-content">Listar Usuários</span>
            <div class="top-content-adm-right">
              <button type="button" class="btn-success">Cadastrar</button>
            </div>
          </div>
          </div>

          </div>
      
      <h1>Listar Usuários</h1>
      <Link to="/add-user">Cadastrar</Link><br /><hr />
      {status.type === 'error' ? <p>{status.mensagem}</p> : ""}
      {status.type === 'success' ? <p>{status.mensagem}</p> : ""}

      <hr />

      {data.map(user => (
        <div key={user.id}>
          <span>{user.id}</span><br />
          <span>{user.name}</span><br />
          <span>{user.email}</span><br /><br />
          <Link to={"/view-user/" + user.id}><button type="button">Visualizar</button></Link>{" "}
          <Link to={"/edit-user/" + user.id}><button type="button">Editar</button></Link>{" "}
          <Link to={"#"}><button type="button" onClick={() => deleteUser(user.id)}>Apagar</button></Link>
          <hr />
        </div>
        
      ))}

        {page !== 1 ? <button type="button" onClick={() => getUsers(1)}>Primeira</button> : <button type="button" disabled>Primeira</button>}{" "}

        {page !== 1 ? <button type="button" onClick={() => getUsers(page - 1)}>{page -1}</button> : ""}{" "}

        <button type="button" disabled>{page}</button>{" "}

        {page + 1 <= lastPage ? <button type="button" onClick={() => getUsers(page + 1)}>{page + 1}</button> : ""}{" "}

        {page !== lastPage ? <button type="button" onClick={() => getUsers(lastPage)}>Última</button> : <button type="button" disabled>Última</button>}{" "}

    
    </div>
  </div>
  );
}