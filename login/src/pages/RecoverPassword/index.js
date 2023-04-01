import React, { useState, useContext } from 'react';

//substituiu a useHistory
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";

//conexão com API
import  api from '../../config/configApi';

//import { Context } from '../../Context/AuthContext';

export const RecoverPassword = () =>{

    //const { state } = useLocation();
 
    //usado para redirecionar página
   // const navegate = useNavigate();

   // const { signIn } = useContext(Context);

    //console.log("Situação do usuário na página login: " + authenticated);

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
        <div>
            <h1>Recuperar Senha</h1>
            {status.type === 'error' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
            {status.loading ? <p>Validando...</p> : ""}

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

            <form onSubmit={recoverPass}>
                <label>Usuário: </label>
                <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} /><br /><br />

                {status.loading ? <button type="submit" disabled>Enviando...</button> : <button type="submit">Enviar</button>}<br /><br />                
            </form>
            <Link to="/add-user-login">Cadastrar</Link>{" "}
            - Lembrou a senha?<Link to="/">Clique Aqui!</Link>
        </div>
    );
};