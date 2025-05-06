import axios from 'axios';

export type User = {
  id: number;
  email: string;
  password: string;
  createdAt: Date
  refreshToken: string
  role: string
  updatedAt: Date
  
};
export const useAuth = () => {
  
  const login = async (user: Omit<User, 'id'>): Promise<any> => {
    return axios.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/auth/login`, { ...user }, {})
  };
  
  const register = async (user: Partial<User>): Promise<any> => {
    return axios.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/auth/register`, { ...user }, {})
  }
  
  return {
    login,
    register
  };
};
