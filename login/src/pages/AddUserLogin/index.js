import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from 'yup';

//conexão com API
import api from "../../config/configApi";

export const AddUserLogin = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

  const addUser = async e => {

    e.preventDefault();
    
    //se retornar tue segue o processamento, se retornar false para o processamento
    if (!(await validate())) return;     

    const headers = {
      'headers': {
        'Content-Type': 'application/json',       
      }
    }

    await api.post('/add-user-login', user, headers)
    .then((response) => {          
        setStatus({
          type: 'redSuccess',
          mensagem: response.data.mensagem 
        });
    }).catch((err) => {
      if (err.response.data.erro) {         
        setStatus({
          type: 'error',
          mensagem: err.response.data.mensagem 
        });
      }else{          
        setStatus({
          type: 'error',
          mensagem: "Erro: Tente mais tarde!" 
        });
      }
    })
  }

  async function validate() {
    let schema = yup.object({
      password: yup.string("Erro: Necessário preencher o campo senha1!")
      .required("Erro: Necessário preencher o campo senha1!")
      .min(6,"Erro: A senha deve ter no mínimo 6 caracteres1!"),
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
    <div className="d-flex">
      <div className="container-login">
      <div className="wrapper-login">
      <div className="title">
                <span>Cadastrar Usuário</span>
      </div>
      
      {status.type === "redSuccess" ? (
        <Navigate
          to="/"
          state={{
            type: "success",
            mensagem: status.mensagem,
          }}
        />
      ) : (
        ""
      )}

      <form onSubmit={addUser} className="form-login">

      {status.type === "error" ? (
        <p className="alert-danger">{status.mensagem}</p>
      ) : (
        ""
      )}
        <div className="row">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="name"
          placeholder="Nome completo do usuário"
          onChange={valueInput}
        />
        </div>
        <div className="row" >
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Melhor e-mail do usuário"
          onChange={valueInput}
        />
        </div>
        <div className="row">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Senha para acessar o sistema"
          autoComplete="on"
          onChange={valueInput}
        />
        </div>
        
        <div className="row button">
        <button type="submit" className='button-login'>Cadastrar</button>
        </div>
        <div className="signup-link">
        <Link to="/" className='link-pg-login'>Login</Link>
        </div>
      </form>
     
      </div>
      </div>
    </div>
  );
};
