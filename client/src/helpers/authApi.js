import axios from 'axios';

export const authUserSocial = async (provider) => {
  try {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };
    const result = await axios.get(`http://localhost:3002/api/auth/${provider}`, config);


    console.log(result);

  } catch (error) {
    return error
  }
}

export const authUserLocal = async (user) => {
  try {

    const result = await axios.post('http://localhost:3002/api/auth/sign-in', user);
    return result.data;
  } catch (error) {
    return error
  }
}