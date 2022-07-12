import {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {UserContext} from '../../context/UserContext';
import {CategoryInterface} from '../../interfaces/categories';
import {ProductInterface} from '../../interfaces/products';
import Layout from '../../layout';
import {AppContext} from '../../context/AppContext';

const fetcher = async (args: string) =>
  await fetch(args).then((res): Promise<ProductInterface> => res.json());

const ProductDetail = () => {
  const [category, setCategory] = useState();
  const {query} = useRouter();
  const {URL, getCategoryName} = useContext(AppContext);
  const {id} = query;
  const {data, isValidating} = useSWR(`${URL}/product/${id}`, fetcher);

  useEffect(() => {
    if (data) {
      const productCategory = getCategoryName(data.category);
      console.log(productCategory);
    }
  }, [data]);

  return (
    <Layout title={`${data?.name} | TechEcommerce`}>
      {isValidating ? (
        <div className="col-span-2 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <section className="max-w-screen-xl w-full mx-auto grid grid-cols-2 gap-5">
          <div className="overflow-hidden">
            {data?.images && (
              <Image
                src={data.images.url}
                alt={data.product_id}
                width={1024}
                height={964}
                objectFit="cover"
                quality={100}
              />
            )}
          </div>
          <div className="flex items-start justify-center flex-col">
            <h1 className="text-3xl font-supremeMedium">{data?.name}</h1>
            <span className="text-xs font-supremeLight">
              Ref: {data?.product_id}
            </span>
            <p className="w-4/5 my-5 leading-7">{data?.content}</p>
            <p>Available: {data?.stock}</p>
            <p>Solds: {data?.sold}</p>
            <p>$ {data?.price} usd</p>
            <div className="col-span-2 flex items-center justify-start my-5">
              <span className="mr-10">Amount:</span>
              <button className="border-2 h-8 w-8 rounded-md text-3xl flex items-center justify-center mr-5">
                -
              </button>
              <span>1</span>
              <button className="border-2 h-8 w-8 rounded-md text-2xl flex items-center justify-center ml-5">
                +
              </button>
            </div>
            <div className="mt-20">
              <button className="bg-zinc-900 px-10 py-2.5 text-white mr-5 hover:bg-zinc-700 duration-150">
                Add to cart
              </button>
              <button className=" p-2.5 ">
                <span className="border-b-2 border-zinc-900 pb-1">
                  Add to wish list
                </span>
              </button>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
