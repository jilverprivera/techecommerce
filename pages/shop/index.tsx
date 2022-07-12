import {NextPage} from 'next';

import Layout from '../../layout';
import Categories from '../../components/Categories';
import Products from '../../components/Products';
import {useState} from 'react';
import Selector from '../../components/shop/selector';

export interface Value {
  value: string;
}
const Shop: NextPage = () => {
  const [selector, setSelector] = useState<any>('Latest');

  const handleChange = (event: any) => {
    const {target} = event;
    const {value}: Value = target;
    setSelector(value);
  };
  return (
    <Layout title="Shop - TechEcommerce">
      <section className="max-w-screen-xl mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-full">
        <div className="w-full grid grid-cols-12 border-b-2 border-stone-100 pb-10 mb-10">
          <h1 className=" col-span-3 text-3xl font-semibold text-stone-900">
            Shop
          </h1>
          <Selector selector={selector} handleChange={handleChange} />
        </div>
        <div className="w-full grid grid-cols-12 mb-10 gap-4">
          <Categories />
          <Products selector={selector} />
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
