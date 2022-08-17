import React, {FC, useState} from 'react'
import {Button, Card, Col, Form} from 'react-bootstrap'

const NewNotification: FC<any> = ({showCardAddNotification, toggleCardAddNotification}) => {
    const [scheduleNotification, setScheduleNotification] = useState(false)

    const toggleScheduleInputs = () => {
        setScheduleNotification(!scheduleNotification)
    }

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
                            backgroundColor: '#a9a9a9',
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
                            type='text'
                            name='titleNotification'
                            placeholder='Ej. Nueva Actualización'
                        />
                    </Form.Group>

                    <Form.Group className='mb-9'>
                        <Form.Label>Título de notificación</Form.Label>
                        <Form.Control
                            as='textarea'
                            type='text'
                            name='titleNotification'
                            placeholder='Escribe una breve descripción'
                            style={{height: '100px'}}
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
                            <Form.Control type='datetime-local' name='scheduleNotification' />
                        </Form.Group>
                    </Col>
                </div>

                <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />

                <div className='d-flex justify-content-between'>
                    <Button
                        variant='outline-danger'
                        className='flex-grow-1 m-2'
                        onClick={() => toggleCardAddNotification(false)}
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
                            onClick={() => toggleCardAddNotification(false)}
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
                            onClick={() => toggleCardAddNotification(false)}
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
