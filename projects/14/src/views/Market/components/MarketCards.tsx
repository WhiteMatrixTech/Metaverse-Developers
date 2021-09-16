import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import useModal from '../../../hooks/useModal'
import { Market } from '../../../contexts/Markets'
import useDpc from '../../../hooks/useDpc'
import { useTranslation } from 'react-i18next'
import Label from '../../../components/Label'
import { Link } from 'react-router-dom'
import useMarkets from '../../../hooks/useMarkets'
import {
  tokenNameByIndex,
  ownerAddress,
  nftsOfferedForSale,
  buyMarketNFT
} from '../../../sushi/utils'
import Spacer from '../../../components/Spacer'


declare var window: Window & { tronWeb: any };

interface MarketValue extends Market {

}

const SellCards: React.FC = () => {

  const [markets] = useMarkets()
  const rows = markets ? markets.reduce<MarketValue[][]>(
    (favRows, fav, i) => {
      const favValue = {
        ...fav,
      }
      const newFavRows = [...favRows]
      if (newFavRows[newFavRows.length - 1].length === 3) {
        newFavRows.push([favValue])
      } else {
        newFavRows[newFavRows.length - 1].push(favValue)
      }
      return newFavRows
    },
    [[]],
  ) : []
  return (
    <StyledCards>
      {(
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <MarketCard market={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      )}
    </StyledCards>
  )
}

interface MarketCardProps {
  market: MarketValue
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {

  const dpc = useDpc()
  const { id } = market
  const [nftName, setNftName] = useState('')
  const [price, setPrice] = useState(Number)
  /**
   * 获取nft的名字
   */
  const getNftName = useCallback(async () => {
    console.log("getNftName---->")
    const name = await tokenNameByIndex(dpc, id)
    console.log("name", name)
    setNftName(name)
  }, [dpc, setNftName])

  /**
     * 是否被出售
     */
  const getIsOnSale = useCallback(async () => {
    let tronWeb = window.tronWeb
    const item = await nftsOfferedForSale(dpc, id)
    if (item == undefined) {
      return
    }
    let price = tronWeb.fromSun(tronWeb.toBigNumber(item.price._hex))
    let trxPrice = new BigNumber(price)
    setPrice(trxPrice.toNumber())

  }, [dpc])

  const onBuyNft = useCallback(async () => {
    const tx = await buyMarketNFT(dpc, id, price)
    console.log("onBuyNft",tx)
  }, [dpc, price])


  useEffect(() => {
    if (dpc) {
      getNftName()
      getIsOnSale()
    }
  }, [dpc])

  let {t} = useTranslation()
  const name = t("name")
  const SellPrice = t("sell-price")
  const Nanname = t("nan-name")

  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledContent>
            <Label text={"#" + id+"-"+nftName}></Label>
            <Label text={price ? SellPrice + price +" TRX": ""}></Label>
            <img  src={`http://tronmysterybox.vip/static/tronNFT-${id}.png`}
              style={{ width: "140px", height: "140px" }}></img>
          </StyledContent>
        </CardContent>
        <StyledWrapper>
          <Button text={t("buy")} onClick={onBuyNft} size="sm"></Button>
          <Spacer></Spacer>
          <Button text={t("details")} to={`/myNFT/${id}`} size="sm"></Button>
        </StyledWrapper>
      </Card>
    </StyledCardWrapper>
  )
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  padding:10px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width:1000px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[3]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`
const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`
export default SellCards
