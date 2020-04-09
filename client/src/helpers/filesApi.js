import axios from 'axios';

export const uploadFileApi = async (file, keyId, userId) => {
  try {

    const formData = new FormData();
    formData.append('keyId', keyId);
    formData.append('owner', userId);
    formData.append('file', file);

    const result = await axios.post('http://localhost:3002/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return result.data;
  } catch (error) {
    console.log(error);
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