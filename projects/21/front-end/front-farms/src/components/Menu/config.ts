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
  {
    label: 'Nests',
    icon: 'PoolIcon',
    href: '/nests',
  },
]

export default config