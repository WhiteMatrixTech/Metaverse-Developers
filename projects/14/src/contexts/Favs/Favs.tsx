import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDpc from '../../hooks/useDpc'
import { bnToDec } from '../../utils'
import { getFavs } from '../../sushi/utils'

import Context from './context'
import { Fav } from './types'

const Favs: React.FC = ({ children }) => {

  const [favs, setFavs] = useState<any>()

  // var favs=[{id:"0"}]

  const dpc = useDpc()

  useEffect(() => {
    async function getFavsArray() {
      let favs = []
      let favsArray = await getFavs(dpc)
      if (favsArray === undefined) {
        return
      }
      //[1,2,3]
      //[{id:'1'},{id:2},{id:3}]
      for (var i = 0; i < favsArray.length; i++) {
        let item = { id: favsArray[i] +''}
        favs.push(item)
      }
      setFavs(favs)
    }
    if (dpc) {
      getFavsArray()
    }
    let refreshInterval = setInterval(()=>{
      if(favs == []){
        console.log('reload data')
        getFavsArray()
      }
    }, 1000)
    return () => clearInterval(refreshInterval)
  }, [dpc, setFavs])

  return (
    <Context.Provider
      value={{
        favs
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Favs
