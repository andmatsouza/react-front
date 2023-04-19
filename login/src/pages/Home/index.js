import React from "react";

import { Login } from '../Login';
import { CardContent } from '../../components/CardContent';

export const Home = () => { 

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
          {<CardContent />}          
        </div>
      </div>
    </div>
  );
};
