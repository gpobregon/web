import React, {FC} from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'


const RestorePassword: FC<any> = ({show}) => { 
    return ( 

        <Form style={{ width: '80%', paddingLeft: 200  }}> 
            <div style={show == false ? {display: 'none'} : {display: 'block'}}>
                <Row className='mb-7'>
                    <div className='text-left' style={{ paddingTop: 20 }} >
                        <h3 className='text-dark mt-0'>Cambiar contraseña</h3>
                    </div>
                </Row>  
                    <Col sm='4' md='12' className='mb-9'>
                    <div
                        className=''
                        style={{
                            backgroundColor: '#1E1E2D',
                            borderRadius: '5px',
                        }}
                    >
                        <div className='col-xs-12 col-md-4 col-lg-12 py-5 px-9'>
                            <div className='d-flex align-items-center'>
                                <div
                                    className='me-8'
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: '#a9a9a9',
                                        borderRadius: '50%',
                                    }}
                                ></div>
                                <div>
                                    <h2 className=''>Jhon Doe</h2>
                                    <h6 className='text-muted'>JhonDoe95@email.com</h6>
                                </div>
                            </div>
                        </div>
                        
                            <div className='fv-row mb-4' style={{ padding: 50 }} >  
                                <Col sm='4' md='12' className='mb-9'>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Contraseña actual</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu Contraseña" />
                                    </Form.Group> 
                                </Col> 

                                <Col sm='4' md='12' className='mb-9'>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Nueva contraseña</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu Contraseña" />
                                    </Form.Group> 
                                </Col> 

                                <Col sm='4' md='12' className='mb-9'>
                                    <Form.Group className="mb-3">
                                    <Form.Label>Confirma nueva contraseña</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu Contraseña" />
                                    </Form.Group> 
                                </Col>

                            </div>
                        
                        
                    </div>  
                    </Col>
            </div>  
            
        </Form>
    )
} 



export default RestorePassword;
