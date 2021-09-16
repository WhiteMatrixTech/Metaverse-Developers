import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import { message } from 'antd'
import styled, { keyframes } from 'styled-components'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Button from '../../../components/Button'
import { Fav } from '../../../contexts/Favs'
import useFavs from '../../../hooks/useFavs'
import useDpc from '../../../hooks/useDpc'
import { useTranslation } from 'react-i18next'
import DialogModal from '../../../components/DialogModal'
import useModal from '../../../hooks/useModal'
import Label from '../../../components/Label'
import useApprove from '../../../hooks/useApprove'
import { Link } from 'react-router-dom'
import {
  withdrawNFTForSale, nftsOfferedForSale, tokenNameByIndex, getTrxBalance,
  changeName, offerNFTForSale
} from '../../../sushi/utils'
import Spacer from '../../../components/Spacer'
import SellModal from './SellModal'
import NameModal from './NameModal'

declare var window: Window & { tronWeb: any };

interface FavValue extends Fav {

}

const NFTCards: React.FC = () => {
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // attaching scroll event listener
  }, []);
  const [favs] = useFavs()
  // const [favs] = useFavs()
  const page_size = 20
  var index_page = 1
  const handleScroll = () => {
    let userScrollHeight = window.innerHeight + window.scrollY;
    let windowBottomHeight = document.documentElement.offsetHeight;
    if (userScrollHeight >= windowBottomHeight) {
        index_page +=1
    }
  };
  const rows = favs ? favs.reduce<FavValue[][]>(
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
  console.log(rows)
  return (
    <StyledCards>
      {(
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FavCard fav={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      )}
    </StyledCards>
  )
}

interface NftCardProps {
  fav: FavValue
}

const FavCard: React.FC<NftCardProps> = ({ fav }) => {
  const [isForSale, setIsForSale] = useState(false)
  const [nftName, setNftName] = useState('')
  const [pendingTxCancel, setPendingTxCancel] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingTxName, setPendingTxName] = useState(false)
  const [trxBalance, setTrxBalance] = useState<BigNumber>()
  const dpc = useDpc()
  const { id } = fav
  const { onApprove } = useApprove()

  useEffect(() => {
    async function fetchTrxBalance() {
      const trxBalance = await getTrxBalance(dpc)
      console.log("trxBalance----------->", trxBalance)
      setTrxBalance(new BigNumber(trxBalance))
    }
    if (dpc) {
      fetchTrxBalance()
      getIsOnSale()
      getNftName()
    }
  }, [dpc])

  const markSeen = useCallback(() => {
    onCancelSell()
    // localStorage.setItem('tronlink', 'seen')
  }, [])

  /**
   * 撤销出售
   */
  const onCancelSell = useCallback(() => {
    //撤销出售
    async function cancelSell() {
      const item = await withdrawNFTForSale(dpc, id)
      const timeout = setTimeout(() => {
        getIsOnSale()
      }, 1000)
    }
    setPendingTxCancel(true)
    cancelSell()
    setPendingTxCancel(false)
  }, [dpc])

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
    setIsForSale(item.isForSale)
  }, [dpc])


  const onCancel = useCallback(() => {
    // localStorage.setItem('tronlink', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DialogModal onConfirm={markSeen} onCancel={onCancel} />,
  )

  //出售
  const nftForSale=useCallback(async (val)=>{
    const item = await offerNFTForSale(dpc, id, val)
    if(item){
      message.info("success")
    }
    setTimeout(() => {
      getIsOnSale()
    }, 1000)
  },[])

  //出售
  const onSell = useCallback((val) => {
    if (val === '') {
      message.info("price must above zero")
    } else {
      setPendingTx(true)
      nftForSale(val)
      setPendingTx(false)
    }

  }, [dpc])

  //出售对话框
  const [onSellModal] = useModal(
    <SellModal onConfirm={onSell} max={trxBalance} />
  )

  //命名
  const changeNftName = useCallback(async (val) => {
    setPendingTxName(true)
    const txHash = await onApprove(101,9)
    if(txHash){
      const result = await changeName(dpc, id, val)
      if(result){
        message.info("success")
      }
      setTimeout(()=>{
        getNftName()
      },1000)
    }
    setPendingTxName(false)
    
  }, [dpc])

  const [onChangeNameModal] = useModal(
    <NameModal onConfirm={changeNftName} />
  )

  /**
  * 获取nft的名字
  */
  const getNftName = useCallback(async () => {
    console.log("getNftName---->")
    const name = await tokenNameByIndex(dpc, id)
    console.log("name", name)
    setNftName(name)
  }, [dpc, setNftName])

const {t} =useTranslation()
  return (
    <StyledCardWrapper>
      <Card>
        <CardContent>
          <StyledLink to={`/myNFT/${id}`}>
            <StyledContent>
              <Label text={"#" + id+" - "+nftName}></Label>
              <img src={`http://tronmysterybox.vip/static/tronNFT-${id}.png`}
                style={{ width: "140px", height: "140px" }}></img>
            </StyledContent>
            <Spacer></Spacer>
          </StyledLink>
        </CardContent>
        <StyledWrapper>
          {isForSale ? (<><Button  size="sm" text={t('withdraw-selling')} onClick={onPresentDisclaimerModal} disabled={pendingTxCancel}></Button> </>) : (
            <><Button text={t('sell')} onClick={onSellModal} disabled={pendingTx} size="sm"></Button></>
          )}
          <Spacer></Spacer>
          <Button text={t('naming')} onClick={onChangeNameModal} disabled={pendingTxName} size="sm"></Button>
        </StyledWrapper>
      </Card>
    </StyledCardWrapper>
  )
}

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
  width: calc((840px - ${(props) => props.theme.spacing[3]}px * 2) / 3);
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
export default NFTCards
