import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { useTranslation } from 'react-i18next'
import {toNumber} from "web3-utils";
import {message} from "antd";

interface SellModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
}

const SellModal: React.FC<SellModalProps> = ({
  onConfirm,
  onDismiss,
  max,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return max.toString()
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    // setVal(fullBalance)
  }, [fullBalance, setVal])

  const {t} =useTranslation();
  return (
    <Modal>
      <ModalTitle text={t('sell-modal-title')} />
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={null}
        symbol={tokenName}
      />
      <ModalActions>
        <Button text={t('btn-cancel')} variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : t('btn-ok')}
          onClick={async () => {
            if (toNumber(val) >= 1800){
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
            }
            else{
                message.info("price has to be above 1800trx")
            }
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default SellModal
