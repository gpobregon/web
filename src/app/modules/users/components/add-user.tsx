import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'

import {Amplify, Auth} from 'aws-amplify'
import {awsconfig} from '../../../../aws-exports'
import {useAuth} from '../../auth/core/Auth'
Amplify.configure(awsconfig)

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
        background: state.isFocused ? '#7239ea' : '#323248',
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

const options = [
    {value: 'Admnistrador', label: 'Administrador'},
    {value: 'Editor', label: 'Editor'},
    {value: 'Gestor', label: 'Gestor'},
]

const AddUser: FC<any> = ({show, onClose}) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        name: '',
        lastname: '',
        role: '',
    })

    const signUp = async () => {
        try {
            const userData = await Auth.signUp({
                username: user.username,
                password: user.password,
                attributes: {
                    name: user.name,
                    'custom:lastname': user.lastname,
                    'custom:role': user.role,
                },
                autoSignIn: {
                    // optional - enables auto sign in after user is confirmed
                    enabled: false,
                },
            })
        } catch (error) {
            console.log('error signing up:', error)
        }
    }

    const handleChangeRole = (event: any) => {
        setUser({
            username: user.username,
            password: user.password,
            name: user.name,
            lastname: user.lastname,
            role: event.value,
        })
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Nuevo usuario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='mb-5'>
                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='nombre'
                                    className='mb-4'
                                    onChange={(e) => {
                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: e.target.value,
                                            lastname: user.lastname,
                                            role: user.role,
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='apellidos'
                                    className='mb-4'
                                    onChange={(e) => {
                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: user.name,
                                            lastname: e.target.value,
                                            role: user.role,
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='email'
                                    className='mb-4'
                                    onChange={(e) => {
                                        setUser({
                                            username: e.target.value,
                                            password: user.password,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role,
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Select
                                    name='rol'
                                    options={options}
                                    styles={customStyles}
                                    components={animatedComponents}
                                    onChange={handleChangeRole}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <Form.Group>
                                <Form.Label>{'Contraseña'}</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    className={'mb-4'}
                                    onChange={(e) => {
                                        setUser({
                                            username: user.username,
                                            password: e.target.value,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role,
                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            signUp()
                        }}
                    >
                        {'Añadir '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUser
