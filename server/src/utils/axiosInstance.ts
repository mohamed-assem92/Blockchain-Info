import axios from 'axios';
import config from '../config';

const { blockchainInfo: { baseURL } } = config;

const instance = axios.create({
  baseURL,
});

export default instance;
