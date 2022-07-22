import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { UserContext } from '../context/UserContext';
import Layout from '../components/layout';

const Account = () => {
  const { push } = useRouter();
  const { user, isLogged } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) push('/');
  }, [isLogged]);

  return (
    <Layout title={`${user?.name ? `${user?.name}'s Profile - TechEcommerce` : 'Account - TechEcommerce'}`}>
      <section className="w-full"></section>
    </Layout>
  );
};

export default Account;
