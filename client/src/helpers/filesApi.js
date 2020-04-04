import axios from 'axios';

export const uploadFileApi = async (file) => {
  try {
    const result = await axios.post('http://localhost:3002/api/keys', { file });
    return result.data;
  } catch (error) {
    return error
  }
}

export const getFilesApi = async () => {
  try {
    const result = await axios.get('http://localhost:3002/api/files');
    return result.data;
  } catch (error) {
    return error
  }
}