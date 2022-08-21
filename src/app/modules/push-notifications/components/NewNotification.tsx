import React, {FC, useState} from 'react'
import moment from 'moment'
import {Button, Card, Col, Form} from 'react-bootstrap'

const NewNotification: FC<any> = ({
    showCardAddNotification,
    toggleCardAddNotification,
    addNotification,
}) => {
    const [scheduleNotification, setScheduleNotification] = useState(false)

    let dateNow = moment().toJSON()
    let today = new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(':'))

    const toggleScheduleInputs = () => {
        setScheduleNotification(!scheduleNotification)
        if (scheduleNotification == true) {
            setNotification({
                nombre: notification.nombre,
                descripcion: notification.descripcion,
                imagen_path: 'https://picsum.photos/200/200',
                fecha_hora_programada: dateNow,
                tipo: 0,
                estado: 1,
            })
        }
    }

    const [notification, setNotification] = useState({
        nombre: '',
        descripcion: '',
        imagen_path: 'https://picsum.photos/200/200',
        fecha_hora_programada: dateNow,
        tipo: 0,
        estado: 1,
    })

    return (
        <div style={showCardAddNotification == false ? {display: 'none'} : {display: 'block'}}>
            <Card className='py-9 px-9 mb-9 ms-xl-9' style={{maxWidth: '445px'}}>
                <h2>Nueva notificación</h2>
                <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                <p>Imagen de notificación</p>
                <div className='d-xl-flex mb-5'>
                    <div
                        style={{
                            width: '192.5px',
                            height: '177px',
                            backgroundImage: 'url(https://picsum.photos/200/200)',
                            borderRadius: '5px',
                        }}
                    ></div>

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

                        <div className='d-flex'>
                            <Button variant='outline-primary' className='text-center'>
                                <i className='fs-2 bi-arrow-left-right px-0 fw-bolder'></i>
                            </Button>
                            <Button variant='outline-primary' className='text-center'>
                                <i className='fs-2 bi-crop px-0 fw-bolder'></i>
                            </Button>
                            <Button variant='outline-danger' className='text-center'>
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
                            placeholder='Ej. Nueva Actualización'
                            onChange={(e) => {
                                setNotification({
                                    nombre: e.target.value,
                                    descripcion: notification.descripcion,
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: 0,
                                    estado: 1,
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
                            placeholder='Escribe una breve descripción'
                            style={{height: '100px'}}
                            onChange={(e) => {
                                setNotification({
                                    nombre: notification.nombre,
                                    descripcion: e.target.value,
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: 0,
                                    estado: 1,
                                })
                            }}
                        />
                    </Form.Group>

                    <div>
                        <Form.Check
                            type='switch'
                            id='custom-switch'
                            label='Notificación programada'
                            className='fs-6'
                            onClick={() => toggleScheduleInputs()}
                        />
                    </div>
                </div>

                <div style={scheduleNotification == false ? {display: 'none'} : {display: 'block'}}>
                    <Col>
                        <Form.Group className='mt-9'>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                value={notification.fecha_hora_programada}
                                min={today}
                                type='datetime-local'
                                name='scheduleNotification'
                                onChange={(e) => {
                                    setNotification({
                                        nombre: notification.nombre,
                                        descripcion: notification.descripcion,
                                        imagen_path: 'https://picsum.photos/200/200',
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
                            setNotification({
                                nombre: '',
                                descripcion: '',
                                imagen_path: 'https://picsum.photos/200/200',
                                fecha_hora_programada: dateNow,
                                tipo: 1,
                                estado: 1,
                            })
                            toggleCardAddNotification(false)
                        }}
                    >
                        <span className='menu-icon me-0'>
                            <i className={`bi-x-lg fs-2`}></i>
                        </span>
                        {' Cancelar'}
                    </Button>

                    {scheduleNotification == false ? (
                        <Button
                            variant='primary'
                            className='flex-grow-1 m-2'
                            onClick={() => {
                                setNotification({
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: dateNow,
                                    tipo: 0,
                                    estado: 1,
                                })
                                addNotification(notification)

                                setNotification({
                                    nombre: '',
                                    descripcion: '',
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: dateNow,
                                    tipo: 0,
                                    estado: 1,
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
                                    nombre: notification.nombre,
                                    descripcion: notification.descripcion,
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: notification.fecha_hora_programada,
                                    tipo: 1,
                                    estado: 1,
                                })
                                addNotification(notification)

                                setNotification({
                                    nombre: '',
                                    descripcion: '',
                                    imagen_path: 'https://picsum.photos/200/200',
                                    fecha_hora_programada: dateNow,
                                    tipo: 0,
                                    estado: 1,
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
        </div>
    )
}

export default NewNotification
