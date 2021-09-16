import { useCallback } from 'react'
import useDpc from './useDpc'
import { buyMarketNFT } from '../sushi/utils'


const useBuy = (index: string,price:number) => {
  const dpc = useDpc()
  console.log("useBuy",price)
  const handleBuy = useCallback(async () => {
      const txHash = await buyMarketNFT(
        dpc,
        index,
        price
      )
      console.log(txHash)
    },
    [dpc]
  )
  return { onBuy: handleBuy }
}

export default useBuy
