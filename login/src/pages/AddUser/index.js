import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from 'yup';

import api from '../../config/configApi';
import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';


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

    const valueInput = e => setUser({...user, [e.target.name]: e.target.value});

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
        }else{          
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

  return(
    <div>
       <Navbar />
       <div className="content">
          <Sidebar /> 
      <h1>Cadastrar Usuário</h1>
      <Link to="/users" reloadDocument><button type="button">Listar</button></Link><br /> 
      
      {status.type === 'error' ? <p style={{color: "#ff0000"}}>{status.mensagem}</p> : ""}
      {status.type === 'success' ?

      <Navigate to="/users" state={{
        type: "success",
        mensagem: status.mensagem
      }} />

     : ""}
     <hr />
      <form onSubmit={addUser}>
        <label>Nome*:</label>
        <input type="text" name="name" placeholder="Nome completo do usuário" onChange={valueInput} /><br /><br />

        <label>E-mail*:</label>
        <input type="email" name="email" placeholder="Melhor e-mail do usuário" onChange={valueInput} /><br /><br />

        <label>Senha*:</label>
        <input type="password" name="password" placeholder="Senha para acessar o sistema" autoComplete="on" onChange={valueInput} /><br /><br />

        * Campo obrigatório <br /><br />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
    </div>
  )
}