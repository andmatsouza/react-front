import React, { useState, useContext } from "react";

//useNavigate substituiu a useHistory
import { Link, useNavigate, useLocation } from "react-router-dom";

import {Login} from '../Login';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//conexão com API
import api from "../../config/configApi";

import { Context } from "../../Context/AuthContext";

export const Home = () => {
  const { state } = useLocation();

  //usado para redirecionar página
  const navegate = useNavigate();

  //recuperei a função sigin que está no authContext
  const { signIn } = useContext(Context);

  //console.log("Situação do usuário na página login: " + authenticated);

  //hook (useState) usado para setar valores em um objeto
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: state ? state.type : "",
    mensagem: state ? state.mensagem : "",
    loading: false,
  });

  //função usada para setar valores nos campos do formulario
  const valorInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  //função usada para enviar valores do formulario p API
  const loginSubmit = async (e) => {
    e.preventDefault();
    // console.log(user.password);
    setStatus({
      loading: true,
    });

    const headers = {
      "Content-Type": "application/json",
    };
    //requisição post p API
    await api
      .post("/login", user, { headers })
      .then((response) => {
        // console.log(response)
        setStatus({
          /*type: 'success',
                    mensagem: response.data.mensagem,*/
          loading: false,
        });
        //salva o token no localStorage do navegador
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("image", response.data.user.image);
        //função chamada do contex - seta a constante [authenticated] p true
        signIn(true);
        //caso login com sucesso redireciona p página dashboard
        return navegate("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          //console.log(err.response)
          setStatus({
            type: "error",
            mensagem: err.response.data.mensagem,
            loading: false,
          });
        } else {
          //console.log("Erro: tente mais tarde!");
          setStatus({
            type: "error",
            mensagem: "Erro: tente mais tarde!",
            loading: false,
          });
        }
      });
  };

  return (
    <div className="d-flex">
      <div className="container-header">               
        <img src="/cpaex-site.png" alt="imagem logo" className="img-header" />
        <img src="/banner-site-psc-3-sf.png" alt="imagem logo" />
        <img src="/cpaex-site.png" alt="imagem logo" className="img-header" />
      </div>
      <div className="container-login">
        {<Login />}
        <div className="container-text">
          <Row xs={1} md={2} className="g-4">
            <Col>
              <Card>
                <Card.Img variant="top" src="/banner-card-7.png" />
                <Card.Body>
                  <Card.Title>SIGAP</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="/banner-card-8.png" />
                <Card.Body>
                  <Card.Title>SEMINÁRIO</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* <Col>
              <Card>
                <Card.Img variant="top" src="/banner-card-5.png" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Img variant="top" src="/banner-card-6.png" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
          {/* <Card>
            <Card.Img variant="top" src="/banner-card-2.png" />
            <Card.Body>
              <Card.Text>
              Tem por missão precípua gerenciar as pesquisas na área de
                Psicologia, as avaliações psicológicas e apoiar as atividades de
                ensino do Departamento de Educação e Cultura do Exército (DECEx)
              </Card.Text>
            </Card.Body>
          </Card> 

          <Card>
            <Card.Img variant="top" src="/banner-card-4.png" />
            <Card.Body>
              <Card.Text>
              Tem por missão precípua gerenciar as pesquisas na área de
                Psicologia, as avaliações psicológicas e apoiar as atividades de
                ensino do Departamento de Educação e Cultura do Exército (DECEx)
              </Card.Text>
            </Card.Body>
          </Card>  */}

          {/* <Card style={{ width: "22rem" }}>
            <Card.Img variant="top" src="/banner-site-psc.png" />
            <Card.Body>
              <Card.Title>CPAEx - MISSÃO</Card.Title>
              <Card.Text>
                Tem por missão precípua gerenciar as pesquisas na área de
                Psicologia, as avaliações psicológicas e apoiar as atividades de
                ensino do Departamento de Educação e Cultura do Exército (DECEx)
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem" }}>
            <Card.Img variant="top" src="/banner-site.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Tem por missão precípua gerenciar as pesquisas na área de
                Psicologia, as avaliações psicológicas e apoiar as atividades de
                ensino do Departamento de Educação e Cultura do Exército (DECEx)
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "22rem" }}>
            <Card.Img variant="top" src="/banner-site-psc.png" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Tem por missão precípua gerenciar as pesquisas na área de
                Psicologia, as avaliações psicológicas e apoiar as atividades de
                ensino do Departamento de Educação e Cultura do Exército (DECEx)
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card> */}
        </div>
      </div>
    </div>
  );
};
