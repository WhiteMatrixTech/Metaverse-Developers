import { Modal } from 'react-bootstrap';
import styles from './Result.module.scss';

export default function FailResult(props) {
  const { show, onClose, model } = props;
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={styles.info}>
          Sorry, nothing!
          {model && (
            <a target="_blank" rel="noreferrer" href={`https://www.oklink.com/okexchain/tx/${model.transactionHash}`}>
              View Tx
            </a>
          )}
        </p>
      </Modal.Body>
    </Modal>
  );
}
