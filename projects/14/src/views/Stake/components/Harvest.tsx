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

import useDpc from '../../../hooks/useDpc'
import BigNumber from 'bignumber.js'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {

  const [earnings, setEarnings] = useState(Number)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward()

  const dpc = useDpc()

  const onHarvest = useCallback(async () => {
    console.log("onHarvest------>")
    const tx = await onReward(pid)
    console.log("onHarvest---result--->",tx)
    if (tx) {
      getEarn()
    }
  }, [])

  const getEarn = useCallback(() => {
    console.log("getEarn---->")
    const earn = useEarnings(pid)
    setEarnings(earn.toNumber())
  }, [])

  useEffect(() => {
    if(dpc){
      getEarn()
    }
    let refreshInterval = setInterval(getEarn, 5000)
    return () => clearInterval(refreshInterval)
  }, [dpc])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>🍣</CardIcon>
            <Value value={getBalanceNumber(new BigNumber(earnings))} />
            <Label text="Bkey Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings || pendingTx}
              text={pendingTx ? 'Collecting Bkey' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onHarvest()
                setPendingTx(false)
              }}
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
