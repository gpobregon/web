import React, {FC, useState} from 'react'
import imgUpload from '../upload-image_03.jpg'
import UpImage from '../../uploadFile/upload-image';
import moment from 'moment'
import {Button, Card, Col, Form} from 'react-bootstrap'
import {URLAWS} from '../../../services/api'
import {validateStringSinCaracteresEspeciales} from '../../validarCadena/validadorCadena'

const UpdateNotification: FC<any> = ({
    cardUpdateNotification,
    onClose,
    notification,
    setNotification,
    updateNotification,
}) => {
    const [scheduleNotification, setScheduleNotification] = useState(false)
    const [switchValue, setSwitchValue] = useState(notification?.tipo === 1 ? true : false)

    let dateNow = moment().toJSON()
    let today = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'))

    const toggleScheduleInputs = () => {
        setSwitchValue(!switchValue)
        setScheduleNotification(!scheduleNotification)
        if (scheduleNotification === true) {
            setNotification({
                id_notificacion: notification.id_notificacion,
                nombre: notification.nombre,
                descripcion: notification.descripcion,
                imagen_path: notification.imagen_path,
                fecha_hora_programada: dateNow,
                tipo: 0,
                estado: 1,
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
        })
    }

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
                                <span>Tamaño max: 5MB</span>
                            </div>
                        </div>

                        <div className='d-flex justify-content-between'>
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
                            <Button
                                variant='outline-danger'
                                className='text-center'
                                onClick={() => {
                                    setNotification({
                                        id_notificacion: notification.id_notificacion,
                                        nombre: notification.nombre,
                                        descripcion: notification.descripcion,
                                        imagen_path: '',
                                        fecha_hora_programada: notification.fecha_hora_programada,
                                        tipo: notification.tipo,
                                        estado: 1,
                                    })
                                }}
                            >
                                <i className='fs-2 bi-trash px-0 fw-bolder'></i>
                            </Button>
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
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setNotification({
                                        id_notificacion: notification.id_notificacion,
                                        nombre: e.target.value,
                                        descripcion: notification.descripcion,
                                        imagen_path: notification.imagen_path,
                                        fecha_hora_programada: notification.fecha_hora_programada,
                                        tipo: notification.tipo,
                                        estado: 1,
                                    })
                                }
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
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setNotification({
                                        id_notificacion: notification.id_notificacion,
                                        nombre: notification.nombre,
                                        descripcion: e.target.value,
                                        imagen_path: notification.imagen_path,
                                        fecha_hora_programada: notification.fecha_hora_programada,
                                        tipo: notification.tipo,
                                        estado: 1,
                                    })
                                }
                            }}
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
                                    tipo: 0,
                                    estado: 1,
                                })

                                updateNotification(notification)
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
                                })

                                updateNotification(notification)
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
