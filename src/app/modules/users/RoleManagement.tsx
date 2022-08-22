import React, {FC, useState} from "react";  
import {Link} from 'react-router-dom' 
import { Button, Col, Form, Row, Table, Card } from 'react-bootstrap' 
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'

const RoleManagement: FC<any> = ({show}) =>{ 
    return(  
        <> 
            <div
                        className=''
                        style={{
                            backgroundColor: '#1E1E2D',
                            borderRadius: '5px', 
                        }}
                    >
                        <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                            <div className='d-flex align-items-center'>
                                <Link to='/usuarios'>
                                    <Button variant='secondary' className='text-center me-4'>
                                        <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                                    </Button>
                                </Link>
                                <h1 className='m-0'>Gestión de roles / Funcionalidades</h1>
                            </div>
                        </div>
            </div> 

            <Row className='mt-12 mb-9'>
                    <div className='text-left'>
                        <h2 className='text-muted mb-0'>Configuración de roles</h2>
                    </div> 

                    <div className='d-flex justify-content-end'>
                        <Button
                            variant='primary'
                            className='mt-md-0 mt-4'
                            //onClick={() => setModalAddLanguage(true)}
                        >
                            <span className='menu-icon me-0  '>
                                <i className={`bi bi-plus fs-1`}></i>
                            </span>
                            {' Nuevo Rol'}
                        </Button>
                    </div>
            </Row> 

            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'> 
                    <Row> 
                        <Col lg={4} md={4} sm={4}>
                            <Card border="light" >
                                <Card.Header style={{padding: 0, position: 'relative', width: '100%', alignItems: 'center' }} >   
            
                                    <div style={{width: '90%'}} >
                                        <input
                                            type='text'
                                            className='form-control' 
                                            placeholder="Ingresa el rol"
                                            style={{border: '0', fontSize: '18px', color: '#FFFFFF',  }}

                                        > 
                                        </input>  
                                        
                                    </div> 
                                    <i className={`bi bi-pen fs-1 `} style={{ alignItems: 'center' }} ></i>
                                    
                                </Card.Header>
                                <Card.Body style={{padding: 0,  width: '100%',  }} >
                                    <Card.Title style={{paddingTop: 10, width: '100%'}} >Descripción del rol</Card.Title>
                                    <Card.Text>
                                        <textarea className="form-control"></textarea>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <br />
                        </Col> 

                        <Col md={8} sm={8}> 
                        
                            <div className='d-flex align-items-center position-relative' style={{ width: '100%', justifyContent: 'space-between' }}  >
                                <h1>Funciones de este Rol</h1>  
                                <div className='d-flex justify-content-end' >
                                    <i className={`bi bi-trash-fill`} style={{fontSize: 20}}  ></i> 
                                </div> 
                            </div> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Editar sitios"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Gestor de notificaciones"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Editar puntos de Interés"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Gestionar Reportes"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Editar Usuarios"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Gestor Offline"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Editar Roles"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={6} sm={6}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Gestor de Categorias e Idiomas"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row>


                        </Col> 
                    </Row> 

                    
                </div> 
                
            </div>

        </>

    )
} 

export default RoleManagement;