import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { UserContext } from '../context/UserContext';

import Layout from '../components/layout';

import { ProductInterface } from '../interfaces/products';
import { GetServerSideProps } from 'next';

interface serverProps {
  product: ProductInterface;
  products: ProductInterface[];
}

const ProductDetail = ({ product, products }: serverProps) => {
  const [relateds, setRelateds] = useState<ProductInterface[]>([]);
  const { addToCart, addToWishList } = useContext(UserContext);

  useEffect(() => {
    const getRelatedProducts = () => {
      if (product && products) {
        const relatedProducts = products.filter(
          (el) => el.category === product.category && el._id !== product._id
        );
        setRelateds(relatedProducts);
      }
    };
    getRelatedProducts();
  }, [product, products]);

  return (
    <Layout title="Product detail - TechEcommerce">
      <section className="max-w-screen-xl content w-full mx-auto flex items-center justify-center">
        <div className="grid grid-cols-2 gap-5">
          <div className="overflow-hidden">
            {product?.image && (
              <Image
                src={product.image.url}
                alt={product.product_id}
                width={1024}
                height={964}
                objectFit="cover"
                quality={100}
              />
            )}
          </div>
          <div className="flex items-start justify-center flex-col">
            <h1 className="text-3xl font-supremeMedium">{product?.name}</h1>
            <span className="text-xs font-supremeLight">Ref: {product?.product_id}</span>
            <p className="w-4/5 my-5 leading-7">{product?.content}</p>
            <p>Available: {product?.stock}</p>
            <p>Solds: {product?.sold}</p>
            <p>$ {product?.price} usd</p>

            {product && (
              <div className="mt-20">
                <button
                  className="bg-zinc-900 px-10 py-2.5 text-white mr-5 hover:bg-zinc-700 duration-150"
                  onClick={() => addToCart({ ...product, quantity: 1 })}
                >
                  Add to cart
                </button>
                <button className=" p-2.5 ">
                  <span
                    className="border-b-2 border-zinc-900 pb-1"
                    onClick={() => addToWishList({ ...product })}
                  >
                    Add to wish list
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="max-w-screen-xl w-full mx-auto flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-5">Some products related</h2>
        <div className="grid grid-cols-4 gap-5">
          {relateds.slice(0, 4).map((product) => (
            <Link href={`/${product._id}`} key={product._id}>
              <a className="border-2 border-zinc-100 flex flex-col items-center justify-center">
                <Image
                  className="w-1/4 h-1/4 aspect-square"
                  src={product.image.url}
                  alt={product.product_id}
                  width={680}
                  height={680}
                />
                <div className="my-2.5">
                  <h4 className="text-xl font-supremeMedium">{product.name}</h4>
                  <span className="text-sm">${product.price} usd</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const singleProductReq = await fetch(`http://localhost:3000/api/products/${params?.id}`);
  const productsReq = await fetch('http://localhost:3000/api/products');
  const singleProductRes = await singleProductReq.json();
  const productsRes = await productsReq.json();
  return {
    props: {
      product: singleProductRes,
      products: productsRes,
    },
  };
};
