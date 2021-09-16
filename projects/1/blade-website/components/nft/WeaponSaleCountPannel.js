import { WeaponCount } from 'containers';
import styles from './SaleCountPannel.module.scss';
export default function WeaponSaleCountPannel(props) {
  const { total, oldTotal,kind,level } = props;
  const { count } = WeaponCount.useContainer();
  console.log("weapon total is ",total ,"sold is ",count,"kind is ",kind,"level is ",level)
  let left = total + oldTotal - count;
  if (left < 0) {
    left = 0;
  }
  return (
    <div className={styles.amount}>
      {/*<span className={styles.leftAmount}>{left}</span>*/}
      <span className={styles.leftAmount}>0</span>
      <div className={styles.totalAmount}>
        <div>LEFT OF</div>
        <div>{total}</div>
      </div>
    </div>
  );
}
