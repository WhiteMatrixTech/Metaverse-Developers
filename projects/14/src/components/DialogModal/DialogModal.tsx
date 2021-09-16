import React, { useCallback, useState, useMemo } from 'react'

import Button from '../Button'
import Container from '../Container'
import styled from 'styled-components'
import Label from '../Label'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
// import TronLinkGuide from '../../components/TronLinkGuide';
import TronLinkLogo from './TronLinkLogo.png';
import { useTranslation } from 'react-i18next'


interface DialogModal extends ModalProps {
  onConfirm: () => void
  onCancel: () => void
}

const DialogModal: React.FC<DialogModal> = ({
  onConfirm,
  onDismiss,
  onCancel,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const handleCancel = useCallback(() => {
    onCancel()
    onDismiss()
  }, [onCancel, onDismiss])

  const {t} =useTranslation()

  const modalContent = useMemo(() => {
    return (
      <div style={{ textAlign: "center" }}>
        <Label text={t('cancel-confirm')}></Label>
      </div>
    )
  }, [])

  const onConfirmbutton = useMemo(() => {
    return <Button text={t('btn-ok')} onClick={handleConfirm} />
  }, [setStep, step, handleConfirm])

  const onCancelbutton = useMemo(() => {
    return <Button text={t('btn-cancel')} onClick={handleCancel} />
  }, [setStep, step, handleCancel])
 
  
  return (
    <Modal>

      <ModalTitle text={` `} />
      <CardIcon>⚠️</CardIcon>
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{onCancelbutton}{onConfirmbutton}</ModalActions>
    </Modal>
  )
}

export default DialogModal
