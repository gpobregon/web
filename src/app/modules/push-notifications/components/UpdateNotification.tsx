import React, {FC, useEffect, useState} from 'react'
import imgUpload from '../upload-image_03.jpg'
import UpImage from '../../uploadFile/upload-image'
import moment from 'moment'
import {Button, Card, Col, Form} from 'react-bootstrap'
import {URLAWS} from '../../../services/api'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
import {DeleteImage} from '../../deleteFile/delete-image'
import {Tooltip, tooltipClasses, TooltipProps} from '@mui/material'
import {styled} from '@mui/system'

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: 'transparent',
        borderColor: state.isFocused ? '#474761' : '#323248',
        borderRadius: 6.175,
        color: '#92929F',
        '&:hover': {
            borderColor: '#323248',
        },
        '&:focus': {
            borderColor: '#323248',
        },
        '&:active': {
            borderColor: '#323248',
        },
    }),
    input: (base: any, state: any) => ({
        ...base,
        color: '#92929f',
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isFocused ? '#009EF7' : '#323248',
        color: state.isFocused ? '#fff' : '#92929F',
        padding: 10,
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#fff',
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: 6.175,
        background: '#323248',
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0,
        borderRadius: 6.175,
    }),
}

const animatedComponents = makeAnimated()

const UpdateNotification: FC<any> = ({
    cardUpdateNotification,
    onClose,
    notification,
    setNotification,
    updateNotification,
    optionsSites,
    setOptionsSites,
    valueSelect,
    setValueSelect,
    labelSelect,
    setLabelSelect,
    scheduleNotification,
    setScheduleNotification,
}) => {
    const [switchValue, setSwitchValue] = useState(notification?.tipo === 1 ? true : false)

    let dateNow = moment().toJSON()
    let today = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'))

    const toggleScheduleInputs = () => {
        setSwitchValue(!switchValue)
        setScheduleNotification(!scheduleNotification)
        if (!scheduleNotification) {
            setNotification({
                id_notificacion: notification.id_notificacion,
                nombre: notification.nombre,
                descripcion: notification.descripcion,
                imagen_path: notification.imagen_path,
                fecha_hora_programada: notification.fecha_hora_programada,
                tipo: 1,
                estado: 1,
                id_sitio: notification.id_sitio,
            })
        } else {
            setNotification({
                id_notificacion: notification.id_notificacion,
                nombre: notification.nombre,
                descripcion: notification.descripcion,
                imagen_path: notification.imagen_path,
                fecha_hora_programada: dateNow,
                tipo: 0,
                estado: 1,
                id_sitio: notification.id_sitio,
            })
        }
    }

    const uploadImage = async (image: string) => {
        setNotification({
            id_notificacion: notification.id_notificacion,
            nombre: notification.nombre,
            descripcion: notification.descripcion,
            imagen_path: `${URLAWS}notificaciones/${image}`,
            fecha_hora_programada: notification.fecha_hora_programada,
            tipo: notification.tipo,
            estado: 1,
            id_sitio: notification.id_sitio,
        })
        if (image !== '') {
            setModalUploadIMG(false)
        }
    }

    const [modalUploadIMG, setModalUploadIMG] = useState(false)

    const resetStateNotification = () => {
        setNotification({
            id_notificacion: 0,
            nombre: '',
            descripcion: '',
            imagen_path: '',
            fecha_hora_programada: dateNow,
            tipo: 0,
            estado: 1,
            id_sitio: notification.id_sitio,
        })
    }

    interface Options {
        value: number | null
        label: string
    }

    const handleChange = (event: any) => {
        setNotification({
            id_notificacion: notification.id_notificacion,
            nombre: notification.nombre,
            descripcion: notification.descripcion,
            imagen_path: notification.imagen_path,
            fecha_hora_programada: notification.fecha_hora_programada,
            tipo: notification.tipo,
            estado: 1,
            id_sitio: event.value,
        })

        setValueSelect(optionsSites.find((item: Options) => item.value == event.value)?.value)
        setLabelSelect(optionsSites.find((item: Options) => item.value == event.value)?.label)
    }

    const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}} />
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 500,
        },
    }))

    return (
        <div
            style={cardUpdateNotification === false ? {display: 'none'} : {display: 'block'}}
            onLoad={() => setSwitchValue(notification.tipo === 1 ? true : false)}
        >
            <Card className='py-9 px-9 mb-9 ms-xl-9' style={{maxWidth: '445px'}}>
                <h2>Editar notificación</h2>
                <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                <p>Imagen de notificación</p>
                <div className='d-xl-flex mb-5'>
                    <img
                        src={notification.imagen_path === '' ? imgUpload : notification.imagen_path}
                        alt='Imagen de notificación'
                        onClick={
                            notification.imagen_path === ''
                                ? () => {
                                      setModalUploadIMG(true)
                                  }
                                : () => {}
                        }
                        style={{
                            width: '192.5px',
                            height: '177px',
                            borderRadius: '5px',
                            objectFit: 'cover',
                        }}
                    ></img>

                    <div className='px-4 py-sm-4 py-xl-0'>
                        <div className='mb-3'>
                            <p className='text-muted'>Imagen</p>
                            <p className='text-break' style={{maxWidth: '150px'}}>
                                imagen-ejemplo.jpg
                            </p>
                            <div className='text-muted'>
                                <span>Formatos: png, jpg, jpeg</span>
                                <br />
                                <span>Resolución: 1920x1080</span>
                                <br />
                                <span>Tamaño max: 1MB</span>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <CustomTooltip title='Cargar imagen'>
                                <Button
                                    variant='outline-primary'
                                    className='text-center'
                                    onClick={
                                        notification.imagen_path === ''
                                            ? (e) => {
                                                  setModalUploadIMG(true)
                                              }
                                            : (e) => {}
                                    }
                                >
                                    <i className='fs-2 bi-upload px-0 fw-bolder'></i>
                                </Button>
                            </CustomTooltip>
                            <CustomTooltip title='Eliminar'>
                                <Button
                                    variant='outline-danger'
                                    className='text-center'
                                    onClick={() => {
                                        DeleteImage('notificaciones', notification.imagen_path)
                                        setNotification({
                                            id_notificacion: notification.id_notificacion,
                                            nombre: notification.nombre,
                                            descripcion: notification.descripcion,
                                            imagen_path: '',
                                            fecha_hora_programada:
                                                notification.fecha_hora_programada,
                                            tipo: notification.tipo,
                                            estado: 1,
                                            id_sitio: notification.id_sitio,
                                        })
                                    }}
                                >
                                    <i className='fs-2 bi-trash px-0 fw-bolder'></i>
                                </Button>
                            </CustomTooltip>
                        </div>
                    </div>
                </div>

                <div>
                    <Form.Group className='mb-4'>
                        <Form.Label>Título de notificación</Form.Label>
                        <Form.Control
                            value={notification.nombre}
                            type='text'
                            name='titleNotification'
                            onChange={(e) => {
                                setNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: e.target.value,
                                    descripcion: notification.descripcion,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: notification.tipo,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='mb-9'>
                        <Form.Label>Contenido de notificación</Form.Label>
                        <Form.Control
                            value={notification.descripcion}
                            as='textarea'
                            type='text'
                            name='descriptionNotification'
                            style={{height: '100px'}}
                            onChange={(e) => {
                                setNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: notification.nombre,
                                    descripcion: e.target.value,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: notification.tipo,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group className={'mb-9'}>
                        <Form.Label>Redirección al presionar la notificación</Form.Label>
                        <Select
                            value={{
                                value: valueSelect,
                                label: labelSelect,
                            }}
                            options={optionsSites}
                            styles={customStyles}
                            components={animatedComponents}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Check
                        checked={switchValue}
                        type='switch'
                        label='Notificación programada'
                        className='fs-6'
                        onClick={() => toggleScheduleInputs()}
                    />
                </div>

                <div style={!switchValue ? {display: 'none'} : {display: 'block'}}>
                    <Col>
                        <Form.Group className='mt-9'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                value={moment(notification.fecha_hora_programada).format(
                                    'yyyy-MM-DDTHH:mm'
                                )}
                                min={today}
                                type='datetime-local'
                                name='scheduleNotification'
                                onChange={(e) => {
                                    setNotification({
                                        id_notificacion: notification.id_notificacion,
                                        nombre: notification.nombre,
                                        descripcion: notification.descripcion,
                                        imagen_path: notification.imagen_path,
                                        fecha_hora_programada: e.target.value,
                                        tipo: 1,
                                        estado: 1,
                                        id_sitio: notification.id_sitio,
                                    })
                                }}
                            />
                        </Form.Group>
                    </Col>
                </div>

                <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />

                <div className='d-flex justify-content-between'>
                    <Button
                        variant='outline-danger'
                        className='flex-grow-1 m-2'
                        onClick={() => {
                            resetStateNotification()
                            onClose()
                        }}
                    >
                        <span className='menu-icon me-0'>
                            <i className={`bi-x-lg fs-2`}></i>
                        </span>
                        {' Cancelar'}
                    </Button>

                    {!scheduleNotification && !notification.tipo ? (
                        <Button
                            variant='primary'
                            className='flex-grow-1 m-2'
                            onClick={() => {
                                setNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: dateNow,
                                    tipo: 1,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })

                                updateNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: dateNow,
                                    tipo: 1,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })
                            }}
                        >
                            <span className='menu-icon me-0'>
                                <i className={`bi-send fs-2`}></i>
                            </span>
                            {' Enviar ahora'}
                        </Button>
                    ) : (
                        <Button
                            variant='primary'
                            className='flex-grow-1 m-2'
                            onClick={() => {
                                setNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: 1,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })

                                updateNotification({
                                    id_notificacion: notification.id_notificacion,
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: notification.imagen_path,
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: 1,
                                    estado: 1,
                                    id_sitio: notification.id_sitio,
                                })
                            }}
                        >
                            <span className='menu-icon me-0'>
                                <i className={`bi-clock fs-2`}></i>
                            </span>
                            {' Programar'}
                        </Button>
                    )}
                </div>
            </Card>

            <UpImage
                show={modalUploadIMG}
                onClose={() => setModalUploadIMG(false)}
                cargarIMG={uploadImage}
                ubicacionBucket={'notificaciones'}
                tipoArchivoPermitido={'image/*'}
            />
        </div>
    )
}

export default UpdateNotification
