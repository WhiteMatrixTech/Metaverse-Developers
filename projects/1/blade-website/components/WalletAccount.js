import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { injected } from 'connectors';
import { useToasts } from 'react-toast-notifications';

import styles from './WalletAccount.module.scss';

// TODO disconnect ui
export default function WalletAccount() {
  const { account, activate, deactivate } = useWeb3React();
  const { addToast } = useToasts();

  const connect = async () => {
    try {
      await activate(injected, undefined, true);
      localStorage.wallet_manual_state = 'connect';
    } catch (err) {
      if (err instanceof UnsupportedChainIdError) {
        addToast('Only OkexChain supported!', { appearance: 'error' });
      } else {
        //TODO check more errors
        addToast(err.message, { appearance: 'error' });
      }
    }
  };

  const disconnect = () => {
    deactivate();
    localStorage.wallet_manual_state = 'close';
  };

  const maskAccount = (v) => {
    return v.substring(0, 4) + '****' + v.substring(v.length - 4);
  };
  return (
    <div className={styles.root}>
      {!account && (
        <div className={styles.btn} onClick={connect}>
          Connect Wallet
        </div>
      )}
      {account && (
        <div className={styles.account} onClick={disconnect}>
          {maskAccount(account)}
        </div>
      )}
    </div>
  );
}
