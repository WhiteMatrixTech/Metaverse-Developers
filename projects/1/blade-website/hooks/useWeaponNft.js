import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import WeaponsAbi from 'abi/Weapons.json';

const WEAPON_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WEAPON_CONTRACT_ADDRESS;

export default function useWeaponNft(props) {
  const { tokenId } = props;
  const { account, library } = useWeb3React();
  const [nft, setNft] = useState();
  const [loading, setLoading] = useState(false);

  function clear() {
    setNft(null);
    setLoading(false);
  }

  useEffect(() => {
    if (!account) {
      clear();
      return;
    }
    async function fetch() {
      setLoading(true);
      try {
        const contract = new library.eth.Contract(WeaponsAbi, WEAPON_CONTRACT_ADDRESS, { from: account });
        const res = await contract.methods.get(tokenId).call();
        setNft(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, [tokenId, account, library]);

  return { nft, loading };
}
