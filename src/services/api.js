import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.32.21:85/extrabite/primavera/api',
});

export default api;
