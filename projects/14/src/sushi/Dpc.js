import BigNumber from 'bignumber.js'
import { supportedPools } from '../sushi/lib/constants'

export class Dpc {

  constructor(tronWeb,bkeyAddress,tmbAddress,currentAddress,loggedIn) {
    this.bkeyAddress = bkeyAddress
    this.tmbAddress = tmbAddress
    // this.bkeyPoolAddress=bkeyPoolAddress
    // this.farmAddress = contractAddresses.farm[1],
    this.loggedIn = loggedIn
    this.tronWeb = tronWeb
    this.currentAddress=currentAddress
    this.supportedPools=supportedPools
    // this.loaded = false,
    // this.loading = null,
    // this.tokenName = tokenName
  }

  toBigN(a) {
    return BigNumber(a)
  }

  getBkeyAddress(){
    return this.bkeyAddress
  }
}

Dpc.currentAddress = undefined


