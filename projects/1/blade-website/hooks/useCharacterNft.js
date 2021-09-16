import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import CharacterAbi from 'abi/Characters.json';

const CHARACTER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CHARACTER_CONTRACT_ADDRESS;

export default function useCharacterNft(props) {
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
        const contract = new library.eth.Contract(CharacterAbi, CHARACTER_CONTRACT_ADDRESS, { from: account });
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
