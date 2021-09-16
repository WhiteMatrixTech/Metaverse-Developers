import Head from 'next/head';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <link rel="shortcut icon" href="/favicon.png"></link>
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </div>
  );
}

export default MyApp;
