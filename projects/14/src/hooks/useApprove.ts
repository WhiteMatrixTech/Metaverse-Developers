import { useCallback } from 'react'

import { Contract } from 'web3-eth-contract'
import { Dpc } from '../sushi'
import { approveNew } from '../sushi/utils'
import useDpc from '../hooks/useDpc'

const useApprove = () => {

  const dpc = useDpc()
  const handleApprove = useCallback(
    async (pid: number, amount: number) => {
      console.log("handleApprove-------->", amount)
      const tx = await approveNew(dpc, pid, amount)
      return tx
    }, [dpc])

  return { onApprove: handleApprove }
}

export default useApprove
