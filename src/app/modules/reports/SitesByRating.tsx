import React, {useState, useRef, useEffect, useContext} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Col, Form, Row, Overlay, Container} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import ResultSitestByRating from './components/ResultSitesByRating'
import UsersResultByRating from './components/UsersResultSitesByRating'
import {getData, getDataReport, getRolesMethod, getSitiosPublicados, postData} from '../../services/api'
import {PublishSite} from '../../models/publishSite'
import swal from 'sweetalert'
import {LoadingContext} from '../../utility/component/loading/context'
import { roleManager } from '../../models/roleManager' 
import {Amplify, Auth} from 'aws-amplify'

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

const SitesByRating = () => { 
    const {setShowLoad} = useContext(LoadingContext)
    const [showResult, setShowResult] = useState(false)
    const [marcadoMalo, setMarcadoMalo] = useState(false)
    const [marcadoBueno, setMarcadoBueno] = useState(false)
    const [marcadoExcelente, setMarcadoExcelente] = useState(false)
    const [marcadoTodos, setMarcadoTodos] = useState(false)
    let [publishSite, setPublishSite] = useState<PublishSite[]>([])

    const [type, setType] = useState({
        tipo_reporte: 'calificacion',
        id_sitio: 0,
        genero: 0,
        edad: 0,
        fecha_inicial: '',
        fecha_final: '',
        pais: 0,
        calificacion: 0,
    })

    const [photo, setPhoto] = useState([])
    const [name, setName] = useState([])
    const [data, setData] = useState([])
    const [users, setUsers] = useState([]) 

    let navigate = useNavigate() 

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        validateRole(role.data as roleManager[])
    }

    const validateRole = async (roles:any) => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role:any) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                console.log("filter: ", filter);
                if (filter[0]?.reporte_calificacion_generar === false) {
                    navigate('/error/401', {replace: true})
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    } 

    const typeReport = async (typee: any) => {
        if (
            type.id_sitio != 0 &&
            type.fecha_inicial != '' &&
            type.fecha_final != '' &&
            type.calificacion != 0
        )
            if (type.fecha_inicial >= type.fecha_final) {
               errorDate()
            } else {
                setShowLoad(true)
                const sit: any = await postData(getDataReport, typee)
                

                setName(type.id_sitio!=-1 ? sit[0]?.nombre_sitio : 'Todos los sitios')
                setPhoto(type.id_sitio!=-1 ? sit[0]?.imagen : null)
                let temp = []
                let temp2 = []
                for (let i = 0; i < sit.length; i++) {
                    sit[i].data.nombre_sitio = sit[i].nombre_sitio
                    temp.push(sit[i].data)
                    for (let e = 0; e < sit[i].usuarios.length; e++) {
                      if(type.id_sitio===-1)  sit[i].usuarios[e].nombre_sitio = sit[i].nombre_sitio
                        temp2.push(sit[i].usuarios[e])
                    }
                }
                setData(temp as [])
                setUsers(temp2 as [])
                showResultComponent()
                setShowLoad(false)
            }
        else {
            alertNotNullInputs()
        }
    }

    const getSite = async () => {
        getPublishSites()
    }
    async function getPublishSites() {
        setShowLoad(true)
        const sites: any = await getData(getSitiosPublicados)
        let temp:any = []
        sites.data.map((sit: any) => {
            temp.push({
                label: sit.nombre,
                value: sit.id_sitio,
            })
        })
        //solo elementos unicos
        temp.unshift({
            label: 'Todos los sitios',
            value: -1,
        })
        let hash:any = {}
        temp = temp.filter((o:any) => {
            return hash[o.value] ? false : (hash[o.value] = true)
          })

        setPublishSite(temp)
        setShowLoad(false)
    }

    useEffect(() => {
        getSite()
        //getPublishSites() 
        getRoles()
       
    }, [])

    const showResultComponent = () => {
        setShowResult(true)
    }

    const handleChangeSitio = (event: any) => {
        setShowResult(false)
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

    const handleChangeFechaInicial = (event: any) => {
        setShowResult(false)
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
        setShowResult(false)
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

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    } 

    const errorDate = async () => {
        swal({
            text: 'Fechas incorrectas',
            icon: 'warning',
        })
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
                        <h1 className='m-0'>Reporte de sitios por Calificación</h1>
                    </div>
                </div>
            </div>

            <Row className='my-9'>
                <div className='text-left'>
                    <h3 className='text-dark mt-0'>Filtros de búsqueda</h3>
                    <h5 className='text-muted mb-0'>Reportes - Sitios por calificación</h5>
                </div>
            </Row>

            <div //aquí empieza el rectangulo
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
                                    styles={customStyles}
                                    components={animatedComponents}
                                    options={publishSite}
                                    onChange={handleChangeSitio}
                                />
                            </Form.Group>
                        </Col>

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
                                <Form.Label>Fecha inicial</Form.Label>
                                <Form.Control
                                    type='date'
                                    name='endDate'
                                    onChange={handleChangeFechaFinal}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={4} md={4} sm={6}>
                            <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                <Form.Label>Calificacion:</Form.Label>
                                <br />
                                <div className='d-flex justify-content-start'>
                                    <button
                                        className={
                                            marcadoMalo == false
                                                ? 'btn btn-primary-outline fa-solid bi-emoji-frown fs-1 background-button'
                                                : 'btn btn-primary-outline fa-solid bi-emoji-frown fs-1 background-button'
                                        }
                                        onClick={() => {
                                            setShowResult(false)
                                            setType({
                                                tipo_reporte: type.tipo_reporte,
                                                id_sitio: type.id_sitio,
                                                genero: type.genero,
                                                edad: type.edad,
                                                fecha_inicial: type.fecha_inicial,
                                                fecha_final: type.fecha_final,
                                                pais: type.pais,
                                                calificacion: 1,
                                            })
                                            setMarcadoMalo(true)
                                            setMarcadoBueno(false)
                                            setMarcadoExcelente(false)
                                            setMarcadoTodos(false)
                                        }}
                                        style={{
                                            color: marcadoMalo ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    >
                                        {/* <i
                                            className='bi bi-emoji-frown'
                                            style={{
                                                fontSize: 30,
                                                paddingLeft: 20,
                                                cursor: 'pointer',
                                            }}
                                        ></i> */}
                                    </button>

                                    {/* <button
                                        className='btn btn-primary-outline'
                                        style={{backgroundColor: 'transparent'}}
                                    >
                                        <i
                                            className='bi bi-emoji-smile'
                                            style={{
                                                fontSize: 30,
                                                paddingLeft: 20,
                                                cursor: 'pointer',
                                            }}
                                        ></i>
                                    </button> */}
                                    <button
                                        className={
                                            marcadoBueno == false
                                                ? 'btn btn-primary-outline fa-solid bi-emoji-smile fs-1 background-button'
                                                : 'btn btn-primary-outline fa-solid bi-emoji-smile fs-1 background-button'
                                        }
                                        onClick={() => {
                                            setShowResult(false)
                                            setType({
                                                tipo_reporte: type.tipo_reporte,
                                                id_sitio: type.id_sitio,
                                                genero: type.genero,
                                                edad: type.edad,
                                                fecha_inicial: type.fecha_inicial,
                                                fecha_final: type.fecha_final,
                                                pais: type.pais,
                                                calificacion: 2,
                                            })
                                            setMarcadoBueno(true)
                                            setMarcadoMalo(false)
                                            setMarcadoExcelente(false)
                                            setMarcadoTodos(false)
                                        }}
                                        style={{
                                            color: marcadoBueno ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    >
                                        {/* <i
                                            className='bi bi-emoji-frown'
                                            style={{
                                                fontSize: 30,
                                                paddingLeft: 20,
                                                cursor: 'pointer',
                                            }}
                                        ></i> */}
                                    </button>

                                    <button
                                        className={
                                            marcadoExcelente == false
                                                ? 'btn btn-primary-outline fa-solid bi-emoji-laughing fs-1 background-button'
                                                : 'btn btn-primary-outline fa-solid bi-emoji-laughing fs-1 background-button'
                                        }
                                        onClick={() => {
                                            setShowResult(false)
                                            setType({
                                                tipo_reporte: type.tipo_reporte,
                                                id_sitio: type.id_sitio,
                                                genero: type.genero,
                                                edad: type.edad,
                                                fecha_inicial: type.fecha_inicial,
                                                fecha_final: type.fecha_final,
                                                pais: type.pais,
                                                calificacion: 3,
                                            })
                                            setMarcadoExcelente(true)
                                            setMarcadoMalo(false)
                                            setMarcadoBueno(false)
                                            setMarcadoTodos(false)
                                        }}
                                        style={{
                                            color: marcadoExcelente ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></button>

                                    <button
                                        className='btn btn-primary-outline background-button'
                                        onClick={() => {
                                            setShowResult(false)
                                            setType({
                                                tipo_reporte: type.tipo_reporte,
                                                id_sitio: type.id_sitio,
                                                genero: type.genero,
                                                edad: type.edad,
                                                fecha_inicial: type.fecha_inicial,
                                                fecha_final: type.fecha_final,
                                                pais: type.pais,
                                                calificacion: 4,
                                            })
                                            setMarcadoExcelente(false)
                                            setMarcadoMalo(false)
                                            setMarcadoBueno(false)
                                            setMarcadoTodos(true)
                                        }}
                                        style={{
                                            color: marcadoTodos ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    >
                                        Ver todos
                                    </button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={6} className='d-flex align-items-center'>
                            <Button
                                variant='primary'
                                className='mt-4'
                                onClick={() => typeReport(type)}
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

            <div>
                <ResultSitestByRating
                    show={showResult}
                    data={data}
                    site={type}
                    name={name}
                    photo={photo}
                    users={users}
                />

                <UsersResultByRating show={showResult} users={users} />
            </div>
        </Container>
    )
}

export default SitesByRating
