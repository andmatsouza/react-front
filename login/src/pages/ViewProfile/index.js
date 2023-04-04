import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import api from "../../config/configApi";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";

export const ViewProfile = () => {
  const { state } = useLocation();

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
        .get("/view-profile", headers)
        .then((response) => {
          if (response.data.user) {
            setEndImg(response.data.endImage);
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
      <Navbar />
      <div className="content">
        <Sidebar active="profile" />

        <div className="wrapper">
          <div className="row">
            <div className="top-content-adm">
              <span className="title-content">Visualizar Perfil</span>
              <div className="top-content-adm-right">
                <Link to="/edit-profile" reloadDocument>
                  <button type="button" className="btn-warning">
                    Editar
                  </button>
                </Link>{" "}
                <Link to="/edit-profile-password" reloadDocument>
                  <button type="button" className="btn-warning">
                    Editar Senha
                  </button>
                </Link>{" "}
                <Link to="/edit-profile-image" reloadDocument>
                  <button type="button" className="btn-warning">
                    Editar Imagem
                  </button>
                </Link>{" "}
              </div>
            </div>

            <div className="alert-content-adm">
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
                <p className="alert-success">{status.mensagem}</p>
              ) : (
                ""
              )}
            </div>

            <div class="content-adm">
              <div class="view-det-adm">
                <span class="view-adm-title">Imagem:</span>
                <span class="view-adm-info">
                  {
                    <img
                      src={endImg}
                      alt="Imagem do usuário"
                      width="150"
                      height="150"
                    />
                  }
                </span>
              </div>

              <div class="view-det-adm">
                <span class="view-adm-title">ID:</span>
                <span class="view-adm-info">{data.id}</span>
              </div>

              <div class="view-det-adm">
                <span class="view-adm-title">Nome:</span>
                <span class="view-adm-info">{data.name}</span>
              </div>

              <div class="view-det-adm">
                <span class="view-adm-title">E-mail:</span>
                <span class="view-adm-info">{data.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
