import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ResultMostVisited from './components/ResultMostVisited'
import { getData, getDataReport, getSitiosPublicados, postData } from '../../services/api'
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

const sitesOptions = [
    {value: 1, label: 'Ejemplo 1'},
    {value: 2, label: 'Ejemplo 2'},
    {value: 3, label: 'Ejemplo 4'},
    {value: 4, label: 'Ejemplo 5'},
    {value: 5, label: 'Ejemplo 6'},
    {value: 6, label: 'Ejemplo 7'},
]

const genresOptions = [
    {value: 'Femenino', label: 'Femenino'},
    {value: 'Masculino', label: 'Masculino'},
    {value: 'Prefiero no decirlo', label: 'Prefiero no decirlo'},
]

const yearsOldOptions = [
    {value: 'Menor de edad', label: 'Menor de edad'},
    {value: '18 a 30', label: '18 a 30'},
    {value: '31 a 50', label: '31 a 50'},
    {value: '51 en adelante', label: '51 en adelante'},
]

const countryOptions = [
    {value: 0, label: 'Nacionales'},
    {value: 1, label: 'Extranjeros'},
    {value: 2, label: 'Todos'},
]


const MostVistedReport = () => {
    const [showResult, setShowResult] = useState(false)  
    let [publishSite, setPublishSite] = useState<PublishSite[]>([])  
    const [data, setData] = useState() 
    const [existUsers, setExistUsers] = useState(false)

    const [type, setType] = useState({
        tipo_reporte: 'visitas',
        id_sitio: 0,
        genero: 0,
        edad: 0,
        fecha_inicial: '',
        fecha_final: '',
        pais: 0,
    })

    const typeReport = async (typee: any) => {
        const sit: any = await postData(getDataReport, typee)
        setData(sit)
        showResultComponent()
        console.log('sit: ', sit)
        setExistUsers(true)
    }

    const getSite = async () => {
        getPublishSites()
    }
    async function getPublishSites() {
        const sites: any = await getData(getSitiosPublicados)
        // console.log('sites: ', sites.data)

        sites.data.map((sit: any) => {
            publishSite.push({value: sit.id_sitio, label: sit.nombre})
        })
    }

    useEffect(() => {
        getSite()
        //getPublishSites() 
    }, []) 

    const handleChangeSitio = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: event.value,
            genero: type.genero,
            edad: type.edad,
            fecha_inicial: type.fecha_inicial,
            fecha_final: type.fecha_final,
            pais: type.pais,
        })
    }

    const handleChangeGenero = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: type.id_sitio,
            genero: event.value,
            edad: type.edad,
            fecha_inicial: type.fecha_inicial,
            fecha_final: type.fecha_final,
            pais: type.pais,
        })
    }

    const handleChangeEdad = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: type.id_sitio,
            genero: type.genero,
            edad: event.value,
            fecha_inicial: type.fecha_inicial,
            fecha_final: type.fecha_final,
            pais: type.pais,
        })
    }

    const handleChangeFechaInicial = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: type.id_sitio,
            genero: type.genero,
            edad: type.edad,
            fecha_inicial: event.target.value,
            fecha_final: type.fecha_final,
            pais: type.pais,
        })
    }

    const handleChangeFechaFinal = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: type.id_sitio,
            genero: type.genero,
            edad: type.edad,
            fecha_inicial: type.fecha_inicial,
            fecha_final: event.target.value,
            pais: type.pais,
        })
    }

    const handleChangePais = (event: any) => {
        setType({
            tipo_reporte: type.tipo_reporte,
            id_sitio: type.id_sitio,
            genero: type.genero,
            edad: type.edad,
            fecha_inicial: type.fecha_inicial,
            fecha_final: type.fecha_final,
            pais: event.value,
        })
    }

    const showResultComponent = () => {
        setShowResult(true)
    }

    return (
        <Container fluid>
            <div
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
                        <h1 className='m-0'>Reporte de sitios mas visitados</h1>
                    </div>
                </div>
            </div>

            <Row className='my-9'>
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Filtros de búsqueda</h3>
                    <h5 className='text-muted mb-0'>Reportes - Sitios por visitas</h5>
                </div>
            </Row>

            <div
                className='mb-9'
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
                                    onChange={handleChangeSitio}
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
                                    onChange={handleChangeGenero}
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
                                    onChange={handleChangeEdad}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={2} md={2} sm={3}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha inicial</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='startDate'
                                    onChange={handleChangeFechaInicial}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={2} md={2} sm={3}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Fecha final</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='endDate'
                                    onChange={handleChangeFechaFinal}
                                />
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
                                    onChange={handleChangePais}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={4} md={4} sm={6} className='d-flex align-items-center'>
                            <Button
                                variant='primary'
                                className='mt-4'
                                onClick={() => typeReport(type)}
                                // onClick={() => showResultComponent()}
                            >
                                <span className='menu-icon me-0'>
                                    <i className={`bi-search fs-2`}></i>
                                </span>
                                {' Buscar'}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>

            <ResultMostVisited show={showResult} />
        </Container>
    )
}

export default MostVistedReport
