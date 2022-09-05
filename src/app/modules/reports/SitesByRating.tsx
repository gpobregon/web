import React, {useState, useRef} from 'react'  
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Col, Form, Row, Overlay, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom' 
import ResultSitestByRating from './components/ResultSitesByRating'


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

// const toggleOptionSort = () => { 
//     miBoton:active { 
//         padding: 30px; 
//         background: gray; 
//         color: white; 
//     }
// }

const animatedComponents = makeAnimated()  

const sitesOptions = [
    {value: 1, label: 'Ejemplo 1'},
    {value: 2, label: 'Ejemplo 2'},
    {value: 3, label: 'Ejemplo 4'},
    {value: 4, label: 'Ejemplo 5'},
    {value: 5, label: 'Ejemplo 6'},
    {value: 6, label: 'Ejemplo 7'},
]





const SitesByRating = ()=>{  
    const [showResult, setShowResult] = useState(false)

    const showResultComponent = () => {
        setShowResult(true)
    }

    return( 
        <Container fluid> 
            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        <Link to='/reportes'>
                            <Button variant='secondary' className='text-center me-4'>
                                <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                            </Button>
                        </Link>
                        <h1 className='m-0'>Reporte de sitios por Califiación</h1>
                    </div>
                </div>
            </div> 

            <Row className='my-9'>
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Filtros de búsqueda</h3>
                    <h5 className='text-muted mb-0'>Reportes - Sitios por calificación</h5>
                </div>
            </Row> 

            <div     //aquí empieza el rectangulo
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}>
              
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>  
                    <Row className='mb-5'> 
                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Sitio</Form.Label>
                                <Select
                                    options={sitesOptions}
                                    styles={customStyles}
                                    components={animatedComponents}
                                />
                            </Form.Group>
                        </Col> 

                        <Col lg={2} md={2} sm={3}> 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha inicial</Form.Label>
                                <Form.Control type='date' name='startDate' />
                            </Form.Group>
                        </Col>  

                        <Col lg={2} md={2} sm={3}> 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha inicial</Form.Label>
                                <Form.Control type='date' name='endDate' />
                            </Form.Group>
                        </Col>  

                        <Col lg={4} md={4} sm={6}> 
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Calificacion:</Form.Label> 
                                <br/>
                                <i className="bi bi-emoji-angry " style={{fontSize: 30, cursor: 'pointer', color: '#009EF7' }}></i>  
                                <i className="bi bi-emoji-frown" style={{fontSize: 30, paddingLeft: 20, cursor: 'pointer'  }} ></i> 
                                <i className="bi bi-emoji-smile" style={{fontSize: 30, paddingLeft: 20, cursor: 'pointer'  }} ></i> 
                                <i className="bi bi-emoji-laughing" style={{fontSize: 30, paddingLeft: 20, cursor: 'pointer'  }} ></i>
                            </Form.Group>
                        </Col>  
                        
                         

                        

                    </Row> 

                    <Row> 
                        <Col lg={4} md={4} sm={6} className='d-flex align-items-center'>
                            <Button variant='primary' className='mt-4' onClick={() => showResultComponent()} >
                                <span className='menu-icon me-0'>
                                    <i className={`bi-search fs-2`}></i>
                                </span>
                                {' Buscar'}
                            </Button>
                        </Col> 
                        
                    </Row>

                </div>
            </div> 
            
            <div>
                <ResultSitestByRating show={showResult}  />
            </div>
        </Container>
    )
}


export default SitesByRating;
