import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'

import { getStaked } from '../sushi/utils'
import useDpc from './useDpc'


const useStakedBalance = (pid:any) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const dpc = useDpc()
  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(dpc,pid)
    console.log("stakedBalance------>",balance)
    setBalance(new BigNumber(balance))
  }, [dpc])

  useEffect(() => {
    if (dpc) {
      fetchBalance()
    }
  }, [dpc])

  return balance
}

export default useStakedBalance
