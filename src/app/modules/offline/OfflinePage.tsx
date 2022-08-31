import React, {FC, useState} from "react";  
import {Link} from 'react-router-dom' 
import { Button, Col, Form, Row, Table, Card } from 'react-bootstrap' 
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'

const OfflineManagement: FC<any> = ({show}) =>{ 
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
                                
                                <h1 className='m-0'>Gestor Offline</h1>
                            </div>
                        </div>
            </div> 

            <Row className='mt-12 mb-9'>
                    <div className='text-left'>
                        <h2 className='text mb-0'>Configuración de Contenido Descargable</h2>
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
                        <Col md={4} sm={4}>
                            
                            <h1>Ítems disponibles fuera de línea</h1> 
                            <p className="text-muted" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum earum expedita modi repellat asperiores non, sunt pariatur! Culpa autem obcaecati pariatur explicabo. Minima alias enim quo, consequatur quos nemo temporibus?</p> 
             
                        </Col> 

                        <Col md={8} sm={8}> 
                        
                            <div className='d-flex align-items-center position-relative' style={{ width: '100%', justifyContent: 'space-between' }}  >
                                <h1>Contenido Descargable</h1>  
                            </div> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Imagen de portada de Sitio"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Audioguías"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>

                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Imagen de portada de Punto de Interés"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Galerías de Sitios"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col>
                            </Row> 

                            <Row style={{paddingTop: 15}}  > 
                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Galerías de Punto de Interés"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
                                                name="group1"
                                            // type={type}
                                            />
                                        
                                    </Form>
                                </Col> 

                                <Col md={4} sm={4}> 
                                    <Form>
                                            <Form.Check
                                                inline
                                                label="Item seleccionable"
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

export default OfflineManagement;