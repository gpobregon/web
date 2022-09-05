import React, {useState, FC} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

const AddLanguaje: FC<any> = ({show, onClose, addLanguage}) => {
    const [language, setLanguage] = useState({
        id_lenguaje: 1,
        nombre: '',
        descripcion: '',
        estado: 1,
    })

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Configuración de idioma'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre del idioma'}</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            onChange={(e) => {
                                setLanguage({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: e.target.value,
                                    descripcion: language.descripcion,
                                    estado: language.estado,
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
                                setLanguage({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: language.nombre,
                                    descripcion: e.target.value,
                                    estado: language.estado,
                                })
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setLanguage({
                                id_lenguaje: 1,
                                nombre: '',
                                descripcion: '',
                                estado: 1,
                            })
                            onClose()
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            addLanguage(language)
                            setLanguage({
                                id_lenguaje: 1,
                                nombre: '',
                                descripcion: '',
                                estado: 1,
                            })
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

export default AddLanguaje
