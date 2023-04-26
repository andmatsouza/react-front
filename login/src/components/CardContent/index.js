import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


export const CardContent = () => {

  return(
    <>
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
    </>
  ) 
}