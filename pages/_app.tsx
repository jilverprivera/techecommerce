import type {AppProps} from 'next/app';
import {UserProvider} from '../context/UserContext';
import {AppProvider} from '../context/AppContext';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <UserProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </UserProvider>
  );
}

export default MyApp;
