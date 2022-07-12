import {useEffect, useState} from 'react';
import {useProducts} from '../hooks/useProducts';
import {ProductInterface} from '../interfaces/products';

import ProductCard from './ProductCard';
interface Props {
  selector: string;
}
const Products = ({selector}: Props) => {
  console.log(selector);
  const {products, productsLoading} = useProducts();

  const [sortProducts, setSortProducts] = useState<
    ProductInterface[] | undefined
  >();

  console.log(sortProducts);

  useEffect(() => {
    if (selector === 'latest') {
      let latest = products?.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
      setSortProducts(latest);
    }
    if (selector === 'most-solds') {
      let newProducts = products?.sort((a, b) => b.sold - a.sold);
      setSortProducts(newProducts);
    }
    if (selector === 'high-low') {
      let newProducts = products?.sort((a, b) => a.price - b.price);
      setSortProducts(newProducts);
    }
    if (selector === 'low-high') {
      let newProducts = products?.sort((a, b) => b.price - a.price);
      setSortProducts(newProducts);
    }
  }, [selector]);

  return (
    <div className="col-span-9 w-full">
      {productsLoading ? (
        <h1 className="text-center">Loading...</h1>
      ) : (
        <div className="w-full grid grid-cols-3 gap-4">
          {products?.map(product => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
