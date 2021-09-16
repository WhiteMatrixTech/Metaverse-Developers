import React, { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import Button from '../../components/Button'

import { useTranslation } from 'react-i18next'
import useHarvestUnstake from '../../hooks/useHarvestUnstake'
import useDpc from '../../hooks/useDpc'
import {message} from 'antd'


declare var window: Window & { tronWeb: any };

const Farm: React.FC = () => {
  const { farmId } = useParams()

  console.log("farmId",farmId)

  const {
    pid,
    lpToken,
    poolAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    poolAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const dpc = useDpc()
  const { ethereum } = useWallet()

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  let { t } = useTranslation()

  const subtitle = t('deposit') + "  "+lpTokenName + t('earn') +" "+ earnTokenName

  const { onHarvestUnstake } = useHarvestUnstake()

  //收割并解押
  const handleHarvestUnstake = useCallback(async () => {
    console.log("handleHarvestUnstake--------->")
    const txHash = await onHarvestUnstake(dpc,pid)
    console.log(txHash)
    if(txHash){
      message.info("success")
    }
  }, [dpc])

  return (
    <>
      <PageHeader
        icon={icon}
        subtitle={subtitle}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>

        <StyledCardActions>
          <Button text={t('harvest-unstake')} onClick={handleHarvestUnstake} />
        </StyledCardActions>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 50%;
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
