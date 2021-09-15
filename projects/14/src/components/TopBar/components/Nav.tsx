import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { changeLanguage } from '../../../common/i18n/i18next.js';
import { useTranslation, Trans, Translation } from 'react-i18next'

const Nav: React.FC = () => {
  let { t, i18n } = useTranslation()

  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        {t('home')}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/getNFT">
        {t('get-NFTS')}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/myNFT">
        {t('my-NFTS')}
      </StyledLink>
      {/* <StyledLink exact activeClassName="active" to="/test">
        {t('test')}
      </StyledLink> */}
      <StyledLink exact activeClassName="active" to="/farms">
        {t('farms')}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/market">
        {t('market')}
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/rules">
        {t('rules')}
      </StyledLink>
      {/* <StyledAbsoluteLink  href="https://medium.com/sushiswap/the-sushiswap-project-c4049ea9941e"
        target="_blank">
        {t('whitepage')}
      </StyledAbsoluteLink> */}
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
