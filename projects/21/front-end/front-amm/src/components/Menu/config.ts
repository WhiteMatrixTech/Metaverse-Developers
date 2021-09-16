import { MenuEntry } from '@titanswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'TitanHomeIcon',
    href: '/'
  },
  {
    label: 'Trade',
    icon: 'TitanTradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap'
      },
      {
        label: 'Liquidity',
        href: '/pool'
      }
    ]
  },
  {
    label: 'Farms',
    icon: 'TitanFarmIcon',
    href: '/farms'
  },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'PancakeSwap',
  //       href: 'https://pancakeswap.info/token/0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6',
  //     },
  //     {
  //       label: 'CoinGecko',
  //       href: 'https://www.coingecko.com/en/coins/goose-finance',
  //     },
  //     {
  //       label: 'CoinMarketCap',
  //       href: 'https://coinmarketcap.com/currencies/goose-finance/',
  //     },
  //     {
  //       label: 'AstroTools',
  //       href: 'https://app.astrotools.io/pancake-pair-explorer/0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
  //     },
  //   ]
  // },
  // {
  //   label: 'More',
  //   icon: 'MoreIcon',
  //   items: [
  //     // {
  //     //   label: "Github",
  //     //   href: "https://github.com/goosedefi/",
  //     // },
  //     {
  //       label: "Docs",
  //       href: "https://rome-prod.oss-cn-hangzhou.aliyuncs.com/rome/RomeDefi-%E7%99%BD%E7%9A%AE%E4%B9%A6.pdf",
  //     },
  //     {
  //       label: "Twitter",
  //       href: "https://twitter.com/Rome_DeFi",
  //     },
  //   ],
  // },
  // {
  //   label: 'Audit by Hacken',
  //   icon: 'AuditIcon',
  //   href: 'https://www.goosedefi.com/files/hackenAudit.pdf',
  // },
  // {
  //   label: 'Audit by CertiK',
  //   icon: 'AuditIcon',
  //   href: 'https://certik.org/projects/goose-finance',
  // },
]

export default config
