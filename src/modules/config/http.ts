// http.ts
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(async (config) => {
  const match4actionTokens: { access_token: string; refresh_token: string } =
    localStorage.getItem('match4action@tokens') && JSON.parse(localStorage.getItem('match4action@tokens')!);

  const token = match4actionTokens?.access_token ?? match4actionTokens?.access_token;

  config!.headers!.Authorization = `Bearer ${token}`;

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const authData: { access_token: string; refresh_token: string } = localStorage.getItem('match4action@tokens')
        ? JSON.parse(localStorage.getItem('match4action@tokens')!)
        : '';

      const apiResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/auth/refreshToken`, {
        refresh_token: authData?.refresh_token,
      });

      localStorage.setItem('match4action@tokens', JSON.stringify(apiResponse?.data?.data));

      error.config.headers['Authorization'] = `bearer ${apiResponse?.data?.data?.access_token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export { http };
