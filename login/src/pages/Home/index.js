import React from "react";

import { Login } from "../Login";
import { CardContent } from "../../components/CardContent";
import { CarouselHome } from "../../components/CarouselHome";

export const Home = () => {
  return (
    <>
      <div className="d-flex">
      <div className="container-header">
        <img src="/logo-eb.png" alt="imagem logo" className="img-header" />
        <img src="/banner-site-psc-3-sf.png" alt="imagem logo" />
        <img src="/cpaex-site.png" alt="imagem logo" className="img-header" />
      </div>
      <div className="container-login-text">
        <div className="container-login">
          {<Login />}
        </div>
        
        <div className="container-text">    
          {<CarouselHome />}      
          {<CardContent />}          
        </div>
      </div>
      <div className="container-footer">
        <div>Direitos reservados CPAEx</div>
      </div>
    </div>

      {/* <div style={{height: 54 + 'em', background: "#000"}}>

      <div class="h-100 d-inline-block" style={{width: 20 + 'em', background: "#618AE8"}}>
        <ul>
          <li>primeiro</li>
          <li>segundo</li>
          <li>terceiro</li>
        </ul>
        </div>
        <div class="h-100 d-inline-block" style={{width: 60 + 'em', background: "#ed9c28"}}>
        {<CarouselHome />}
        </div>
        <div class="h-100 d-inline-block" style={{width: 20 + 'em', background: "#47a447"}}>
        <ul>
          <li>primeiro</li>
          <li>segundo</li>
          <li>terceiro</li>
        </ul>
        </div>

      </div> */}
    </>
  );
};
