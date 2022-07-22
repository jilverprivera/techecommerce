import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';

import Layout from 'components/layout';

import ProductCard from 'components/ProductCard';
import Categories from 'components/Categories';
import Products from 'components/Products';

import { CategoryInterface } from 'interfaces/categories';
import { ProductInterface } from 'interfaces/products';
import { AppContext } from 'context/AppContext';

const Home = () => {
  const { products, categories } = useContext(AppContext);
  const [latest, setLatest] = useState<ProductInterface[]>([]);
  const [category, setCategory] = useState<CategoryInterface>({
    name: 'All',
    _id: '1',
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    if (products) {
      const newProducts = products.filter((el) => el.checked === true && el.stock > 0).slice(0, 4);
      setLatest(newProducts);
    }
  }, [products]);

  return (
    <Layout title="Home - TechEcommerce">
      <section className="max-w-screen-2xl mx-auto xs:w11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12  mb-10">
        <h2 className="mb-6 relative pb-0.5 font-textMedium text-gray-900 text-2xl before:content-[''] before:absolute before:bottom-0 before:w-10 before:h-1 before:bg-gray-900 before:rounded-md ">
          New Products
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {latest.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12">
        <div className="flex flex-row items-center justify-between pb-5">
          <div>
            <h2 className="relative pb-0.5 font-textMedium text-gray-900 text-2xl before:content-[''] before:absolute before:bottom-0 before:w-10 before:h-1 before:bg-gray-900 before:rounded-md ">
              Shop
            </h2>
            <h2 className="mt-3 text-sm">Products / {category.name}</h2>
          </div>
          <div>
            <span>{products.length}</span>
            <span className="ml-1">{products?.length === 1 ? 'Product' : 'Products'}</span>
          </div>
        </div>
        <div className="w-full grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-5">
          <Categories setCategory={setCategory} category={category} categories={categories} />
          <Products category={category} products={products} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const productsReq = await fetch(`${process.env.API_URL}/products`);
  const categoriesReq = await fetch(`${process.env.API_URL}/categories`);
  const productsRes = await productsReq.json();
  const categoriesRes = await categoriesReq.json();
  return {
    props: {
      products: productsRes,
      categories: categoriesRes,
    },
  };
};
