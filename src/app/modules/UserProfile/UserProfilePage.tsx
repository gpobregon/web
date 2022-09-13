import React, {ChangeEvent, useState, useEffect} from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {getToBase64} from './base64'
import {awsconfig} from '../../../aws-exports'
import imgUpload from './upload-image_03.jpg'
import {Amplify, Auth} from 'aws-amplify'
import {URLAWS} from '../../services/api'
import * as AWS from 'aws-sdk'
import UpImage from './components/add-image'
import {
    ListUsersResponse,
    UsersListType,
    UserType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import {json} from 'node:stream/consumers'

interface Profile {
    fileImage: any
    nombre: string
    apellido: string
    telefono: string
    email: string
}

const UserProfilePage = () => {
    const [showUpdateButton, setShowUpdateButton] = useState(true)
    const [users, setUsers] = useState<UserType[]>([])
    const [existUsers, setExistUsers] = useState(false)
    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
    })

    const [form, setForm] = useState<Profile>({
        fileImage: undefined,
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
    })

    //esto me retorna el email del usuario con el que estoy logueado
    const getEmail = () => {
        Auth.currentAuthenticatedUser().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
            })
            //console.log(user.attributes['custom:phoneNumber']);
            //console.log(JSON.stringify(user.attributes))
            console.log(user)
        })
    }

    //console.log(dataUser)

    // getEmail()
    useEffect(() => {
        getEmail()
    }, [])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputName = e.target.name

        if (inputName === 'fileImage') {
            setForm({
                ...form,
                [inputName]: e.target.files ? e.target.files[0] : undefined,
            })
            return
        }

        setForm({
            ...form,
            [inputName]: e.target.value,
        })
    }

    const onClickUpdate = async () => {
        setShowUpdateButton(false)
        console.log(form)
    }

    let [profile, setProfile] = useState({
        imagen_path: '',
    })

    const uploadImage = async (imagen: string) => {
        if (imagen != '') {
            setDataUser({
                email: dataUser.email,
                name: dataUser.name,
                lastname: dataUser.lastname,
                phoneNumber: dataUser.phoneNumber,
                imageProfile: URLAWS + 'fotoPerfiles/' + imagen,
            })
            setModalupIMG(false)
            setShowUpdateButton(false)
        }
    }

    const updateUsuarios = async () => {
        const user = await Auth.currentAuthenticatedUser()
        const result = await Auth.updateUserAttributes(user, {
            name: dataUser.name,
            //email: dataUser.email,
            'custom:lastname': dataUser.lastname,
            'custom:phoneNumber': dataUser.phoneNumber,
            'custom:imageProfile': dataUser.imageProfile,
        })
        setShowUpdateButton(true)
    }

    const [modalupimg, setModalupIMG] = useState(false)

    return (
        <>
            {/* {Auth.currentAuthenticatedUser().then((user) => {  */}
            <Container fluid>
                {Object.keys(dataUser).length !== 0 ? (
                    <div>
                        <Row>
                            <div className='text-left mb-10'>
                                <h1 className='text-dark mt-0'>Configuración del perfil</h1>
                                <h2 className='text-muted mb-0'>Información del perfil</h2>
                            </div>
                        </Row>

                        <div
                            className='mb-9'
                            style={{
                                backgroundColor: '#1E1E2D',
                                borderRadius: '5px',
                            }}
                        >
                            <div className='d-md-flex py-9 px-9'>
                                <Col md={7}>
                                    <div className='d-md-flex'>
                                        <img
                                            src={dataUser.imageProfile}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                            }}
                                        ></img>
                                        <div className='d-flex flex-column justify-content-center mx-xxl-9 mx-xl-9 mx-md-9'>
                                            <h1 className='mb-5'>{dataUser.name}</h1>
                                            <p className='text-muted mb-5'>
                                                <span className='me-3'>
                                                    <i className='bi bi-telephone'></i>
                                                </span>
                                                {dataUser.phoneNumber}
                                            </p>
                                            <p className='text-muted'>
                                                <span className='me-3'>
                                                    <i className='bi bi-envelope'></i>
                                                </span>
                                                {dataUser.email}
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={5} className='d-flex'>
                                    <div className='d-flex flex-column justify-content-center mx-xxl-9 mx-xl-9 mx-md-9'>
                                        <h2 className='mb-5'>Editor</h2>
                                        <p className='' style={{color: '#92929F'}}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Integer vulputate nibh sed mauris maximus elementum.
                                        </p>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                <div
                    className='mb-9'
                    style={{
                        backgroundColor: '#1E1E2D',
                        borderRadius: '5px',
                    }}
                >
                    <div className='d-md-flex py-9 px-9'>
                        <Col
                            md={4}
                            className='me-xxl-9 mb-xxl-0 me-xl-9 mb-xl-0 me-lg-9 mb-lg-0 me-md-9 mb-md-0 mb-sm-9'
                        >
                            <h2 className='mb-5'>Editor</h2>
                            <hr
                                className='mb-5'
                                style={{border: '1px solid rgba(86, 86, 116, 0.1)'}}
                            />
                            <div
                                className='d-xl-flex align-items-center'
                                style={{borderRadius: '5px'}}
                            >
                                <div>
                                    <img
                                        src={
                                            dataUser.imageProfile == ''
                                                ? imgUpload
                                                : dataUser.imageProfile
                                        }
                                        onClick={
                                            dataUser.imageProfile == ''
                                                ? (e) => {
                                                      setModalupIMG(true)
                                                  }
                                                : (e) => {}
                                        }
                                        style={{
                                            width: '200px',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: '5px',
                                        }}
                                    ></img>
                                </div>

                                <div className='d-flex justify-content-evenly p-5'>
                                    <div>
                                        <Button
                                            variant='outline-primary p-7'
                                            className='text-center mx-1'
                                            onClick={() => {
                                                setModalupIMG(true)
                                            }}
                                        >
                                            <i className='fs-1 bi-upload px-0 fw-bolder'></i>
                                        </Button>
                                    </div>
                                    <div>
                                        {/* <Button
                                            variant='outline-danger p-7'
                                            className='text-center mx-1'
                                        >
                                            <i className='fs-2 bi-trash px-0 fw-bolder'></i>
                                        </Button> */}
                                    </div>
                                </div>
                            </div>

                            <div className='text-center text-muted mt-5'>
                                <small>Formatos permitidos: jpg, png.</small>
                            </div>
                        </Col>

                        <Col
                            md={4}
                            className='ms-xxl-9 ms-xxl-0 ms-xl-9 ms-xl-0 ms-lg-9 ms-lg-0 ms-md-9 mt-md-0 mt-sm-9'
                        >
                            <h2 className='mb-5'>Información del perfil</h2>
                            <hr
                                className='mb-5'
                                style={{border: '1px solid rgba(86, 86, 116, 0.1)'}}
                            />

                            <Row className='mb-5'>
                                <Col lg={6} md={6} sm={6}>
                                    <Form.Group className=''>
                                        <Form.Label>Nombres</Form.Label>
                                        <Form.Control
                                            defaultValue={dataUser.name}
                                            type='text'
                                            name='nombre'
                                            onChange={(e) => {
                                                setDataUser({
                                                    email: dataUser.email,
                                                    name: e.target.value,
                                                    lastname: dataUser.lastname,
                                                    phoneNumber: dataUser.phoneNumber,
                                                    imageProfile: dataUser.imageProfile,
                                                })
                                            }}
                                            disabled={showUpdateButton}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} sm={6}>
                                    <Form.Group className=''>
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control
                                            defaultValue={dataUser.lastname}
                                            type='text'
                                            name='apellido'
                                            disabled={showUpdateButton}
                                            onChange={(e) => {
                                                setDataUser({
                                                    email: dataUser.email,
                                                    name: dataUser.name,
                                                    lastname: e.target.value,
                                                    phoneNumber: dataUser.phoneNumber,
                                                    imageProfile: dataUser.imageProfile,
                                                })
                                            }}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mb-5'>
                                <Col lg={12} md={12} sm={12}>
                                    <Form.Group className=''>
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control
                                            defaultValue={dataUser.phoneNumber}
                                            type='text'
                                            name='telefono'
                                            onChange={(e) => {
                                                setDataUser({
                                                    email: dataUser.email,
                                                    name: dataUser.name,
                                                    lastname: dataUser.lastname,
                                                    phoneNumber: e.target.value,
                                                    imageProfile: dataUser.imageProfile,
                                                })
                                            }}
                                            disabled={showUpdateButton}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mb-10'>
                                <Col lg={12} md={12} sm={12}>
                                    <Form.Group className=''>
                                        <Form.Label>Correo electrónico</Form.Label>
                                        <Form.Control
                                            defaultValue={dataUser.email}
                                            type='text'
                                            name='correo'
                                            disabled
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row
                                style={
                                    showUpdateButton == true
                                        ? {display: 'block'}
                                        : {display: 'none'}
                                }
                            >
                                <Col lg={12} md={12} sm={12}>
                                    <Button variant='primary w-100' onClick={onClickUpdate}>
                                        {'Actualizar '}
                                        <i className='bi-pencil text-white fs-3'></i>
                                    </Button>
                                </Col>
                            </Row>

                            <Row style={showUpdateButton == true ? {display: 'none'} : {}}>
                                <Col lg={6} md={6} sm={6}>
                                    <Button
                                        variant='secondary w-100'
                                        onClick={() => setShowUpdateButton(true)}
                                    >
                                        {'Cancelar '}
                                        <i className='bi-x text-white fs-3'></i>
                                    </Button>
                                </Col>
                                <Col lg={6} md={6} sm={6}>
                                    <Button
                                        variant='primary w-100'
                                        onClick={() => updateUsuarios()}
                                    >
                                        {'Guardar '}
                                        <i className='bi-box-arrow-down text-white fs-3'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </div>
                </div>
            </Container>

            {/* })}  */}

            <UpImage
                show={modalupimg}
                onClose={() => setModalupIMG(false)}
                cargarIMG={uploadImage}
            />
        </>
    )
}

export default UserProfilePage
