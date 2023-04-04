import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from 'yup';

import api from '../../config/configApi';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';


export const AddUser = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  });

  const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

  const addUser = async e => {

    e.preventDefault();
    //if (!validate()) return;
    //se retornar tue segue o processamento, se retornar false para o processamento
    if (!(await validate())) return;

    const headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authrization': 'Bearer ' + localStorage.getItem('token')
      }
    }

    await api.post('/user', user, headers)
      .then((response) => {
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem
        });
      }).catch((err) => {
        if (err.response.data.erro) {
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem
          });
        } else {
          setStatus({
            type: 'error',
            mensagem: "Erro: Tente mais tarde!"
          });
        }
      })
  }

  /*function validate() {
    if(!user.name) return setStatus({type: 'error', mensagem: "Erro: Necessário preencher o campo nome1!"
    });
    if(!user.email) return setStatus({type: 'error', mensagem: "Erro: Necessário preencher o campo email1!"
    });
    if(!user.password) return setStatus({type: 'error', mensagem: "Erro: Necessário preencher o campo senha1!"
    });
    if (user.password < 6) return setStatus({type: 'error', mensagem: "Erro: A senha precisa ter pelo menos seis caracteres1!"
  });

    return true;
  }*/

  async function validate() {
    let schema = yup.object({
      password: yup.string("Erro: Necessário preencher o campo senha1!")
        .required("Erro: Necessário preencher o campo senha1!")
        .min(6, "Erro: A senha deve ter no mínimo 6 caracteres1!"),
      email: yup.string("Erro: Necessário preencher o campo e-mail1!")
        .email("Erro: Necessário preencher o campo e-mail1!")
        .required("Erro: Necessário preencher o campo e-mail1!"),
      name: yup.string("Erro: Necessário preencher o campo nome1!")
        .required("Erro: Necessário preencher o campo nome1!")

    });

    try {
      await schema.validate({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return true;
    } catch (err) {
      setStatus({
        type: 'error',
        mensagem: err.errors
      });
      return false;
    }
  }

  return (
    <div>
      <Navbar />
      <div className="content">
        <Sidebar active="users" />

        <div className="wrapper">
          <div className="row">

            <div className="top-content-adm">
              <span className="title-content">Cadastrar Usuário</span>
              <div className="top-content-adm-right">
                <Link to="/users" reloadDocument>
                  <button type="button" className="btn-info">Listar</button>
                </Link>
              </div>
            </div>

            <div className="alert-content-adm">
              {status.type === "error" ? (
                <p className="alert-danger">{status.mensagem}</p>
              ) : (
                ""
              )}
              {status.type === 'success' ?

                <Navigate to="/users" state={{
                  type: "success",
                  mensagem: status.mensagem
                }} />

                : ""}
            </div>

            <div className="content-adm">
              <form onSubmit={addUser} className="form-adm">
                <div className="row-input">
                  <div className="column">
                    <label className="title-input">Nome</label>
                    <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" onChange={valueInput} />
                  </div>
                </div>

                <div className="row-input">                

                  <div className="column">
                    <label className="title-input">E-mail</label>
                    <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail do usuário" onChange={valueInput} />
                  </div>
                  
                  <div className="column">
                    <label class="title-input">Senha</label>
                    <input type="password" name="password" id="password" className="input-adm" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} />
                  </div>
                  
                </div>
                <button type="submit" className="btn-success">Cadastrar</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}