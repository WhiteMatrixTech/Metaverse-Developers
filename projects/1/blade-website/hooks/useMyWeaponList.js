import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import MainContractAbi from 'abi/BaldeMain.json';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;

export default function useMyWeaponList() {
  const { account, library } = useWeb3React();
  const [list, setList] = useState();
  const [loading, setLoading] = useState(false);

  function clear() {
    setList([]);
    setLoading(false);
  }

  useEffect(() => {
    if (!account) {
      clear();
      return;
    }
    async function fetch() {
      setLoading(true);
      const contract = new library.eth.Contract(MainContractAbi, MAIN_CONTRACT_ADDRESS, { from: account });
      const res = await contract.methods.getMyWeapons().call();
      setList(res);
      setLoading(false);
    }
    fetch();
  }, [account, library]);

  return { list, loading };
}
