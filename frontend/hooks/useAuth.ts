import axios from 'axios';

type User = {
  id: number;
  email: string;
  password: string;
};
export const useAuth = () => {
  
  const login = async (user: Omit<User, 'id'>): Promise<any> => {
    console.log(user)
    return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, { ...user }, {})
  };
  
  return {
    login,
  };
};
