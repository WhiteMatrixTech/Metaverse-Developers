/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'react-bootstrap';
import styles from './NftPanel.module.scss';
import cx from 'classnames';

export default function NftPanel(props) {
  const { mainImg, title, desc, children, id } = props;
  const attrs = props.attrs || {};
  let cn;
  if (attrs.level === 1) {
    cn = styles.c1;
  }
  if (attrs.level === 2) {
    cn = styles.c2;
  }
  if (attrs.level === 3) {
    cn = styles.c3;
  }
  return (
    <div className={styles.section} id={id}>
      <div className="container">
        <Row>
          <Col lg={6} sm={12}>
            <img src={mainImg} alt="" className={styles.mainImg} />
          </Col>
          <Col lg={5} sm={12}>
            <div className={styles.description}>
              <h3 className={cn}>{title}</h3>
              <p>{desc}</p>
              <p className={cx(styles.attr, cn)}>
                <span>LEVEL: </span>
                <span className={styles.value}>{attrs.level}</span>
              </p>
              <p className={cx(styles.attr, cn)}>
                <span>POWER: </span>
                <span className={styles.value}>{attrs.power}</span>
              </p>
            </div>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  );
}
