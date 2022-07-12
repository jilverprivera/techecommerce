import type {NextPage} from 'next';
import CategoriesView from '../components/CategoriesView';
import LatestProducts from '../components/LatestProducts';

import Layout from '../layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home - TechEcommerce">
      <section className="w-full mx-auto max-w-screen-2xl content border-2 grid grid-cols-2">
        <div className="banner flex items-center justify-center">
          <h1>TechEcommerce</h1>
        </div>
        <div className="banner grid grid-cols-2">
          <div className="col-span-2 border-2"></div>
          <div className="border-2"></div>
          <div className="border-2"></div>
        </div>
      </section>

      {/* TODO: Collections */}
      {/* TODO: Featured Products */}
      {/* TODO: Latest Products */}
      <section className="w-full min-h-screen bg-white">
        <LatestProducts title="Latest Articles" />
        <CategoriesView title="Our Categories" />
      </section>
    </Layout>
  );
};

export default Home;
