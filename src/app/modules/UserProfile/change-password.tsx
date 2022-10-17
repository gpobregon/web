import React, {useState, FC, useEffect} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const changePassword: FC<any> = ({
    show,
    setShow,
    onClose,
    dataPassword,
    setDataPassword,
    changePasswordMethod,
}) => { 
    
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Cambiar Contraseña'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className=''>
                        <Form.Label>Contraseña antigua</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Introduce tu contraseña antigua'
                            autoComplete='off'
                            onChange={(e) => {
                                setDataPassword({
                                    oldPassword: e.target.value,
                                    newPassword: dataPassword.newPassword,
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='pt-5'>
                        <Form.Label>Contraseña Nueva</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Introduce tu contraseña nueva'
                            autoComplete='off'
                            onChange={(e) => {
                                setDataPassword({
                                    oldPassword: dataPassword.oldPassword,
                                    newPassword: e.target.value,
                                })
                            }}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setDataPassword({
                                oldPassword: '',
                                newPassword: '',
                            })
                            onClose()
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        onClick={() => changePasswordMethod()} 
                    >
                        {'Continuar '}
                        <i className='bi bi-chevron-right'></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default changePassword
