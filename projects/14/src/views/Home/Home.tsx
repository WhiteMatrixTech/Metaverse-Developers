import React from 'react'
import styled from 'styled-components'
import nft from '../../assets/img/main_logo.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Label from '../../components/Label'
import Card from '../../components/Card'
import Text from '../../components/Text'
import Balances from './components/Balances'
import { useTranslation} from 'react-i18next'


const Home: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Page>
      <Container>
        <StyledWrapper>
          <img style={{ width: "120px", height: "120px" }} src="http://tronmysterybox.vip/static/tronNFT-7804.png"></img>
          <img style={{ width: "120px", height: "120px" }} src="http://tronmysterybox.vip/static/tronNFT-6965.png"></img>
          <img style={{ width: "120px", height: "120px" }} src="http://tronmysterybox.vip/static/tronNFT-3393.png"></img>
          <img style={{ width: "120px", height: "120px" }} src="http://tronmysterybox.vip/static/tronNFT-6487.png"></img>
        </StyledWrapper>
      </Container>
      <PageHeader
        icon={null}
        title={t("title-main")}
        subtitle={t("subtitle-main")}
      // subtitle="Own 1 of only 10,000 NFTs existing on TRON and earn extra BKEY bonus! 
      // Stake JustSwap LP tokens to earn you BKEY! 
      // Exchange Tron Mystery Box with BKEY to claim your very own NFT!"
      />
      <Container>
        {/* <Text text={t("des-title-main-1" )}  />
        <Text text={t("des-title-main-2" )}  />
        <Text text={t("des-title-main-3" )}  /> */}
      </Container>

      <Container>
        <Balances />
      </Container>

      <Spacer size="lg" />
      <Text text={t("open-tron-mystery-box")} />
      <Container>
        <Label text={t("des-tron-mystery-box")} />
      </Container>
      <StyledWrapper>
        <Button
          text=' 🎁 Get NFTs'
          to="/getNFT"
        />
        <Spacer size="lg" />
        <Spacer size="lg" />
        <Spacer size="lg" />
        <Button
          text=' 🔑 Get BKEYs'
          to="/farms"
        />
        <Spacer size="lg" />
      </StyledWrapper>
      <Spacer size="lg" />
      <Text text={t("makes-TMB-unique")} />
      <Container>
        <Label text={t("des-makes-TMB-unique")} />
        <img src={require(`../../assets/img/works.png`)} style={{ width: "99%", height: "99%" }}></img>
      </Container>
      <StyledWrapper>
        <Button
          text='❔ How it works'
          to="/rules"
        />
      </StyledWrapper>

    </Page >
  )
}


const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

const StyledWrapper = styled.div`
  align-items: center;
  justify-content:center;
  display: flex;
  margin-top: 20px;
  margin-bottom:20px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 10%;
`

export default Home

