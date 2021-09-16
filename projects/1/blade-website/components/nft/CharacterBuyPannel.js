/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import styles from './BuyPannel.module.scss';
import { Approve, CharacterCount } from 'containers';
import useBuyCharacter from 'hooks/useBuyCharacter';
import { Button, Spinner } from 'react-bootstrap';
import CharacterSaleCountPannel from './CharacterSaleCountPannel';
import { useEffect } from 'react';

export default function CharacterBuyPannel(props) {
  const { price, totalAmount, buyBtnText, kind, oldTotal } = props;
  const { account } = useWeb3React();

  const { approved, approve, loading: approveLoading } = Approve.useContainer();

  const { buy: buyCharacter, loading: buyCharacterLoading } = useBuyCharacter();

  const { fetchCount: fetchCharacterCount, count } = CharacterCount.useContainer();

  useEffect(() => {
    if (buyCharacterLoading === false) {
      fetchCharacterCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyCharacterLoading]);

  const buy = () => {
    if (count >= totalAmount + oldTotal) {
      return;
    }
    buyCharacter(kind);
  };

  return (
    <div className={styles.buyPanel}>
      <div className={styles.rowOne}>
        <span>Limited quantity available</span>
        <CharacterSaleCountPannel total={totalAmount} oldTotal={oldTotal} kind={kind} />
      </div>
      <div className={styles.rowTwo}>
        <span className={styles.price}>{price} USD</span>
        {account && approved && (
          <Button
            className={styles.buyBtn}
            disabled={buyCharacterLoading || count >= totalAmount + oldTotal || true }
            onClick={() => buy()}
          >
            {buyCharacterLoading && <Spinner animation="border" size="sm" style={{ marginRight: 5 }} />}
            {buyBtnText}
          </Button>
        )}
        {!approved && (
          <Button className={styles.buyBtn} disabled={approveLoading || true} onClick={approve}>
            {approveLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}
            Approve
          </Button>
        )}
        {/* <div className={styles.soldOut}>Coming Soon</div> */}
      </div>
    </div>
  );
}
