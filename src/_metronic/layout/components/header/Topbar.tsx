import {FC, useState, useEffect} from 'react'
import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers' 
import {Amplify, Auth} from 'aws-amplify'
import {
  HeaderUserMenu,
  QuickLinks,
  Search,
  ThemeModeSwitcher,
} from '../../../partials'
import {useLayout} from '../../core'

const itemClass = 'ms-1 ms-lg-3',
  btnClass = 'btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px',
  userAvatarClass = 'symbol-30px symbol-md-40px',
  btnIconClass = 'svg-icon-1'

const Topbar: FC = () => {
  const {config} = useLayout() 
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
    <div className='d-flex align-items-stretch justify-self-end flex-shrink-0'>
      {/* NOTIFICATIONS */}
      
        {/* begin::Menu- wrapper */}
        
        
        {/* end::Menu wrapper */}
   

      {/* CHAT */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
        {/* begin::Menu wrapper */}
        {/* <div
          className={clsx(
            'btn btn-icon btn-active-light-primary btn-custom position-relative',
            btnClass
          )}
          id='kt_drawer_chat_toggle'
        >
          <KTSVG path='/media/icons/duotune/communication/com012.svg' className={btnIconClass} />

          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div> */}
        {/* end::Menu wrapper */}
      {/* </div> */}

      {/* CONFIGURACION */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
        {/* begin::Menu wrapper */}
        {/* <div
          className={clsx('btn btn-icon btn-active-light-primary btn-custom', btnClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <KTSVG path='/media/icons/duotune/general/gen025.svg' className={btnIconClass} />
        </div>
        <QuickLinks /> */}
        {/* end::Menu wrapper */}
      {/* </div> */}

      {/* begin::User */}
      <div className={clsx('d-flex align-items-center', itemClass)} id='kt_header_user_menu_toggle'>
        {/* begin::Toggle */}
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={dataUser.imageProfile} alt='metronic' />
        </div>
        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export {Topbar}
