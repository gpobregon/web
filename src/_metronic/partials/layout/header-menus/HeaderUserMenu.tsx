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

    const getEmail = () => {
        Auth.currentAuthenticatedUser().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
            })
            //console.log(user.attributes['custom:phoneNumber']);
            //console.log(JSON.stringify(user.attributes))
            //console.log(user)
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
                </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
                <Link to={'perfil'} className='menu-link px-5'>
                    My Profile
                </Link>
            </div>

            <div className='separator my-2'></div>

            {/* <Languages />  */}

            <div className='menu-item px-5'>
                <a onClick={logout} className='menu-link px-5'>
                    Sign Out
                </a>
            </div>
        </div>
    )
}

export {HeaderUserMenu}
