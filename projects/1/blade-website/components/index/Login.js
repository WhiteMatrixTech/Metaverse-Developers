import { Col, Row } from 'react-bootstrap';
import styles from './Login.module.scss';
import cx from 'classnames';

export default function Login() {
  return (
    <div className={styles.root}>
      <div className="container">
        <Row>
          <Col sm={12} lg={6}>
            <div className={styles.words}>Welcome, Commander. Log in?</div>
          </Col>
          <Col sm={12} lg={{ span: 4, offset: 1 }}>
            <Row>
              <Col sm={12} lg={6}>
                <a className={cx(styles.main, styles.btn)}>LOG IN</a>
              </Col>
              <Col sm={12} lg={6}>
                <a className={styles.btn}>REGISTER</a>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={styles.content}></div>
      </div>
    </div>
  );
}
