import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import useModal from '../../../hooks/useModal'
import useDpc from '../../../hooks/useDpc'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { useTranslation } from 'react-i18next'
interface AccountButtonProps { }

const AccountButton: React.FC<AccountButtonProps> = (props) => {

  const [address, setAddress] = useState('')

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  const dpc = useDpc()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])


  useEffect(() => {
    console.log("dddddd", dpc)
    if (dpc) {
      const addressStr = dpc.currentAddress
      if (addressStr === undefined || addressStr.substr === undefined) {
        return
      }
      let startStr = addressStr.substr(0, 4)
      let endStr = (addressStr.substr(addressStr.length - 4, addressStr.length))
      setAddress(startStr + "..." + endStr)
    }

  }, [dpc])

  let { t } = useTranslation()
  return (
    <StyledAccountButton>
      {(address.length === 0) ? (
        <Button onClick={handleUnlockClick} size="sm" text={t('unlock-Wallet')} />
      ) : (
        <Button size="sm" text={address} />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  
`

export default AccountButton
