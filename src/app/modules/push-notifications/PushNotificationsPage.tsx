import React from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'

const PushNotificationsPage = () => {
    return (
        <>
            <div
                className='mb-9'
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        <h1 className='m-0'>Notificaciones</h1>
                    </div>
                </div>
            </div>

            <div
                className='mb-9'
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-9 px-9'>
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' className='mt-md-0 mt-lg-0 mt-xxl-0 mt-4'>
                            <span className='menu-icon me-0'>
                                <i className={`bi-plus-lg fs-2`}></i>
                            </span>
                            {' Nueva notificación'}
                        </Button>
                    </div>
                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                </div>
            </div>
        </>
    )
}

export default PushNotificationsPage
