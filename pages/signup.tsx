import Link from 'next/link';
import Layout from '../layout';
import {IoReturnDownBackOutline} from 'react-icons/io5';
import Input from '../components/auth/input';
import {useForm} from '../hooks/useForm';

const SignUp = () => {
  const {values, handleChange} = useForm({
    name: 'Test-1',
    email: 'test1@gmail.com',
    password: '123456789',
    password2: '123456789',
  });
  const {name, email, password, password2} = values;
  return (
    <Layout title="SignUp - TechEcommerce">
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
        <form className="max-w-lg w-full flex items-center justify-center flex-col p-4">
          <h1 className="text-2xl font-medium">Sign Up</h1>
          <h2 className="text-md font-medium">Let's create a account</h2>
          <Input
            label="Name"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
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
          <Input
            label="Confirm your password"
            name="password2"
            type="password"
            value={password2}
            onChange={handleChange}
          />

          <span className="text-sm w-full my-2">
            Already registered?
            <Link href={'/signin'}>
              <a className="ml-2 font-medium hover:underline">Sign In</a>
            </Link>
          </span>
          <button className="px-4 py-2 border-2 rounded-lg">
            <span>Create account</span>
          </button>
        </form>
      </section>
    </Layout>
  );
};

export default SignUp;
