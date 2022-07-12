import {CategoryInterface} from './categories';
import {ProductInterface} from './products';

export type appContextProps = {
  categories: CategoryInterface[] | undefined;
  categoriesLoading: boolean;
  products: ProductInterface[] | undefined;
  productsLoading: boolean;
  getCategoryName: (arg: string) => void;
  URL: string;
};

export interface appProviderProps {
  children: JSX.Element | JSX.Element[];
}
