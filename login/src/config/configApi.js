import axios from 'axios';

//Criando um instancia de conexão com a API
export default axios.create({
  baseURL: 'http://localhost:3000'
})