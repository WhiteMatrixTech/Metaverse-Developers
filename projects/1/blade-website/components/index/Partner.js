/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'react-bootstrap';
import styles from './Partner.module.scss';
export default function Partner() {
  return (
    <div className={styles.root}>
      <div className="container">
        <h3 className={styles.header}>BLADE WARRIOR PARTNER</h3>
        <Row>
          <Col lg={6}>
            <Row>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/okex.png" alt="" />
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/cherry.png" alt="" />
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/myswap.png" alt="" />
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/coingecko-logo.png" alt="" />
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/cmc.png" alt="" />
                </div>
              </Col>
              <Col xs={6} lg={4}>
                <div className={styles.logoBox}>
                  <img src="/image/hunter.jpeg" alt="" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={{ span: 4, offset: 2 }}>
            <div className={styles.bigPanel}>
              <img src="/image/img1.jpg" alt="" />
              <h3>PRESS KIT</h3>
              <a className={styles.btn}>Coming Soon</a>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
