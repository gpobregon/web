import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'

import {Amplify, Auth} from 'aws-amplify'
import {awsconfig} from '../../../../aws-exports'
import {useAuth} from '../../auth/core/Auth' 
import swal from 'sweetalert'
Amplify.configure(awsconfig) 

const alertUserDone = async () => {
    swal({
        text: 'Usuario creado',
        icon: 'success',
    })
}

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
        background: state.isFocused ? '#009EF7' : '#323248',
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

const alertLlenar = async () => {
    swal({
        text: '¡campos incompletos!',
        icon: 'warning',
    })
}  

const alertEmail = async () => {
    swal({
        text: '¡Email invalido!',
        icon: 'warning',
    })
}  
const alertEmailNoIngresado = async ()=>{ 
    swal({
        text: '¡Email no ingresado!',
        icon: 'warning',
    })
}

const campos = async () => {
    swal({
        text: 'ha ocurrido un error, verifica si ingresaste un email no registrado',
        icon: 'warning',
    })
}

const AddUser: FC<any> = ({show, onClose}) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        name: '',
        lastname: '',
        role: '', 
        passwordConfirm: '',  
        phoneNumber: '', 
        imageProfile: 'https://mcd-backoffice-upload.s3.us-east-2.amazonaws.com/fotoPerfiles/Usuario-Vacio-300x300.png'
    })  



    const signUp = async () => {           
        if (user.lastname !='' && user.name !='' && user.password !='' && user.passwordConfirm !='' && user.role !=''  && user.username !=''  && user.phoneNumber !='' ){ 
            if (user.password == user.passwordConfirm) { 
               
                const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g 
                const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
                if (regEx.test(user.username)  ) { 
                     try {
                    const userData = await Auth.signUp({
                        username: user.username,
                        password: user.password,
                        attributes: {
                            name: user.name,
                            'custom:lastname': user.lastname,
                            'custom:role': user.role, 
                            'custom:phoneNumber': user.phoneNumber, 
                            'custom:imageProfile': user.imageProfile
                        },
                        autoSignIn: {
                            // optional - enables auto sign in after user is confirmed
                            enabled: false,
                        }, 
                    }) 
                    alertUserDone()
                    onClose()
                    } catch (error) { 
                        
                        console.log('error signing up:', error)  
                        swal('Contraseña o email invalidos', 'Recuerda escribir una contraseña que incluya un signo especial, una letra minuscula, una letra mayuscula y un minimo de 6 caracteres en total', 'warning')
                        return false;
                    }
                } else if (!regEx.test(user.username) && user.username !== '') {
                    alertEmail()
                } 

               
            } else {
                swal('Las contraseñas no son iguales', 'Intentalo de nuevo', 'warning')
            }
        }else {
            swal('Campos inválidos', 'Por favor ingresa correctamente los campos', 'warning')
        }
    }

    const handleChangeRole = (event: any) => {
        setUser({
            username: user.username,
            password: user.password,
            name: user.name,
            lastname: user.lastname,
            role: event.value, 
            passwordConfirm: user.passwordConfirm, 
            phoneNumber: user.phoneNumber, 
            imageProfile: user.imageProfile
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
                                            passwordConfirm: user.passwordConfirm, 
                                            phoneNumber: user.phoneNumber, 
                                            imageProfile: user.imageProfile
                            
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
                                            passwordConfirm: user.passwordConfirm, 
                                            phoneNumber: user.phoneNumber, 
                                            imageProfile: user.imageProfile
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
                                            passwordConfirm: user.passwordConfirm, 
                                            phoneNumber: user.phoneNumber, 
                                            imageProfile: user.imageProfile
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
                                <Form.Label>{'Teléfono'}</Form.Label>
                                <Form.Control
                                    type='number'
                                    name='Telefono'
                                    className={'mb-4'}
                                    onChange={(e) => {
                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role, 
                                            passwordConfirm: user.passwordConfirm, 
                                            phoneNumber: e.target.value, 
                                            imageProfile: user.imageProfile
                                        })
                                    }}
                                ></Form.Control>
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
                                            passwordConfirm: user.passwordConfirm, 
                                            phoneNumber: user.phoneNumber, 
                                            imageProfile: user.imageProfile

                                        })
                                    }}
                                ></Form.Control>
                            </Form.Group>
                        </Col> 

                        <Col lg={12} md={12} sm={12}>
                            <Form.Group>
                                <Form.Label>{'Confirma la contraseña'}</Form.Label>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    className={'mb-4'} 
                                    onChange={(e) => {
                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role, 
                                            passwordConfirm: e.target.value, 
                                            phoneNumber: user.phoneNumber, 
                                            imageProfile: user.imageProfile
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
                            //nameValidation()
                            //onClose() 
                            
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
