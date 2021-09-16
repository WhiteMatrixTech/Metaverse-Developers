import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import Input from '../../../components/Input'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Label from '../../../components/Label'
interface NameModalProps extends ModalProps {
  onConfirm: (amount: string) => void
}

const NameModal: React.FC<NameModalProps> = ({
  onConfirm,
  onDismiss,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const {t} =useTranslation();
  return (
    <Modal>
      <ModalTitle text={t('change-name-title')} />
      <StyledWrapper>
        <Label text={t('brun-keys')}></Label>
      </StyledWrapper>
      <Input
        onChange={handleChange}
        value={val}
      />
      <ModalActions>
        <Button text={t('btn-cancel')} variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending' : t('btn-ok')}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}
const StyledWrapper = styled.div`
  text-align:right;
  margin-top:10px;
  margin-bottom:10px;
`

export default NameModal
