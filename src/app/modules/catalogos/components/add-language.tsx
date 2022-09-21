import React, {useState, FC} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import { validateStringSinCaracteresEspeciales } from '../../validarCadena/validadorCadena'

const AddLanguaje: FC<any> = ({show, onClose, language, setLanguage, addLanguage}) => {
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
                            maxLength={20}
                            className={'mb-4'}
                            onChange={(e) => {
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setLanguage({
                                        id_lenguaje: language.id_lenguaje,
                                        nombre: e.target.value,
                                        descripcion: language.descripcion,
                                        estado: language.estado,
                                    })
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            type='text'
                            maxLength={20}
                            name='descripcion'
                            onChange={(e) => {
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setLanguage({
                                        id_lenguaje: language.id_lenguaje,
                                        nombre: language.nombre,
                                        descripcion: e.target.value,
                                        estado: language.estado,
                                    })
                                }
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setLanguage({
                                id_lenguaje: 0,
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
