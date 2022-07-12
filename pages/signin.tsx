import {useContext, useEffect} from 'react';
import Link from 'next/link';
import {IoReturnDownBackOutline} from 'react-icons/io5';

import {UserContext} from '../context/UserContext';
import {useForm} from '../hooks/useForm';

import Layout from '../layout';
import Input from '../components/auth/input';
import {useRouter} from 'next/router';

const SignIn = () => {
  const Router = useRouter();
  const {signIn, isLogged} = useContext(UserContext);

  useEffect(() => {
    if (isLogged) {
      Router.replace('/');
    }
  }, [isLogged]);

  const {values, handleChange} = useForm({
    email: 'jilverrivera1@gmail.com',
    password: '123456789',
  });
  const {email, password} = values;

  const handleSignIn = (e: any) => {
    e.preventDefault();
    signIn(values);
  };
  return (
    <Layout title="Sign In - TechEcommerce">
      <section className="relative w-full h-screen flex flex-col items-center justify-center">
        <div className="absolute top-4 left-4">
          <Link href={'/'}>
            <a className="flex flex-row items-center justify-center">
              <span className="text-xl mr-2">
                <IoReturnDownBackOutline />
              </span>
              <span className="text-sm">Back to home</span>
            </a>
          </Link>
        </div>
        <form
          className="max-w-lg w-full flex items-center justify-center flex-col p-4"
          onSubmit={handleSignIn}>
          <h1 className="text-2xl font-medium">Sign Up</h1>
          <h2 className="text-md font-medium">Let's create a account</h2>

          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />

          <span className="text-sm w-full my-2">
            Don't have account yet?
            <Link href={'/signup'}>
              <a className="ml-2 font-medium hover:underline">Sign Up</a>
            </Link>
          </span>
          <button className="px-4 py-2 border-2 rounded-lg">
            <span>Sign in</span>
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default SignIn;
