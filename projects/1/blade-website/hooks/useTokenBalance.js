import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import Erc20Abi from 'abi/Erc20.json';

export default function useTokenBalance(initialState = {}) {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();
  const { tokenAddress } = initialState;

  useEffect(() => {
    if (!library || !account) {
      return;
    }
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  async function fetchBalance() {
    if (!library || !account) {
      return;
    }
    const contract = new library.eth.Contract(Erc20Abi, tokenAddress);
    setLoading(true);
    const amount = await contract.methods.balanceOf(account).call();
    setBalance(library.utils.fromWei(amount));
    setLoading(false);
  }

  return { balance, loading, fetchBalance };
}
