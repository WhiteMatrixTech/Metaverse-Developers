import React, { useContext } from 'react'
import { Menu as UikitMenu, ConnectorId } from '@titanswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetPoinsData from 'hooks/useGetPoinsData'
import { usePoinsContract } from 'hooks/useContract'
import { injected, bsc, walletconnect } from 'connectors'
import { calculateGasMargin } from 'utils'
import links from './config'

const Menu: React.FC = props => {
  const { account, activate, deactivate } = useWeb3React()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = useGetPriceData()
  const userPoinsData = useGetPoinsData(account as string)

  const poinsContract = usePoinsContract();
  const performSignIn = () => {
    const estimate = poinsContract ? poinsContract.estimateGas.signIn : null;
    const method = poinsContract ? poinsContract.signIn : null;
    if (estimate && method) {
      estimate()
        .then((estimatedGasLimit) =>
        method({gasLimit: calculateGasMargin(estimatedGasLimit)}).then((response) => {
          console.log("poinssign -> response", response.hash)
        }).catch((f) => {
        console.log("fetchData -> f", f)
        })
      )
      .catch((e) => {
      console.log("fetchData -> e", e)
      })
    }
  }

  return (
    <UikitMenu
      links={links}
      priceLink="http://romedefi.inmoons.com/"
      account={account as string}
      login={(connectorId: ConnectorId) => {
        if (connectorId === 'walletconnect') {
          return activate(walletconnect)
        }

        if (connectorId === 'bsc') {
          return activate(bsc)
        }

        return activate(injected)
      }}
      logout={deactivate}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={(lang:any) => {
        setSelectedLanguage(lang);
        window.localStorage.setItem('i18nextLng', lang.code);
        window.location.reload();
      }}
      userPoinsData={userPoinsData}
      pointsCheckIn={performSignIn}
      cakePriceUsd={cakePriceUsd}
      {...props}
    />
  )
}

export default Menu
