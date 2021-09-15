import React from 'react'
import { Text, Modal } from '@titanswap-libs/uikit'
import styled from 'styled-components'
import eosPng from '../../assets/index/r_icon_eosio.png'
import okexPng from '../../assets/index/r_icon_okexchain.png'
import bscPng from '../../assets/index/r_icon_binance.png'
import hecoPng from '../../assets/index/r_icon_heco.png'
import ethPng from '../../assets/index/r_icon_ethreum.png'
import arbitrumPng from '../../assets/index/r_icon_arbitrum.png'
import maticPng from '../../assets/index/r_icon_matic.png'
import polkadotPng from '../../assets/index/r_icon_polkadot.png'
import solanaPng from '../../assets/index/r_icon_solana.png'

const StyledPageHeader = styled.div`
  padding: 24px 20px 10px;
  z-index: 10;
  & > div {
    & > div:nth-child(2) {
      padding: 0px 5px 15px;
    }
  }
`
const FlexMain = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const ItemList = styled.div`
  position: relative;
  box-sizing: border-box;
  border-radius: 32px;
  border: 1px solid #E0E0E0;
  width: 31.3%;
  text-align: center;
  padding: 20px 10px 15px !important;
  margin: 15px 3% 0 0;

  img {
    display: inline-block;
    margin-bottom: 5px;
    padding-top: 5px;
    width: 50%;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    background: linear-gradient(224deg, #8C73B5 0%, #4E3E7C 100%);
    border-radius: 0px 0px 12px 12px;
    color: #fff;
    height: 15px;
    padding: 0 5px;
    display: inline-block;
    width: 60%;
  }
`
export default function SwitchChain({ 
  onDismiss
}: {
  onDismiss?: () => void
}) {
  return (
    <StyledPageHeader>
      <Modal title="切换链" onDismiss={onDismiss}>
        <FlexMain>
          <ItemList>
            <img src={bscPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Binance Chain</Text>
          </ItemList>
          <ItemList>
            <img src={eosPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">EOSIO</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={okexPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">OKExChain</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={hecoPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Heco Chain</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={ethPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Ethereum</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={arbitrumPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Arbitrum</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={maticPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Polygon</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={polkadotPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Polkadot</Text>
          </ItemList>
          <ItemList>
            <span>敬请期待</span>
            <img src={solanaPng} alt="" />
            <Text style={{ color: '#333' }} fontSize="12px">Solana</Text>
          </ItemList>
        </FlexMain>
      </Modal>
    </StyledPageHeader>
  )
}