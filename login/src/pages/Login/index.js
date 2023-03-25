import React, { useState } from 'react';

export const Login = () =>{

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const valorInput = e => setUser({...user, [e.target.name]: e.target.value});

    const loginSubmit = async e => {
        e.preventDefault();
        console.log(user.password);
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} /><br /><br />
                
                <label>Senha: </label>
                <input type="password" name="password" placeholder="Digite a senha" onChange={valorInput} /><br /><br />

                <button type="submit">Acessar</button>
            </form>
        </div>
    );
};