import { PancakeTheme } from '@titanswap-libs/uikit'

declare module 'styled-components' {

  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {
  }

}
