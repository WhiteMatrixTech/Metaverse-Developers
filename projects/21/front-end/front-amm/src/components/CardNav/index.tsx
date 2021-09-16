import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@titanswap-libs/uikit'
import { useTranslation } from 'react-i18next'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 20px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => {
  const { t } = useTranslation()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} size="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          <TranslatedText translationId={8}>{t('OKchain10')}</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          <TranslatedText translationId={74}>{t('OKchain11')}</TranslatedText>
        </ButtonMenuItem>
        {/* <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://www.binance.org/en/panama"
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </ButtonMenuItem> */}
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
