import axios from 'axios';

export const fetchUsersApi = async () => {
  try {
    const result = await axios.get('http://localhost:3002/api/users');
    return result.data;
  } catch (error) {
    return error
  }
}