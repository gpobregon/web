/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSubMain} from './AsideMenuItemWithSubMain'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <AsideMenuItem
        to='/site'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi bi-house'
        bsTitle={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        className='py-3'
      />
      <AsideMenuItem
        to=''
        title='Layout Builder'
        bsTitle='Layout Builder'
        fontIcon='bi bi-bell'
        className='py-3'
      />
    </>
  )
}
