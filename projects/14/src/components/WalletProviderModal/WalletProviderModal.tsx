import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import { useTranslation } from 'react-i18next'
import Button from '../Button'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import {message} from 'antd'

import WalletCard from './components/WalletCard'

declare var window: Window & { tronWeb: any };

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, connect } = useWallet()
  const {t} =useTranslation()
  useEffect(() => {
    if (account) {
      onDismiss()
    }
  }, [account, onDismiss])

  async function onConnectTron(){
    if(!window.tronWeb.ready){
        console.log("not login---->")
        message.info(t('login-tronlink'))
    }else{
      window.location.reload();
    }
  }

  return (
    <Modal>
      <ModalTitle text="Select a wallet provider." />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            <WalletCard
              icon={<img style={{height:32}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAC3FBMVEUAAAATXcwQWMcUXM0PV8wTXMwQWsoAVaoAAIAAAAAUTsQAXbkAQL8AM8wAQL8OVcYTXMwAVaoRWcgATcwNUckUWs0ASbYQUL8RVcwMVcIAVb8SW8gAVcYPXckUXMwSW8gRVcwNV8kUXcwRW8wNWcwUXMwSW8gTV8cUXMwLVcoKXMwTXc0TVcYTXcwPWsMUXM0UXMwPWssLWcgUXcwMXcUQWsUQXMkTXM0SWckTXM0OXMYTWcwSXcwRWcwOWsgTXMwTXc0UWMQQWcoTXcwTXMwSWMoTXcwTXMwSXMoSWcoUXcwUXMsTW8oSXcsUXMsTXM0TXM0SXMsUXM0TXM0UXc0TW8wTXcwTW8oUW8wUXc0TWssTXc0TWssTXcwTXcwTXc0RXMsUXcwSW8oUWswSW80SXMsUWMkSXM0TXc0TW8wSXMoTXcwTXc0TXM0TW8oUXMwSXMwSWs0SW8wRW8sTXcwUXcoUXMwTXcwSXM0TW80RXM0QWMsSXMwTXc0RXcsTXc0TXcwTXc0UXcwTXcwQWsoRWssTWssTW80PXMwUXM0UXMwUXMsTXMwTXMwTXMwUXMwUXM0UXcsSW8sTXM0UXM0TXcsRXcsSW80TXcwSXMoTXM0TXMwUXcwSXMwUXMwRXMwUXMwRW80UXMwUXMwUXM0UW8wTWsoSXcwUXM0UXMwTXMwUXcwTXMwTW8wTXc0TXMsUXM0TXMwSXMwTXcwSW8sUXM0UXMwTXMwUXc0UXM0UXcwTXM0TXcwTW8sUXMsTXMwUXc0TXMwSW8wTXcwTXMwTXMwUXc0TXM0TXMwTXcwTW8sSXcsTXMwRW8sUXM0UXMwTXM0TXMwTXMwTXc0TXMwTXMwUXM0TWssUXMwTW8wTW8wTXc0TW8wUXcwTXc0UXMwUXcwSXMsTXMsTXM0TXM0UXMwUXM0TXcwTXM0UXcwTXMwTXM0TW8wTW8wTXcwUW8wUXMsUXc0TXMwUXc2F6KsxAAAA83RSTlMA8iDzI/AwAwIBDQsEBQgS8QYuChMzBxAPFQwOCSHoKh4m9S0U5hwp6xgZ5BviEfT2IhfnFh8v/jnlJCiMPCXjQho/7VAdN5BIK9knNWNO+cpT6cXMX25cWupEnTbspdZZw1dBOEU0VmufOuHL7kONb0dG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" alt=""/>}
              onConnect={() => onConnectTron()}
              title="TronLink"
            />
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    flex-wrap: none;
  }
`

const StyledWalletCard = styled.div`
  flex-basis: calc(100% - ${(props) => props.theme.spacing[2]}px);
`

export default WalletProviderModal
