import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import UsersPage from '../modules/users/UsersPage'
import CatalogosPage from '../modules/catalogos/catalogos-page'
import SitiosPage from '../modules/sitios/SitiosPage'
import ReportsPage from '../modules/reports/ReportsPage'
import MostVistedReport from '../modules/reports/MostVistedReport'
import SitesByRating from '../modules/reports/SitesByRating'
import UserReport from '../modules/reports/UserReport'
import Template  from "../modules/template/movil/index";
import ConfSite  from "../modules/sitios/ConfSite";
import EditSite  from "../modules/sitios/edit-site";
import AddPoin  from "../modules/sitios/components/sitios-interes/add-point-interes";
import EditPoin  from "../modules/sitios/components/sitios-interes/edit-point-interes";  
import UserManagement  from '../modules/users/UserManagement'; 
import RoleManagement from '../modules/users/RoleManagement' 
import PushNotificationsPage from '../modules/push-notifications/PushNotificationsPage'


const PrivateRoutes = () => {
    const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
    const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
    const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
    const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
    const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
    //const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />

        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='/sitios/create' element={<ConfSite />} />
        <Route path='/sitios/edit' element={<EditSite />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route path='catalogos' element={<CatalogosPage />} />
        <Route path='reportes' element={<ReportsPage />} /> 
        <Route path='usuarios' element={<UsersPage />} /> 
        <Route path='/usuarios/user-management' element={<UserManagement />} />  
        <Route path='/usuarios/role-management' element={<RoleManagement />} /> 
        <Route path='/reportes/sitios-mas-visitados' element={<MostVistedReport />} /> 
        <Route path='/reportes/sitios-por-calificacion' element={<SitesByRating />}  /> 
        <Route path='/reportes/reporte-de-usuario' element={<UserReport />}  />
        <Route path='sitios' element={<SitiosPage />} /> 
        <Route path='template' element={<Template />} /> 
        <Route path='notificaciones-push' element={<PushNotificationsPage />} />

        <Route path='/sitios/create-point-interes' element={<AddPoin />} />
        <Route path='/sitios/edit-point-interes' element={<EditPoin />} />

                {/* Lazy Modules */}
                <Route
                    path='crafted/pages/profile/*'
                    element={
                        <SuspensedView>
                            <ProfilePage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/pages/wizards/*'
                    element={
                        <SuspensedView>
                            <WizardsPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/widgets/*'
                    element={
                        <SuspensedView>
                            <WidgetsPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='crafted/account/*'
                    element={
                        <SuspensedView>
                            <AccountPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/chat/*'
                    element={
                        <SuspensedView>
                            <ChatPage />
                        </SuspensedView>
                    }
                />
                <Route
                    path='apps/user-management/*'
                    element={
                        <SuspensedView>
                            <UsersPage />
                        </SuspensedView>
                    }
                />
                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--kt-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
