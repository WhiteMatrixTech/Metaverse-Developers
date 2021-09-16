import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import MainContractAbi from 'abi/BaldeMain.json';
import { useToasts } from 'react-toast-notifications';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export default function useBuyBox() {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const [paid, setPaid] = useState(false);
  const [mintResult, setMintResult] = useState();

  const buy = async (level) => {
    if (!account) {
      addToast('Please connect wallet!', { appearance: 'error' });
      return;
    }

    setPaid(false);

    const gasPrice = library.utils.toWei('1', 'gwei');
    const opts = { from: account, gasPrice, gas: 2500000 };
    const contract = new library.eth.Contract(MainContractAbi, MAIN_CONTRACT_ADDRESS, opts);

    // watch event
    contract.once('MintBoxsSuccess', { filter: { minter: account } }, (err, event) => {
      if (!err) {
        console.log('mint box success: ', event);
        setMintResult({ result: true, event });
        // addToast('MintCharactersSuccess ' + event.transactionHash, { appearance: 'success' });
      }
    });
    contract.once('MintBoxsFailure', { filter: { minter: account } }, (err, event) => {
      if (!err) {
        console.log('mint box failure: ', event);
        setMintResult({ result: false, event });
        // addToast('MintCharactersSuccess ' + event.transactionHash, { appearance: 'success' });
      }
    });

    setLoading(true);
    // mint box
    try {
      let method;
      if (level === 'l') {
        method = contract.methods.mintBoxL();
      }
      if (level === 'h') {
        method = contract.methods.mintBoxH();
      }
      if (level === 's') {
        method = contract.methods.mintBoxS();
      }
      if (level === 'u') {
        method = contract.methods.mintBoxHU();
      }

      await method.send().once('transactionHash', (hash) => {
        setPaid(true);
        addToast('Transaction ' + hash + ' submitted!', { appearance: 'success' });
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      let msg = 'Contract execution failed!';
      if (err.code === 4001) {
        msg = err.message;
      }
      setLoading(false);
      addToast(msg, { appearance: 'error' });
    }
  };

  return { buy, loading, paid, mintResult };
}
