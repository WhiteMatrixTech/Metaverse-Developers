import React from 'react'
import styled from 'styled-components'
import nft from '../../assets/img/main_logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import Card from '../../components/Card'
import Spacer from '../../components/Spacer'
import Label from '../../components/Label'
import BoldLabel from '../../components/BoldLabel'
import Text from '../../components/Text'
import { useTranslation } from 'react-i18next'
// import Balances from './components/Balances'


const Rules: React.FC = () => {
    const { t } = useTranslation()
    return (
        <Page>
            <Container>
                <StyledWrapper>
                    <Spacer size="sm" />
                    <Label text={t("abstract")} />
                </StyledWrapper>
                <Spacer size="lg" />
                <Text text={t("initial-TMB-offering")} />
                <Spacer size="sm" />
                <Container>
                    <StyledWrapper> <Label text={t("text-initial-TMB-offering")} /></StyledWrapper>
                    <StyledImage>
                        <img src={require(`../../assets/img/price.png`)} style={{ width: "350px", height: "350px" }}></img>
                    </StyledImage>
                </Container>
                <Spacer size="lg" />
                <Text text={t("exchange-BKEY-for-TMB")} />
                <Spacer size="sm" />
                <Container>
                    <StyledWrapper> <Label text={t("text-exchange-BKEY-for-TMB")} /></StyledWrapper>
                    <Spacer size="sm" />
                    <Container>
                        <Label text={t("detail-exchange-BKEY-for-TMB-11")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-12")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-21")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-22")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-31")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-32")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-41")} />
                        <Label text={t("detail-exchange-BKEY-for-TMB-42")} />
                    </Container>
                </Container>
                <Spacer size="lg" />
                <Text text={t("name-your-NFTs")} />
                <Spacer size="sm" />
                <Container>
                    <StyledWrapper><Label text={t("text-name-your-NFTs")} /></StyledWrapper>
                    <Spacer size="sm" />
                    <Container>
                        <Label text={t("detail-text-name-your-NFTs-0")} />
                        <Label text={t("detail-text-name-your-NFTs-1")} />
                        <Label text={t("detail-text-name-your-NFTs-2")} />
                        <Label text={t("detail-text-name-your-NFTs-3")} />
                        <Label text={t("detail-text-name-your-NFTs-4")} />
                        <Label text={t("detail-text-name-your-NFTs-5")} />
                        <Label text={t("detail-text-name-your-NFTs-6")} />
                        <Spacer size="sm" />
                        <BoldLabel text={t("text-raward-1")} />
                        <BoldLabel text={t("text-raward-2")} />
                        <BoldLabel text={t("text-raward-3")} />
                        <BoldLabel text={t("text-raward-4")} />
                    </Container>
                </Container>
                <Spacer size="lg" />

                <Text text={t("trading")} />
                <Spacer size="sm" />
                <Container>
                    <StyledWrapper>
                        <Label text={t("text-trading-1")} />
                    </StyledWrapper>
                    <Spacer size="sm" />
                    <StyledWrapper>
                        <Label text={t("text-trading-2")} />
                    </StyledWrapper>
                </Container>
                <Spacer size="lg" />
                <Text text={t("contract-address")} />
                <Spacer size="sm" />
                <Container>
                    <Label text={t("bkey")+" TPeKNyn61zif1GC1Xq1ugdKLH4CYjmLe22"} />
                    <Label text={t("tmb")+" TWa7s1kqo1xpg5j4WauAW6eEWdYN924KBT"} />
                    <Label text={t("USDT-TRX-LP-staking-pool")+" TFY9a9cr8ch3YkcZMr6rqQk3RkRKB6349D"} />
                    <Label text={t("USDT-BTT-LP-staking-pool")+" TYndfUsJ8kSU8QwNf4z3cvUm35BsjQhuAA"} />
                    <Label text={t("USDT-SUN-LP-staking-pool")+" TJvcdZjvccHo9novDULpF3CkE2aY9wZVA1"} />
                    <Label text={t("TRX-BKEY-LP-staking-pool")+t('commin-soon')} />
                    <Spacer size="sm" />
                </Container>
            </Container>
            <Spacer size="lg" />



        </Page>
    )
}

const StyledWrapper = styled.div`
  word-break:break-all;
  margin-top: 20px;
`
const StyledImage = styled.div`
  margin-left: 170px;
`
export default Rules
