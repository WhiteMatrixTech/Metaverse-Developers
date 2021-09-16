import { useCallback } from 'react'
import { harvestUnstake } from '../sushi/utils'


const useHarvestUnstake = () => {

  const handleHarvestUnstake = useCallback(
    async (dpc,pid) => {
      const txHash = await harvestUnstake(dpc,pid)
      console.log(txHash)
      return txHash
    },[]
  )

  return { onHarvestUnstake: handleHarvestUnstake }
}

export default useHarvestUnstake
