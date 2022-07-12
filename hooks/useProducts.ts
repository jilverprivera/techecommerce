import useSWR from 'swr';

import {ProductInterface} from '../interfaces/products';

const fetcher = async (args: string) =>
  await fetch(args).then((res): Promise<ProductInterface[]> => res.json());

export const useProducts = () => {
  const PRODUCT_URL = `http://localhost:5000/api/products`;

  const {data, error, isValidating} = useSWR(PRODUCT_URL, fetcher);

  return {
    products: data,
    productsError: error,
    productsLoading: isValidating,
  };
};
