import { InjectedConnector } from '@web3-react/injected-connector';

const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID);

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(CHAIN_ID)],
});
