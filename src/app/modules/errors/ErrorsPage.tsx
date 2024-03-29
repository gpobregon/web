/* eslint-disable jsx-a11y/anchor-is-valid */
import {Route, Routes, Outlet} from 'react-router-dom'
import {Error401} from './components/Error401'
import {Error404} from './components/Error404'
import {Error500} from './components/Error500'

const ErrorsLayout = () => {
  return <Outlet />
}

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path='401' element={<Error401 />} />
      <Route path='404' element={<Error404 />} />
      <Route path='500' element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
)

export {ErrorsPage}
