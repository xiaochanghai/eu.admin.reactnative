import { getItem, removeItem, setItem } from '@/lib/storage';

const TOKEN = 'token';

export type TokenType = {
  access: string;
  userId: string;
  refresh: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const removeUserInfo = () => removeItem('userInfo');
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
