import Link from 'next/link';
import {useRouter} from 'next/router';
import {useContext} from 'react';
import {BsBag, BsHeart, BsPerson} from 'react-icons/bs';
import {UserContext} from '../../context/UserContext';

const routes = [
  {path: '/', icon: <BsHeart />, name: 'Home'},
  {path: '/about', icon: <BsBag />, name: 'About'},
  {path: '/shop', icon: <BsPerson />, name: 'Shop'},
  // {path: '/shop', icon: <BsPerson />, name: 'Profile'},
];

const Header = () => {
  const {isLogged, isLoading, isAdmin, user} = useContext(UserContext);

  const {pathname} = useRouter();

  return (
    <header className="w-full relative flex items-center justify-center bg-white z-50">
      <nav className="max-w-screen-xl w-full h-32 flex items-center justify-between flex-row mx-auto relative">
        <div className="flex items-center justify-center">
          <div className="xs:hidden sm:hidden md:hidden  lg:block xl:block">
            {routes.map(route => (
              <Link href={route.path} key={route.path}>
                <a
                  className={` mx-3 text-base ${
                    pathname === route.path
                      ? 'font-supremeBold'
                      : 'font-supremeRegular'
                  }`}>
                  {route.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <h1 className="font-bold text-2xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          TechEcommerce
        </h1>
        <div className="flex items-center justify-center flex-row xs:hidden sm:hidden md:hidden  lg:block xl:block">
          <Link href={'/cart'}>
            <a className="mx-3 text-sm">Cart (0)</a>
          </Link>
          <Link href={'/wishlist'}>
            <a className="mx-3 text-sm">Wish list (0)</a>
          </Link>
          {!isLogged ? (
            <Link href={'/signin'}>
              <a className="mx-3 text-sm">Sign in</a>
            </Link>
          ) : (
            <Link href={'/account'}>
              <a className="mx-3 text-sm">Account</a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
