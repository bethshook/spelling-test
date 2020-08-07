import axios from 'axios';

const URI = 'https://radiant-reef-39730.herokuapp.com/api/word';

const ApiInstance = axios.create({
  timeout: 10000,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const API = {
  getWord: () => {
    return ApiInstance.get(URI);
  },
  submitWord: (submission) => {
    return ApiInstance.post(URI, submission);
  },
};

export default API;
