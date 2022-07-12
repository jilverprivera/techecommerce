import Head from 'next/head';
import {useRouter} from 'next/router';
import Header from './components/Header';

interface Props {
  title: string;
  description?: string;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({children, title, description}: Props) => {
  const {pathname} = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={
            description
              ? description
              : 'TechEcommerce is a personal project created by @jilverprivera.'
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!pathname.includes('/sign') && <Header />}
      <main className="relative w-full">{children}</main>
    </>
  );
};

export default Layout;
