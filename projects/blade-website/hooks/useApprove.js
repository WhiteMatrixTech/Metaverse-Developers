import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Erc20Abi from 'abi/Erc20.json';

export default function useApprove(initialState = {}) {
  const { account, library } = useWeb3React();
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { tokenAddress, spenderAddress } = initialState;

  useEffect(() => {
    if (!library || !account) {
      setApproved(false);
      return;
    }
    async function checkAllowance() {
      const contract = new library.eth.Contract(Erc20Abi, tokenAddress);
      const amount = await contract.methods.allowance(account, spenderAddress).call();
      if (amount > 0) {
        setApproved(true);
      } else {
        setApproved(false);
      }
    }
    checkAllowance();
  }, [account, library, tokenAddress, spenderAddress]);

  const approve = async () => {
    if (!account) {
      addToast('Please connect wallet!', { appearance: 'error' });
      return;
    }
    //TODO calc approve amount
    setLoading(true);
    const contract = new library.eth.Contract(Erc20Abi, tokenAddress);
    const amount = library.utils.toWei('100000000', 'ether');

    // approve
    try {
      const gasPrice = library.utils.toWei('1', 'gwei');
      const res = await contract.methods.approve(spenderAddress, amount).send({ from: account, gasPrice, gas: 250000 });
      setApproved(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      addToast(err.message, { appearance: 'error' });
    }
  };

  return { approved, approve, loading };
}
