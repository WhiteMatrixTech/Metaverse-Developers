import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@titanswap-libs/uikit'

import SFPro400 from './fonts/SF-Pro-Rounded-Thin.otf'
import SFPro500 from './fonts/SF-Pro-Rounded-Medium.otf'
import SFPro900 from './fonts/SF-Pro-Rounded-Black.otf'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: SFPro400;
    font-style: normal;
    font-weight: 400;
    src: url('${SFPro400}');
  }
  @font-face {
    font-family: SFPro500;
    font-style: normal;
    font-weight: 500;
    src: url('${SFPro500}');
  }
  @font-face {
    font-family: SFPro900;
    font-style: normal;
    font-weight: 900;
    src: url('${SFPro900}');
  }
  * {
    font-family: 'SFPro500', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
