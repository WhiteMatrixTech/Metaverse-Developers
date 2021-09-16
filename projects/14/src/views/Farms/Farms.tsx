import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { useTranslation, Trans, Translation } from 'react-i18next'
import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'
import Spacer from '../../components/Spacer'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'
import Label from '../../components/Label'
import BoldLabel from '../../components/BoldLabel'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  let { t, i18n } = useTranslation()
  return (
    <Switch>
      <Page>
        {true ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={null}
                title={t("select-farm")}
              />
              <Label text={t("info-farm")} />
              <BoldLabel text={t("rule-farm")} />
              <Spacer size="lg" />
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Farms
