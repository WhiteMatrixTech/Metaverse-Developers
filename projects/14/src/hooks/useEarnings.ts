import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../sushi/utils'
import useDpc from './useDpc'
import useBlock from './useBlock'

declare var window: Window & { tronWeb: any };

const useEarnings = (pid: number) => {

  const [balance, setBalance] = useState(new BigNumber(0))

  const dpc = useDpc()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(dpc,pid)
    setBalance(new BigNumber(balance))
  }, [dpc])

  useEffect(() => {
    if (dpc) {
      fetchBalance()
    }
  }, [setBalance])

  return balance
}

export default useEarnings
