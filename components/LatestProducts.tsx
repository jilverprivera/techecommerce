import {useProducts} from '../hooks/useProducts';
import ProductCard from './ProductCard';

interface Props {
  title: string;
}

const LatestProducts = ({title}: Props) => {
  const {products, productsLoading} = useProducts();
  const latestProducts = products
    ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);
  return (
    <div className="max-w-screen-xl w-full mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-5">{title}</h2>
      <div className="grid  grid-cols-4 gap-4 w-full">
        {productsLoading ? (
          <h3>Loading</h3>
        ) : (
          latestProducts?.map(product => (
            <ProductCard key={product._id} {...product} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestProducts;
