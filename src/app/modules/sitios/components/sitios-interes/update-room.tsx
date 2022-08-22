import React, { useState, FC, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

const UpdateRoom: FC<any> = ({ show, onClose, updateRoom, room }) => {
    const [updateeRoom, setUpdateRoom] = useState({
        id_sala: room.id_sala,
        id_sitio: room.id_sitio,
        nombre: room.nombre,
        descripcion: room.descripcion,
        tipo: room.tipo,
        estado: room.estado,

    })
    
useEffect(() => {
    setUpdateRoom({
        id_sala: room.id_sala,
        id_sitio: room.id_sitio,
        nombre: room.nombre,
        descripcion: room.descripcion,
        tipo: room.tipo,
        estado: room.estado,
    })
} , [room])
    
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Editar Sala'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre de la Sala'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            value={updateeRoom.nombre}
                            onChange={(e) => {
                                setUpdateRoom({
                                    id_sala: updateeRoom.id_sala,
                                    id_sitio: updateeRoom.id_sitio,
                                    nombre: e.target.value,
                                    descripcion: updateeRoom.descripcion,
                                    tipo: updateeRoom.tipo,
                                    estado: updateeRoom.estado,
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='descripcion'
                            value={updateeRoom.descripcion}
                            onChange={(e) => {
                                setUpdateRoom({
                                    id_sala: updateeRoom.id_sala,
                                    id_sitio: updateeRoom.id_sitio,
                                    nombre: updateeRoom.nombre,
                                    descripcion: e.target.value,
                                    tipo: updateeRoom.tipo,
                                    estado: updateeRoom.estado,
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
                            updateRoom(updateeRoom)
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

export default UpdateRoom
