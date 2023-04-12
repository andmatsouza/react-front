import React, { useState, useContext } from 'react';

//useNavigate substituiu a useHistory
import { Link, useNavigate, useLocation } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


//conexão com API
import api from '../../config/configApi';

import { Context } from '../../Context/AuthContext';

export const Login = () => {

    const { state } = useLocation();

    //usado para redirecionar página
    const navegate = useNavigate();

    //recuperei a função sigin que está no authContext
    const { signIn } = useContext(Context);

    //console.log("Situação do usuário na página login: " + authenticated);

    //hook (useState) usado para setar valores em um objeto
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
    const valorInput = e => setUser({ ...user, [e.target.name]: e.target.value });

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
        await api.post("/login", user, { headers })
            .then((response) => {
                // console.log(response)
                setStatus({
                    /*type: 'success',
                    mensagem: response.data.mensagem,*/
                    loading: false
                });
                //salva o token no localStorage do navegador
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('image', response.data.user.image);
                //função chamada do contex - seta a constante [authenticated] p true
                signIn(true);
                //caso login com sucesso redireciona p página dashboard
                return navegate("/dashboard");
            }).catch((err) => {
                if (err.response) {
                    //console.log(err.response)
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem,
                        loading: false
                    });
                } else {
                    //console.log("Erro: tente mais tarde!");
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: tente mais tarde!",
                        loading: false
                    });
                }

            })
    }

    return (
        <div className="d-flex">
            <div className="container-header">
                <img src="/logo-cpaex-sf.png" alt="imagem logo" className='img-header' />
                <img src="/banner-site-psc-3.png" alt="imagem logo" />
                <img src="/logo-cpaex-sf.png" alt="imagem logo" className='img-header' />
            </div>
            <div className="container-login">
                <div className="wrapper-login">
                    <div className="title">
                        <span>Sigap - Área Restrita</span>
                    </div>

                    <form onSubmit={loginSubmit} className="form-login">

                        {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}

                        {status.loading ? <p className="alert-success">Validando...</p> : ""}

                        <div className="row">
                            <i className="fas fa-user"></i>
                            <input type="text" name="email" placeholder="Digite o e-mail" onChange={valorInput} />
                        </div>
                        <div className="row">
                            <i className="fas fa-lock"></i>
                            <input type="password" name="password" placeholder="Digite a senha" autoComplete='on' onChange={valorInput} />
                        </div>

                        <div className="row button">
                            {status.loading ? <button type="submit" className='button-login' disabled>Acessando...</button> : <button type="submit" className='button-login'>Acessar</button>}
                        </div>
                        <div className="signup-link">
                            <Link to="/add-user-login" className='link-pg-login'>Cadastrar</Link>{" - "}
                            <Link to="/recover-password" className='link-pg-login'>Esqueceu a senha?</Link>
                        </div>
                    </form>
                </div>
                <div className="container-text">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/banner-site-psc.png" />
                        <Card.Body>
                            <Card.Title>SIGAP</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/banner-site.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/banner-site.png" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </div>
    );
};