import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Sushi } from '../../sushi'

import { getTronWebInstance } from '../../utils/tronwebutils'

export interface SushiContext {
  sushi?: typeof Sushi
}

export const Context = createContext<SushiContext>({
  sushi: undefined,
})

declare global {
  interface Window {
    sushisauce: any
  }
}

const SushiProvider: React.FC = ({ children }) => {

  const [sushi, setSushi] = useState<any>()
  const [tronWeb, setTronWeb] = useState<any>()

  useEffect(() => {
    // async function getTronWeb() {
    //   return await getTronWebInstance()
    // }
    // getTronWeb().then(tronWeb=>{
    //   setTronWeb(tronWeb)
    // })
  }, [getTronWebInstance])

  return <Context.Provider value={{ sushi }}>{children}</Context.Provider>
}

export default SushiProvider
