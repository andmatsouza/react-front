import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
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
        localStorage.setItem("name", name);
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
      email: yup
        .string("Erro: Necessário preencher o campo e-mail1!")
        .email("Erro: Necessário preencher o campo e-mail1!")
        .required("Erro: Necessário preencher o campo e-mail1!"),
      name: yup
        .string("Erro: Necessário preencher o campo nome1!")
        .required("Erro: Necessário preencher o campo nome1!"),
    });

    try {
      await schema.validate({ name, email });
      return true;
    } catch (err) {
      setStatus({ type: "error", mensagem: err.errors });
      return false;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="content">
        <Sidebar active="profile" />

        <div className="wrapper">
          <div className="row">
            <div className="top-content-adm">
              <span className="title-content">Editar Perfil</span>
              <div className="top-content-adm-right">
                <Link to="/view-profile" reloadDocument>
                  <button type="button" className="btn-warning">
                    Visualizar
                  </button>
                </Link>{" "}
              </div>
            </div>

            <div className="alert-content-adm">
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
                <p className="alert-danger">{status.mensagem}</p>
              ) : (
                ""
              )}
            </div>

            <div className="content-adm">
              <form onSubmit={editProfile} className="form-adm">
                <div className="row-input">
                  <div className="column">
                    <label className="title-input">Nome</label>
                    <input
                      type="text"
                      name="name"
                      className="input-adm"
                      placeholder="Nome completo do usuário"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row-input">
                  <div className="column">
                    <label className="title-input">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      className="input-adm"
                      placeholder="Melhor e-mail do usuário"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-success">Salvar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
