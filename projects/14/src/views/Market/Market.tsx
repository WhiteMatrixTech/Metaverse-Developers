import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Spacer from '../../components/Spacer'
import useDpc from '../../hooks/useDpc'
import useTotalSell from '../../hooks/useTotalSell'
import Value from '../../components/Value'
import MarketCards from './components/MarketCards'
import { useTranslation} from 'react-i18next'


const Market: React.FC = () => {


    const dpc = useDpc()
   
    const totalSell=useTotalSell()

    useEffect(() => {
        
    }, [])

    let { t } = useTranslation()

    return (
        <Page>
            <StyledWrapper>
                <Text text={t("current-market-supply")}></Text>
                <Value value={totalSell?totalSell.toString():0}></Value>
            </StyledWrapper>
            <Spacer size="lg"></Spacer>
            <MarketCards />
        </Page>
        //  <Page>
        //     <StyledWrapper>
        //         <Text text={t("Coming Soon")}></Text>
        //     </StyledWrapper>
        //     {/*<MarketCards />*/}
        // </Page>
    )
}
//css样式
const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`
const A = styled.button`
  margin-top:30px;
  width:200px;
  display: flex;
`
export default Market

