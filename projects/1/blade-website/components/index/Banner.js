/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'react-bootstrap';
import styles from './Banner.module.scss';
export default function Banner() {
  return (
    <div>
      <Carousel controls={false}>
        <Carousel.Item interval={3000}>
          <img src="/image/banner/b4.jpg" alt="" className={styles.img} />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src="/image/banner/b1.jpg" alt="" className={styles.img} />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src="/image/banner/b2.jpg" alt="" className={styles.img} />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img src="/image/banner/b3.jpg" alt="" className={styles.img} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
