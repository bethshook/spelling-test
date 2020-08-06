import axios from 'axios';

const URI = 'http://localhost:8080/';

const ApiInstance = axios.create({
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const API = {
  getWord: () => {
    return ApiInstance.get(`${URI}word`);
  },
};

export default API;
