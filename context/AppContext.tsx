import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import { appContextProps } from 'interfaces/context/appContext';
import { ContextProviderProps } from 'interfaces/context/contextProvider';
import { CategoryInterface } from 'interfaces/categories';
import { ProductInterface } from 'interfaces/products';

export const AppContext = createContext({} as appContextProps);

export const AppProvider = ({ children }: ContextProviderProps) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);

  const fetcherProducts = (args: string) => fetch(args).then((res): Promise<ProductInterface[]> => res.json());

  const fetcherCategories = (args: string) => fetch(args).then((res): Promise<CategoryInterface[]> => res.json());

  const { data: productsData, isValidating: productsLoading } = useSWR('/api/products', fetcherProducts);
  const { data: categoriesData, isValidating: categoriesLoading } = useSWR('/api/categories', fetcherCategories);

  useEffect(() => {
    if (productsData) {
      const sortedProducts = productsData.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProducts(sortedProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  return (
    <AppContext.Provider
      value={{
        signInModal: { openSignInModal, setOpenSignInModal },
        signUpModal: { openSignUpModal, setOpenSignUpModal },
        productsContent: { products, productsLoading },
        categoriesContent: { categories, categoriesLoading },
        productSearch,
        setProductSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
