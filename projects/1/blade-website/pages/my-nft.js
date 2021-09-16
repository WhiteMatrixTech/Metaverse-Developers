import Layout from 'components/Layout';
import styles from './my-nft.module.scss';
import CharacherList from 'components/my-nft/CharacterList';
import { useWeb3React } from '@web3-react/core';
import WeaponList from 'components/my-nft/WeaponList';

export default function MyNft() {
  const { account } = useWeb3React();
  return (
    <Layout>
      <div className={styles.root}>
        <div className="container">
          {!account && <p style={{ textAlign: 'center', margin: 100 }}>Please contect your wallet to view nfts.</p>}
          {account && (
            <div>
              <CharacherList />
              <WeaponList />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
