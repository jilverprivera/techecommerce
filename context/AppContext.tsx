import {createContext} from 'react';

import {useCategories} from '../hooks/useCategories';
import {useProducts} from '../hooks/useProducts';
import {appContextProps, appProviderProps} from '../interfaces/appContext';

export const AppContext = createContext({} as appContextProps);

export const AppProvider = ({children}: appProviderProps) => {
  const {products, productsLoading} = useProducts();
  const {categories, categoriesLoading} = useCategories();

  const URL = 'http://localhost:5000/api';

  const getCategoryName = (id: string) => {
    const category = categories?.filter(el => el._id === id);
    return category;
  };

  const state = {
    URL,
    products,
    productsLoading,
    categories,
    categoriesLoading,
    getCategoryName,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
