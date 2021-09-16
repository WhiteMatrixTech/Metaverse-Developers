import React from 'react'
import styled from 'styled-components'
import { Heading } from '@titanswap-libs/uikit'
import { useLastTruthy } from '../../hooks/useLast'
import { AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

import AggregateListCard from './AggregateListCard'

const AggregateListFooter = styled.div<{ show: boolean }>`
  margin-top: 2.8rem;
  width: 100%;
  max-width: 400px;
  color: ${({ theme }) => theme.colors.textSubtle};
  z-index: 1;
  background: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 0px 48px 16px rgba(241, 231, 231, 0.5);
  border-radius: 32px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const AggHeaderTitle = styled.div<{ size?: number }>`
  display: flex;
  margin-bottom: 30px
`

export default function AggregateListMain({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)
  const listData = [
    {
      id: 0,
      logo: '../../assets/aggLogo/icon_top_logo.png',
      name: 'TitanDefi',
      scale: '100',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: true,
    },
    {
      id: 1,
      logo: 'polymerization_icon_logo_pancakeswap.png',
      name: 'PancakeSwap',
      scale: '0',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: false
    },
    {
      id: 2,
      logo: 'polymerization_icon_logo_mdex.png',
      name: 'Mdex',
      scale: '0',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: false
    },
    {
      id: 3,
      logo: 'polymerization_icon_logo_apeswap.png',
      name: 'ApeSwap',
      scale: '0',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: false
    },
    {
      id: 4,
      logo: 'polymerization_icon_logo_bakeswap.png',
      name: 'BakerySwap',
      scale: '0',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: false
    },
    {
      id: 5,
      logo: 'polymerization_icon_logo_biswap.png',
      name: 'biSwap',
      scale: '0',
      trade,
      priceScale: '0.12',
      fluidity: '10000 EOS / 2700000 USDT',
      status: false
    },
  ]

  return (
    <AggregateListFooter show={Boolean(trade)}>
      <AggHeaderTitle>
        <Heading size="md">
          Aggregate list
        </Heading>
      </AggHeaderTitle>
      {listData.map((listItem) => {
        return <AggregateListCard listItem={listItem} />
      })}
    </AggregateListFooter>
  )
}