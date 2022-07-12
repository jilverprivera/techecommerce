import {useContext} from 'react';
import {BsArrowRight} from 'react-icons/bs';
import LatestUsers from '../../components/profile/LatestUsers';
import {UserContext} from '../../context/UserContext';
import Layout from '../../layout';

const Account = () => {
  const {user, isAdmin} = useContext(UserContext);
  return (
    <Layout title={`${user?.name}'s Profile - TechEcommerce`}>
      <section className="max-w-screen-xl bg-gray-50 mx-auto content xs:w-11/12 sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-full">
        {isAdmin ? (
          <section className="w-full grid grid-cols-12 gap-5">
            <div className=" w-full col-span-12 grid grid-cols-12 gap-5">
              <button className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 border-2 flex items-center justify-start rounded-md">
                <div className="w-14 h-14 flex items-center justify-center mr-5 bg-zinc-50"></div>
                Users
              </button>
              <button className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 border-2 flex items-center justify-start rounded-md">
                <div className="w-14 h-14 flex items-center justify-center mr-5 bg-zinc-50"></div>
                Categories
              </button>
              <button className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 border-2 flex items-center justify-start rounded-md">
                <div className="w-14 h-14 flex items-center justify-center mr-5 bg-zinc-50"></div>
                Products
              </button>
              <button className="xs:col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 xl:col-span-3 border-2 flex items-center justify-start rounded-md">
                <div className="w-14 h-14 flex items-center justify-center mr-5 bg-zinc-50"></div>
                Payments
              </button>
            </div>
            <div className="col-span-9">
              <LatestUsers />
            </div>
            <div className="col-span-3">
              <button className="border-2 flex items-center justify-center w-full py-2.5">
                Create new users
              </button>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 my-5">
              <h2>Your information</h2>
              <div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <div>
              <h2>Your history payments</h2>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Account;
