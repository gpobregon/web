import React from 'react'
import {Container, Col, Row, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const ReportsPage = () => {
    return (
        <>
            <Container fluid>
                <Row className='pb-9'>
                    <div className='text-left'>
                        <h1 className='text-dark mt-0'>Reportes</h1>
                        <h2 className='text-muted mb-0'>Lista de categorías</h2>
                    </div>
                </Row>
                <Row className='g-10'>
                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>  
                        <Link to='/reportes/reporte-de-usuario'>
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }}
                            >
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-people text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>Usuarios</Card.Subtitle>
                            </Card> 
                        </Link>
                    </Col>

                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>
                        <Link to='/reportes/sitios-mas-visitados'>
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }}
                            >
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-book text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>
                                    Sitios más visitados
                                </Card.Subtitle>
                            </Card>
                        </Link>
                    </Col>

                    <Col sm='4' md='3' style={{cursor: 'pointer'}}> 
                        <Link to='/reportes/sitios-por-calificacion'>
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }}
                            >
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-emoji-smile text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>
                                    Sitios por calificación
                                </Card.Subtitle>
                            </Card> 
                        </Link>
                    </Col>

                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>  
                    <Link to=''>
                        <Card
                            className='d-flex justify-content-center align-items-center p-5'
                            style={{
                                height: 270,
                            }}
                        >
                            <Card.Title
                                className='mb-4'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span className='menu-ico'>
                                    <i
                                        className='bi bi-file-earmark-text text-white'
                                        style={{fontSize: 64}}
                                    ></i>
                                </span>
                            </Card.Title>
                            <Card.Subtitle className='mb-4 fs-3'>Otro reporte</Card.Subtitle>
                        </Card> 
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ReportsPage
