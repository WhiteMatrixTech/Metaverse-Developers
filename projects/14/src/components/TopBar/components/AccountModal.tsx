import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import useDpc from '../../../hooks/useDpc'
import { getTrxBalance } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {

  const [trxBalance, setTrxBalance] = useState<BigNumber>()
  const dpc = useDpc()

  useEffect(() => {
    async function fetchTrxBalance() {
      const trxBalance = await getTrxBalance(dpc)
      console.log("trxBalance----------->", trxBalance)
      setTrxBalance(new BigNumber(trxBalance))
    }
    if(dpc){
      fetchTrxBalance()
    }
  }, [])

  return (
    <Modal>
      <ModalTitle text="My Account" />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <span>🎁</span>
            </CardIcon>
            <StyledBalance>
              <Value value={trxBalance?trxBalance.toNumber():0} />
              <Label text="Trx Balance" />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>
        <Spacer />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
