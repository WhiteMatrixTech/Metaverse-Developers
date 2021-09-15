/* eslint-disable @next/next/no-img-element */
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Offcanvas } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import WalletAccount from './WalletAccount';
export default function Header() {
  const [sideShow, setSideShow] = useState(false);
  const handleClose = () => {
    setSideShow(false);
  };
  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.main}>
          <img src="/image/logo.png" alt="" className={styles.logo} />
          <ul className={styles.navs}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/?pos=tokenomics">Tokenomics</Link>
            </li>
            <li>
              <Link href="/nft">Game NFT</Link>
            </li>
            <li>
              <Link href="/box">Treasure Box</Link>
            </li>
            <li>
              <Link href="/?pos=roadmap">RoadMap</Link>
            </li>
            <li>
              <Link href="/?pos=ecosystem">Ecosystem</Link>
            </li>
            <li>
              <a target = "_blank" href="https://docs.blade.game" rel="noreferrer" >WhitePaper</a>
            </li>
            <li>
              <Link href="/my-nft">My NFT</Link>
            </li>

          </ul>
          <WalletAccount />
          <div className={styles.bar} onClick={() => setSideShow(true)}>
            <FontAwesomeIcon icon={faBars} color="#fff" />
          </div>
          <Offcanvas show={sideShow} onHide={handleClose} placement="end" className={styles.side}>
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className={styles.sideNavs}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/?pos=tokenomics">Tokenomics</Link>
                </li>
                <li>
                  <Link href="/nft">Game NFT</Link>
                </li>
                <li>
                  <Link href="/box">Treasure Box</Link>
                </li>
                <li>
                  <Link href="/?pos=roadmap">RoadMap</Link>
                </li>
                <li>
                  <Link href="/?pos=ecosystem">Ecosystem</Link>
                </li>
                <li>
                  <a target = "_blank" href="https://docs.blade.game" rel="noreferrer" >WhitePaper</a>
                </li>
                <li>
                  <Link href="/my-nft">My NFT</Link>
                </li>
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </div>
  );
}
