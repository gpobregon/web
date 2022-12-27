import React, {useContext, useEffect, useState} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ResultMostVisited from './components/ResultMostVisited'
import {getData, getDataReport, getSitiosPublicados, postData} from '../../services/api'
import {PublishSite} from '../../models/publishSite'
import swal from 'sweetalert' 
import { LoadingContext } from '../../utility/component/loading/context'

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
    {value: 1, label: 'Femenino'},
    {value: 2, label: 'Masculino'},
    {value: 3, label: 'Prefiero no decirlo'},
]

const yearsOldOptions = [
    {value: 1, label: 'Menor de edad'},
    {value: 2, label: '18 a 30'},
    {value: 3, label: '31 a 50'},
    {value: 4, label: '51 en adelante'}, 
    {value: 5, label: 'todas las edades'}
]

const countryOptions = [
    {value: 1, label: 'Nacionales'},
    {value: 2, label: 'Extranjeros'},
    {value: 3, label: 'Todos'},
]

const MostVistedReport = () => { 
    const {setShowLoad} = useContext(LoadingContext)
    const [showResult, setShowResult] = useState(false)
    let [publishSite, setPublishSite] = useState<PublishSite[]>([])
    const [existUsers, setExistUsers] = useState(false)

    const [type, setType] = useState({
        tipo_reporte: 'visitas',
        id_sitio: 0,
        genero: 0,
        edad: 0,
        fecha_inicial: '',
        fecha_final: '',
        pais: 0,
        calificacion: 4,
    })
    console.log('type: ', type)

    const [photo, setPhoto] = useState([])
    const [name, setName] = useState([])
    const [data, setData] = useState([])
    console.log('data: ', data)
    const typeReport = async (typee: any) => {
        if (
            type.id_sitio != 0 &&
            type.fecha_inicial != '' &&
            type.fecha_final != '' &&
            type.genero != 0 &&
            type.edad != 0 &&
            type.pais != 0
        ) {
            if (type.fecha_inicial >= type.fecha_final) {
                swal(
                    'Fechas incorrectas',
                    'Por favor introduce una fecha inicial menor que la final',
                    'error'
                )
            } else { 
                setShowLoad(true)
                const sit: any = await postData(getDataReport, typee)
                console.log('sit: ', sit)
                setName(sit[0].nombre_sitio)
                setPhoto(sit[0].imagen)

                let temp = []

                for (let i = 0; i < sit.length; i++) {
                    console.log('sit: ', sit[i].data)
                    temp.push(sit[i].data)
                    // for (let e = 0; e <= sit[i].data.length; e++) {
                    //        console.log(sit[i].data[e])
                    //     temp.push(sit[i].data[e])
                    // }
                }

                setData(temp as [])
                showResultComponent()
                // console.log('sit: ', sit)
                setExistUsers(true) 
                setTimeout(() => setShowLoad(false), 1000)
            }
        } else {
            alertNotNullInputs()
        }
    }

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
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
            calificacion: type.calificacion,
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
            calificacion: type.calificacion,
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
            calificacion: type.calificacion,
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
            calificacion: type.calificacion,
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
            calificacion: type.calificacion,
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
            calificacion: type.calificacion,
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

            <ResultMostVisited
                show={showResult}
                data={data}
                site={type}
                name={name}
                photo={photo}
            />
        </Container>
    )
}

export default MostVistedReport
