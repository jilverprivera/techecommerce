import Layout from '../layout';

const WishList = () => {
  return (
    <Layout title="Cart - TechEcommerce">
      <section className="max-w-screen-xl min-h-screen mx-auto xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-full">
        <div className="xs:pb-5 sm:pb-5 md:pb-10 lg:pb-10 xl:pb-10 mb-10 border-b-2 flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row xs:justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start xs:items-center sm:items-center md:items-end lg:items-end xl:items-end">
          <h2 className="text-3xl font-supremeBold mr-5">Wish list</h2>
          <span className="text-sm font-supremeMedium">1 Item</span>
        </div>
        <div className="pb-10 mb-10 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 border-b-2 gap-5 last:pb-0 last:border-b-0 ">
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 flex items-center w-full justify-center  border-2 aspect-square">
            <span>IMAGE</span>
          </div>
          <div className="xs:col-span-1 sm:col-span-1 md:col-span-7 lg:col-span-7 xl:col-span-7 flex flex-col items-start justify-center ">
            <h2 className="text-lg font-supremeMedium tracking-wide">Title</h2>
            <h3 className="text-sm font-supremeRegular text-zinc-400">
              Category
            </h3>
            <p className="text-base font-supremeRegular">Description</p>
          </div>

          <div className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 relative flex flex-col items-center justify-center">
            <button className="border-2 border-zinc-50 hover:border-zinc-300 duration-300 w-full py-5 flex items-center justify-center text-xl text-zinc-500 hover:text-zinc-800">
              Remove
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WishList;
