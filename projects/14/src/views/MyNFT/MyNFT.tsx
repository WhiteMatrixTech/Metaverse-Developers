import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Label from '../../components/Label'
import Text from '../../components/Text'
import Value from '../../components/Value'
import Spacer from '../../components/Spacer'
import useDpc from '../../hooks/useDpc'
import { getTMBBalance } from '../../sushi/utils'
import BigNumber from 'bignumber.js'
import Container from '../../components/Container'
import NFTCards from './components/NFTCards'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import NFT from '../NFT'

declare var window: Window & { tronWeb: any };


const MyNFT: React.FC = () => {

    const [myAddress, setMyAddress] = useState('')
    const [balance, setBalance] = useState<BigNumber>()

    const dpc = useDpc()

    useEffect(() => {
        if (dpc) {
            if (window.tronWeb === undefined || window.tronWeb.defaultAddress === undefined) {
                return
            }
            const address = window.tronWeb.defaultAddress.base58
            setMyAddress(address)
        }
        async function fetchBalance() {
            const balance = await getTMBBalance(dpc)
            console.log("balance", balance)
            setBalance(balance)
        }
        if (dpc) {
            fetchBalance()
        }

    }, [dpc])
    const { path } = useRouteMatch()
    const { t } = useTranslation()
    let balanceText = ''
    if (balance && balance.toNumber() == 0) {
        balanceText = t('empty-nft')
    }
    return (
        <Page>
            <Route exact path={path}>
                <Text text={t("My-address")} />
                <Spacer size="sm"></Spacer>
                <Label text={myAddress ? myAddress : 'Unlock'} />
                <StyledWrapper>
                    <Text text={t("My-NFT-supply")}></Text>
                    <Spacer></Spacer>
                    <Value value={balance ? balance.toString() : '0'} />
                    <Label text={balanceText}></Label>
                </StyledWrapper>
                <NFTCards />
            </Route>
            <Route path={`${path}/:nftId`}>
                <NFT />
            </Route>
        </Page>
    )
}


const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

export default MyNFT