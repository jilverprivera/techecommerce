import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ProductInterface } from '../../interfaces/products';

const ProductSearch = () => {
  const { products, productSearch, setProductSearch } = useContext(AppContext);
  const [newProducts, setNewProducts] = useState<ProductInterface[]>([]);
  useEffect(() => {
    if (products) {
      let result = products.filter((el) =>
        el.name.toLocaleLowerCase().includes(productSearch.toLocaleLowerCase())
      );
      setNewProducts(result);
    }
  }, [products, productSearch]);

  return (
    <div className="absolute top-5 right-28 w-full bg-white shadow-md max-w-lg rounded-xl overflow-hidden p-2">
      {newProducts.slice(0, 4).map((product) => (
        <Link key={product._id} href={`/${product._id}`}>
          <a
            className="w-full h-24 mb-1 last:mb-0 grid grid-cols-5 gap-4 border-b-2 last:border-b-0 pb-2 last:pb-0 mt-2 first:mt-0"
            onClick={() => setProductSearch('')}
          >
            <div className="flex items-center justify-center overflow-hidden rounded-md w-full h-full">
              <Image src={product.image.url} width={96} height={96} alt={product.name} />
            </div>
            <div className="col-span-4 flex flex-col items-start justify-center">
              <h3 className="font-textMedium text-lg">{product.name}</h3>
              <span className="text-sm tracking-wider text-gray-400">Ref: {product.product_id}</span>
              <span className="text-sm mt-2">Stock: {product.stock}</span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default ProductSearch;
