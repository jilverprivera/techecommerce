import {GrClose} from 'react-icons/gr';
import Layout from '../layout';

const Cart = () => {
  return (
    <Layout title="Cart - TechEcommerce">
      <section className="max-w-screen-xl min-h-screen mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-full">
        <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center pb-10 mb-10 border-b-2">
          <div className="flex flex-row items-end xs:justify-between sm:justify-between md:justify-center lg:justify-center xl:justify-center">
            <h2 className="text-3xl font-supremeBold xs:mr-0 sm:mr-0 md:mr-5 lg:mr-5 xl:mr-5">
              Your cart
            </h2>
            <span className="text-sm font-supremeMedium">1 Item</span>
          </div>
          <div className="flex justify-center xs:flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row xl:flex-row xs:items-center sm:items-center md:items-end lg:items-end xl:items-end xs:mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0">
            <p className="text-sm font-supremeMedium xs:mr-0 sm:mr-0 md:mr-10 lg:mr-10 xl:mr-10">
              Total
            </p>
            <span className="xs:text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl font-supremeBold">
              $ 45 USD
            </span>
          </div>
        </div>
        <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 border-b-2 gap-5 pb-10 last:pb-0 last:border-b-0">
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 flex items-center justify-center  border-2 aspect-square">
            <span>IMAGE</span>
          </div>
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4 flex flex-col items-start justify-center ">
            <h2 className="text-lg font-supremeMedium tracking-wide">Title</h2>
            <h3 className="text-sm font-supremeRegular text-zinc-400">
              Category
            </h3>
            <p className="text-base font-supremeRegular">Description</p>
          </div>
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 flex items-center justify-center">
            <button className="border-2 h-8 w-8 rounded-md text-3xl flex items-center justify-center mr-5">
              -
            </button>
            <span>1</span>
            <button className="border-2 h-8 w-8 rounded-md text-2xl flex items-center justify-center ml-5">
              +
            </button>
          </div>

          <div className="w-full relative items-center justify-center flex-col xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3">
            <span>$ 45 USD</span>
            <button className="xs:hidden sm:hidden md:flex lg:flex xl:flex absolute top-5 right-5 border-2 border-zinc-100 hover:border-zinc-300 duration-300 py-5 h-10 w-10 flex items-center justify-center text-xl">
              <GrClose />
            </button>
            <button className="xs:block sm:block md:hidden lg:hidden xl:hidden border-2 border-zinc-50 hover:border-zinc-300 duration-300 w-full py-5 flex items-center justify-center text-xl text-zinc-500 hover:text-zinc-800">
              Remove
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
