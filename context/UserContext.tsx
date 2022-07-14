import {useRouter} from 'next/router';
import {createContext, useEffect, useState} from 'react';
import {ProductInterface} from '../interfaces/products';

import {
  userContextProps,
  SignInInterface,
  tokenResponse,
  SignUpInterface,
  SignUpResponse,
  User,
  UserResponse,
  userProviderProps,
  CartInterface,
} from '../interfaces/userContext';

export const UserContext = createContext({} as userContextProps);

export const UserProvider = ({children}: userProviderProps) => {
  const Router = useRouter();

  const AUTH_URL = 'http://localhost:5000/auth';
  const URL = 'http://localhost:5000/api';

  // User
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [userPayments, setUserPayments] = useState<any[]>([]);
  const [cart, setCart] = useState<CartInterface[]>([]);

  //Admin
  const [users, setUsers] = useState<User[] | null>([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      setToken(authToken);
      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: authToken,
      };
      const tokenRevalidation = async () => {
        await fetch(`${URL}/user/re_new`, {method: 'GET', headers: headers})
          .then((response): Promise<tokenResponse> => response.json())
          .then(data => setToken(data.token))
          .catch(err => console.error(err));
      };
      tokenRevalidation();
    }
  }, []);

  useEffect(() => {
    if (token) {
      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token,
      };
      const currentUserInfo = async () => {
        await fetch(`${URL}/user/info`, {method: 'GET', headers: headers})
          .then((response): Promise<UserResponse> => response.json())
          .then(data => {
            setUser(data.user);
            setUserPayments(data.payments);
            setCart(data.user.cart);
            setIsAdmin(data.user.role === 1 ? true : false);
            setIsLogged(true);
            setIsLoading(false);
          })
          .catch(err => console.error(err));
      };
      currentUserInfo();
    }
  }, [token]);

  useEffect(() => {
    if (isAdmin) {
      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token,
      };
      const getUsers = async () => {
        await fetch(`${URL}/users`, {method: 'GET', headers: headers})
          .then((response): Promise<User[]> => response.json())
          .then(data => setUsers(data))
          .catch(err => console.error(err));
      };

      const getHistoryPayments = async () => {
        await fetch(`${URL}/payments`, {method: 'GET', headers: headers})
          .then(response => response.json())
          .then(data => setPayments(data))
          .catch(err => console.error(err));
      };
      getUsers();
      getHistoryPayments();
    }
  }, [isAdmin]);

  // Authentication
  const signIn = async (values: SignInInterface) => {
    await fetch(`${AUTH_URL}/signin`, {
      method: 'POST',
      body: JSON.stringify({...values}),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
      .then((response): Promise<tokenResponse> => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        Router.push('/');
      })
      .catch(err => console.error(err));
  };

  const signUp = async (values: SignUpInterface) => {
    await fetch(`${AUTH_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify({...values}),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
      .then((response): Promise<SignUpResponse> => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setToken(data.token);
        Router.push('/');
      })
      .catch(err => console.error(err));
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUser(null);
    setUserPayments([]);
    setCart([]);
    setIsAdmin(false);
    setIsLogged(false);
    setIsLoading(false);
  };

  // Cart
  const addToCart = async (product: CartInterface) => {
    if (!isLogged) {
      console.log('Need to sign to add to cart');
    }
    const check = cart?.every(item => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, {...product, quantity: 1}]);
      const headers = {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: token,
      };

      await fetch(`${URL}/user/add_cart`, {
        method: 'PATCH',
        body: JSON.stringify({cart: [...cart, {...product, quantity: 1}]}),
        headers: headers,
      })
        .then((response): Promise<CartInterface[]> => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    } else {
      console.log('This item has been added to a cart');
    }
  };

  const incrementQuantity = (id: string) => {
    cart.forEach(el => {
      if (el._id === id) {
        el.quantity += 1;
      }
    });
    setCart([...cart]);
  };

  const decrementQuantity = (id: string) => {
    cart.forEach(el => {
      if (el._id === id) {
        el?.quantity === 1 ? (el.quantity = 1) : (el.quantity -= 1);
      }
    });
    setCart([...cart]);
  };

  const removeProduct = async (id: string) => {
    cart.forEach((el, i) => {
      if (el._id === id) {
        cart.splice(i, 1);
      }
    });
    setCart([...cart]);

    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    };
    await fetch(`${URL}/user/add_cart`, {
      method: 'PATCH',
      body: JSON.stringify({cart: [...cart]}),
      headers: headers,
    })
      .then((response): Promise<CartInterface[]> => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        isAdmin,
        isLogged,
        user,
        userPayments,
        cart,
        users,
        payments,
        signIn,
        signUp,
        signOut,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeProduct,
      }}>
      {children}
    </UserContext.Provider>
  );
};
