import { methods } from 'interfaces/backend/methods';
import { CategoryInterface } from 'interfaces/categories';
import { ProductInterface } from 'interfaces/products';
import { createContext, useEffect, useState } from 'react';

import { appContextProps } from 'interfaces/context/appContext';
import { ContextProviderProps } from 'interfaces/context/contextProvider';

export const AppContext = createContext({} as appContextProps);

export const AppProvider = ({ children }: ContextProviderProps) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      await fetch('/api/products', {
        method: methods.GET,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((response): Promise<ProductInterface[]> => response.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error(err));
    };

    const getCategories = async () => {
      await fetch('/api/categories', {
        method: methods.GET,
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((response): Promise<CategoryInterface[]> => response.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error(err));
    };

    getProducts();
    getCategories();
  }, []);

  return (
    <AppContext.Provider
      value={{
        signInModal: { openSignInModal, setOpenSignInModal },
        signUpModal: { openSignUpModal, setOpenSignUpModal },
        products,
        categories,
        productSearch,
        setProductSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
