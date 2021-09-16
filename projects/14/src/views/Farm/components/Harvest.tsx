import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from 'react-i18next'
import useDpc from '../../../hooks/useDpc'
import BigNumber from 'bignumber.js'
import { getEarned } from '../../../sushi/utils'
interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const dpc = useDpc()
  const [earnings, setEarnings] = useState(Number)
  const [pendingTx, setPendingTx] = useState(false)

  const { onReward } = useReward()
  const earn = useEarnings(pid)

  const onHarvest = useCallback(async () => {
    setPendingTx(true)
    console.log("onHarvest------>")
    const tx = await onReward(pid)
    console.log("onHarvest---result--->", tx)
    if (tx) {
      getEarn()
    }
    setPendingTx(false)
  }, [])

  const getEarn = useCallback(async () => {
    console.log("getEarn---->")
    const balance = await getEarned(dpc, pid)
    if (balance === undefined) {
      return
    }
    setEarnings(balance.toNumber())
  }, [])

  useEffect(() => {
    if (dpc) {
      getEarn()
    }
    let refreshInterval = setInterval(getEarn, 5000)
    return () => clearInterval(refreshInterval)
  }, [dpc])

  let { t } = useTranslation()
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🔑</CardIcon>
            <Value value={earnings ? getBalanceNumber(new BigNumber(earnings)) : 0} />
            <Label text={t('dcp-earned')} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={(earnings.toString()==='0') || pendingTx}
              text={t('harvest')}
              onClick={onHarvest}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
