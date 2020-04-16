import ApiCaller from './apiCaller';

export const createKeyApi = (key) => {
  return ApiCaller.post('/keys', { key });
}

export const updateKeyApi = (key) => {
  const id = key._id;
  return ApiCaller.put(`/keys/${id}`, { key });
}

export const deleteKeyApi = (keyId) => {
  return ApiCaller.delete(`/keys/${keyId}`);
}

export const getKeysApi = async () => {

  return ApiCaller.get('/keys');
}