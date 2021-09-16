import React, { useCallback, useEffect, useState } from 'react'

import useDpc from '../../hooks/useDpc'
import { getMarkets } from '../../sushi/utils'

import Context from './context'
import { Market } from './types'

const Markets: React.FC = ({ children }) => {

  const [markets, setMarkets] = useState<any>()

  const dpc = useDpc()

  useEffect(() => {
    async function getMarketsArray() {
      // console.log("getMarketsArray---->")
      let markets = []
      let marketsArray = await getMarkets(dpc)
      if (marketsArray === undefined) {
        return
      }
      for (var i = 0; i < marketsArray.length; i++) {
        let item = { id: marketsArray[i] + '' }
        markets.push(item)
      }
      setMarkets(markets)
    }
    if (dpc) {
      getMarketsArray()
    }
    let refreshInterval = setInterval(
        ()=>{
          if(markets==[]){
            getMarketsArray()
          }
          }
        , 5000)
    return () => clearInterval(refreshInterval)

  }, [dpc, setMarkets])

  return (
    <Context.Provider
      value={{
        markets
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Markets
