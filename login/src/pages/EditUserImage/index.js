import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';
import api from '../../config/configApi';
import { servDeleteUser } from '../../services/servDeleteUser';

export const EditUserImage = (props) => {

    const [image, setImage] = useState('');
    const { id } = useParams();
    const [endImg, setEndImg] = useState('');


    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/edit-user-image/" + id, formData, headers)
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

    useEffect(() => {
        const getUser = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/user/" + id, headers)
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
    }, [id]);

    const deleteUser = async (idUser) => {
        const response = await servDeleteUser(idUser);
        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
            });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="content">
          <Sidebar active="users"/>

          <div className="wrapper">
          <div className="row">

          <div className="top-content-adm">
              <span className="title-content">Editar Imagem Ususário</span>
              <div className="top-content-adm-right">
                <Link to="/users" reloadDocument>
                  <button type="button" className="btn-info">
                    Listar
                  </button>
                </Link>{" "}
                <Link to={"/view-user/" + id} reloadDocument>
                  <button type="button" className="btn-warning">
                    Visualizar
                  </button>
                </Link>{" "}
                <Link to={"#"}>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => deleteUser(id)}
                  >
                    Apagar
                  </button>{" "}
                </Link>
              </div>
            </div>
           

            {status.type === "redWarning" ? (
            <Navigate
            to="/users"
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
            to={"/view-user/" + id}
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
            <form onSubmit={editUser}>
                <label>Imagem*: </label>
                <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /><br /><br />
                
                {image ? <img src={URL.createObjectURL(image)} alt="Imagem do usuário" width="150" height="150" /> : <img src={endImg} alt="Imagem do usuário" width="150" height="150" />}
                <br /><br />

                * Campo obrigatório<br /><br />

                <button type="submit">Salvar</button>
            </form>

            </div>
            </div>


            </div>
        </div>
    )
}