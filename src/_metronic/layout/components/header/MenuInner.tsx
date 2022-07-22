import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title='Dashboards' to='/site' />
      <MenuItem title='Botón' to='/#' />
      <MenuItem title='Botón' to='/#' />
      <MenuItem title='Botón' to='/#' />
    </>
  )
}
