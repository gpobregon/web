import React, {useState} from 'react'
import moment from 'moment'
import {Button, Card, Col, Form, Row, Table} from 'react-bootstrap'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import NewNotification from './components/NewNotification'

const PushNotificationsPage = () => {
    const [optionSort, setOptionSort] = useState('Agregado recientemente')
    const [resultIcon, setResultIcon] = useState('bi-sort-up')

    const [showCardAddNotification, setShowCardAddNotification] = useState(false)
    const toggleCardAddNotification = (value: any) => {
        setShowCardAddNotification(value)
    }

    let dateToday = moment().format('MMMM DD, YYYY hh:mm')
    let iterationRows = [1, 2, 3, 4, 5, 6]

    const toggleOptionSort = () => {
        if (optionSort == 'Agregado recientemente') {
            setOptionSort('Agregado anteriormente')
            setResultIcon('bi-sort-down')
        } else if (optionSort == 'Agregado anteriormente') {
            setOptionSort('Agregado recientemente')
            setResultIcon('bi-sort-up')
        }
    }

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

            <div className='d-xl-flex'>
                <div
                    className='py-9 px-9 mb-9 flex-grow-1'
                    style={{
                        backgroundColor: '#1E1E2D',
                        borderRadius: '5px',
                    }}
                >
                    <div className='d-flex justify-content-end'>
                        <Button
                            variant='primary'
                            className='mt-md-0 mt-lg-0 mt-xxl-0 mt-4'
                            onClick={() => toggleCardAddNotification(true)}
                        >
                            <span className='menu-icon me-0'>
                                <i className={`bi-plus-lg fs-2`}></i>
                            </span>
                            {' Nueva notificación'}
                        </Button>
                    </div>

                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />

                    <div className='d-sm-flex justify-content-between align-items-center mb-5'>
                        <div
                            className='d-flex align-items-center fs-5 text-muted m-2'
                            style={{cursor: 'pointer'}}
                            onClick={toggleOptionSort}
                        >
                            <i className={`${resultIcon} fs-1 me-2`}></i>
                            {`${optionSort}`}
                        </div>
                        <div className='d-flex align-items-center m-2'>
                            <i className='bi bi-trash fs-1 me-6' style={{cursor: 'pointer'}}></i>
                            <i
                                className='bi bi-gear fs-1'
                                style={{cursor: 'pointer', lineHeight: 0}}
                            ></i>
                        </div>
                    </div>

                    <div>
                        <Table
                            striped
                            bordered
                            hover
                            variant='dark'
                            responsive
                            className='align-middle'
                        >
                            <tbody>
                                {iterationRows.map((item) => (
                                    <tr>
                                        <td style={{width: '55px'}}>
                                            <Form.Check className='ms-5' type='checkbox' id='1' />
                                        </td>
                                        <td className='text-muted' style={{width: '200px'}}>
                                            {dateToday}
                                        </td>
                                        <td style={{width: '50px'}}>
                                            <div
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#a9a9a9',
                                                    borderRadius: '10px',
                                                }}
                                            ></div>
                                        </td>
                                        <td>
                                            <div>Título de Notificación</div>
                                            <div className='text-muted'>
                                                Contenido / Descripción de notificación
                                            </div>
                                        </td>
                                        <td style={{width: '144px'}}>
                                            <Button
                                                variant='outline-primary'
                                                className='text-center'
                                            >
                                                <i className='fs-2 bi-pencil px-0 fw-bolder'></i>
                                            </Button>
                                            <Button
                                                variant='outline-danger'
                                                className='text-center'
                                            >
                                                <i className='fs-2 bi-trash px-0 fw-bolder'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <NewNotification
                    showCardAddNotification={showCardAddNotification}
                    toggleCardAddNotification={toggleCardAddNotification}
                />
            </div>
        </>
    )
}

export default PushNotificationsPage
