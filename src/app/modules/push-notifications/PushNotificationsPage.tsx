import React, {useEffect, useState} from 'react'
import moment from 'moment'
import {Button, Card, Col, Form, Row, Table} from 'react-bootstrap'
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import NewNotification from './components/NewNotification'
import UpdateNotification from './components/UpdateNotification'
import {Notification} from '../../models/notification'
import {
    addNotificationMethod,
    deleteData,
    deleteNotificationMethod,
    getData,
    notificationMethod,
    postData,
    updateNotificationMethod,
} from '../../services/api'
import swal from 'sweetalert'

const PushNotificationsPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const [notification, setNotification] = useState({
        id_notificacion: 0,
        nombre: '',
        descripcion: '',
        imagen_path: 'https://picsum.photos/200/200',
        fecha_hora_programada: '',
        tipo: 0,
        estado: 1,
    })

    useEffect(() => {
        getNotificationsProgrammed()
    }, [])

    const [optionGetNotifications, setOptionGetNotifications] = useState('programadas')

    const chooseGetNotifications = () => {
        if (optionGetNotifications == 'historial') {
            getNotificationsHistory()
        } else {
            getNotificationsProgrammed()
        }
    }

    const getNotificationsProgrammed = async () => {
        const notificationsData: any = await postData(notificationMethod, {
            page: '1',
            quantity: '8',
        })
        setNotifications(
            notificationsData.data.filter(
                (notification: any) => notification.tipo == 1
            ) as Notification[]
        )
        setOptionGetNotifications('programadas')
    }

    const getNotificationsHistory = async () => {
        const notificationsData: any = await postData(notificationMethod, {
            page: '1',
            quantity: '8',
        })
        setNotifications(
            notificationsData.data.filter(
                (notification: any) => notification.tipo == 0
            ) as Notification[]
        )
        setOptionGetNotifications('historial')
    }

    const [optionSort, setOptionSort] = useState('Orden descendente')
    const [resultIcon, setResultIcon] = useState('bi-sort-down')

    const [showCardAddNotification, setShowCardAddNotification] = useState(false)
    const [cardUpdateNotification, setCardUpdateNotification] = useState({
        show: false,
        notification: {},
    })

    const toggleCardAddNotification = (value: any) => {
        setShowCardAddNotification(value)
        if (value == true) {
            setCardUpdateNotification({show: false, notification: {}})
        }
    }

    const showCardUpdateNotification = (notification: any) => {
        setCardUpdateNotification({show: true, notification})
        setNotification({
            id_notificacion: notification?.id_notificacion,
            nombre: notification?.nombre,
            descripcion: notification?.descripcion,
            imagen_path: notification?.imagen_path,
            fecha_hora_programada: notification?.fecha_hora_programada,
            tipo: notification?.tipo,
            estado: 1,
        })
    }

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    }

    const addNotification = async (notification: any) => {
        if (
            notification.nombre != '' &&
            notification.descripcion != '' &&
            notification.imagen_path != ''
        ) {
            await postData(addNotificationMethod, notification)
            setShowCardAddNotification(false)
            chooseGetNotifications()
        } else {
            alertNotNullInputs()
        }
    }

    const updateNotification = async (notification: any) => {
        if (
            notification.nombre != '' &&
            notification.descripcion != '' &&
            notification.imagen_path != ''
        ) {
            await postData(updateNotificationMethod, notification)
            setCardUpdateNotification({
                show: false,
                notification: {},
            })
            chooseGetNotifications()
        } else {
            alertNotNullInputs()
        }
    }

    const deleteNotification = async (tag: any) => {
        await swal({
            title: '¿Estás seguro de eliminar esta notificación?',
            icon: 'warning',
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteData(deleteNotificationMethod, tag)
                chooseGetNotifications()

                swal({
                    title: 'Se ha eliminado la etiqueta',
                    icon: 'success',
                })
            }
        })

        chooseGetNotifications()
        chooseGetNotifications()
        chooseGetNotifications()
    }

    const toggleOptionSort = () => {
        if (optionSort == 'Orden descendente') {
            const sortAscending = [...notifications].sort((a, b) =>
                moment(b.fecha_hora_programada).diff(a.fecha_hora_programada)
            )
            setNotifications(sortAscending)

            setOptionSort('Orden ascendente')
            setResultIcon('bi-sort-up')
        } else if (optionSort == 'Orden ascendente') {
            const sortDescending = [...notifications].sort((a, b) =>
                moment(a.fecha_hora_programada).diff(b.fecha_hora_programada)
            )
            setNotifications(sortDescending)

            setOptionSort('Orden descendente')
            setResultIcon('bi-sort-down')
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
                    <div className='d-flex justify-content-between'>
                        <div>
                            <Button
                                variant='outline-primary'
                                className='me-2'
                                onClick={() => getNotificationsProgrammed()}
                            >
                                Programadas
                            </Button>
                            <Button
                                variant='outline-primary'
                                className='ms-2'
                                onClick={() => getNotificationsHistory()}
                            >
                                Historial
                            </Button>
                        </div>
                        <Button variant='primary' onClick={() => toggleCardAddNotification(true)}>
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
                                {notifications.map((notification) => (
                                    <tr key={notification.id_notificacion.toString()}>
                                        <td style={{width: '55px'}}>
                                            <Form.Check className='ms-5' type='checkbox' id='1' />
                                        </td>
                                        <td className='text-muted' style={{width: '200px'}}>
                                            {moment(notification.fecha_hora_programada).format(
                                                'MMMM DD, YYYY hh:mm'
                                            )}
                                        </td>
                                        <td style={{width: '50px'}}>
                                            <img
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'cover',
                                                    borderRadius: '10px',
                                                }}
                                                src={notification.imagen_path}
                                            />
                                        </td>
                                        <td>
                                            <div>{notification.nombre}</div>
                                            <div className='text-muted'>
                                                {notification.descripcion}
                                            </div>
                                        </td>
                                        <td style={{width: '144px'}}>
                                            <Button
                                                variant='outline-primary'
                                                className='text-center'
                                                onClick={() => {
                                                    toggleCardAddNotification(false)
                                                    showCardUpdateNotification(notification)
                                                }}
                                            >
                                                <i className='fs-2 bi-pencil px-0 fw-bolder'></i>
                                            </Button>
                                            <Button
                                                variant='outline-danger'
                                                className='text-center'
                                                onClick={() =>
                                                    deleteNotification({
                                                        id_notificacion:
                                                            notification.id_notificacion,
                                                    })
                                                }
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
                    addNotification={addNotification}
                />

                <UpdateNotification
                    cardUpdateNotification={cardUpdateNotification.show}
                    onClose={() => setCardUpdateNotification({show: false, notification: {}})}
                    notification={notification}
                    setNotification={setNotification}
                    updateNotification={updateNotification}
                />
            </div>
        </>
    )
}

export default PushNotificationsPage
