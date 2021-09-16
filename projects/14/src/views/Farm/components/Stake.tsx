import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getStaked, getPoolBalance } from '../../../sushi/utils'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { useTranslation } from 'react-i18next'
import useDpc from '../../../hooks/useDpc'


interface StakeProps {
  pid: number
  tokenName: string
}

declare var window: Window & { tronWeb: any };

const Stake: React.FC<StakeProps> = ({ pid, tokenName }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [stakedBalance, setStakedBalance] = useState(Number)
  const [bkeyBalance, setBkeyBalance] = useState(Number)
  // const allowance = useAllowance()
  const { onApprove } = useApprove()

  const dpc = useDpc()

  const { onStake } = useStake()

  const approveStake = useCallback(async (val) => {
    console.log("approveStake----->", val)
    setRequestedApproval(true)
    const tx = await onApprove(pid, val)
    if (tx) {
      console.log("onApprove-----result-->", tx)
      const result = await onStake(pid, val)
      if (result) {
        console.log("onStake-----result--->", result)
        setTimeout(() => {
          getStakedBalance()
          getBkeyBalance()
        }, 1000)
      }
    }
    setRequestedApproval(false)

  }, [])


  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(bkeyBalance)}
      onConfirm={approveStake}
      tokenName={tokenName}
    />,
  )

  const getStakedBalance = useCallback(async () => {
    console.log("getStakedBalance----->")
    const balance = await getStaked(dpc, pid)
    if (balance === undefined) {
      return
    }
    console.log("getStakedBalance----result--->", balance.toNumber())
    setStakedBalance(balance.toNumber())
  }, [dpc])

  const getBkeyBalance = useCallback(async () => {
    console.log("getBkeyBalance----->")
    const balance = await getPoolBalance(dpc, pid)
    if (balance === undefined) {
      return
    }
    console.log("333333333333",balance)
    setBkeyBalance(balance.toNumber())
  }, [dpc])

  const getBalance = useCallback(() => {
    getStakedBalance()
    getBkeyBalance()
  }, [])

  useEffect(() => {
    if (dpc) {
      getBalance()
    }
    let refreshInterval = setInterval(getBalance, 5000)
    return () => clearInterval(refreshInterval)
  }, [dpc])

  let { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>💰</CardIcon>
            <Value value={stakedBalance ? getBalanceNumber(new BigNumber(stakedBalance)) : 0} />
            <Label text={`${tokenName}` + t('tokens-staked')} />
          </StyledCardHeader>
          <StyledCardActions>
            {/* {allowance.toNumber() == 0 ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={t('approve') + ` ${tokenName}`}
              />
            ) : (
              <> */}
            <Button
              disabled={requestedApproval}
              text={t('staked')}
              onClick={onPresentDeposit}
            />
            {/* </>
            )} */}
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

const StyledActionSpacer = styled.div`
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

export default Stake
