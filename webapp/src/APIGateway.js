import axios from 'axios';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {'Access-Control-Allow-Origin': '*'}
});

class APIGateway {
  static getRepos(params) {
    return httpClient.get('/repos', { params });
  }
}

export default APIGateway;