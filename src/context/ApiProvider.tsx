import { createContext, useContext, ReactNode } from 'react';
import { apiClient } from '@/api/apiClient';

interface ApiContextType {
  client: typeof apiClient;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  return <ApiContext.Provider value={{ client: apiClient }}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context.client;
};
