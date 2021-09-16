import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faWeibo, faMedium} from '@fortawesome/free-brands-svg-icons';
import styles from './Connect.module.scss';
import { Col, Row } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
export default function Connect() {
  const { addToast } = useToasts();
  const [email, setEmail] = useState();
  const subscribe = () => {
    const emailReg =
      /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    if (!email || !emailReg.test(email)) {
      addToast('Invaild email!', { appearance: 'error' });
      return;
    }
    addToast('Subscribe successful!', { appearance: 'success' });
  };
  return (
    <div className={styles.root}>
      <div className="container">
        <Row>
          <Col sm={12} lg={8} className={styles.br}>
            <div className={styles.join}>
              <div className={styles.title}>
                <span>NEWSLETTER</span>
                <span className={styles.sub}>JOIN THE BLADE</span>
              </div>
              <Row className={styles.form}>
                <Col lg={8}>
                  <input
                    className={styles.input}
                    value={email}
                    placeholder="Enter your email"
                    onChange={(v) => setEmail(v.target.value)}
                  />
                </Col>
                <Col lg={4}>
                  <a className={styles.btn} onClick={subscribe}>
                    SUBSCRIBE
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm={12} lg={4}>
            <div className={styles.connect}>
              <div className={styles.ct}>CONNECT WITH US</div>
              <div className={styles.icons}>
                <a
                  href="https://twitter.com/0xBladeGame"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href="https://t.me/BladeGame"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="https://t.me/BladeGame_En" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="https://bladegame.medium.com/" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faMedium} />
                </a>
                <a href="https://m.weibo.cn/p/10080830bd847255a5cefd08196b7e8c6bc77a_-_feed" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faWeibo} />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <div></div>
      </div>
    </div>
  );
}
