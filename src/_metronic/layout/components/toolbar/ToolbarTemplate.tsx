/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {useLayout} from '../../core'

type Props = {
  sectionLeft? : any
  sectionRight? : any
  DefaultTitle? : string
}

const ToolbarTemplate: FC<Props> = ({ sectionLeft, DefaultTitle, sectionRight }) => {
  const {classes} = useLayout()

  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex justify-content-xxl-between justify-content-xl-between justify-content-lg-between flex-sm-column flex-column flex-md-row w-100 px-3')}
      >
          { sectionLeft }
          { sectionRight }
      </div>
      {/* end::Container */}
    </div>
  )
}

export default ToolbarTemplate
