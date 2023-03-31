import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from 'yup';

import {Menu} from '../../components/Menu';
import api from "../../config/configApi";

export const EditProfile = () => {
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const editProfile = async (e) => {
    e.preventDefault();

    //if (!validate()) return;
    //se retornar tue segue o processamento, se retornar false para o processamento
    if (!(await validate())) return;     

    const headers = {
      herders: {
        Authorizaton: "Bearer " + localStorage.getItem("token"),
      },
    };

    await api
      .put("/edit-profile", { name, email }, headers)
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
      email: yup.string("Erro: Necessário preencher o campo e-mail1!")
      .email("Erro: Necessário preencher o campo e-mail1!")
      .required("Erro: Necessário preencher o campo e-mail1!"),
      name: yup.string("Erro: Necessário preencher o campo nome1!")
      .required("Erro: Necessário preencher o campo nome1!")
      
    });
    
  try {
    await schema.validate({name, email});
    return true;
} catch (err) {      
    setStatus({type: 'error', mensagem: err.errors });
    return false;
}
  }
  
  return (
    <div>
      <Menu />
     
      <h1>Editar Perfil</h1>

      <Link to="/users" reloadDocument><button type="button">Listar</button></Link>{" "}     
      <br />

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

      <form onSubmit={editProfile}>
        <label>Nome*:</label>
        <input
          type="text"
          name="name"
          placeholder="Nome completo do usuário"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label>E-mail*:</label>
        <input
          type="email"
          name="email"
          placeholder="Melhor e-mail do usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />       

        * Campo obrigatório <br /><br />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};
