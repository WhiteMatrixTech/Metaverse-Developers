import Footer from './Footer';
import Header from './Header';
import { ToastProvider } from 'react-toast-notifications';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';

export default function Layout({ children }) {
  const { activate } = useWeb3React();
  useEffect(() => {
    if (localStorage.wallet_manual_state === 'connect') {
      try {
        activate(injected, undefined, true);
      } catch (err) {
        if (err instanceof UnsupportedChainIdError) {
          addToast('Only OkexChain supported!', { appearance: 'error' });
        } else {
          //TODO check more errors
          addToast(err.message, { appearance: 'error' });
        }
      }
    }
  }, [activate]);
  return (
    <ToastProvider placement="top-center" autoDismiss autoDismissTimeout={3000}>
      <div>
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </ToastProvider>
  );
}
