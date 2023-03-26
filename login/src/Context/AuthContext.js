import React, { createContext, useEffect, useState } from "react";
//precisa importar a api antes do context
import api from "../config/configApi";

const Context = createContext();

function AuthProvider({ children }) {
  //hooks para setar as propriedades: authenticated, loading, etc...  
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  
//hook para executar toda vez q a pagina é chamada
 useEffect(() => {
    //função q verifica se o token existe e é valido
    const getLogin = async () => {
      const token = localStorage.getItem("token");

      if (token && valUser()) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
      }

      setLoading(false);
    };

    getLogin();
  }, []);

  //função para validar o token junto a API
  const valUser = async () => {
    const valueToken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + valueToken,
      },
    };
    //faz uma requisição p API na rota /val-token, para validar o token
    await api.get("/val-token", headers)
      .then(() => {
        return true;
      })
      .catch(() => {
        setAuthenticated(false);
        localStorage.removeItem("token");
        //localStorage.removeItem("name");
        //localStorage.removeItem("image");
        api.defaults.headers.Authorization = undefined;
        return false;
      });
  };

 async function signIn(sit) {
    setAuthenticated(true);
  }
  //função para logout
   function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
   // localStorage.removeItem("name");
    //localStorage.removeItem("image");
    api.defaults.headers.Authorization = undefined;
  }

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Context.Provider value={{authenticated, signIn, handleLogout}}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };