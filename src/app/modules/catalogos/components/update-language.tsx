import React, {useState, FC} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

const UpdateLanguage: FC<any> = ({
    show,
    onClose,
    language,
    idioma,
    setIdioma,
    updateIdioma,
    deleteIdioma,
}) => {
    let modifiedIdiomaDelete = {
        id_lenguaje: language.id_lenguaje,
        estado: 0,
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Actualización de idioma'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre del idioma'}</Form.Label>
                        <Form.Control
                            defaultValue={language.nombre}
                            type='text'
                            name='nombre'
                            className={'mb-4'}
                            onChange={(e) => {
                                setIdioma({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: e.target.value,
                                    descripcion: idioma.descripcion,
                                    estado: idioma.estado,
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            defaultValue={language.descripcion}
                            type='text'
                            name='descripcion'
                            onChange={(e) => {
                                setIdioma({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: idioma.nombre,
                                    descripcion: e.target.value,
                                    estado: idioma.estado,
                                })
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setIdioma({
                                id_lenguaje: 1,
                                nombre: '',
                                descripcion: '',
                                estado: 1,
                            })
                            deleteIdioma(modifiedIdiomaDelete)
                        }}
                    >
                        <i className={`bi-trash text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setIdioma({
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
                            updateIdioma(idioma)
                            
                            setIdioma({
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

export default UpdateLanguage
