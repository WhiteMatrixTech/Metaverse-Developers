/* eslint-disable @next/next/no-img-element */
import { Col, Row } from 'react-bootstrap';
import styles from './Article.module.scss';

export default function Article() {
  return (
    <div className={styles.root}>
      <div className="container">
        <Row>
          <Col lg={12} className="mb-3" id="roadmap">
            <div className={styles.header}>RoadMap</div>
            <div>
              <Row>
                <Col lg={6}>
                  <div className={styles.articlePanel}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img1.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Phase I - Launch</h3>
                          <p>Website Launch</p>
                          <p>Coingecko / CoinMarketCap Listing</p>
                          <p>Cooperation with CherrySwap, MySwap</p>
                          <p>Airdrop to Blade holder</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className={styles.articlePanel}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img2.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>PHASE II – Growth</h3>
                          <p>Launch NFT</p>
                          <p>
                            Listing on well-known exchanges (e.g OKEx)
                          </p>
                          <p>Trend and Token data analysis platform</p>
                          <p>Community Voting Platform</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className={styles.articlePanel}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img3.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Phase III – Expansion</h3>
                          <p>Launch Treasure Chest</p>
                          <p>Launch Game BladeWarrior</p>
                          <p>Cooperate with other project</p>
                          <p>Set up more LP</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className={styles.articlePanel}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img1.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Phase IV – Evolution</h3>
                          <p>Launch More Great Game</p>
                          <p>Launch Android and Ios app</p>
                          <p>Launch Game platform</p>
                          <p>Set up more public chain</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <div className={styles.header} id="ecosystem">
              Ecosystem
            </div>
            <div>
              <Row>
                <Col lg={6}>
                  <div className={styles.articlePanel2}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img2.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Community Powered</h3>
                          <p>
                            Its fun, vibrant community owns Blade Warrior, which
                            is decentralized. The Blade Warrior community
                            welcomes and embraces diverse perspectives to build
                            a world-class community.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className={styles.articlePanel2}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img2.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Play To Earn</h3>
                          <p>
                            We have a good mechanics to earn blade where you
                            play the game. You can mint NFT weapons ,the more
                            powerful weapon you have, the more Blade you earn.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className={styles.articlePanel2}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img3.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Cross Game</h3>
                          <p>
                          It is possible to exchange character in different game with NFT.
                          NFT heroes and euquipments can be used cross game,
                          you can use BladeWarrior heroes in other Blade game.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className={styles.articlePanel2}>
                    <Row className="gx-0">
                      <Col lg={6}>
                        <div
                          className={styles.img}
                          style={{ backgroundImage: 'url(/image/img1.jpg)' }}
                        ></div>
                      </Col>
                      <Col lg={6}>
                        <div className={styles.post}>
                          <h3>Game guild</h3>
                          <p>
                          Build connection with Game Guild,
                          bringing players together to earn via blockchain-based economies.
                          To be the settlers of new worlds in the metaverse
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
