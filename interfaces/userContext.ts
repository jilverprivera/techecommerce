import {ProductInterface} from './products';

export type userContextProps = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  isLogged: boolean;
  payments: any;
  cart: any;
  addToCart: (product: ProductInterface) => void;
  signIn: (signIpData: SignInInterface) => void;
  signUp: (signInData: SignUpInterface) => void;
  signOut: () => void;
};

export interface userProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface SignInInterface {
  email: string;
  password: string;
}

export interface SignUpInterface {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface tokenResponse {
  token: string;
}

export interface SignUpResponse {
  token: string;
  user: User;
}

export interface UserResponse {
  user: User;
  payments?: any;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: number;
  state: boolean;
  cart: any[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
