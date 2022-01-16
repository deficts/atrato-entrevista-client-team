import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://61e30c5afbee6800175eaf6a.mockapi.io/api/',
});

export default api;
