import {useRouter} from 'next/router';
import {useContext} from 'react';
import useSWR from 'swr';
import {AppContext} from '../../../context/AppContext';
import {ProductInterface} from '../../../interfaces/products';

const fetcher = async (args: string) =>
  await fetch(args).then((res): Promise<ProductInterface[]> => res.json());

const Categories = () => {
  const {query} = useRouter();
  const {URL} = useContext(AppContext);
  const {id} = query;
  const {data, isValidating} = useSWR(`${URL}/products`, fetcher);
  return <div>Categories</div>;
};

export default Categories;
