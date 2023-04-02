import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import {Menu} from '../../components/Menu';
import api from "../../config/configApi";

export const EditProfileImage = () => {
  

   const [image, setImage] = useState("");

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const editProfileImage = async (e) => {
    e.preventDefault();

    //recuperando a imagem
    const formData = new FormData();
    formData.append('image', image);
        

    const headers = {
      herders: {
        Authorizaton: "Bearer " + localStorage.getItem("token"),
      },
    };

    await api
      .put("/edit-profile-image", formData, headers)
      .then((response) => {
        setStatus({
          type: "redSuccess",
          mensagem: response.data.mensagem,
        });
      })
      .catch((err) => {
        if (err.response) {
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
          });
        } else { //cai aqui quando a api estiver offline
          setStatus({
            type: "error",
            mensagem: "Erro: Tente mais tardeeeeeee!",
          });
        }
      });
  };
  
  return (
    <div>
      <Menu />
     
      <h1>Editar Foto Perfil</h1>      

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

      <form onSubmit={editProfileImage}>
        <label>Imagem*:</label>
        <input
          type="file"
          name="image" 
          onChange={e => setImage(e.target.files[0])}         
          
        />
        <br />
        <br />

        * Campo obrigatório <br /><br />

        <button type="submit">Salvar</button>
      </form> 
    </div>
  );
};
