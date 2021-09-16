import { useCallback } from 'react'
import useDpc from './useDpc'
import {stakeNew } from '../sushi/utils'

const useStake = () => {

  const dpc = useDpc()

  const handleStake = useCallback(
    async (pid:number,amount: string) => {
      const txHash = await stakeNew(dpc,pid,amount)
      console.log(txHash)
      return txHash
    },
    [dpc],
  )

  return { onStake: handleStake }
}

export default useStake
