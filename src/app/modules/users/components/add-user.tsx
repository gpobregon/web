import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'



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
    {label: 'Admin'},
    {label: 'Editor'},
    {label: 'Gestor'},
]

const optionTemplate = (option: any) => (
    <span>
        {`ㅤ${option.label}`}
    </span>
)

const optionsRoles = options.map((option) => ({
        label: optionTemplate(option),
    })) 
    
const AddUser: FC<any> = ({show, onClose, addTag}) => { 

    return (
        <>
            <Modal show={show} onHide={onClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{'Nuevo usuario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <Row className='mb-5'>  
                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>{'Nombres'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='nombre'
                                    className={'mb-4'}
                                ></Form.Control>
                            </Form.Group>  
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>{'Apellidos'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='nombre'
                                    className={'mb-4'}
                                ></Form.Control>
                            </Form.Group>  
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>{'Email'}</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='nombre'
                                    className={'mb-4'}
                                ></Form.Control>
                            </Form.Group>  
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>{'Rol'}</Form.Label>
                                <Select 
                                    options={optionsRoles}
                                    styles={customStyles}
                                    components={animatedComponents}
                                    //onChange={handleChangeLanguage}
                                />
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
                        // onClick={() => {
                        //     addTag(tag)
                        // }}
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
