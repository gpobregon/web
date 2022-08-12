import React, {FC} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'

const ResultSitesByRating: FC<any> = ({show}) =>{
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}} >
            <Row className='mb-7' style={{paddingTop: 20 }} >
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Resultados de la busqueda</h3>
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
                            <h2 className=''>Museo de Arte Moderno</h2>
                            <h6 className='text-muted'>17/07/2022 - 22/07/2022</h6>
                        </div>
                    </div>
                    <hr style={{border: '1px solid rgba(255 255 255)', color: '#FFF'  } } />
                </div>  

                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9' style={{textAlign: 'center'}} >  
                    <Row className='mb-5'> 
                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Total de visitas</Form.Label>
                            </Form.Group>
                        </Col>  

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'> 
                                <i className="bi bi-emoji-frown" style={{fontSize: 20, paddingRight: 10  }} ></i> 
                                <Form.Label>Pésima</Form.Label>
                            </Form.Group>
                        </Col>  

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'> 
                                <i className="bi bi-emoji-smile" style={{fontSize: 20, paddingRight: 10  }} ></i>
                                <Form.Label>Buena</Form.Label>
                            </Form.Group>
                        </Col>  

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>  
                                <i className="bi bi-emoji-smile" style={{fontSize: 20, paddingRight: 10  }} ></i>
                                <Form.Label>Excelente</Form.Label>
                            </Form.Group>
                        </Col> 
                    </Row> 
                    
                    <Row> 
                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>159</Form.Label>
                            </Form.Group>
                        </Col>   

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>9</Form.Label>
                            </Form.Group>
                        </Col>  

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>46</Form.Label>
                            </Form.Group>
                        </Col>  

                        <Col lg={3} md={3} sm={4} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>81</Form.Label>
                            </Form.Group>
                        </Col> 
                        
                    </Row>    
                
                </div>

                

            </div> 

            


        </div>
    )
}

export default ResultSitesByRating;
