import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';
import api from "../../config/configApi";

export const EditProfileImage = () => {
  

   const [image, setImage] = useState("");
   //utilizado quando buscamos a imagem da api
   const [endImg, setEndImg] = useState('');

   //utilizado q usar a imagem no localStorage
   //const [endImg, setEndImg] = useState(localStorage.getItem("image"));
   

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
        localStorage.setItem('image', response.data.image);
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


  useEffect(() => {
    const getUser = async () => {

        const headers = {
            'headers': {                
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.get("/view-profile", headers)
            .then((response) => {
                if (response.data.user) {
                    setEndImg(response.data.endImage);
                } else {
                    setStatus({
                        type: 'redWarning',
                        mensagem: "Erro: Usuário não encontrado!"
                    });
                }

            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'redWarning',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'redWarning',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            })
    }

    getUser();
}, []);
  
  return (
    <div>
      <Navbar />
      <div className="content">
          <Sidebar active="profile" />
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

        {image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" width="150" height="150" /> : <img src={endImg} alt="Imagem do usuário" width="150" height="150" />}
                <br /><br />

        {/*image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" width="150" height="150" /> : <img src={endImg} alt="Imagem do usuário" width="150" height="150" /> buscando do localstorage - tem q comentar o useEffect*/}

                

        * Campo obrigatório <br /><br />

        <button type="submit">Salvar</button>
      </form> 
    </div>
    </div>
  );
};
