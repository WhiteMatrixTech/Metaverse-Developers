/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'react-bootstrap';
import styles from './Intro.module.scss';
export default function Intro() {
  return (
    <div className={styles.root} id="tokenomics">
      <div className="container">
        <div className={styles.header}>Tokenomics</div>
        <Row>
          <Col lg={6}>
            <div className={styles.info}>
              <img src="/image/logo.png" alt="" className={styles.logo} />
              <h3>
                Blade Warrior is an epic massively Play to Earn NFT blockchain
                game.
              </h3>
              <p>
                The game revolves around the acquisition of legendary Blades and
                powerful Heroes to wield them. Players may participate in combat
                using their assets to earn tokens. Assets are player owned NFTs
                minted in the ERC-721 standard which may be traded on the
                proprietary marketplace.
              </p>
            </div>
            <Row className="mt-5">
              <Col lg={{ span: 4, offset: 1 }} sm={12}>
                <img
                  // src="/image/Tokenomics_img_1.png"
                  src="/image/logo.jpeg"
                  alt=""
                  className={styles.logo2}
                />
              </Col>
              <Col lg={5} sm={12}>
                <div className={styles.tokenInfo}>
                  <p>
                    <span>Token Symbol:</span> Blade
                  </p>
                  <p>
                    <span>Total Supply:</span> 10,000,000
                  </p>
                  <p>
                    <span>Initial liquidity:</span> 50%
                  </p>
                  <p>
                    <span>Play and earn in game:</span> 30%
                  </p>
                  <p>
                    <span>Future development:</span> 10%
                  </p>
                  <p>
                    <span>Marketing and airdrop:</span> 10%
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <img src="/image/intro.png" alt="" className={styles.img} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
