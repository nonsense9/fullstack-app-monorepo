import api from "@/lib/axios";

export type User = {
  id: number;
  email: string;
  password: string;
  createdAt: Date
  refreshToken: string
  accessToken: string
  role: string
  updatedAt: Date
  
};

export const useAuth = () => {
  
  const login = async (user: Partial<User>): Promise<any> => {
    return api.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/auth/login`, { ...user }, {})
  };
  
  const register = async (user: Partial<User>): Promise<any> => {
    return api.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/auth/register`, { ...user }, {})
  }
  
  const refreshToken = async (user: Partial<User>): Promise<any> => {
    return api.post(`${ process.env.NEXT_PUBLIC_SERVER_URL }/auth/refresh`, { ...user }, {})
  }
  
  return {
    login,
    register,
    refreshToken
  };
};
