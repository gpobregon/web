/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import AddUserEmergency from './components/AddUserEmergency'
import {ForgotPassword} from './components/ForgotPassword'
import {RestorePassword} from './components/RestorePassword'
import {NewPassword} from './components/NewPassoword'
import {Login} from './components/Login'
import {Container, Row, Col} from 'react-bootstrap'
import CodeRegister from './components/CodeRegister' 
import Image from '../../../_metronic/assets/img/Tikal.png'

const AuthLayout = () => {
    useEffect(() => {
        document.body.classList.add('bg-body')
        return () => {
            document.body.classList.remove('bg-body')
        }
    }, [])

    return (
        <Container fluid className='root' style={{padding: 0}}>
            <Row style={{margin: 0}}>
                <Col
                    style={{backgroundImage: `url(${Image})`, height: '100vh', backgroundRepeat: 'no-repeat', 
                backgroundAttachment: 'fixed', backgroundSize: 'cover'}}
                ></Col>
                <Col
                    style={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
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
            <Route path='AddUserEmergency' element={<AddUserEmergency />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='restore-password' element={<RestorePassword />} />
            <Route path='new-password' element={<NewPassword />} />
            <Route path='code-register' element={<CodeRegister />} />
            <Route index element={<Login />} />
        </Route>
    </Routes>
)

export {AuthPage}
