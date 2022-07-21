/* eslint-disable jsx-a11y/anchor-is-valid */

import {useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'

/* eslint-disable no-unreachable */
const Toolbar = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('1')
  return (
    <div
      id='kt_layout_toolbar'
      className='card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover d-none'
      style={{
        backgroundColor: '#663259',
        backgroundSize: 'auto 100%',
        backgroundImage: `url('${toAbsoluteUrl('/media/misc/taieri.svg')}')`,
      }}
    ></div>
  )
}
export {Toolbar}
