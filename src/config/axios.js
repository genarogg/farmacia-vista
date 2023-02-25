import axios from "axios";
const clienteAxios = axios.create({
  baseURL: 'https://farmacia-server2.onrender.com/',
});

export default clienteAxios