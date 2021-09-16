import { ChainId } from '@titanswap-libs/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xc7efb32470dEE601959B15f1f923e017C6A918cA', // TODO
  [ChainId.BSCTESTNET]: '0x01173890E45aA0f694B68eB89Cb63B295b439FC3'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
