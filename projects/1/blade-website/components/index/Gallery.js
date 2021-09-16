/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import AliceCarousel from 'react-alice-carousel';
import styles from './Gallery.module.scss';
import router from 'next/router';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <div className={styles.box} onClick={() => router.push('/nft?key=hero_001')}>
    <img src="/image/gallery/cha01.png?t=1" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Blaze Dazzle</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=hero_002')}>
    <img src="/image/gallery/cha02.png?t=1" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Bleed Phantom</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=hero_003')}>
    <img src="/image/gallery/cha03.png?t=1" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Blade Lord</span>
    </div>
  </div>,

  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_001')}>
    <img src="/image/gallery/w11.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Axe of Cut rock</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_002')}>
    <img src="/image/gallery/w12.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Axe of Soul Suppression</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_003')}>
    <img src="/image/gallery/w13.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Holy Axe</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_004')}>
    <img src="/image/gallery/w21.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Bloodthirsty Greatsword</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_005')}>
    <img src="/image/gallery/w22.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Demon Great Sword</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_006')}>
    <img src="/image/gallery/w23.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Great Sword of Gods</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_007')}>
    <img src="/image/gallery/w31.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Sage Sword</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_008')}>
    <img src="/image/gallery/w32.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Saint Mark Sword</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_009')}>
    <img src="/image/gallery/w33.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Demon Sword</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_010')}>
    <img src="/image/gallery/w41.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Dragon Slaying Axe</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_011')}>
    <img src="/image/gallery/w42.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Overlord Axe</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_012')}>
    <img src="/image/gallery/w43.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Axe of Vengeance</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_013')}>
    <img src="/image/gallery/w51.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Warhammer of Killing</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_014')}>
    <img src="/image/gallery/w52.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Warhammer of Fury</span>
    </div>
  </div>,
  <div className={styles.box} onClick={() => router.push('/nft?key=weapon_015')}>
    <img src="/image/gallery/w53.png" alt="" onDragStart={handleDragStart} />
    <div className={styles.info}>
      <span>Grim Reaper</span>
    </div>
  </div>,
];
export default function Gallery() {
  return (
    <div className={styles.root} id="nft">
      <div className={styles.header}>Game NFT</div>
      <div className="container">
        <div className={styles.carousel}>
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={{
              540: {
                items: 1,
              },
              720: {
                items: 2,
              },
              960: {
                items: 4,
              },
              1300: {
                items: 5,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
