import { Approve, TokenBalance } from 'containers';
import useBuyBox from 'hooks/useBuyBox';
import styles from './BoxPanel.module.scss';
import { Button, Spinner } from 'react-bootstrap';
import { SpriteAnimator } from 'react-sprite-animator';
import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import FailResult from './FailResult';
import SuccessResult from './SuccessResult';

export default function PrizePanel(props) {
  const { level, name, price, token } = props;
  const { approved, approve, loading: approveLoading } = Approve.useContainer();
  const { buy, loading: buyLoading, paid, mintResult } = useBuyBox();
  const [manualHideModal, setManualHideModal] = useState(true);

  const { balance, fetchBalance: refreshBalance } = TokenBalance.useContainer();
  const [insBalance, setInsBalance] = useState(false);

  const [width, setWidth] = useState(0);

  // sprite auto width
  useEffect(() => {
    if (window) {
      const handleWindowResize = () => {
        if (window.innerWidth > 1290) {
          setWidth(1290);
        } else {
          setWidth(window.innerWidth);
        }
      };
      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();
      return () => window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  useEffect(() => {
    const bigB = new BigNumber(balance);
    const bigP = new BigNumber(price);
    if (bigB.comparedTo(bigP) === -1) {
      setInsBalance(true);
    }
  }, [balance, price]);

  // if has new result, show modal
  useEffect(() => {
    if (mintResult) {
      setPlaySprite(true);
      refreshBalance();
      setTimeout(function () {
        setManualHideModal(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintResult]);

  const [playSprite, setPlaySprite] = useState(false);

  const buyBox = () => {
    setPlaySprite(false);
    buy(level);
  };

  return (
    <div className={styles.root}>
      <div className={styles.name}>
        {name} (
        <span>
          Price: {price} ${token}
        </span>
        )
      </div>

      <div className={styles.sprite}>
        {paid && !mintResult && (
          <div className={styles.opening}>
            <div className={styles.openingInner}>
              <SpriteAnimator
                sprite="/image/box/opening.png"
                scale={1024 / (width - 30)}
                width={128}
                height={128}
                fps={24}
                shouldAnimate={true}
                stopLastFrame={false}
                frameCount={40}
                wrapAfter={8}
              />
            </div>
          </div>
        )}
        {level === 'l' && (
          <div>
            {(!mintResult || mintResult.result === true) && (
              <SpriteAnimator
                sprite="/image/box/l.png"
                scale={512 / (width - 30)}
                width={512}
                height={512}
                fps={15}
                shouldAnimate={playSprite}
                stopLastFrame={false}
                reset={!playSprite}
                frameCount={77}
                wrapAfter={16}
              />
            )}
            {mintResult && mintResult.result === false && (
              <SpriteAnimator
                sprite="/image/box/l_no.png"
                scale={512 / (width - 30)}
                width={512}
                height={512}
                fps={15}
                shouldAnimate={playSprite}
                stopLastFrame={false}
                reset={!playSprite}
                frameCount={77}
                wrapAfter={16}
              />
            )}
          </div>
        )}
        {level === 'h' && (
          <SpriteAnimator
            sprite="/image/box/h.png"
            scale={512 / (width - 30)}
            width={512}
            height={512}
            fps={15}
            shouldAnimate={playSprite}
            stopLastFrame={false}
            reset={!playSprite}
            frameCount={77}
            wrapAfter={16}
          />
        )}
        {level === 's' && (
          <SpriteAnimator
            sprite="/image/box/s.png"
            scale={512 / (width - 30)}
            width={512}
            height={512}
            fps={15}
            shouldAnimate={playSprite}
            stopLastFrame={false}
            reset={!playSprite}
            frameCount={77}
            wrapAfter={16}
          />
        )}
        {/*{level === 'u' && (*/}
          {/*<SpriteAnimator*/}
            {/*sprite="/image/box/h.png"*/}
            {/*scale={512 / (width - 30)}*/}
            {/*width={512}*/}
            {/*height={512}*/}
            {/*fps={15}*/}
            {/*shouldAnimate={playSprite}*/}
            {/*stopLastFrame={false}*/}
            {/*reset={!playSprite}*/}
            {/*frameCount={77}*/}
            {/*wrapAfter={16}*/}
          {/*/>*/}
        {/*)}*/}
      </div>

      <div className={styles.bottom}>
        <div className="mt-3">
          My Balance: {balance} {token}
        </div>
        {/*{!approved && (*/}
          {/*<Button variant="secondary" className={styles.buyBtn} disabled={approveLoading} onClick={approve}>*/}
            {/*{approveLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}*/}
            {/*Approve*/}
          {/*</Button>*/}
        {/*)}*/}
        {!approved && (
          <Button variant="secondary" className={styles.buyBtn} disabled={approveLoading|| true} onClick={approve}>
            {approveLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}
            Closed
          </Button>
        )}

        {approved && insBalance && (
          <Button variant="secondary" className={styles.buyBtn} disabled={true}>
            Insufficient balance
          </Button>
        )}

        {/*{approved && !insBalance && (*/}
          {/*<Button variant="secondary" className={styles.buyBtn} disabled={buyLoading} onClick={buyBox}>*/}
            {/*{buyLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}Buy Now*/}
          {/*</Button>*/}
        {/*)}*/}
        {approved && !insBalance && (
          <Button variant="secondary" className={styles.buyBtn} disabled={buyLoading || true} onClick={buyBox}>
            {buyLoading && <Spinner animation="border" size="sm" as="span" style={{ marginRight: 5 }} />}Closed
          </Button>
        )}


        {mintResult && (
          <div>
            <FailResult
              show={!manualHideModal && mintResult.result === false}
              onClose={() => setManualHideModal(true)}
              model={mintResult.event}
            />
            <SuccessResult
              show={!manualHideModal && mintResult.result === true}
              onClose={() => setManualHideModal(true)}
              model={mintResult.event}
            />
          </div>
        )}
      </div>
    </div>
  );
}
