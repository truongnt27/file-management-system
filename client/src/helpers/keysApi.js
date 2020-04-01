import axios from 'axios';

export const createKeyApi = async (key) => {
  try {
    const result = await axios.post('http://localhost:3002/api/keys', { key });
    return result.data;
  } catch (error) {
    return error
  }
}

export const getKeysApi = async () => {
  try {
    const result = await axios.get('http://localhost:3002/api/keys');
    return result.data;
  } catch (error) {
    return error
  }
}