import apiCaller from './apiCaller';

export const uploadFileApi = (file, keyId, userId) => {
  const formData = new FormData();
  formData.append('keyId', keyId);
  formData.append('owner', userId);
  formData.append('file', file);

  return apiCaller.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const downloadFileApi = async (fileId) => {
  return apiCaller.get(`/files/${fileId}/download`);
}

export const getFilesApi = async () => {
  return apiCaller.get('/files');

}