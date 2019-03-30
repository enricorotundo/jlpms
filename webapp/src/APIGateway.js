import axios from 'axios';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {'Access-Control-Allow-Origin': '*'}
});

class APIGateway {
  static getRepos(params) {
    return httpClient.get('/repos', { params });
  }

  static getPackage(params) {
    return httpClient.get('/package', { params });
  }

  static getReadme(params) {
    return httpClient.get('/readme', { params });
  }
}

export default APIGateway;