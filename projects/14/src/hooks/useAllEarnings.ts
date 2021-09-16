import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getFarms } from '../sushi/utils'
import useDpc from './useDpc'



declare var window: Window & { tronWeb: any };

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dpc = useDpc()
  const farms = getFarms(dpc)

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(dpc,pid),
      ),
    )
    setBalance(balances)
  }, [dpc])

  useEffect(() => {
    if (dpc) {
      fetchAllBalances()
    }
  }, [setBalance, dpc])

  return balances
}

export default useAllEarnings
