/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import styles from './BuyPannel.module.scss';
import { Approve, WeaponCount } from 'containers';
import useBuyWeapon from 'hooks/useBuyWeapon';
import { Button, Spinner } from 'react-bootstrap';
import WeaponSaleCountPannel from './WeaponSaleCountPannel';
import { useEffect } from 'react';

export default function WeaponBuyPannel(props) {
  const { price, totalAmount, buyBtnText, kind, level, oldTotal } = props;
  const { account } = useWeb3React();

  const { approved, approve, loading: approveLoading } = Approve.useContainer();

  const { buy: buyWeapon, loading: buyWeaponLoading } = useBuyWeapon();

  const { fetchCount: fetchWeaponCount, count } = WeaponCount.useContainer();

  useEffect(() => {
    if (buyWeaponLoading === false) {
      fetchWeaponCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyWeaponLoading]);

  const buy = () => {
    if (count >= totalAmount + oldTotal) {
      return;
    }
    buyWeapon(kind, level);
  };

  return (
    <div className={styles.buyPanel}>
      <div className={styles.rowOne}>
        <span>Limited quantity available</span>
        <WeaponSaleCountPannel total={totalAmount} oldTotal={oldTotal} kind={kind} level={level}/>
      </div>
      <div className={styles.rowTwo}>
        <span className={styles.price}>{price} USD</span>
        {account && approved && (
          <Button
            className={styles.buyBtn}
            disabled={buyWeaponLoading || count >= totalAmount + oldTotal || true}
            onClick={buy}
          >
            {buyWeaponLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}
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
