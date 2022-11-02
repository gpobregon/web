import React, {useState, useEffect, FC, useRef} from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    ListGroup,
    Form,
    Navbar,
    Nav,
    NavDropdown,
    Modal,
} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {Site} from '../../models/site'
import Moment from 'moment'
import {
    getData,
    sitesMethod,
    deleteData,
    postData,
    categorysMethod,
    statesMethod,
    URLAWS,
} from '../../services/api'
import {Tag} from '../../models/tag'
import {status} from '../../models/status'
import swal from 'sweetalert'
import {useForm} from 'react-hook-form'
import Interes from './components/sitios-interes/sala-interes'
import logo from './upload-image_03.jpg'
import UpImage from '../uploadFile/upload-image'
import {
    validateStringSinCaracteresEspeciales,
    validateStringSoloNumeros,
} from '../validarCadena/validadorCadena'
import {KTSVG} from '../../../_metronic/helpers'
const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
    (item) => ({label: item, value: item})
)

const options = [
    {label: 'Grapes', value: 'grapes'},
    {label: 'Mango', value: 'mango'},
    {label: 'Strawberry ', value: 'strawberry'},
    {label: 'Strawberry1 ', value: 'strawberry1'},
    {label: 'Strawberry2 ', value: 'strawberry2'},
    {label: 'Strawberry3 ', value: 'strawberry3'},
    {label: 'Strawberry4 ', value: 'strawberry4'},
]

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: '#1b1b29',
        borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
        borderColor: state.isFocused ? '#565674' : '#1b1b29',
        boxShadow: state.isFocused ? '#474761' : '#1b1b29',
        color: '#1b1b29',
        '&:hover': {
            borderColor: state.isFocused ? 'white' : 'white',
        },
    }),
    option: (base: any, state: any) => ({
        ...base,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'gray',
        padding: 10,
    }),
    multiValue: (base: any) => {
        return {
            ...base,
            backgroundColor: '#white',
        }
    },
    multiValueRemove: (base: any) => ({
        ...base,
        color: 'gray',
        // ':hover': {
        //   backgroundColor: data.color,
        //   color: 'white',
        // },
    }),

    multiValueLabel: (base: any) => ({
        ...base,
        color: 'white',
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: 0,
        marginTop: 0,
        color: 'white',
        background: '#1b1b29',
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0,
        color: 'white',
    }),
}
const animatedComponents = makeAnimated()

//   async function postSite() {
//     console.log('posting');
//   }

// const {state} = useLocation();

