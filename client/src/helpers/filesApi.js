import axios from 'axios';

export const uploadFileApi = async (file, userId) => {
  try {
    console.log('22222222222');
    console.log(file);

    let formData = new FormData();
    formData.append('file', file);
    formData.append('keyId', '5e773f2c5c07390f6ca90687');
    formData.append('owner', userId);

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