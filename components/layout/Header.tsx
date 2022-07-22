import { useContext } from 'react';
import Link from 'next/link';
import { FiSearch, FiBriefcase } from 'react-icons/fi';

import { AppContext } from 'context/AppContext';
import { UserContext } from 'context/UserContext';

const Header = () => {
  const { isLogged, isAdmin, cart, wishList, signOut } = useContext(UserContext);
  const { signInModal, signUpModal, setProductSearch } = useContext(AppContext);
  const { setOpenSignInModal } = signInModal;
  const { setOpenSignUpModal } = signUpModal;

  return (
    <header
      className={`w-full h-24 relative flex flex-row items-center justify-between bg-neutral-100 z-50 ${
        isLogged && !isAdmin ? 'pl-14 pr-28' : 'px-14'
      }`}
    >
      <Link href="/">
        <a className="font-textSemibold text-3xl">TechEcommerce</a>
      </Link>

      {!isLogged && (
        <div className="flex items-center justify-center">
          <button className="mr-3 text-sm" onClick={() => setOpenSignInModal(true)}>
            Sign In
          </button>
          <span className="h-5 w-0.5 rounded-xl bg-black" />
          <button className="ml-3 text-sm" onClick={() => setOpenSignUpModal(true)}>
            Create account
          </button>
        </div>
      )}

      {isLogged && !isAdmin && (
        <Link href="/cart">
          <a className="absolute top-0 right-0 w-24 aspect-square bg-neutral-900 text-white flex items-center justify-center">
            <div className="relative">
              <span className="w-4 h-4 rounded-full absolute top-0 right-0 text-xs bg-pink-500 flex items-center justify-center">
                {cart.length}
              </span>
              <span className="text-3xl">
                <FiBriefcase />
              </span>
            </div>
          </a>
        </Link>
      )}

      {isAdmin && isLogged && (
        <div className="flex items-center justify-center">
          <Link href={'/dashboard'}>
            <a className="ml-3 text-sm">Dashboard</a>
          </Link>
          <button
            className="ml-3 text-sm text-pink-500 border-2 px-2 py-1 rounded-sm border-pink-500 hover:bg-pink-500 hover:text-white duration-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}

      {!isAdmin && isLogged && (
        <div className="w-2/4 flex items-center justify-end">
          <div className="relative max-w-sm w-full ">
            <input
              className="bg-white w-full pl-3 pr-9 py-2 rounded-xl text-sm placeholder:tracking-widest tracking-widest font-textRegular"
              placeholder="Search..."
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <span className="absolute top-2/4 -translate-y-2/4 right-3 text-xl text-gray-400">
              <FiSearch />
            </span>
          </div>
          <Link href={'/wishlist'}>
            <a className="ml-3 text-sm">Wish List [{wishList.length}]</a>
          </Link>
          <Link href={'/account'}>
            <a className="ml-3 text-sm">Account</a>
          </Link>
          <button
            className="ml-3 text-sm text-pink-500 border-2 px-2 py-1 rounded-sm border-pink-500 hover:bg-pink-500 hover:text-white duration-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
