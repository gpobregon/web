import React, {FC} from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'

const ResultUserReport: FC<any> = ({show}) => {
    let iterationRows = [1, 2, 3, 4, 5, 6];
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
                <div className='text-left' style={{ paddingTop: 20 }} >
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
                    <hr style={{ border: '1px solid rgba(255 255 255)', color: '#FFF' }} />
                </div>

                {/* <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'  style={{textAlign: 'center'}} > 
                    <Row> 
                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Foto</Form.Label>
                            </Form.Group>
                        </Col>    

                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Usuario</Form.Label> 
                                <i className="bi bi-chevron-down" style={{fontSize: 15, paddingLeft : 10  }} ></i>
                            </Form.Group>
                        </Col>  

                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Última visita</Form.Label> 
                                <i className="bi bi-chevron-down" style={{fontSize: 15, paddingLeft : 10  }} ></i>
                            </Form.Group>
                        </Col>  

                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>País</Form.Label> 
                                <i className="bi bi-chevron-down" style={{fontSize: 15, paddingLeft : 10  }} ></i>
                            </Form.Group>
                        </Col>  

                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Género</Form.Label> 
                                <i className="bi bi-chevron-down" style={{fontSize: 15, paddingLeft : 10  }} ></i>
                            </Form.Group>
                        </Col>  

                        <Col lg={2} md={2} sm={3} > 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Edad</Form.Label> 
                                <i className="bi bi-chevron-down" style={{fontSize: 15, paddingLeft : 10  }} ></i>
                            </Form.Group>
                        </Col>  
                    </Row> 

                    <Row> 
                        <Col lg={2} md={2} sm={3} > 
                            <div className='d-flex align-items-center' > 
                                <div
                                    className='me-8'
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: '#a9a9a9',
                                        borderRadius: '50%',
                                    }}
                                ></div>
                            </div>
                        </Col>    

                        
                    </Row>
                </div> */}

                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <Table striped bordered hover variant="dark" className='align-middle'>
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Usuario</th>
                                <th>Ultima visita</th>
                                <th>País</th>
                                <th>Genero</th>
                                <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iterationRows.map((item) => (
                                <tr>
                                    <td>
                                        <div
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: '#a9a9a9',
                                                borderRadius: '50%',
                                            }}
                                        ></div>
                                    </td>
                                    <td>
                                        <div>Mark</div>
                                        <div className='text-muted' >example@gmail.com</div>
                                    </td>
                                    <td className='text-muted' >12/08/2022</td>
                                    <td className='text-muted' >Guatemala</td>
                                    <td className='text-muted' >Masculino</td>
                                    <td className='text-muted' >23</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ResultUserReport;
