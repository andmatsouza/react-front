import React, { useState } from 'react';

//substituiu a useHistory
import { Link, Navigate } from "react-router-dom";

//conexão com API
import  api from '../../config/configApi';

export const RecoverPassword = () =>{
   
    //hook usado para setar valores em um objeto
    const [user, setUser] = useState({
        email: '',
        url: 'http://localhost:3001/update-password/'        
    });

    const [status, setStatus] = useState({
        type: "",
        mensagem: "",
        loading: false,
    });

    //função usada para setar valores nos campos do formulario
    const valorInput = e => setUser({...user, [e.target.name]: e.target.value});

    //função usada para enviar valores do formulario p API
    const recoverPass = async e => {

        e.preventDefault();
       // console.log(user.password);
       setStatus({
        loading: true
       });

       const headers = {
        'Content-Type': 'application/json'
       }
       //requisição post p API
       await api.post("/recover-password", user, {headers})
       .then((response) => {        
        setStatus({  
            type: 'redSuccess',          
            mensagem: response.data.mensagem,            
            loading: false
        });       
       }).catch((err) => {
        if(err.response){          
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
            loading: false
        });
        }else{          
          setStatus({
            type: 'error',
            mensagem: "Erro: tente mais tarde!",
            loading: false
        });
        }
        
       })
    }

    return(
        <div className="d-flex">
        <div className="container-login">
        <div className="wrapper-login">
        <div className="title">
            <span>Recuperar Senha</span>
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

            <form onSubmit={recoverPass} className="form-login">

                {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                {status.loading ? <p className="alert-success">Validando...</p> : ""}

                <div className="row">
                <label className="label-add-cad">E-mail</label>
                <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} />
                </div>
                <div className="row button">
                {status.loading ? <button type="submit" className='button-login' disabled>Enviando...</button> : <button type="submit" className='button-login'>Enviar</button>}
                </div>  
                <div className="signup-link">
                <Link to="/add-user-login" className='link-pg-login'>Cadastrar</Link>{" "}
                - Lembrou a senha?<Link to="/" className='link-pg-login'>Clique Aqui!</Link>
                </div>         
            </form>
            
        </div>
        </div>
        </div>
    );
};