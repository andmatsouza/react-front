import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Sidebar} from '../../components/Sidebar';
import { Tabs, Tab } from "react-bootstrap";
import {ChartAbastLitro, ChartAbastValor, ChartOdmetro} from '../../components/Chart';

export const Dashboard = () => {     

  return(
    <div>
      <Navbar/>
      <div className="content">
          <Sidebar active="dashboard" />

          <div className="wrapper">


          <Tabs defaultActiveKey="res" id="uncontrolled-tab-example" className="mb-3">

          <Tab eventKey="res" title="Resumo"> 
          <div className="row">
            <div className="box box-first">
              <span className=" icon fas fa-users"></span>
              <span>397</span>
              <span>Usuários</span>
            </div>
            
            <div className="box box-second">
              <span className=" icon fas fa-truck-loading"></span>
              <span>43</span>
              <span>Entregas</span>
            </div>

            <div className="box box-third">
              <span className=" icon fas fa-check-circle"></span>
              <span>12</span>
              <span>Completas</span>
            </div>

            <div className="box box-fourth">
              <span className=" icon fas fa-exclamation-triangle"></span>
              <span>3</span>
              <span>Alertas</span>
            </div>
          </div>
          </Tab>

          <Tab eventKey="graf" title="Gráficos"> 
          <div className="row">
          <div class="content-adm2">
              <ChartAbastLitro />
              <ChartAbastValor /> 
              <ChartOdmetro />                         
            </div> 
          </div>
          </Tab>

          </Tabs>
        </div>

      </div>
    </div>
  );
}