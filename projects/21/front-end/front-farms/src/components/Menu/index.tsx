import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import useGetPoinsData from 'hooks/useGetPoinsData'
import { usePoinsContract } from 'hooks/useContract'
import { Menu as UikitMenu } from '@titanswap-libs/uikit'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  const userPoinsData = useGetPoinsData(account as string)

  const poinsContract = usePoinsContract();
  const performSignIn = () => {
    const method = poinsContract ? poinsContract.signIn : null;
    if (method) {
      method()
      .send({ from: account })
      .on('transactionHash', (tx) => {
      console.log("performSignIn -> tx", tx)
      })
    }
  }

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      userPoinsData={userPoinsData}
      pointsCheckIn={performSignIn}
      priceLink="https://www.coingecko.com/en/coins/titan-finance"
      {...props}
    />
  )
}

export default Menu
