import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ResultUserReport from './components/ResultUserReport' 
import { getData, getSitiosPublicados } from '../../services/api'
import { PublishSite } from '../../models/publishSite'

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
        background: state.isFocused ? '#009EF7' : '#323248',
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

const genresOptions = [
    {value: '0', label: 'Femenino'},
    {value: '1', label: 'Masculino'},
    {value: '2', label: 'Prefiero no decirlo'},
]

const yearsOldOptions = [
    {value: '0', label: 'Menor de edad'},
    {value: '2', label: '18 a 30'},
    {value: '3', label: '31 a 50'},
    {value: '4', label: '51 en adelante'},
]

const countryOptions = [
    {value: '0', label: 'Nacionales'},
    {value: '1', label: 'Extranjeros'},  
    {value: '2', label: 'Todos'},
]

const UserReport = () => { 
    const [showResult, setShowResult] = useState(false) 
    let [publishSite, setPublishSite] = useState<PublishSite[]>([]) 
    console.log("publishSite: ", publishSite); 


    const getSite = async () => {
        getPublishSites()
    }
    async function getPublishSites() {
        const sites: any = await getData(getSitiosPublicados) 
        console.log("sites: ", sites.data);
        
        sites.data.map((sit: any) => { 
            publishSite.push({value: sit.id_sitio, label: sit.nombre})
        })
    }  

    const sitesOption = 

    useEffect(() => { 
        getSite()
      //getPublishSites()
    }, [])
    
    

    const showResultComponent = () => {
        setShowResult(true)
    } 

    return (
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
                        <h1 className='m-0'>Reporte de Usuarios</h1>
                    </div>
                </div>
            </div>

            <Row className='my-9'>
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Filtros de búsqueda</h3>
                    <h5 className='text-muted mb-0'>Reportes - Reporte de usuarios</h5>
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
                    <Row className='mb-5'>
                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Sitio</Form.Label>
                                <Select
                                    //onMenuOpen={() => getSites()} 
                                    name='sites' 
                                    options={publishSite}
                                    styles={customStyles}
                                    components={animatedComponents}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Género</Form.Label>
                                <Select
                                    options={genresOptions}
                                    styles={customStyles}
                                    components={animatedComponents}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Edad</Form.Label>
                                <Select
                                    options={yearsOldOptions}
                                    styles={customStyles}
                                    components={animatedComponents}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={2} md={2} sm={3}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha inicial</Form.Label>
                                <Form.Control type='date' name='startDate' />
                            </Form.Group>
                        </Col>
                        <Col lg={2} md={2} sm={3}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha final</Form.Label>
                                <Form.Control type='date' name='endDate' />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>País</Form.Label>
                                <Select
                                    options={countryOptions}
                                    styles={customStyles}
                                    components={animatedComponents}
                                    className={'mb-4'}
                                />
                            </Form.Group>
                        </Col>
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
                <ResultUserReport show={showResult} /> 
            </div>
        </Container>
    )
}

export default UserReport;


