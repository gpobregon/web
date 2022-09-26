import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import { LoadingProvider } from './utility/component/loading/context'
import Loading from './utility/component/loading/index'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LoadingProvider>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
              <Loading/>
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </LoadingProvider>
    </Suspense>
  )
}

export {App}
