import axios from '../utils/axiosInstance';

const apis = (modelPath) => ({
  getAll: ({ limit, offset }) => axios.get(`${modelPath}/?limit=${limit}&offset=${offset}`),
  getByHash: (hash) => axios.get(`${modelPath}/${hash}`),
});

export default apis;
