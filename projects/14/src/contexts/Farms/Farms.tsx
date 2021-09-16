import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDpc from '../../hooks/useDpc'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../sushi/utils'
import { getFarms } from '../../sushi/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const dpc = useDpc()
  const { account } = useWallet()

  const farms = getFarms(dpc)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
