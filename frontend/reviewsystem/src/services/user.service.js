import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/v1/users/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'guest');
  }

  getUserDashboard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

 

  getAdminDashboard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();