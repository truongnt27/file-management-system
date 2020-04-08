import axios from 'axios';

export const createKeyApi = async (key) => {
  try {
    const result = await axios.post('http://localhost:3002/api/keys', { key });
    return result.data;
  } catch (error) {
    return error
  }
}

export const updateKeyApi = async (key) => {
  try {
    const id = key._id;
    const result = await axios.put(`http://localhost:3002/api/keys/${id}`, { key });

    return result.data;
  } catch (error) {
    return error
  }
}

export const deleteKeyApi = async (keyId) => {
  try {
    const result = await axios.delete(`http://localhost:3002/api/keys/${keyId}`);

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