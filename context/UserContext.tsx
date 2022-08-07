import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { getCurrentUser } from '../helpers/auth/getCurrentUser';
import { tokenRevalidation } from '../helpers/auth/tokenReValidator';

import { ProductInterface } from '../interfaces/products';
import {
  userContextProps,
  SignInInterface,
  tokenResponse,
  SignUpInterface,
  SignUpResponse,
  User,
  userProviderProps,
  CartInterface,
} from '../interfaces/userContext';
import { AppContext } from './AppContext';
import Cookies from 'js-cookie';
import { methods } from 'interfaces/backend/methods';
import { LayoutContext } from './LayoutContext';
import { AlertTypes } from 'interfaces/frontend/alerts';

export const UserContext = createContext({} as userContextProps);

export const UserProvider = ({ children }: userProviderProps) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [userPayments, setUserPayments] = useState<any[]>([]);
  const [cart, setCart] = useState<CartInterface[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [wishList, setWishList] = useState<ProductInterface[]>([]);

  const { activateAlert } = useContext(LayoutContext);

  useEffect(() => {
    const authToken = Cookies.get('token');
    if (authToken) {
      setToken(authToken);
      tokenRevalidation().then((data) => {
        setToken(data.token);
        Cookies.set('token', data.token, {
          expires: new Date().getTime() + 1000 * 36000,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          secure: process.env.NODE_ENV === 'production' ? true : false,
        });
      });
    }
  }, []);

  //Get the user information from destructing the uid from token.
  useEffect(() => {
    if (token) {
      getCurrentUser(token)
        .then((data) => {
          setUser(data.user);
          setUserPayments(data.payments);
          setWishList(data.user.wishList);
          setCart(data.user.cart);
          setIsAdmin(data.user.role === 1 ? true : false);
          setIsLogged(true);
        })
        .catch((err) => console.error(err));
    }
    setIsLoading(false);
  }, [token]);

  // Get the total of cart.
  useEffect(() => {
    const getTotal = async () => {
      const total = cart.reduce((total, el) => {
        return total + el.price * el.quantity;
      }, 0);
      setCartTotal(total);
    };
    getTotal();
  }, [cart]);

  // Sign in authentication
  const signIn = async (values: SignInInterface) => {
    setIsLoading(true);
    await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ ...values }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response): Promise<tokenResponse> => response.json())
      .then((data) => {
        setToken(data.token);
        Cookies.set('token', data.token, {
          expires: new Date().getTime() + 1000 * 36000,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          secure: process.env.NODE_ENV === 'production' ? true : false,
        });
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // Sign up authentication
  const signUp = async (values: SignUpInterface) => {
    await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ ...values }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response): Promise<SignUpResponse> => response.json())
      .then((data) => {
        setUser(data.user);
        setToken(data.token);
        Cookies.set('token', data.token, {
          expires: new Date().getTime() + 1000 * 36000,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          secure: process.env.NODE_ENV === 'production' ? true : false,
        });
      })
      .catch((err) => console.error(err));
  };

  // Sign out verification
  const signOut = () => {
    Cookies.remove('token');
    Router.push('/');
    setIsLogged(false);
    setUser(null);
    setUserPayments([]);
    setCart([]);
    setToken('');
    setIsAdmin(false);
    setIsLogged(false);
    setIsLoading(false);
  };

  // Cart
  const addToCart = async (product: CartInterface) => {
    if (isLogged && !isAdmin) {
      const check = cart?.every((item) => {
        return item._id !== product._id;
      });
      if (check) {
        setCart([...cart, { ...product, quantity: 1 }]);
        await fetch('/api/users/add_cart', {
          method: methods.PATCH,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ cart: [...cart, { ...product, quantity: 1 }] }),
        });
        activateAlert(AlertTypes.SUCCESS, 'Product has been added succesfully.');
      } else {
        activateAlert(AlertTypes.ERROR, 'Error, this product is in your cart.');
      }
    }
  };

  const addToWishList = async (product: ProductInterface) => {
    if (isLogged && !isAdmin) {
      const checkWishList = wishList?.every((item) => {
        return item._id !== product._id;
      });
      if (checkWishList) {
        setWishList([...wishList, { ...product }]);
        await fetch('/api/users/wish_list', {
          method: methods.PATCH,
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({ wishlist: [...wishList, { ...product }] }),
        });
        activateAlert(AlertTypes.SUCCESS, 'Product added to your wish list.');
      } else {
        activateAlert(AlertTypes.ERROR, 'Error, this product is in your wish list.');
      }
    }
  };

  const incrementQuantity = (id: string) => {
    cart.forEach((el) => {
      if (el._id === id) {
        el.quantity >= el.stock ? (el.quantity = el.stock) : (el.quantity += 1);
      }
    });
    setCart([...cart]);
  };

  const decrementQuantity = (id: string) => {
    cart.forEach((el) => {
      if (el._id === id) {
        el?.quantity === 1 ? (el.quantity = 1) : (el.quantity -= 1);
      }
    });
    setCart([...cart]);
  };

  const removeProductFromCart = async (id: string) => {
    cart.forEach((el, i) => {
      if (el._id === id) {
        cart.splice(i, 1);
      }
    });
    setCart([...cart]);
    await fetch('/api/users/add_cart', {
      method: 'PATCH',
      body: JSON.stringify({ cart: [...cart] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    activateAlert(AlertTypes.SUCCESS, 'Product removed succesfully.');
  };

  const removeProductFromWishList = async (id: string) => {
    wishList.forEach((el, i) => {
      if (el._id === id) {
        wishList.splice(i, 1);
      }
    });
    setWishList([...wishList]);
    await fetch('/api/users/wish_list', {
      method: 'PATCH',
      body: JSON.stringify({ wishlist: [...wishList] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    activateAlert(AlertTypes.SUCCESS, 'Product removed succesfully.');
  };

  return (
    <UserContext.Provider
      value={{
        token,
        isLoading,
        isAdmin,
        isLogged,
        user,
        userPayments,
        cart,
        cartTotal,
        wishList,
        signIn,
        signUp,
        signOut,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeProductFromCart,
        addToWishList,
        removeProductFromWishList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
