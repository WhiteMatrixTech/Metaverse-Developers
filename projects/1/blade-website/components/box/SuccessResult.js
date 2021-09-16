/* eslint-disable @next/next/no-img-element */
import { Modal } from 'react-bootstrap';
import router from 'next/router';
import styles from './Result.module.scss';
import { characterName, weaponName } from 'utils/nft_name';

export default function SuccessResult(props) {
  const { show, onClose, model } = props;
  const { returnValues: values } = model;

  let cn;
  if (values) {
    if (values.level === '1') {
      cn = styles.c1;
    }
    if (values.level === '2') {
      cn = styles.c2;
    }
    if (values.level === '3') {
      cn = styles.c3;
    }
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {model && values && (
          <div onClick={() => router.push('/my-nft')} className={styles.card}>
            {values.nft === 'character' && (
              <div>
                <div className={styles.header}>
                  <span className={cn}>{characterName(values.kind)}</span>
                </div>
                {values.kind === '1' && <img className={styles.img} src="/image/gallery/cha01.png" alt="" />}
                {values.kind === '2' && <img className={styles.img} src="/image/gallery/cha02.png" alt="" />}
                {values.kind === '3' && <img className={styles.img} src="/image/gallery/cha03.png" alt="" />}
                <p className={styles.attr}>
                  Level: {values.level} | Power: +{values.power}
                </p>
              </div>
            )}
            {values.nft === 'weapon' && (
              <div>
                <div className={styles.header}>
                  <span className={cn}>{weaponName(values.kind, values.level)}</span>
                </div>
                {values.kind === '1' && values.level === '1' && (
                  <img className={styles.img} src="/image/gallery/w11.png" alt="" />
                )}
                {values.kind === '1' && values.level === '2' && (
                  <img className={styles.img} src="/image/gallery/w12.png" alt="" />
                )}
                {values.kind === '1' && values.level === '3' && (
                  <img className={styles.img} src="/image/gallery/w13.png" alt="" />
                )}
                {values.kind === '2' && values.level === '1' && (
                  <img className={styles.img} src="/image/gallery/w21.png" alt="" />
                )}
                {values.kind === '2' && values.level === '2' && (
                  <img className={styles.img} src="/image/gallery/w22.png" alt="" />
                )}
                {values.kind === '2' && values.level === '3' && (
                  <img className={styles.img} src="/image/gallery/w23.png" alt="" />
                )}
                {values.kind === '3' && values.level === '1' && (
                  <img className={styles.img} src="/image/gallery/w31.png" alt="" />
                )}
                {values.kind === '3' && values.level === '2' && (
                  <img className={styles.img} src="/image/gallery/w32.png" alt="" />
                )}
                {values.kind === '3' && values.level === '3' && (
                  <img className={styles.img} src="/image/gallery/w33.png" alt="" />
                )}
                {values.kind === '4' && values.level === '1' && (
                  <img className={styles.img} src="/image/gallery/w41.png" alt="" />
                )}
                {values.kind === '4' && values.level === '2' && (
                  <img className={styles.img} src="/image/gallery/w42.png" alt="" />
                )}
                {values.kind === '4' && values.level === '3' && (
                  <img className={styles.img} src="/image/gallery/w43.png" alt="" />
                )}
                {values.kind === '5' && values.level === '1' && (
                  <img className={styles.img} src="/image/gallery/w41.png" alt="" />
                )}
                {values.kind === '5' && values.level === '2' && (
                  <img className={styles.img} src="/image/gallery/w42.png" alt="" />
                )}
                {values.kind === '5' && values.level === '3' && (
                  <img className={styles.img} src="/image/gallery/w43.png" alt="" />
                )}
                <p className={styles.attr}>
                  Level: {values.level} | Power: {values.power}
                </p>
              </div>
            )}

            <p className={styles.info}>
              Successfully!
              <a target="_blank" rel="noreferrer" href={`https://www.oklink.com/okexchain/tx/${model.transactionHash}`}>
                View Tx
              </a>
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
