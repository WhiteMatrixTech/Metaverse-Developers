/* eslint-disable @next/next/no-img-element */
import styles from './Footer.module.scss';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faTwitter, faTelegram, faWeibo, faMedium } from '@fortawesome/free-brands-svg-icons';
import cx from 'classnames';
export default function Footer() {
  return (
    <div className={styles.root}>
      <div className={cx(styles.main, 'container')}>
        <Row>
          <Col lg={4}>
            <div className={styles.intro}>
              <img src="/image/logo.png" alt="" className={styles.logo} />
              <p>
                Blade Warrior is an epic sci-fi massively Play to Earn NFT blockchain game developed by Blade team, and
                published by Blade Limited.
              </p>
            </div>
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
            <Row className={styles.navs}>
              <Col>
                <div className={styles.title}>Navigation</div>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/?pos=tokenomics">Tokenomics</Link>
                  </li>
                  <li>
                    <Link href="/?pos=nft">Game NFT</Link>
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
              </Col>
              <Col>
                <div className={styles.title}>Support</div>
                <ul>
                  <li>
                    <a>FAQ</a>
                  </li>
                  <li>
                    <a>Contact</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col lg={3}>
            <div className={styles.icons}>
              <a href="https://twitter.com/0xBladeGame" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://t.me/BladeGame" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
              <a href="https://t.me/BladeGame_En" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
              <a
                href="https://m.weibo.cn/p/10080830bd847255a5cefd08196b7e8c6bc77a_-_feed"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faWeibo} />
              </a>
              <a href="https://bladegame.medium.com/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faMedium} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className={styles.bottom}>
          <Col>
            <div className={styles.links}>
              <a>Terms of Service</a>
              <a>Privacy Policy</a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
