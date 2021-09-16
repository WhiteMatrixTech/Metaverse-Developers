/* eslint-disable @next/next/no-img-element */
import useCharacterNft from 'hooks/useCharacterNft';
import { Spinner } from 'react-bootstrap';
import styles from './NftItem.module.scss';
import router from 'next/router';
import { characterName } from 'utils/nft_name';

export default function CharacterItem(props) {
  const { tokenId } = props;
  const { nft, loading } = useCharacterNft({ tokenId });

  if (loading) {
    return (
      <div className={styles.root}>
        <div className={styles.loading}>
          <Spinner animation="border" size="sm" />
        </div>
      </div>
    );
  }

  if (!nft) {
    return <div></div>;
  }
  console.log('character: ' + tokenId, nft);
  return (
    <div className={styles.root}>
      {nft[2] === '1' && (
        <div onClick={() => router.push('/nft?key=hero_001')}>
          <img src="/image/gallery/cha01.png" alt="" className={styles.img} />
          <p className={styles.name}>
            <span className={styles.c1}>{characterName(nft[2])} #{tokenId}</span>
            <p>
              Level: {nft[2]} | Power: {nft[4]}
            </p>
          </p>
        </div>
      )}
      {nft[2] === '2' && (
        <div onClick={() => router.push('/nft?key=hero_002')}>
          <img src="/image/gallery/cha02.png" alt="" className={styles.img} />
          <p className={styles.name}>
            <span className={styles.c2}>{characterName(nft[2])} #{tokenId}</span>
            <p>
              Level: {nft[2]} | Power: {nft[4]}
            </p>
          </p>
        </div>
      )}
      {nft[2] === '3' && (
        <div onClick={() => router.push('/nft?key=hero_003')}>
          <img src="/image/gallery/cha03.png" alt="" className={styles.img} />
          <p className={styles.name}>
            <span className={styles.c3}>{characterName(nft[2])} #{tokenId}</span>
            <p>
              Level: {nft[2]} | Power: {nft[4]}
            </p>
          </p>
        </div>
      )}
      {nft[2] === '4' && (
        <div onClick={() => router.push('/nft?key=hero_004')}>
          <img src="/image/gallery/cha04.png" alt="" className={styles.img} />
          <p className={styles.name}>
            <span className={styles.c3}>{characterName(nft[2])} #{tokenId}</span>
            <p>
              Level: {nft[1]} | Power: {nft[4]}
            </p>
          </p>
        </div>
      )}
      {nft[2] === '5' && (
        <div onClick={() => router.push('/nft?key=hero_005')}>
          <img src="/image/gallery/cha05.png" alt="" className={styles.img} />
          <p className={styles.name}>
            <span className={styles.c3}>{characterName(nft[2])} #{tokenId}</span>
            <p>
              Level: {nft[1]} | Power: {nft[4]}
            </p>
          </p>
        </div>
      )}
    </div>
  );
}
