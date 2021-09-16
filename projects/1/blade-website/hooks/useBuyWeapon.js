import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import MainContractAbi from 'abi/BaldeMain.json';
import WeaponsAbi from 'abi/Weapons.json';
import { useToasts } from 'react-toast-notifications';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const WEAPON_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_WEAPON_CONTRACT_ADDRESS;

export default function useBuyWeapon() {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const buy = async (kind, bLevel) => {
    const gasPrice = library.utils.toWei('2', 'gwei');
    const opts = { from: account, gasPrice, gas: 2500000 };
    const contract = new library.eth.Contract(MainContractAbi, MAIN_CONTRACT_ADDRESS, opts);
    const weaponContract = new library.eth.Contract(WeaponsAbi, WEAPON_CONTRACT_ADDRESS);

    weaponContract.once('NewWeapon', { filter: { minter: account } }, (err, event) => {
      if (!err) {
        addToast('Buy success, transaction ' + event.transactionHash, { appearance: 'success' });
      }
    });

    setLoading(true);

    // mint weapon
    try {
      const res = await contract.methods
        .mintWeapon(kind, bLevel)
        .send()
        .once('transactionHash', (hash) => {
          addToast('Transaction ' + hash + ' submitted!', { appearance: 'success' });
        });
      setLoading(false);
    } catch (err) {
      console.log(err);
      let msg = 'Contract execution failed!';
      if (err.code && err.message) {
        msg = err.message;
      }
      setLoading(false);
      addToast(msg, { appearance: 'error' });
    }
  };

  return { buy, loading };
}
