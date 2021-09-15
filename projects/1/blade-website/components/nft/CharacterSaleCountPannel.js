import { CharacterCount } from 'containers';
import styles from './SaleCountPannel.module.scss';
export default function CharacterSaleCountPannel(props) {
  const { total, oldTotal,kind } = props;
  const { count } = CharacterCount.useContainer();
  let left = total + oldTotal - count;
  console.log("character total is ",total ,"sold is ",count,"kind is ",kind)
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
