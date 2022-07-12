import {useContext} from 'react';
import useSWR from 'swr';

import {CategoryInterface} from '../interfaces/categories';

const fetcher = async (args: string) =>
  await fetch(args).then((res): Promise<CategoryInterface[]> => res.json());

export const useCategories = () => {
  const CATEGORIES_URL = `http://localhost:5000/api/categories`;
  const {data, error, isValidating} = useSWR(CATEGORIES_URL, fetcher);

  return {
    categories: data,
    categoriesError: error,
    categoriesLoading: isValidating,
  };
};
