import { User as Auth0UserModel } from '@auth0/auth0-spa-js';

import { getData, setData } from '@/utils';
import { type AuthModel } from '@/auth/models';
import axios from 'axios';

const AUTH_LOCAL_STORAGE_KEY = `${import.meta.env.VITE_APP_NAME}-auth-v${
  import.meta.env.VITE_APP_VERSION
}`;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Read API URL from .env
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const auth = getAuth();

    if (auth?.access_token) {
      config.headers.Authorization = `Bearer ${auth.access_token}`;
    }

    return config;
  },
  async (err: any) => await Promise.reject(err)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Redirecting to login...');
      removeAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const getAuth = (): AuthModel | undefined => {
  try {
    const auth = getData(AUTH_LOCAL_STORAGE_KEY) as AuthModel | undefined;

    if (auth) {
      return auth;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: AuthModel | Auth0UserModel) => {
  setData(AUTH_LOCAL_STORAGE_KEY, auth);
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export { apiClient, setAuth, removeAuth };
