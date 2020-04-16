import axios from 'axios';
const baseUrl = 'http://localhost:3002/api';

const defaultConfig = {
  withCredentials: true
}
const get = async (url) => {
  try {
    const result = await axios.get(`${baseUrl}${url}`, defaultConfig);
    return result.data;
  } catch (error) {
    return ({
      status: 'FAILED',
      ...error
    })
  }
}
const post = async (url, data, config) => {
  try {
    const result = await axios.post(`${baseUrl}${url}`, data, { ...defaultConfig, ...config });
    return result.data;
  } catch (error) {
    return ({
      status: 'FAILED',
      ...error
    })
  }
}

const put = async (url, data) => {
  try {
    const result = await axios.put(`${baseUrl}${url}`, data, defaultConfig);
    return result.data;
  } catch (error) {
    return ({
      status: 'FAILED',
      ...error
    })
  }
}

const del = async (url) => {
  try {
    const result = await axios.delete(`${baseUrl}${url}`, defaultConfig);
    return result.data;
  } catch (error) {
    return ({
      status: 'FAILED',
      ...error
    })
  }
}
export default {
  get,
  post,
  put,
  del
}