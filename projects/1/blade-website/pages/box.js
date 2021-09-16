import Layout from 'components/Layout';
import BoxPanel from 'components/box/BoxPanel';
import { Approve, TokenBalance } from 'containers';
import styles from './box.module.scss';
import { Col, Row } from 'react-bootstrap';

const MAIN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
const CHERRY_TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CHERRY_TOKEN_CONTRACT;
const BLADE_TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_BLADE_TOKEN_CONTRACT;
const USDT_TOKEN_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_TOKEN_CONTRACT;

export default function Box() {
  return (
    <Layout>
      <div className={styles.root}>
        <div className="container">
          <Row>
            <Col lg={12}>
              <TokenBalance.Provider initialState={{ tokenAddress: BLADE_TOKEN_CONTRACT_ADDRESS }}>
                <Approve.Provider
                  initialState={{ tokenAddress: BLADE_TOKEN_CONTRACT_ADDRESS, spenderAddress: MAIN_CONTRACT_ADDRESS }}
                >
                  <Row>
                    <Col lg={12}>
                      <BoxPanel name="Ordinary Treasure Box" level="l" price={100} token="BLADE" />
                    </Col>
                    <Col lg={12}>
                      <BoxPanel name="Advanced Treasure Box" level="h" price={200} token="BLADE" />
                    </Col>
                  </Row>
                </Approve.Provider>
              </TokenBalance.Provider>
            </Col>
            <Col lg={12}>
              <TokenBalance.Provider initialState={{ tokenAddress: CHERRY_TOKEN_CONTRACT_ADDRESS }}>
                <Approve.Provider
                  initialState={{ tokenAddress: CHERRY_TOKEN_CONTRACT_ADDRESS, spenderAddress: MAIN_CONTRACT_ADDRESS }}
                >
                  <BoxPanel name="Cherry Treasure Box" level="s" price={60} token="CHE" />
                </Approve.Provider>
              </TokenBalance.Provider>
            </Col>
            {/*<Col lg={12}>*/}
              {/*<TokenBalance.Provider initialState={{ tokenAddress: USDT_TOKEN_CONTRACT_ADDRESS }}>*/}
                {/*<Approve.Provider*/}
                  {/*initialState={{ tokenAddress: USDT_TOKEN_CONTRACT_ADDRESS, spenderAddress: MAIN_CONTRACT_ADDRESS }}*/}
                {/*>*/}
                  {/*<BoxPanel name="USDT Treasure Box" level="u" price={80} token="USDT" />*/}
                {/*</Approve.Provider>*/}
              {/*</TokenBalance.Provider>*/}
            {/*</Col>*/}
          </Row>
        </div>
      </div>
    </Layout>
  );
}
