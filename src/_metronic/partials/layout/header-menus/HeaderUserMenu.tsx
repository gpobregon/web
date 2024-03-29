/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import {Amplify, Auth} from 'aws-amplify'

const HeaderUserMenu: FC = () => {
    const {currentUser, logout} = useAuth()
    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
    })

    const forgotDevice = async () => {
        try {
            logout()
            await Amplify.Auth.forgetDevice()
        } catch (error) {}
    }

    const getEmail = () => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
            })
        })
    }

    useEffect(() => {
        getEmail()
    }, [])

    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
        >
            <div className='menu-item px-3'>
                <div className='menu-content d-flex align-items-center px-3'>
                    <div className='symbol symbol-50px me-5'>
                        <img alt='Logo' src={dataUser.imageProfile} />
                    </div>
                    <div className='symbol symbol-50px me-5'>
                        {dataUser.name} {dataUser.lastname}
                    </div>
                </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
                <Link to={'perfil'} className='menu-link px-5'>
                    Mi Perfil
                </Link>
            </div>

            <div className='separator my-2'></div>

            {/* <Languages />  */}

            <div className='menu-item px-5'>
                <a onClick={forgotDevice} className='menu-link px-5'>
                    Cerrar sesión
                </a>
            </div>
        </div>
    )
}

export {HeaderUserMenu}
