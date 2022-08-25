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

    const [optionGetNotifications, setOptionGetNotifications] = useState('programadas')

    const chooseGetNotifications = async () => {
        if (optionGetNotifications == 'historial') {
            getNotificationsHistory()
        } else {
            getNotificationsProgrammed()
        }
    }

    const getNotificationsProgrammed = async () => {
        const notificationsData: any = await postData(`${notificationMethod}/programmed`, {
            id_usuario: 'lenguaje 1',
        })
        setNotifications(notificationsData.data as Notification[])
        setOptionGetNotifications('programadas')
    }

    const getNotificationsHistory = async () => {
        const notificationsData: any = await postData(`${notificationMethod}/history`, {
            page: pageNumber,
            quantity: '2',
        })
        setNotifications(notificationsData.data as Notification[])
        setOptionGetNotifications('historial')

        const countNextResults: any = await postData(`${notificationMethod}/history`, {
            page: pageNumber + 1,
            quantity: '2',
        })

        if (countNextResults.data.length == 0) {
            setToggleButtonsPagination({
                previous: false,
                next: true,
            })
        } else if (countNextResults.data.length > 0) {
            setToggleButtonsPagination({
                previous: toggleButtonsPagination.previous,
                next: false,
            })
        }
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
            notification.fecha_hora_programada = moment(
                notification.fecha_hora_programada
            ).toISOString()

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
            notification.fecha_hora_programada = moment(
                notification.fecha_hora_programada
            ).toISOString()

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
                    title: 'Se ha eliminado la notificación',
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

    let arrayDeleteNotifications: Array<any> = []

    const handleChangeCheckbox = (e: any) => {
        let isChecked = e.target.checked

        if (isChecked == true) {
            arrayDeleteNotifications.push(e.target.id)
        } else {
            arrayDeleteNotifications = arrayDeleteNotifications.filter(
                (data) => data != e.target.id
            )
        }
    }

    const deleteSelectedNotification = async () => {
        if (arrayDeleteNotifications.length == 0) {
            swal({
                title: 'Selecciona notificaciones para eliminar',
                icon: 'warning',
            })
        } else {
            await swal({
                title: '¿Estás seguro de eliminar estas notificaciones?',
                icon: 'warning',
                buttons: ['Cancelar', 'Eliminar'],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    for (let i = 0; i < arrayDeleteNotifications.length; i++) {
                        deleteData(deleteNotificationMethod, {
                            id_notificacion: parseInt(arrayDeleteNotifications[i]),
                        })
                    }
                    swal({
                        title: 'Se han eliminado las notificaciones',
                        icon: 'success',
                    })
                }
            })

            chooseGetNotifications()
            chooseGetNotifications()
            chooseGetNotifications()
            chooseGetNotifications()
            chooseGetNotifications()
            chooseGetNotifications()
            chooseGetNotifications()

            arrayDeleteNotifications.length = 0
        }
    }

    let [pageNumber, setPageNumber] = useState(1)
    const [toggleButtonsPagination, setToggleButtonsPagination] = useState({
        previous: true,
        next: false,
    })

    const handlePrevPage = () => {
        if (pageNumber == 1) {
            setToggleButtonsPagination({
                previous: true,
                next: toggleButtonsPagination.next,
            })
        } else {
            setPageNumber(pageNumber - 1)
        }
    }

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
        setToggleButtonsPagination({
            previous: false,
            next: false,
        })
    }

    useEffect(() => {
        chooseGetNotifications()
    }, [pageNumber])

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

                    <div
                        style={
                            optionGetNotifications != 'historial'
                                ? {display: 'none'}
                                : {display: 'flex', justifyContent: 'end'}
                        }
                    >
                        <div className='d-flex justify-content-end mt-9'>
                            <div className='d-flex'>
                                <Button
                                    variant='outline-secondary'
                                    className='text-center'
                                    title='Página anterior'
                                    disabled={toggleButtonsPagination.previous}
                                    onClick={() => handlePrevPage()}
                                >
                                    <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                                </Button>

                                <div
                                    className='d-flex align-items-center justify-content-center'
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        backgroundColor: '#2B2B40',
                                        borderRadius: '5px',
                                    }}
                                >
                                    {`${pageNumber}`}
                                </div>

                                <Button
                                    variant='outline-secondary'
                                    className='text-center'
                                    title='Página siguiente'
                                    disabled={toggleButtonsPagination.next}
                                    onClick={() => handleNextPage()}
                                >
                                    <i className='fs-2 bi-chevron-right px-0 fw-bolder'></i>
                                </Button>
                            </div>
                        </div>
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
                        <div>
                            <Button
                                variant='outline-danger'
                                onClick={() => deleteSelectedNotification()}
                            >
                                <i className='bi bi-trash fs-1'></i>
                            </Button>
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
                                            <Form.Check
                                                className='ms-5'
                                                type='checkbox'
                                                id={notification.id_notificacion.toString()}
                                                onChange={(e) => handleChangeCheckbox(e)}
                                            />
                                        </td>
                                        <td className='text-muted' style={{width: '200px'}}>
                                            {moment(notification.fecha_hora_programada).format(
                                                'LLLL'
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
