import { ChainId } from '@titanswap-libs/sdk'
import POINS_ABI from './abi.json'

const POINS_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x6714bB2E8699a75DDde2AB6B4c9970f821c0F8BB', // TODO
  [ChainId.BSCTESTNET]: '0x6714bB2E8699a75DDde2AB6B4c9970f821c0F8BB'
}

export { POINS_ABI, POINS_NETWORKS }
