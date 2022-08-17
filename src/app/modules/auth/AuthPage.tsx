/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Registration } from './components/Registration'
import { ForgotPassword } from './components/ForgotPassword' 
import { RestorePassword } from './components/RestorePassword'
import { Login } from './components/Login'
import { Container, Row, Col } from 'react-bootstrap';

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <Container fluid className='root' style={{ padding: 0 }}>
      <Row style={{ margin: 0 }}>
        <Col style={{ background: "url('https://picsum.photos/1920/1080')", height: '100vh' }}></Col>
        <Col style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} /> 
      <Route path='restore-password' element={<RestorePassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export { AuthPage }
