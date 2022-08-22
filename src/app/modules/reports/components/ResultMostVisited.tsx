import React, {FC} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap'
import Select from 'react-select/dist/declarations/src/Select'

const ResultMostVisited: FC<any> = ({show}) => {
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
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
                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                    <Row className='mb-5'>
                        <Col
                            lg={3}
                            md={3}
                            sm={6}
                            className='d-flex flex-column justify-content-between text-center py-5'
                            style={{height: '165px'}}
                        >
                            <div
                                className='d-flex justify-content-center align-items-center py-3 m-1'
                                style={{backgroundColor: '#323248', borderRadius: '5px'}}
                            >
                                <h6 className='m-0'>Visitas</h6>
                            </div>

                            <div>
                                <h6 className='mb-5'>Total de visitas</h6>
                                <span>159</span>
                            </div>
                        </Col>

                        <Col
                            lg={3}
                            md={3}
                            sm={6}
                            className='d-flex flex-column justify-content-between text-center py-5'
                            style={{height: '165px'}}
                        >
                            <div
                                className='d-flex justify-content-center align-items-center py-3 m-1'
                                style={{backgroundColor: '#323248', borderRadius: '5px'}}
                            >
                                <h6 className='m-0'>Género</h6>
                            </div>

                            <div className='d-flex justify-content-around align-items-center'>
                                <div>
                                    <div className='mb-5'>Hombre</div>
                                    <div>75</div>
                                </div>
                                <div>
                                    <div className='mb-5'>Mujer</div>
                                    <div>63</div>
                                </div>
                                <div>
                                    <div className='mb-5'>Indefinido</div>
                                    <div>21</div>
                                </div>
                            </div>
                        </Col>

                        <Col
                            lg={3}
                            md={3}
                            sm={6}
                            className='d-flex flex-column justify-content-between text-center py-5'
                            style={{height: '165px'}}
                        >
                            <div
                                className='d-flex justify-content-center align-items-center py-3 m-1'
                                style={{backgroundColor: '#323248', borderRadius: '5px'}}
                            >
                                <h6 className='m-0'>Edad</h6>
                            </div>
                            <div className='d-flex justify-content-around align-items-center'>
                                <div>
                                    <div className='mb-5'>Menores de edad</div>
                                    <div>26</div>
                                </div>
                                <div>
                                    <div className='mb-5'>Mayores de edad</div>

                                    <div>84</div>
                                </div>
                                <div>
                                    <div className='mb-5'>Tercera edad</div>

                                    <div>49</div>
                                </div>
                            </div>
                        </Col>

                        <Col
                            lg={3}
                            md={3}
                            sm={6}
                            className='d-flex flex-column justify-content-between text-center py-5'
                            style={{height: '165px'}}
                        >
                            <div
                                className='d-flex justify-content-center align-items-center py-3 m-1'
                                style={{backgroundColor: '#323248', borderRadius: '5px'}}
                            >
                                <h6 className='m-0'>País</h6>
                            </div>
                            <div className='d-flex justify-content-around align-items-center'>
                                <div>
                                    <div className='mb-5'>Nacionales</div>
                                    <div>111</div>
                                </div>
                                <div>
                                    <div className='mb-5'>Extranjeros</div>
                                    <div>48</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ResultMostVisited
