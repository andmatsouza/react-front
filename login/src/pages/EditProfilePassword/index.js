import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";

import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import api from "../../config/configApi";

export const EditProfilePassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      password: yup
        .string("Erro: Necessário preencher o campo senha1!")
        .required("Erro: Necessário preencher o campo senha1!")
        .min(6, "Erro: A senha deve ter no mínimo 6 caracteres1!"),
    });

    try {
      await schema.validate({ password });
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
              <span className="title-content">Editar Senha Perfil</span>
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
              <form onSubmit={editProfilePassword} className="form-adm">
                <label>Nome: {name}</label>
                <br />
                <label>E-mail: {email}</label>
                <br /> <br />

                <div className="row-input">
                  <div className="column">
                    <label class="title-input">Senha</label>
                    <input
                      type="password"
                      name="password"
                      className="input-adm"
                      placeholder="Senha para acessar o sistema"
                      autoComplete="on"
                      onChange={(text) => setPassword(text.target.value)}
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
