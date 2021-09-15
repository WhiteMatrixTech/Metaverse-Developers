import { useCallback } from 'react'
import { harvest } from '../sushi/utils'
import useDpc from './useDpc'

const useReward = () => {
  const dpc = useDpc()

  const handleReward = useCallback(async (pid:number) => {
    const txHash = await harvest(dpc,pid)
    console.log("handleReward--->",txHash)
    return txHash
  }, [dpc])

  return { onReward: handleReward }
}

export default useReward
