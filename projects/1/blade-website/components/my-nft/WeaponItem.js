/* eslint-disable @next/next/no-img-element */
import useWeaponNft from 'hooks/useWeaponNft';
import { Spinner } from 'react-bootstrap';
import styles from './NftItem.module.scss';
import router from 'next/router';
import { weaponName } from 'utils/nft_name';

function Info(props) {
  const { nft } = props;
  let cn;
  if (nft._bLevel === '1') {
    cn = styles.c1;
  }
  if (nft._bLevel === '2') {
    cn = styles.c2;
  }
  if (nft._bLevel === '3') {
    cn = styles.c3;
  }
  return (
    <p className={styles.name}>
      <span className={cn}>{weaponName(nft._kind, nft._bLevel)} #{nft.tokenId} </span>
      <p>
        Level: {nft._bLevel} | Power: {nft._power}
      </p>
    </p>
  );
}

export default function WeaponItem(props) {
  const { tokenId } = props;
  const { nft, loading } = useWeaponNft({ tokenId });
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
  console.log('weapon ' + tokenId, nft);
  return (
    <div className={styles.root}>
      {nft._kind === '1' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_001')}>
          <img src="/image/gallery/w11.png" alt="" className={styles.img} />
          <Info nft= {{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '1' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_002')}>
          <img src="/image/gallery/w12.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}}/>
        </div>
      )}
      {nft._kind === '1' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_003')}>
          <img src="/image/gallery/w13.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '2' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_004')}>
          <img src="/image/gallery/w21.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '2' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_005')}>
          <img src="/image/gallery/w22.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '2' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_006')}>
          <img src="/image/gallery/w23.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '3' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_007')}>
          <img src="/image/gallery/w31.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '3' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_008')}>
          <img src="/image/gallery/w32.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '3' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_009')}>
          <img src="/image/gallery/w33.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '4' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_010')}>
          <img src="/image/gallery/w41.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '4' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_011')}>
          <img src="/image/gallery/w42.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}}/>
        </div>
      )}
      {nft._kind === '4' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_012')}>
          <img src="/image/gallery/w43.png" alt="" className={styles.img} />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '5' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_013')}>
          <img
            src="/image/gallery/w51.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '5' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w52.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '5' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w53.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}

      {nft._kind === '6' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_013')}>
          <img
            src="/image/gallery/w61.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '6' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w62.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '6' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w63.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}

      {nft._kind === '7' && nft._bLevel === '1' && (
        <div onClick={() => router.push('/nft?key=weapon_013')}>
          <img
            src="/image/gallery/w71.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '7' && nft._bLevel === '2' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w72.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
      {nft._kind === '7' && nft._bLevel === '3' && (
        <div onClick={() => router.push('/nft?key=weapon_014')}>
          <img
            src="/image/gallery/w73.png"
            alt=""
            className={styles.img}
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}
          />
          <Info nft={{...nft,tokenId}} />
        </div>
      )}
    </div>
  );
}
