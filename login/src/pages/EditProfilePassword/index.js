import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from 'yup';

import {Menu} from '../../components/Menu';
import api from "../../config/configApi";

export const EditProfilePassword = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(''); 
  
 
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const editProfilePassword = async (e) => {
    e.preventDefault();
    
    //se retornar tue segue o processamento, se retornar false para o processamento
    if (!(await validate())) return;     

    const headers = {
      herders: {
        Authorizaton: "Bearer " + localStorage.getItem("token"),
      },
    };
   // console.log("password" + password);

    await api
      .put("/edit-profile-password", { password }, headers)
      .then((response) => {        
        setStatus({
          type: "redSuccess",
          mensagem: response.data.mensagem,
        });
      })
      .catch((err) => {
        if (err.response.data.erro) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        } else {
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tarde!",
          });
        }
      });
  };

  useEffect(() => {
    const getUser = async () => {
      const headers = {
        herders: {
          Authorizaton: "Bearer " + localStorage.getItem("token"),
        },
      };
      await api
        .get("/view-profile", headers)
        .then((response) => {
          if (response.data.user) {
            setName(response.data.user.name);
            setEmail(response.data.user.email);
          } else {
            setStatus({
              type: "redWarning",
              mensagem: "Erro: Usuário não encontrado!",
            });
          }
        })
        .catch((err) => {
          if (err.response.data.erro) {
            setStatus({
              type: "redWarning",
              mensagem: err.response.data.mensagem,
            });
          } else {
            setStatus({
              type: "redWarning",
              mensagem: "Erro: Tente mais tarde!",
            });
          }
        });
    };
    getUser();
  }, []);

  async function validate() {
    let schema = yup.object({

      password: yup.string("Erro: Necessário preencher o campo senha1!")
      .required("Erro: Necessário preencher o campo senha1!")
      .min(6,"Erro: A senha deve ter no mínimo 6 caracteres1!")
      
    });
    
  try {
    await schema.validate({password});
    return true;
} catch (err) {      
    setStatus({type: 'error', mensagem: err.errors });
    return false;
}
  }
  
  return (
    <div>
      <Menu />
     
      <h1>Editar Senha</h1>

      
      <Link to="/view-profile" reloadDocument><button type="button">Perfil</button></Link>{" "}    
      

      {status.type === "redWarning" ? (
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

      {status.type === "redSuccess" ? (
        <Navigate
          to="/view-profile"
          state={{
            type: "success",
            mensagem: status.mensagem,
          }}
        />
      ) : (
        ""
      )}

      {status.type === "error" ? (
        <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
      ) : (
        ""
      )}

      <hr />

      <form onSubmit={editProfilePassword}>

      <label>Nome: {name}</label><br /> 
      <label>E-mail: {email}</label><br /> <br /> 

      <label>Senha*:</label>
        <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={text => setPassword(text.target.value)} />
        <br />
        <br />       

        * Campo obrigatório <br /><br />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
