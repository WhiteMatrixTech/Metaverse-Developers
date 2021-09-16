import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Button from '../../components/Button'
import PageHeader from '../../components/PageHeader'
import chef from '../../assets/img/chef.png'

import BuyNft from './components/BuyNft'
import BuyTmb from './components/BuyTmb'
import Spacer from '../../components/Spacer'
import Label from '../../components/Label'
import { useTranslation } from 'react-i18next'


const GetFav: React.FC = () => {


  useEffect(() => {
    console.log("fav")
  }, [])

  const {t} = useTranslation()
  return (
    <Page>
      <PageHeader
        icon={null}
        title= {t("title-getnft")}
      />
      <Label text={t("text-getnft-1")}/>
      <Label text={t("text-getnft-2")}/>
      <Label text={t("text-getnft-3")}/>

      <img src={require(`../../assets/img/getNFTs.png`)} style={{ width: "850px", height: "200px" }}></img>

      <Spacer size="lg" />

      <StyledWrapper>
        <BuyNft />
        <Spacer />
        <BuyTmb tokenName="BKEY"/>
      </StyledWrapper>
      <Spacer size="lg" />
      <Spacer size="lg" />

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

export default GetFav