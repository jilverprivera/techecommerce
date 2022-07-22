import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import { AdminProvider } from '../context/AdminContext';
import { AppProvider } from 'context/AppContext';
import { LayoutProvider } from 'context/LayoutContext';
import { UserProvider } from 'context/UserContext';
import Header from 'components/layout/Header';

import 'styles/globals.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PayPalScriptProvider options={{ 'client-id': String(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) }}>
      <AppProvider>
        <UserProvider>
          <AdminProvider>
            <LayoutProvider>
              {router.pathname.includes('/sign') ? <div></div> : <Header />}
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </LayoutProvider>
          </AdminProvider>
        </UserProvider>
      </AppProvider>
    </PayPalScriptProvider>
  );
}

export default MyApp;
