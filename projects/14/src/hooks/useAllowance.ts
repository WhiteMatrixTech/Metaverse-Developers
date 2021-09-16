import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useDpc from '../hooks/useDpc'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import {getAllowance } from '../sushi/utils'

const useAllowance = () => {

  const [allowance, setAllowance] = useState(new BigNumber(0))

  const dpc=useDpc()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(dpc)
    if(allowance===undefined){
      return
    }
    console.log("allowance--->",allowance.toNumber())
    setAllowance(new BigNumber(allowance))
  }, [dpc])

  useEffect(() => {
    if (dpc) {
      fetchAllowance()
    }
    // let refreshInterval = setInterval(fetchAllowance, 10000)
    // return () => clearInterval(refreshInterval)
  }, [dpc])

  return allowance
}

export default useAllowance
