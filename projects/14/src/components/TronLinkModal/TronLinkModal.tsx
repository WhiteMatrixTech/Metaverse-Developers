import React, { useCallback, useState, useMemo } from 'react'

import Button from '../Button'
import CardIcon from '../CardIcon'
import Modal, { ModalProps } from '..//Modal'
import ModalActions from '..//ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
// import TronLinkGuide from '../../components/TronLinkGuide';
import TronLinkLogo from './TronLinkLogo.png';
import { useTranslation } from 'react-i18next'

interface TronLinkModal extends ModalProps {
  onConfirm: () => void
}

const TronLinkModal: React.FC<TronLinkModal> = ({
  onConfirm,
  onDismiss,
}) => {
  const [step, setStep] = useState('disclaimer')

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])
  const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';
  const {t} =useTranslation()

  const modalContent = useMemo(() => {
    return (
      <div style={{ flex: 1 }}>
        {t('install-tips')}
        <a href={WEBSTORE_URL} target='_blank' rel='noopener noreferrer'>TronLink</a>
        {/* {logo} */}
      </div>
    )
  }, [])

  const button = useMemo(() => {
    return <Button text={t('btn-ok')} onClick={handleConfirm} />
  }, [setStep, step, handleConfirm])

  return (
    <Modal>
      <ModalTitle text={t('warning-title')} />
      <CardIcon>⚠️</CardIcon>
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{button}</ModalActions>
    </Modal>
  )
}

export default TronLinkModal
