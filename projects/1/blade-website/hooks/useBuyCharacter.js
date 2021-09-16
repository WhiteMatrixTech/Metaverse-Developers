import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import MainContractAbi from 'abi/BaldeMain.json';
import CharacterAbi from 'abi/Characters.json';
import { useToasts } from 'react-toast-notifications';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const CHARACTER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CHARACTER_CONTRACT_ADDRESS;

export default function useBuyCharacter() {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const buy = async (trait) => {
    if (!account) {
      addToast('Please connect wallet!', { appearance: 'error' });
      return;
    }

    const gasPrice = library.utils.toWei('2', 'gwei');
    const opts = { from: account, gasPrice, gas: 2500000 };
    const contract = new library.eth.Contract(MainContractAbi, MAIN_CONTRACT_ADDRESS, opts);
    const characterContract = new library.eth.Contract(CharacterAbi, CHARACTER_CONTRACT_ADDRESS);

    characterContract.once('NewCharacter', { filter: { minter: account } }, (err, event) => {
      if (!err) {
        addToast('Buy success, transaction ' + event.transactionHash, { appearance: 'success' });
      }
    });

    // check character amount
    const list = await contract.methods.getMyCharacters().call({ from: account });
    if (list.length >= 10) {
      addToast('Has too many characters!', { appearance: 'error' });
      return;
    }

    setLoading(true);
    // mint character
    try {
      const res = await contract.methods
        .mintCharacter(trait)
        .send()
        .once('transactionHash', (hash) => {
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

  return { buy, loading };
}
