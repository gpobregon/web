import React, {useContext, useEffect, useState} from 'react'
import moment from 'moment'
import {Button, ButtonGroup, Container, Form, Table, ToggleButton} from 'react-bootstrap'
import NewNotification from './components/NewNotification'
import UpdateNotification from './components/UpdateNotification'
import {Notification} from '../../models/notification'
import {
    addNotificationMethod,
    deleteData,
    deleteNotificationMethod,
    getData,
    getRolesMethod,
    getSitesActivesAndPublicatedMethod,
    notificationMethod,
    postData,
    updateNotificationMethod,
    getTotalNotifications,
} from '../../services/api'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'
import {roleManager} from '../../models/roleManager'
import {Amplify, Auth} from 'aws-amplify'
import {LoadingContext} from '../../utility/component/loading/context'
import {useAuth} from '../auth'
import {DeleteImage} from '../deleteFile/delete-image'

const PushNotificationsPage = () => {
    const [totalPages, setTotalPages] = useState(1)
    const [showCardAddNotification, setShowCardAddNotification] = useState(false)
    const [cardUpdateNotification, setCardUpdateNotification] = useState({
        show: false,
        notification: {},
    })
    const [scheduleNotification, setScheduleNotification] = useState(false)

    const [notifications, setNotifications] = useState<Notification[]>([])
    const [notification, setNotification] = useState({
        id_notificacion: 0,
        nombre: '',
        descripcion: '',
        imagen_path: '',
        fecha_hora_programada: '',
        tipo: 0,
        estado: 1,
        id_sitio: null,
    })

    interface Options {
        value: number | null
        label: string
    }

    const [optionsSites, setOptionsSites] = useState<Options[]>([])
    const [valueSelect, setValueSelect] = useState<number | null | undefined>(null)
    const [labelSelect, setLabelSelect] = useState<string | undefined>('Sin redirección')

    const getSites = async () => {
        const sitesResult: any = await getData(getSitesActivesAndPublicatedMethod)

        let newOptions = sitesResult.allSites.map((site: any) => ({
            value: site.id_sitio,
            label: site.nombre,
        }))

        newOptions.unshift({value: null, label: 'Sin redirección'})

        setOptionsSites(newOptions)

        setValueSelect(optionsSites.find((item) => item.value == notification.id_sitio)?.value)
        setLabelSelect(optionsSites.find((item) => item.value == notification.id_sitio)?.label)
    }

    useEffect(() => {
        getSites()
    }, [cardUpdateNotification])

    let dateNow = moment().toJSON()

    const [newNotification, setNewNotification] = useState({
        nombre: '',
        descripcion: '',
        imagen_path: '',
        fecha_hora_programada: dateNow,
        tipo: 0,
        estado: 1,
        id_sitio: null,
    })

    const [optionGetNotifications, setOptionGetNotifications] = useState('programadas')

    const chooseGetNotifications = async () => {
        if (optionGetNotifications === 'historial') {
            getNotificationsHistory()
        } else {
            getNotificationsProgrammed()
        }
    }

    const getNotificationsProgrammed = async () => {
        const notificationsData: any = await getData(`${notificationMethod}/programmed`)
        setNotifications(notificationsData.data as Notification[])
        setOptionGetNotifications('programadas')
    }

    const getNotificationsHistory = async () => {
        const notificationsData: any = await postData(`${notificationMethod}/history`, {
            page: pageNumber,
            quantity: '12',
        })
        setNotifications(notificationsData.data as Notification[])
        setOptionGetNotifications('historial')

        const coutsite: any = await getData(`${getTotalNotifications}`)

        const countNextResults: any = await postData(`${notificationMethod}/history`, {
            page: pageNumber + 1,
            quantity: '12',
        })

        if (countNextResults.data.length === 0) {
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

        let pagesLength = Math.ceil(coutsite.count / 12)
        setTotalPages(pagesLength)
    }

    const [optionSort, setOptionSort] = useState('Orden descendente')
    const [resultIcon, setResultIcon] = useState('bi-sort-down')

    const toggleCardAddNotification = async (value: any) => {
        await validateRole()

        if (permissionCreateNotification) {
            setShowCardAddNotification(value)
            if (value === true) {
                setCardUpdateNotification({show: false, notification: {}})
            }
        } else {
            swal({
                title: 'No tienes permiso para crear una notificación',
                icon: 'warning',
            })
        }
    }

    const showCardUpdateNotification = async (notification: any) => {
        setValueSelect(null)
        setLabelSelect('Sin redirección')
        setScheduleNotification(false)
        await validateRole()

        if (!permissionEditNotificationProgrammed && optionGetNotifications === 'programadas') {
            swal({
                title: 'No tienes permiso para editar una notificación programada',
                icon: 'warning',
            })
            return
        }

        if (!permissionEditNotificationHistory && optionGetNotifications === 'historial') {
            swal({
                title: 'No tienes permiso para editar una notificación en el historial',
                icon: 'warning',
            })
            return
        }

        setValueSelect(optionsSites.find((item) => item.value == notification.id_sitio)?.value)
        setLabelSelect(optionsSites.find((item) => item.value == notification.id_sitio)?.label)
        setScheduleNotification(notification?.tipo)

        setCardUpdateNotification({show: true, notification})
        setNotification({
            id_notificacion: notification?.id_notificacion,
            nombre: notification?.nombre,
            descripcion: notification?.descripcion,
            imagen_path: notification?.imagen_path,
            fecha_hora_programada: notification?.fecha_hora_programada,
            tipo: notification?.tipo,
            estado: 1,
            id_sitio: notification?.id_sitio,
        })
    }

    const alertNotNullInputsNewNotification = async (notification: any) => {
        let keys = Object.keys(notification),
            msg = ''

        for (let key of keys) {
            if (
                notification[key] !== null &&
                notification[key] !== undefined &&
                notification[key] !== ''
            )
                continue
            msg += `El campo ${key} es obligatorio\n`
        }

        msg.trim()

        swal({
            text: msg,
            icon: 'warning',
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
            notification.nombre !== '' &&
            notification.descripcion !== '' &&
            notification.imagen_path !== ''
        ) {
            notification.fecha_hora_programada = moment(
                notification.fecha_hora_programada
            ).toISOString()

            await postData(addNotificationMethod, notification)
            setShowCardAddNotification(false)
            chooseGetNotifications()
            setNewNotification({
                nombre: '',
                descripcion: '',
                imagen_path: '',
                fecha_hora_programada: dateNow,
                tipo: 0,
                estado: 1,
                id_sitio: null,
            })

            swal({
                text: 'Notificación creada',
                icon: 'success',
            })

            setTimeout(chooseGetNotifications, 500)
            setTimeout(chooseGetNotifications, 1000)
            setTimeout(chooseGetNotifications, 2000)
            setTimeout(chooseGetNotifications, 3000)
        } else {
            let notificationObj = {
                nombre: notification.nombre,
                descripcion: notification.descripcion,
                imagen: notification.imagen_path,
            }

            alertNotNullInputsNewNotification(notificationObj)
        }
    }

    const updateNotification = async (notification: any) => {
        if (
            notification.nombre !== '' &&
            notification.descripcion !== '' &&
            notification.imagen_path !== ''
        ) {
            notification.fecha_hora_programada = moment(
                notification.fecha_hora_programada
            ).toISOString()

            await postData(updateNotificationMethod, notification)
            setValueSelect(null)
            setLabelSelect('Sin redirección')
            setCardUpdateNotification({
                show: false,
                notification: {},
            })
            setNotification({
                id_notificacion: 0,
                nombre: '',
                descripcion: '',
                imagen_path: '',
                fecha_hora_programada: '',
                tipo: 0,
                estado: 1,
                id_sitio: null,
            })

            chooseGetNotifications()
            setTimeout(chooseGetNotifications, 500)
            setTimeout(chooseGetNotifications, 1000)
            setTimeout(chooseGetNotifications, 2000)
            setTimeout(chooseGetNotifications, 3000)
        } else {
            alertNotNullInputs()
        }
    }

    const deleteNotification = async (tag: any) => {
        await validateRole()

        if (!permissionDeleteNotificationProgrammed && optionGetNotifications === 'programadas') {
            swal({
                title: 'No tienes permiso para eliminar una notificación programada',
                icon: 'warning',
            })
            return
        }

        if (!permissionDeleteNotificationHistory && optionGetNotifications === 'historial') {
            swal({
                title: 'No tienes permiso para eliminar una notificación en el historial',
                icon: 'warning',
            })
            return
        }

        await swal({
            title: '¿Estás seguro de eliminar esta notificación?',
            icon: 'warning',
            dangerMode: true,
            buttons: ['No', 'Sí'],
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

        setTimeout(chooseGetNotifications, 500)
        setTimeout(chooseGetNotifications, 1000)
        setTimeout(chooseGetNotifications, 2000)
        setTimeout(chooseGetNotifications, 3000)
    }

    const toggleOptionSort = () => {
        if (optionSort === 'Orden descendente') {
            const sortAscending = [...notifications].sort((a, b) =>
                moment(b.fecha_hora_programada).diff(a.fecha_hora_programada)
            )
            setNotifications(sortAscending)

            setOptionSort('Orden ascendente')
            setResultIcon('bi-sort-up')
        } else if (optionSort === 'Orden ascendente') {
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

        if (isChecked === true) {
            arrayDeleteNotifications.push(e.target.id)
        } else {
            arrayDeleteNotifications = arrayDeleteNotifications.filter(
                (data) => data !== e.target.id
            )
        }
    }

    const deleteSelectedNotification = async () => {
        await validateRole()

        if (!permissionDeleteNotificationProgrammed && optionGetNotifications === 'programadas') {
            swal({
                title: 'No tienes permiso para eliminar notificaciones programadas',
                icon: 'warning',
            })
            return
        }

        if (!permissionDeleteNotificationHistory && optionGetNotifications === 'historial') {
            swal({
                title: 'No tienes permiso para eliminar notificaciones en el historial',
                icon: 'warning',
            })
            return
        }

        if (arrayDeleteNotifications.length === 0) {
            swal({
                title: 'Selecciona notificaciones para eliminar',
                icon: 'warning',
            })
        } else {
            await swal({
                title: '¿Estás seguro de eliminar estas notificaciones?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
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

            setTimeout(chooseGetNotifications, 500)
            setTimeout(chooseGetNotifications, 1000)
            setTimeout(chooseGetNotifications, 2000)
            setTimeout(chooseGetNotifications, 3000)

            arrayDeleteNotifications.length = 0
        }
    }

    let [pageNumber, setPageNumber] = useState(1)
    const [toggleButtonsPagination, setToggleButtonsPagination] = useState({
        previous: true,
        next: false,
    })

    const handlePrevPage = () => {
        if (pageNumber === 1) {
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

    let navigate = useNavigate()
    const {setShowLoad} = useContext(LoadingContext)
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionCreateNotification, setPermissionCreateNotification] = useState(true)

    const [permissionEditNotificationProgrammed, setPermissionEditNotificationProgrammed] =
        useState(true)
    const [permissionEditNotificationHistory, setPermissionEditNotificationHistory] = useState(true)

    const [permissionDeleteNotificationProgrammed, setPermissionDeleteNotificationProgrammed] =
        useState(true)
    const [permissionDeleteNotificationHistory, setPermissionDeleteNotificationHistory] =
        useState(true)

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    //para cerrar sesión despues de cambiar contraseña, no olvida el dispositivo :c
    const {currentUser, logout} = useAuth()
    const forgotDevice = async () => {
        try {
            logout()
            await Amplify.Auth.forgetDevice()
        } catch (error) {
        }
    }

    //fin

    const validateRole = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })

                if (filter[0]?.gestor_notificaciones === false) {
                    navigate('/error/401', {replace: true})
                } else {
                    setPermissionCreateNotification(filter[0]?.notificacion_crear)

                    setPermissionEditNotificationProgrammed(
                        filter[0]?.notificacion_programada_editar
                    )
                    setPermissionEditNotificationHistory(filter[0]?.notificacion_historial_editar)

                    setPermissionDeleteNotificationProgrammed(
                        filter[0]?.notificacion_programada_eliminar
                    )
                    setPermissionDeleteNotificationHistory(
                        filter[0]?.notificacion_historial_eliminar
                    )
                }
            } catch (error) {
                swal(
                    'Se ha cambiado la contraseña de tu usuario',
                    'Cierra sesión y vuelve a ingresar',
                    'warning'
                )
                await forgotDevice()
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    }

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
    }, [existRoles])

    useEffect(() => {
        chooseGetNotifications()
    }, [pageNumber])

    const [radioValue, setRadioValue] = useState('1')

    return (
        <Container fluid>
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
                            <ButtonGroup>
                                <ToggleButton
                                    key={1}
                                    id={`radio-1`}
                                    type='radio'
                                    variant='outline-primary'
                                    name='radio'
                                    value={'1'}
                                    checked={radioValue === '1'}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    className='me-2 rounded'
                                    onClick={() => getNotificationsProgrammed()}
                                >
                                    Programadas
                                </ToggleButton>

                                <ToggleButton
                                    key={2}
                                    id={`radio-2`}
                                    type='radio'
                                    variant='outline-primary'
                                    name='radio'
                                    value={'2'}
                                    checked={radioValue === '2'}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    className='ms-2 rounded'
                                    onClick={() => getNotificationsHistory()}
                                >
                                    Historial
                                </ToggleButton>
                            </ButtonGroup>
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
                            optionGetNotifications !== 'historial'
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
                                    className='d-flex align-items-center justify-content-center px-4'
                                    style={{
                                        height: '50px',
                                        backgroundColor: '#2B2B40',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <h5 style={{fontSize: '13px'}}>
                                        Página {pageNumber} de {totalPages}
                                    </h5>
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
                                                onChange={(e) => {
                                                    handleChangeCheckbox(e)
                                                }}
                                            />
                                        </td>
                                        <td className='text-muted' style={{width: '200px'}}>
                                            {moment(notification.fecha_hora_programada).format(
                                                'DD/MM/YYYY HH:mm'
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
                                                alt='Imagen notificación'
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
                                                onClick={() => {
                                                    DeleteImage(
                                                        'notificaciones',
                                                        notification.imagen_path
                                                    )
                                                    deleteNotification({
                                                        id_notificacion:
                                                            notification.id_notificacion,
                                                    })
                                                }}
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
                    notification={newNotification}
                    setNotification={setNewNotification}
                    addNotification={addNotification}
                />

                <UpdateNotification
                    cardUpdateNotification={cardUpdateNotification.show}
                    onClose={() => setCardUpdateNotification({show: false, notification: {}})}
                    notification={notification}
                    setNotification={setNotification}
                    updateNotification={updateNotification}
                    optionsSites={optionsSites}
                    setOptionsSites={setOptionsSites}
                    valueSelect={valueSelect}
                    setValueSelect={setValueSelect}
                    labelSelect={labelSelect}
                    setLabelSelect={setLabelSelect}
                    scheduleNotification={scheduleNotification}
                    setScheduleNotification={setScheduleNotification}
                />
            </div>
        </Container>
    )
}

export default PushNotificationsPage
