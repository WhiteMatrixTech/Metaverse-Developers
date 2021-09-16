import React, { createContext, useCallback, useEffect, useState } from 'react'

import { Dpc } from '../../sushi/Dpc'

import { getTronWebInstance } from '../../utils/tronwebutils'

export interface DpcContext {
  dpc?: typeof Dpc
}

export const Context = createContext<DpcContext>({
  dpc: undefined,
})

declare var window: Window & { tronWeb: any };
declare global {
  interface Window {
    dpcsauce: any
  }
}

// declare var window: Window & { dcp: any };

const DpcProvider: React.FC = ({ children }) => {

  const [dpc, setDpc] = useState<any>()

  // @ts-ignore
  window.dpc = dpc

  const initTronWeb=useCallback(()=>{
    async function getTronWeb() {
      return await getTronWebInstance()
    }
    getTronWeb().then(dpc => {
      // const bkeyAddress='TXjUo1K4S5LYqMm62cS4QWotrLGYdYwZu1'
      // const tmbAddress='TAPvZtZ1EQoqZH3eJgZ3oViXzZGaiRx9hq'
      // const bkeyPoolAddress="TXapcba3MrshZJ5Bb78QpoS4q41fu8w3tJ"
      //-----online address-------
      //正式网络地址
      const bkeyAddress = 'TPeKNyn61zif1GC1Xq1ugdKLH4CYjmLe22'
      const tmbAddress = 'TWa7s1kqo1xpg5j4WauAW6eEWdYN924KBT'
      const currentAddress = window.tronWeb.defaultAddress.base58
      const dpclib = new Dpc(dpc.tronWeb, bkeyAddress, tmbAddress, currentAddress, dpc.loggedIn)
      setDpc(dpclib)
      window.dpcsauce = dpclib
    }).catch(() => {
    })
  },[])

  useEffect(() => {
    initTronWeb()
    let refreshInterval = setInterval(()=>{
      console.log(window.dpcsauce)
      if(window.dpcsauce){
         if(window.dpcsauce.currentAddress==false){
        console.log('-----retrying----connect')
        initTronWeb()
        }
      }else {
        console.log('-----retrying----undefined')
           initTronWeb()
      }
      // console.log(window.tronWeb,window.tronWeb.ready)
      // initTronWeb()
    }, 1000)
    return () => clearInterval(refreshInterval)
  }, [getTronWebInstance])

  return <Context.Provider value={{ dpc }}>{children}</Context.Provider>
}

export default DpcProvider
