/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget4,
  ListsWidget5,
  TablesWidget10,
  MixedWidget8,
  MixedWidget5,
  MixedWidget3,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  return (
    <>
      {/* begin::Row  */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col  */}
        <div className='col-xxl-4'>
          <MixedWidget8 className='card-xxl-stretch' chartColor='warning' chartHeight='150px' />
        </div>
        {/* end::Col  */}
        {/* begin::Col  */}
        <div className='col-xxl-8'>
          <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
        {/* end::Col  */}
      </div>
      {/* end::Row  */}

      {/* begin::Row  */}
      <div className='row gy-5 g-xl-8'>
        {/* begin::Col  */}
        <div className='col-xl-4'>
          <ListsWidget5 className='card-xl-stretch mb-xl-8' />
        </div>
        {/* end::Col  */}
        {/* begin::Col  */}
        <div className='col-xl-4'>
          <MixedWidget3
            className='card-xl-stretch mb-5 mb-xl-8'
            chartColor='primary'
            chartHeight='225px'
          />
        </div>
        {/* end::Col  */}
        {/* begin::Col  */}
        <div className='col-xl-4'>
          <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={6} />
        </div>
        {/* end::Col  */}
      </div>
      {/* end::Row  */}

      {/* begin::Row */}
      {/* end::Row */}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
