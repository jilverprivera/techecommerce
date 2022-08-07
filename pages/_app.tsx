import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import { AdminProvider } from '../context/AdminContext';
import { AppProvider } from 'context/AppContext';
import { LayoutProvider } from 'context/LayoutContext';
import { UserProvider } from 'context/UserContext';
import Header from 'components/layout/Header';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import 'styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <PayPalScriptProvider options={{ 'client-id': String(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) }}>
      <AppProvider>
        <LayoutProvider>
          <UserProvider>
            <AdminProvider>
              {router.pathname.includes('/sign') ? <div></div> : <Header />}
              <AnimatePresence exitBeforeEnter initial={false}>
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
            </AdminProvider>
          </UserProvider>
        </LayoutProvider>
      </AppProvider>
    </PayPalScriptProvider>
  );
}

export default MyApp;
