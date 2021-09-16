import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'TT1-TT2 LP',
    lpAddresses: {
      137: '',
      80001: '0x2a3C8c3535147e7ffD99E63b54B8E1551d5f8E98'
    },
    tokenSymbol: 'TT1',
    tokenAddresses: {
      137: '',
      80001: '0x79495d608C07E2aa2cD2faB086C63C7D8cC9b366',
    },
    quoteTokenSymbol: QuoteToken.TT2,
    quoteTokenAdresses: contracts.tt2,
  },
  {
    pid: 1,
    risk: 6,
    lpSymbol: 'TT1-MATIC LP',
    lpAddresses: {
      137: '',
      80001: '0x5a4FFF7c60588739C3e13A47d7c4b05Aeee65FF7'
    },
    tokenSymbol: 'TT1',
    tokenAddresses: {
      137: '',
      80001: '0x79495d608C07E2aa2cD2faB086C63C7D8cC9b366',
    },
    quoteTokenSymbol: QuoteToken.WMATIC,
    quoteTokenAdresses: contracts.wmatic,
  },
  {
    pid: 2,
    risk: 6,
    lpSymbol: 'USDC-MATIC LP',
    lpAddresses: {
      137: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
      80001: '0x2a3C8c3535147e7ffD99E63b54B8E1551d5f8E98'
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      80001: '0x79495d608C07E2aa2cD2faB086C63C7D8cC9b366',
    },
    quoteTokenSymbol: QuoteToken.WMATIC,
    quoteTokenAdresses: contracts.wmatic,
  },
  // 单币挖矿
  {
    pid: 14,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WMATIC',
    lpAddresses: {
      137: '',
      80001: '0x2a3C8c3535147e7ffD99E63b54B8E1551d5f8E98', // BNB-BUSD LP
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      137: '',
      80001: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
]

export default farms
