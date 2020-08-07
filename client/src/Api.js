import axios from 'axios';

const URI = 'http://localhost:8080/api/';

const ApiInstance = axios.create({
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const API = {
  getWord: () => {
    console.log('getting word')
    console.log(`${URI}word`)
    return ApiInstance.get(`${URI}word`);
  },
  submitWord: (submission) => {
    return ApiInstance.post(`${URI}word`, submission);
  },
};

export default API;
