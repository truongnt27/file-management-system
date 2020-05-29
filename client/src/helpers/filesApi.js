import apiCaller from './apiCaller';

export const uploadFileApi = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return apiCaller.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const downloadFileApi = async (fileId) => {
  return apiCaller.get(`/files/${fileId}/download`, { responseType: 'blob' });
}

export const getFilesApi = async () => {
  return apiCaller.get('/files');
}

export const deleteFilesApi = async (fileId) => {
  return apiCaller.del(`/files/${fileId}`);
}

export const updateFileApi = async (file) => {
  return apiCaller.put(`/files/${file._id}`, { file });
}