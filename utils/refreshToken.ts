import axios from 'axios';
import { urls } from './config';

export const refreshAccessToken = async (refreshToken:any) => {
  try {
    const refreshResponse = await axios.post(urls.refreshToken, {
      refreshToken,
    });
    return refreshResponse.data.newAccessToken;
  } catch (error) {
    throw error;
  }
};
