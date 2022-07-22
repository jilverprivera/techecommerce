import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { UserContext } from 'context/UserContext';

import Layout from 'components/layout';
import AdminHeader from 'components/dashboard/Header';

import { viewOptions } from 'interfaces/adminViewOptions';

const Dashboard = () => {
  const { isAdmin, isLogged } = useContext(UserContext);
  const [view, setView] = useState<viewOptions>(viewOptions.USERS);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLogged && !isAdmin) push('/');
  }, [isLogged, isAdmin]);

  return (
    <Layout title="Dashboard - TechEcommerce">
      <AdminHeader view={view} setView={setView} />
      <section className="max-w-screen-xl w-full mx-auto">
        {/* {view === viewOptions.USERS && <AdminUsers />}
        {view === viewOptions.CATEGORIES && <AdminCategories />}
        {view === viewOptions.PRODUCTS && <AdminProducts />}
        {view === viewOptions.PAYMENTS && <AdminPayments />} */}
      </section>
    </Layout>
  );
};

export default Dashboard;
