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


    
const DeleteUser: FC<any> = ({show, onClose, addTag}) => { 

    return (
        <>
            <Modal show={show} onHide={onClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{'¿Seguro que deseas eliminar este usuario?'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    <Row>
                        <Col lg={4} md={4} sm={3} > 
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#a9a9a9',
                                    borderRadius: '50%',                    
                                }}                   
                            ></div>   
                        </Col>  

                        <Col lg={4} md={4} sm={3} >
                            <div>Mark</div>
                            <div className='text-muted' >example@gmail.com</div>                    
                        </Col>    

                        <Col lg={4} md={4} sm={3} >
                            <div>Role</div>
                            <div className='text-muted' >editor</div>                  
                        </Col>                     
                        
                    </Row> 
                        
                    <Row>  
                        <div style={{paddingTop: 50, textAlign: 'center' }}  >
                                    <span className='menu-icon me-0'>
                                        <i className={`bi bi-exclamation-triangle fs-1 `}></i>
                                    </span>
                                    {' Esta acción no se puede deshacer '} 
                        </div>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='btn btn-light-danger btn-active-danger' 
                        // onClick={() => {
                        //     addTag(tag)
                        // }}
                    >
                        {'Eliminar '}
                        <i className={`bi bi-trash-fill text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUser;
