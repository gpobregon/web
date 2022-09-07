import React, {ChangeEvent, useState} from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import { getToBase64 } from './base64';

interface Profile {
    fileImage: any;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
}



const UserProfilePage = () => {
    const [showUpdateButton, setShowUpdateButton] = useState(true)
    const [form, setForm] = useState<Profile>({
        fileImage: undefined,
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
    });

    const onChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        const inputName = e.target.name
        
        if ( inputName === 'fileImage' ) {
            setForm({
                ...form,
                [inputName]: e.target.files ? e.target.files[0]: undefined
            });
            return;
        }

        setForm({
            ...form,
            [inputName]: e.target.value
        })

      

    }

    const onClickUpdate = async () => {
        setShowUpdateButton(false);
        console.log(form);

        const fileBase64 = await getToBase64(form.fileImage)
        console.log('--------------------------------------------')
        console.log({
            ...form,
            fileImage: fileBase64
        });

    }

    return (
        <Container fluid>
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
                                src='https://picsum.photos/200/200'
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: '5px',
                                }}
                            ></img>
                            <div className='d-flex flex-column justify-content-center mx-xxl-9 mx-xl-9 mx-md-9'>
                                <h1 className='mb-5'>John Steven Doe Smith</h1>
                                <p className='text-muted mb-5'>
                                    <span className='me-3'>
                                        <i className='bi bi-telephone'></i>
                                    </span>
                                    {'(+502) 5555 5555'}
                                </p>
                                <p className='text-muted'>
                                    <span className='me-3'>
                                        <i className='bi bi-envelope'></i>
                                    </span>
                                    {'johndoe.09@email.com'}
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col md={5} className='d-flex'>
                        <div className='d-flex flex-column justify-content-center mx-xxl-9 mx-xl-9 mx-md-9'>
                            <h2 className='mb-5'>Editor</h2>
                            <p className='' style={{color: '#92929F'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                                vulputate nibh sed mauris maximus elementum.
                            </p>
                        </div>
                    </Col>
                </div>
            </div>

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
                        <hr className='mb-5' style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                        <div
                            className='d-flex align-items-center'
                            style={{backgroundColor: '#1B1B29', borderRadius: '5px'}}
                        >
                            <img
                                src='https://picsum.photos/200/200'
                                style={{
                                    width: '125px',
                                    height: '125px',
                                    borderRadius: '5px',
                                }}
                            ></img>

                            <div className='d-flex justify-content-center flex-grow-1'>
                                <div className='d-flex flex-wrap'> 
                                    {/* Subir imagen */}
                                    <label
                                        // variant='outline-primary p-7 m-2'
                                        className='outline-primary p-7 m-2 text-center'
                                    >
                                        <i className='fs-1 bi-upload px-0 fw-bolder'></i>
                                        <input 
                                            hidden
                                            accept="image/*"
                                            multiple
                                            type="file"
                                            name="fileImage"
                                            onChange={onChange}
                                            className="form-control"
                                        />
                                    </label> 

                                    <Button
                                        variant='outline-danger p-7 m-2'
                                        className='text-center'
                                    >
                                        <i className='fs-1 bi-trash px-0 fw-bolder'></i>
                                    </Button>
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
                        <hr className='mb-5' style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />

                        <Row className='mb-5'>
                            <Col lg={6} md={6} sm={6}>
                                <Form.Group className=''>
                                    <Form.Label>Nombres</Form.Label>
                                    <input
                                        type='input'
                                        name='nombre'
                                        disabled={showUpdateButton}
                                        value={form.nombre}
                                        onChange={onChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={6}>
                                <Form.Group className=''>
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='apellido'
                                        disabled={showUpdateButton}
                                        value={form.apellido}
                                        onChange={onChange}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mb-5'>
                            <Col lg={12} md={12} sm={12}>
                                <Form.Group className=''>
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='telefono'
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
                                        type='text'
                                        name='correo'
                                        disabled={showUpdateButton}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row
                            style={
                                showUpdateButton == true ? {display: 'block'} : {display: 'none'}
                            }
                        >
                            <Col lg={12} md={12} sm={12}>
                                <Button
                                    variant='primary w-100'
                                    onClick={onClickUpdate}
                                >
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
                                    onClick={() => setShowUpdateButton(true)}
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
    )
}

export default UserProfilePage
