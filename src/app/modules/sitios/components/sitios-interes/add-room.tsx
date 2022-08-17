import React, { useState, FC } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const AddRoom: FC<any> = ({ show, onClose, addRoom, id_sitio }) => {
    const [createRoom, setCreateRoom] = useState({
        id_sitio: id_sitio,
        nombre: '',
        descripcion: '',
        tipo: true
    })

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Nueva Sala'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre de la Sala'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            onChange={(e) => {
                                setCreateRoom({
                                    id_sitio: createRoom.id_sitio,
                                    nombre: e.target.value,
                                    descripcion: createRoom.descripcion,
                                    tipo: createRoom.tipo
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='descripcion'
                            onChange={(e) => {
                                setCreateRoom({
                                    id_sitio: createRoom.id_sitio,
                                    nombre: createRoom.nombre,
                                    descripcion: e.target.value,
                                    tipo: createRoom.tipo
                                })
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            addRoom(createRoom)
                        }}
                    >
                        {'Aplicar '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddRoom
