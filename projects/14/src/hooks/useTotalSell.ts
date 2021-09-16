import { useCallback, useEffect, useState } from 'react'
import { totalMarketSupply } from '../sushi/utils'
import useDpc from '../hooks/useDpc'
import BigNumber from 'bignumber.js'

declare var window: Window & { tronWeb: any };

const useTotalSell = () => {

  const[totalMarket,setTotalMarket] =useState(BigNumber)

  const dpc=useDpc()
  const totalSell = useCallback(async () => {
    const totalMarket = await totalMarketSupply(dpc)
    setTotalMarket(totalMarket)
  }, [dpc])

  useEffect(() => {
    if (dpc) {
      totalSell()
    }
  }, [dpc])

  return totalMarket

  
}


export default useTotalSell