const ConfSite = () => {
    useEffect(() => {
        getCategorys()
    }, [])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [show, setShow] = useState(false)
    const [categorys, setCategorys] = useState<Tag[]>([])
    const navigate = useNavigate()
    const [unbicacionBucket, setUbicacionBucket] = useState('')
    const [ArchivoPermitido, setArchivoPermitido] = useState('')
    const [nombreJson, setNombreJson] = useState('')
    const [site, setSite] = useState({
        id_sitio: 0,
        nombre: '',
        descripcion: '',
        ubicacion: '',
        geoX: '',
        geoY: '',
        portada_path: '',
        estado: 0,
        creado: new Date(),
        editado: new Date(),
        categorias: [{id_categoria: 1, nombre: 's', estado: 0}],
        id_municipio: 1,
        favorito: false,
        publicado: false,
        oculto: false,
        geo_json: '',
        cercania_activa: false,
        telefono: '',
        website: '',
        qr_image_path: '',
        publicar_web: false,
        publicar_movil: false,
    })
    const [status, setStatus] = useState<status>({
        id_sitio: site.id_sitio,
        favorito: site.favorito,
        publicado: site.favorito,
        oculto: site.oculto,
        cercania_activa: site.cercania_activa,
        publicar_web: site.publicar_web,
        publicar_movil: site.publicar_movil,
    })

    async function getCategorys() {
        const category: any = await getData(categorysMethod)
        category.map((cat: any) => {
            categorys.push({value: cat.id_categoria, label: cat.nombre})
        })
        // console.log(category)
    }

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    }

    const handleChange = (event: any) => {
        var arrtempo: [
            {
                id_categoria: number
                nombre: string
                estado: number
            }
        ] = [{id_categoria: 1, nombre: 's', estado: 0}]
        arrtempo.shift()

        event.map((cat: any) => {
            arrtempo.push({id_categoria: cat.value, nombre: cat.label, estado: 1})
        })
        setSite({
            id_sitio: site.id_sitio,
            nombre: site.nombre,
            descripcion: site.descripcion,
            ubicacion: site.ubicacion,
            geoX: site.geoX,
            geoY: site.geoY,
            portada_path: site.portada_path,
            estado: site.estado,
            creado: site.creado,
            editado: site.editado,
            categorias: arrtempo,
            id_municipio: site.id_municipio,
            favorito: status.favorito,
            publicado: status.publicado,
            oculto: status.oculto,
            geo_json: site.geo_json,
            cercania_activa: site.cercania_activa,
            telefono: site.telefono,
            website: site.website,
            qr_image_path: site.qr_image_path,
            publicar_web: status.publicar_web,
            publicar_movil: status.publicar_movil,
        })

        // console.log(site);
    }
    //methods to post data to api------------------------------------------------------

    async function postSite(sitee: any, tipo: string) {
        if (
            site.nombre != '' &&
            site.geoX != '' &&
            site.geoY != '' &&
            site.ubicacion != '' &&
            site.portada_path != '' &&
            site.geo_json != ''
        ) {
            const sit: any = await postData(sitesMethod + '/add', sitee)
            console.log(sit)
            console.log(sitee)
            navigate(`/template/sitio/${tipo}/${sit.id_sitio}`)
        } else {
            alertNotNullInputs()
        }
    }
    async function postDefault(route: string, object: any) {
        const sit: any = await postData(route, object)
    }
    // const changeStatus = (favorito: boolean, publicado: boolean, oculto: boolean) => {
    //     setStatus({
    //         id_sitio: site.id_sitio,
    //         favorito: favorito,
    //         publicado: publicado,
    //         oculto: oculto,
    //         cercania_activa: site.cercania_activa,
    //     })
    //     // console.log(status)
    //     postDefault(statesMethod, status)
    //     // const getSites = async () => {
    //     //   const site: any = await getData(sitesMethod)
    //     //   console.log(site)
    //     // }
    // }

    //alert methods-----------------------------------------------------------------------
    const discardChanges = async () => {
        swal({
            title: '¿Estas seguro de Descartar Los Cambios ?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                swal({
                    text: 'Descartado Correctamente',
                    icon: 'success',
                    timer: 2000,
                })
                navigate('/sitios')
            }
        })
    }

    // UPLOAD IMAGE-------------------------------------------------------------------------

    const uploadImage = async (imagen: string) => {
        if (ArchivoPermitido == '.json') {
            site.geo_json = URLAWS + 'sitePages/GeoJSON/' + imagen
            setNombreJson(imagen)
        } else {
            site.portada_path = URLAWS + 'sitePages/' + imagen
        }
        if (imagen != '') {
            setModalupIMG(false)
        }
    }
    const [modalupimg, setModalupIMG] = useState(false)

    return (
        <>
            <div className=' '>
                <div
                    className='row '
                    style={{
                        backgroundColor: '#1A1A27',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-6 col-lg-6  py-5 px-9'>
                        <div id='center'>
                            <Link to={'/sitios'}>
                                <i
                                    className='fa-solid fa-chevron-left background-button '
                                    id='center2'
                                    style={{display: 'flex', marginRight: '6px', color: '#FFFFFF'}}
                                ></i>
                            </Link>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex  py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end'>
                                <li className='nav-item'>
                                    <i
                                        className={
                                            'fa-regular fa-star background-button'
                                            // status.favorito == false
                                            //   ? 'fa-regular fa-star background-button'
                                            // : 'fas fa-star background-button'
                                        }
                                        id='center2'
                                        // onClick={() => {
                                        //   status.favorito == false
                                        //     ? changeStatus(true, status.publicado, status.oculto)
                                        //     : changeStatus(false, status.publicado, status.oculto)
                                        // }}
                                        style={{
                                            color: '#4F4B4B',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></i>
                                </li>
                                <li className='nav-item'>
                                    <i
                                        className='fa-solid fa-qrcode background-button '
                                        id='center2'
                                        // onClick={handleShow}
                                        style={{
                                            color: '#4F4B4B',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></i>
                                </li>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Escanee su Código QR</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Card.Img src='https://res.cloudinary.com/dte7upwcr/image/upload/blog/blog2/como-crear-codigo-qr/codigo-qr.jpg'></Card.Img>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant='secondary' onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <i
                                    className={
                                        'fa-solid fa-eye background-button'
                                        // status.oculto == false
                                        //   ? 'fa-solid fa-eye-slash background-button'
                                        //   : 'fa-solid fa-eye background-button'
                                    }
                                    id='center2'
                                    // onClick={() => {
                                    //   status.oculto == false
                                    //     ? changeStatus(status.favorito, status.publicado, true)
                                    //     : changeStatus(status.favorito, status.publicado, false)
                                    // }}
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></i>
                                <i
                                    className='fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        discardChanges()
                                    }}
                                    style={{color: '#FFFFFF', display: 'flex', marginRight: '4px'}}
                                ></i>
                                <i
                                    className='fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        // postSite(site)
                                        // navigate('/site')
                                    }}
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></i>

                                <i
                                    // onClick={() => {
                                    //   status.publicado == false
                                    //     ? changeStatus(status.favorito, true, status.oculto)
                                    //     : changeStatus(status.favorito, false, status.oculto)
                                    // }}
                                    className={
                                        'fa-solid fa-upload background-button'
                                        // status.publicado == false
                                        //   ? 'fa-solid fa-download background-button'
                                        //   : 'fa-solid fa-upload background-button'
                                    }
                                    id='center2'
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></i>
                                {/* <i className='fa-solid fa-gear background-button' id='center2' style={{ color: '#4F4B4B', display: 'flex', marginRight: '4px' }}></i> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h1 style={{color: 'white', fontSize: '18px'}}>Configuración del sitio</h1>
            <h5 style={{color: '#565674', fontSize: '14px'}}>
                Lista de Sitios - Configuración del Sitio
            </h5>
            <br />
            <div className='row'>
                <div className='card centrado'>
                    <div className='centrado'>
                        <br></br>
                        <br />
                        <div className='card-header row'>
                            <div className='card div-image col-xs-12 col-md-3 col-lg-3'>
                                <br></br>
                                <Card.Img
                                    src={site.portada_path == '' ? logo : site.portada_path}
                                    alt='...'
                                    className='card-img-top img1'
                                    onClick={
                                        site.portada_path == ''
                                            ? (e) => {
                                                  setArchivoPermitido('image/*')
                                                  setUbicacionBucket('sitePages')
                                                  setModalupIMG(true)
                                              }
                                            : (e) => {}
                                    }
                                />

                                <div>
                                    <div className='card-body '>
                                        <Row>
                                            <Col>
                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                            </Col>

                                            <Col>
                                                <Link
                                                    className='bi bi-arrow-left-right background-button text-info'
                                                    to={''}
                                                    onClick={() => {
                                                        setArchivoPermitido('image/*')
                                                        setUbicacionBucket('sitePages')
                                                        setModalupIMG(true)
                                                    }}
                                                ></Link>
                                            </Col>
                                            <Col>
                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                            </Col>
                                            <Col>
                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                            </Col>
                                            <Col>
                                                <Link
                                                    className='bi bi-trash background-button text-danger'
                                                    to={''}
                                                    onClick={() =>
                                                        setSite({
                                                            id_sitio: site.id_sitio,
                                                            nombre: site.nombre,
                                                            descripcion: site.descripcion,
                                                            ubicacion: site.ubicacion,
                                                            geoX: site.geoX,
                                                            geoY: site.geoY,
                                                            portada_path: '',
                                                            estado: site.estado,
                                                            creado: site.creado,
                                                            editado: site.editado,
                                                            categorias: site.categorias,
                                                            id_municipio: site.id_municipio,
                                                            favorito: site.favorito,
                                                            publicado: site.publicado,
                                                            oculto: site.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: site.cercania_activa,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.qr_image_path,
                                                            publicar_web: site.publicar_web,
                                                            publicar_movil: site.publicar_movil,

                                                        })
                                                    }
                                                ></Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-12 col-md-6 col-xl-4'>
                                <br></br>

                                <div id='is-relative'>
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Título
                                    </label>
                                    <br />
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={site.nombre == '' ? '' : site.nombre}
                                        style={{border: '0', fontSize: '18px', color: '#FFFFFF'}}
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSite({
                                                    id_sitio: site.id_sitio,
                                                    nombre: e.target.value,
                                                    descripcion: site.descripcion,
                                                    ubicacion: site.ubicacion,
                                                    geoX: site.geoX,
                                                    geoY: site.geoY,
                                                    portada_path: site.portada_path,
                                                    estado: site.estado,
                                                    creado: site.creado,
                                                    editado: site.editado,
                                                    categorias: site.categorias,
                                                    id_municipio: site.id_municipio,
                                                    favorito: site.favorito,
                                                    publicado: site.publicado,
                                                    oculto: site.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: site.cercania_activa,
                                                    telefono: site.telefono,
                                                    website: site.website,
                                                    qr_image_path: site.qr_image_path,
                                                    publicar_web: site.publicar_web,
                                                    publicar_movil: site.publicar_movil,
                                                })
                                            }
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr>
                                    <br></br>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                                GeoX
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                style={{
                                                    border: '0',
                                                    fontSize: '18px',
                                                    color: '#FFFFFF',
                                                }}
                                                value={site.geoX == '' ? '' : site.geoX}
                                                onChange={(e) => {
                                                    if (validateStringSoloNumeros(e.target.value)) {
                                                        setSite({
                                                            id_sitio: site.id_sitio,
                                                            nombre: site.nombre,
                                                            descripcion: site.descripcion,
                                                            ubicacion: site.ubicacion,
                                                            geoX: e.target.value,
                                                            geoY: site.geoY,
                                                            portada_path: site.portada_path,
                                                            estado: site.estado,
                                                            creado: site.creado,
                                                            editado: site.editado,
                                                            categorias: site.categorias,
                                                            id_municipio: site.id_municipio,
                                                            favorito: site.favorito,
                                                            publicado: site.publicado,
                                                            oculto: site.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: site.cercania_activa,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.qr_image_path,
                                                            publicar_web: site.publicar_web,
                                                            publicar_movil: site.publicar_movil,
                                                        })
                                                    }
                                                }}
                                            />
                                            <hr style={{position: 'relative', top: '-20px'}}></hr>
                                        </div>
                                        <div className='col-6'>
                                            <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                                GeoY
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control'
                                                style={{
                                                    border: '0',
                                                    fontSize: '18px',
                                                    color: '#FFFFFF',
                                                }}
                                                value={site.geoY == '' ? '' : site.geoY}
                                                onChange={(e) => {
                                                    if (validateStringSoloNumeros(e.target.value)) {
                                                        setSite({
                                                            id_sitio: site.id_sitio,
                                                            nombre: site.nombre,
                                                            descripcion: site.descripcion,
                                                            ubicacion: site.ubicacion,
                                                            geoX: site.geoX,
                                                            geoY: e.target.value,
                                                            portada_path: site.portada_path,
                                                            estado: site.estado,
                                                            creado: site.creado,
                                                            editado: site.editado,
                                                            categorias: site.categorias,
                                                            id_municipio: site.id_municipio,
                                                            favorito: site.favorito,
                                                            publicado: site.publicado,
                                                            oculto: site.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: site.cercania_activa,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.qr_image_path,
                                                            publicar_web: site.publicar_web,
                                                            publicar_movil: site.publicar_movil,
                                                        })
                                                    }
                                                }}
                                            />
                                            <hr style={{position: 'relative', top: '-20px'}}></hr>
                                        </div>
                                    </div>
                                    <br />
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Ubicación
                                    </label>
                                    <br></br>
                                    <input
                                        type='text'
                                        className='form-control'
                                        style={{border: '0', fontSize: '18px', color: '#FFFFFF'}}
                                        value={site.ubicacion != '' ? site.ubicacion : ''}
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSite({
                                                    id_sitio: site.id_sitio,
                                                    nombre: site.nombre,
                                                    descripcion: site.descripcion,
                                                    ubicacion: e.target.value,
                                                    geoX: site.geoX,
                                                    geoY: site.geoY,
                                                    portada_path: site.portada_path,
                                                    estado: site.estado,
                                                    creado: site.creado,
                                                    editado: site.editado,
                                                    categorias: site.categorias,
                                                    id_municipio: site.id_municipio,
                                                    favorito: site.favorito,
                                                    publicado: site.publicado,
                                                    oculto: site.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: site.cercania_activa,
                                                    telefono: site.telefono,
                                                    website: site.website,
                                                    qr_image_path: site.qr_image_path,
                                                    publicar_web: site.publicar_web,
                                                    publicar_movil: site.publicar_movil,
                                                })
                                            }
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr> 

                                    <br />
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Teléfono    
                                    </label>
                                    <br></br>
                                    <input
                                        type='number'
                                        className='form-control'
                                        style={{border: '0', fontSize: '18px', color: '#FFFFFF'}}
                                        value={site.telefono != '' ? site.telefono : ''}
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSite({
                                                    id_sitio: site.id_sitio,
                                                    nombre: site.nombre,
                                                    descripcion: site.descripcion,
                                                    ubicacion: site.ubicacion,
                                                    geoX: site.geoX,
                                                    geoY: site.geoY,
                                                    portada_path: site.portada_path,
                                                    estado: site.estado,
                                                    creado: site.creado,
                                                    editado: site.editado,
                                                    categorias: site.categorias,
                                                    id_municipio: site.id_municipio,
                                                    favorito: site.favorito,
                                                    publicado: site.publicado,
                                                    oculto: site.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: site.cercania_activa,
                                                    telefono: e.target.value,
                                                    website: site.website,
                                                    qr_image_path: site.qr_image_path,
                                                    publicar_web: site.publicar_web,
                                                    publicar_movil: site.publicar_movil,
                                                })
                                            }
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr> 

                                    <br />
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Sitio web
                                    </label>
                                    <br></br>
                                    <input
                                        type='text'
                                        className='form-control'
                                        style={{border: '0', fontSize: '18px', color: '#FFFFFF'}}
                                        value={site.website != '' ? site.website : ''}
                                        onChange={(e) => {
                                           
                                                setSite({
                                                    id_sitio: site.id_sitio,
                                                    nombre: site.nombre,
                                                    descripcion: site.descripcion,
                                                    ubicacion: site.ubicacion,
                                                    geoX: site.geoX,
                                                    geoY: site.geoY,
                                                    portada_path: site.portada_path,
                                                    estado: site.estado,
                                                    creado: site.creado,
                                                    editado: site.editado,
                                                    categorias: site.categorias,
                                                    id_municipio: site.id_municipio,
                                                    favorito: site.favorito,
                                                    publicado: site.publicado,
                                                    oculto: site.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: site.cercania_activa,
                                                    telefono: site.telefono,
                                                    website: e.target.value,
                                                    qr_image_path: site.qr_image_path,
                                                    publicar_web: site.publicar_web,
                                                    publicar_movil: site.publicar_movil,
                                                })
                                            
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr>

                                    <label>Etiquetas</label>
                                    <br />
                                    <div className='form-control'>
                                        <Select
                                            closeMenuOnSelect={false}
                                            styles={customStyles}
                                            components={animatedComponents}
                                            // defaultValue={[options[4], options[5]]}
                                            isMulti
                                            options={categorys}
                                            onChange={handleChange}
                                        ></Select>
                                    </div>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Label>Adjuntar GeoJSON</Form.Label>
                                        <Card
                                            className='mb-4'
                                            style={{
                                                backgroundColor: '#151521',
                                                height: '50px',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                            }}
                                            onClick={() => {
                                                setArchivoPermitido('.geojson')
                                                setUbicacionBucket('sitePages/GeoJSON')
                                                setModalupIMG(true)
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <i className='bi bi-file-earmark-arrow-up-fill svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3' />

                                                    <div>
                                                        {site.geo_json == ''
                                                            ? 'Subir GeoJSON'
                                                            : nombreJson}
                                                    </div>
                                                </div>

                                                <div>
                                                    <KTSVG
                                                        path='/media/icons/duotune/general/gen035.svg'
                                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3'
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                        <div style={{textAlign: 'center', color: 'gray'}}>
                                            Formato permitido: .json
                                        </div>
                                    </Form.Group>
                                    <br></br>
                                </div>
                            </div>
                            <div className='col-xs-12 col-md-12 col-xl-5 mb-5'>
                                <div className='row mt-6 gx-10 m-auto'>
                                    <div className=' col-md-6 col-xs-12 col-lg-6'>
                                        <div className='row'>
                                            <h2
                                                className='col-md-12 mt-5 text-center'
                                                style={{fontSize: '18px'}}
                                            >
                                                Sitio Móvil
                                            </h2>
                                        </div>
                                        <br></br>
                                        <div className='row text-center'>
                                            <i
                                                className=' fa-solid fa-mobile-screen-button text-info fa-10x 
                        text-center '
                                            ></i>
                                        </div>
                                        <br></br>
                                        <br />
                                        <div className='row'>
                                            <p className=' col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión móvil.
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                onClick={() => {
                                                    postSite(site, 'movil')
                                                }}
                                                className='btn btn-info col-md-12 col-sm-12 col-lg-12'
                                            >
                                                {' '}
                                                <i className='fa-solid fa-pencil'></i> Crear
                                            </Button>
                                        </div>
                                    </div>
                                    <div className=' col-md-6 col-xs-12 col-lg-6'>
                                        <div className='row text-center'>
                                            <h2
                                                className='col-md-12 text-center mt-5'
                                                style={{fontSize: '18px'}}
                                            >
                                                Sitio Web
                                            </h2>
                                        </div>
                                        <br />
                                        <div className='row text-center'>
                                            <i className='col-md-6 offset-md-2 fa-solid fa-display text-secondary fa-10x text-align-center'></i>
                                        </div>
                                        <br></br>
                                        <br />
                                        <div className='row'>
                                            <p className=' col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión web
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                className='btn btn-secondary  col-md-12 col-sm-12 col-lg-12'
                                                onClick={() => {
                                                    //   navigate('/site')
                                                    postSite(site, 'web')
                                                }}
                                            >
                                                <i className='fa-solid fa-pencil '></i> Crear
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className='row'>
                {/* <h3>Puntos de interés</h3>
      <Interes id_sitio={site.id_sitio} /> */}
            </div>
            <UpImage
                show={modalupimg}
                onClose={() => {
                    setArchivoPermitido('')
                    setUbicacionBucket('')
                    setModalupIMG(false)
                }}
                cargarIMG={uploadImage}
                ubicacionBucket={unbicacionBucket}
                tipoArchivoPermitido={ArchivoPermitido}
            />
        </>
    )
}

export default ConfSite
