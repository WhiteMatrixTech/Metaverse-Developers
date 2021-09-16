import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import TronLinkModal from './components/TronLinkModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import FavsProvider from './contexts/Favs'
import MarketsProvider from './contexts/Markets'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import DpcProvider from './contexts/DpcProvider'
import SushiProvider from './contexts/SushiProvider'

import { getTronWebInstance } from './utils/tronwebutils'

import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import Home from './views/Home'
import Stake from './views/Stake'
import GetNFT from './views/GetNFT'
import MyNFT from './views/MyNFT'
import Market from './views/Market'
import Rules from './views/Rules'
import Test from './views/Test'

declare var window: Window & { tronWeb: any };

const App: React.FC = () => {

  const [mobileMenu, setMobileMenu] = useState(false)

  const [tronWeb, setTronWeb] = useState<any>()

  useEffect(() => {


  }, [])

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    <Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/getNFT" >
            <GetNFT />
          </Route>
          <Route path="/test" >
            <Test />
          </Route>
          <Route path="/myNFT" >
            <MyNFT />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/staking">
            <Stake />
          </Route>
          <Route path="/market">
            <Market />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
      <TronLink />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
        }}
      >
        <DpcProvider>
          <TransactionProvider>
            <FarmsProvider>
              <FavsProvider>
                <MarketsProvider>
                  <ModalsProvider>{children}</ModalsProvider>
                </MarketsProvider>
              </FavsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </DpcProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}


const TronLink: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('tronlink', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <TronLinkModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const tronlink = localStorage.getItem('tronlink')
    if (window.tronWeb == undefined && tronlink == null) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
