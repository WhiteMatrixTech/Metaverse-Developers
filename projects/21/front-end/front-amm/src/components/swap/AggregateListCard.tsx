import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text } from '@titanswap-libs/uikit'
import { bottom } from '@popperjs/core'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SvgData } from '../../assets/images/svg-data.svg'
import RomeLogo from '../../assets/aggLogo/icon_top_logo.png'
import PancakeSwap from '../../assets/aggLogo/polymerization_icon_logo_pancakeswap.png'
import Mdex from '../../assets/aggLogo/polymerization_icon_logo_mdex.png'
import ApeSwap from '../../assets/aggLogo/polymerization_icon_logo_apeswap.png'
import BakerySwap from '../../assets/aggLogo/polymerization_icon_logo_bakeswap.png'
import biSwap from '../../assets/aggLogo/polymerization_icon_logo_biswap.png'
import AggTradePrice from "./AggTradePrice"

import { AutoRow, RowBetween, RowFixed } from '../Row'

const AggregateListCard = styled.div<{ show: boolean }>`
  padding: 0;
  margin-bottom: 20px;
  opacity: ${({ show }) => (show ? '1' : '0.5')};
`

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > * {
    width: ${({ size }) => (size ? `${size  }px` : '32px')};
  }
`

const TextCT = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 400;
`

const TextCTGreen = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 400;
  color: #27B877;
`

const TextCTGray = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 400;
  color: #999999;
`

export default function AggregateListCardMain({ listItem }: any) {

  const [showInverted, setShowInverted] = useState<boolean>(false)

  const reserve0 = listItem.trade?.route.pairs[0].reserve0.toFixed(4);
  const reserve1 = listItem.trade?.route.pairs[0].reserve1.toFixed(4);
  const baseSymbol = listItem.trade?.executionPrice.baseCurrency?.symbol;
  const quoteSymbol = listItem.trade?.executionPrice.quoteCurrency?.symbol;
  const { t } = useTranslation()

  return (
    <AggregateListCard show={Boolean(listItem.status)}>
      <Card isSuccess={listItem.status}>
        <CardBody>
          <RowBetween style={{'paddingBottom': '5px'}}>
            <RowFixed>
              <IconWrapper size={120}>
                {
                  listItem.id === 1 ? <img src={PancakeSwap} alt="" /> : (
                    listItem.id === 2 ? <img src={Mdex} alt="" /> : (
                      listItem.id === 3 ? <img src={ApeSwap} alt="" /> : (
                        listItem.id === 4 ? <img src={BakerySwap} alt="" /> : (
                          listItem.id === 5 ? <img src={biSwap} alt="" /> : <img src={RomeLogo} alt="" />
                        )
                      )
                    )
                  )
                }
              </IconWrapper>
            </RowFixed>
            <RowFixed>
              <SvgData />
              <Text fontSize="14px" style={{ marginLeft: 4 }}>
                {listItem ? listItem.scale : ''}%
              </Text>
            </RowFixed>
          </RowBetween>
          <AutoRow style={{'paddingBottom': '5px'}}>
            <RowFixed>
              <TextCT>
              {t('OKchain64')}:
              </TextCT>
            </RowFixed>
            <RowFixed>
              {listItem.id === 0 ? <TextCT>
                {Boolean(listItem.trade) && (
                  <AggTradePrice
                    price={listItem.trade?.executionPrice}
                    showInverted={showInverted}
                    setShowInverted={setShowInverted}
                  />
                )}
              </TextCT> : <TextCT>{`0 ${baseSymbol} per 0 ${quoteSymbol}`}</TextCT>}
            </RowFixed>
            {/* <RowFixed>
              <TextCTGray>
                均价比:
              </TextCTGray>
            </RowFixed>
            <RowFixed>
              <TextCTGreen>
              {listItem ? listItem.priceScale : ''}%
              </TextCTGreen>
            </RowFixed> */}
          </AutoRow>
          <AutoRow>
            <RowFixed>
              <TextCT>
                {t('swap1')}:
              </TextCT>
            </RowFixed>
            <RowFixed>
              <TextCT>
                {listItem.id === 0 ? `${reserve0} ${baseSymbol} / ${reserve1} ${quoteSymbol}` : `0 ${baseSymbol} / 0 ${quoteSymbol}`}
              </TextCT>
            </RowFixed>
          </AutoRow>
        </CardBody>
      </Card>
    </AggregateListCard>
  )
}