import { apiClient } from './apiClient';

export interface ApiProvider {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, data: object) => Promise<T>;
  put: <T>(url: string, data: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
}

const createApiProvider = (): ApiProvider => ({
  get: async (url, params) => (await apiClient.get(url, { params })).data,
  post: async (url, data) => (await apiClient.post(url, data)).data,
  put: async (url, data) => (await apiClient.put(url, data)).data,
  delete: async (url) => (await apiClient.delete(url)).data
});

export default createApiProvider();
