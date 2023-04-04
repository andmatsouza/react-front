import React, { useEffect, useState } from "react";
import { Link,Navigate, useLocation } from "react-router-dom";

import api from "../../config/configApi";
import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';

export const ViewProfile = () => {

  const { state } = useLocation()

  const [data, setData] = useState("");
  const [endImg, setEndImg] = useState("");


  //se o state for true pega do state.type do componente Navigate do EditProfile (success)
  const [status, setStatus] = useState({
    type: state ? state.type : "",
    mensagem: state ? state.mensagem : "",
  });  

  useEffect(() => {
    const getUser = async () => {
      const headers = {
        herders: {
          Authorizaton: "Bearer " + localStorage.getItem("token"),
        },
      };
      await api
        .get("/view-profile" , headers)
        .then((response) => {          
          if (response.data.user) {            
            setEndImg(response.data.endImage)
            setData(response.data.user);
          } else {
            setStatus({
              type: "redErro",
              mensagem: "Erro: Perfil não encontrado!",
            });
          }
        })
        .catch((err) => {
          if (err.response.data.erro) {
            setStatus({
              type: "redErro",
              mensagem: err.response.data.mensagem,
            });
          } else {
            setStatus({
              type: "redErro",
              mensagem: "Erro: Tente mais tarde!",
            });
          }
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="content">
          <Sidebar active="profile"/>
      <h1>Perfil</h1>
      <Link to="/edit-profile" reloadDocument><button type="button">Editar</button></Link>{" "} 
      <Link to="/edit-profile-password" reloadDocument><button type="button">Editar Senha</button></Link>{" "} 
      <Link to="/edit-profile-image" reloadDocument><button type="button">Editar Imagem</button></Link>{" "} 
     
      {status.type === "redErro" ? (
        <Navigate
          to="/login"
          state={{
            type: "error",
            mensagem: status.mensagem,
          }}
        />
      ) : (
        ""
      )}


      {status.type === "success" ? (
        <p style={{ color: "green" }}>{status.mensagem}</p>
      ) : (
        ""
      )}
      <hr />
      <span>{data.id}</span>
      <br />
      <span>{<img src={endImg} alt="Imagem do usuário" width="150" height="150" />}</span>
      <br />
      <span>{data.name}</span>
      <br />
      <span>{data.email}</span>
      <br />
    </div>
    </div>
  );
};
