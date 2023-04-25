import React from "react";

import { Login } from "../Login";
import { CardContent } from "../../components/CardContent";
import { CarouselHome } from "../../components/CarouselHome";

export const Home = () => {
  return (
    // <>
    //   <div className="container m-auto d-flex flex-row">
    //     <div className="sidebar-home">
    //       <div className="header-home">
    //         <div>
    //           <span>
    //             <img src="/logo-psc-bra-sf.png" alt="imagem logo" className="logo" />
    //           </span>
    //         </div>
    //         <div>
    //           <h3>SIGAP</h3>
    //         </div>
    //       </div>
    //       <div className="container-login">{<Login />}</div>

    //       <div className="footer-home">footer</div>
    //     </div>

    //     <div className="grow p-8">
    //       <div className="navbar-home">           
    //         <div>
    //         <img
    //             src="/cpaex-site.png"
    //             alt="imagem logo"
    //             className="img-header"
    //           />
    //         </div>
    //           <div>
    //           <img src="/banner-site-psc-3-sf.png" alt="imagem logo" />
    //           </div>
    //           <div>
    //           <img
    //             src="/cpaex-site.png"
    //             alt="imagem logo"
    //             className="img-header"
    //           />
    //           </div>
    //       </div>
    //       <CarouselHome />
    //     </div>
    //   </div>
    // </>
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
          {<CarouselHome />}
        </div>
      </div>
    </div>
  );
};
