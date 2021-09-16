import React from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@titanswap-libs/uikit'
import { darken } from 'polished'
import { NavLink, Link as HistoryLink } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { RowBetween } from 'components/Row'
import QuestionHelper from 'components/QuestionHelper'
import TranslatedText from 'components/TranslatedText'
import { useTranslation } from 'react-i18next'

const Tabs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledAbsoluteLink = styled.a`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.colors.text)};
  }
`

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textDisabled};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.colors.text)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.colors.text};
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()
  return (
    <Tabs style={{ marginBottom: '20px' }}>
      <StyledNavLink id="swap-nav-link" to="/swap" isActive={() => active === 'swap'}>
        <TranslatedText translationId={8}>{t('OKchain10')}</TranslatedText>
      </StyledNavLink>
      <StyledNavLink id="pool-nav-link" to="/pool" isActive={() => active === 'pool'}>
        <TranslatedText translationId={74}>{t('pool')}</TranslatedText>
      </StyledNavLink>
      <StyledAbsoluteLink id="pool-nav-link" target="_blank" href="https://www.binance.org/en/panama">
        {t('swap54')}
      </StyledAbsoluteLink>
    </Tabs>
  )
}

export function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const { t } = useTranslation()
  return (
    <ButtonMenu activeIndex={activeIndex} size="sm" variant="subtle">
      <ButtonMenuItem id="swap-nav-link" to="/swap" as={HistoryLink}>
        <TranslatedText translationId={8}>{t('OKchain10')}</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/pool" as={HistoryLink}>
        <TranslatedText translationId={74}>{t('OKchain11')}</TranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem
        id="pool-nav-link"
        as="a"
        href="https://www.binance.org/en/panama"
        target="_blank"
        rel="noreferrer noopener"
      >
        {t('swap54')}
      </ButtonMenuItem>
    </ButtonMenu>
  )
}

export function FindPoolTabs() {
  const { t } = useTranslation()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{t('swap55')}</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  const { t } = useTranslation()
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? t('swap3') : t('swap41')}</ActiveText>
        <QuestionHelper
          text={
            adding
              ? t('swap56')
              : t('swap34')
          }
        />
      </RowBetween>
    </Tabs>
  )
}
