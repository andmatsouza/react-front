import React, { useState, useContext } from 'react';

//substituiu a useHistory
import { Link, useNavigate, useLocation } from "react-router-dom";

//conexão com API
import  api from '../../config/configApi';

import { Context } from '../../Context/AuthContext';

export const Login = () =>{

    const { state } = useLocation();
 
    //usado para redirecionar página
    const navegate = useNavigate();

    const { signIn } = useContext(Context);

    //console.log("Situação do usuário na página login: " + authenticated);

    //hook usado para setar valores em um objeto
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
        loading: false,
    });

    //função usada para setar valores nos campos do formulario
    const valorInput = e => setUser({...user, [e.target.name]: e.target.value});

    //função usada para enviar valores do formulario p API
    const loginSubmit = async e => {

        e.preventDefault();
       // console.log(user.password);
       setStatus({
        loading: true
       });

       const headers = {
        'Content-Type': 'application/json'
       }
       //requisição post p API
       await api.post("/login", user, {headers})
       .then((response) => {
        //console.log(response)
        setStatus({
            /*type: 'success',
            mensagem: response.data.mensagem,*/
            loading: false
        });
        //salva o token no localStorage do navegador
        localStorage.setItem('token', response.data.token);
        //função chamada do contex 
        signIn(true);
        //caso login com sucesso redireciona p página dashboard
        return navegate("/dashboard");
       }).catch((err) => {
        if(err.response){
          //console.log(err.response)
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem,
            loading: false
        });
        }else{
          //console.log("Erro: tente mais tarde!");
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
            <h1>Login</h1>
            {status.type === 'error' ? <p>{status.mensagem}</p> : ""}
            {status.type === 'success' ? <p>{status.mensagem}</p> : ""}
            {status.loading ? <p>Validando...</p> : ""}
            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} /><br /><br />
                
                <label>Senha: </label>
                <input type="password" name="password" placeholder="Digite a senha" autoComplete='on' onChange={valorInput} /><br /><br />

                
                {status.loading ? <button type="submit" disabled>Acessando...</button> : <button type="submit">Acessar</button>}<br /><br />                
            </form>
            <Link to="/add-user-login">Cadastrar</Link>{" - "}
            <Link to="/recover-password">Esqueceu a senha?</Link>
        </div>
    );
};