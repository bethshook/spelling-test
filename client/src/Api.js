import axios from 'axios';

const ApiInstance = axios.create({
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const API = {
  getWord: () => {
    return ApiInstance.get(`/api/word`);
  },
  submitWord: (submission) => {
    return ApiInstance.post(`/api/word`, submission);
  },
};

export default API;
