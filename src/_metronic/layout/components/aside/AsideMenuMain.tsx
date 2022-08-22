/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSubMain } from './AsideMenuItemWithSubMain'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()
  return (
    <>
      <AsideMenuItem
        to='/catalogos'
        title='Catalogos'
        fontIcon='bi bi-tag'
        bsTitle='Catalogos'
        className='py-3'
      />
      <AsideMenuItem
        to='/sitios'
        title='Sitios'
        bsTitle='Sitios'
        fontIcon='bi bi-house-door'
        className='py-3'
      />
      <AsideMenuItem
        to='/reportes'
        title='Reportes'
        bsTitle='Reportes'
        fontIcon='bi bi-file-earmark-text'
        className='py-3'
      /> 
      <AsideMenuItem
        to='/usuarios'
        title='Usuarios'
        bsTitle='Usuarios'
        fontIcon='bi bi-people'
        className='py-3'
      />
    </>
  )
}
