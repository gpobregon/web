import React, {FC, useEffect, useState} from 'react'
import {Col, Card, Button, Row, Modal, Form} from 'react-bootstrap'
import {
    postData,
    addNewPointInteres,
    getValue,
    sitesMethod,
    URLAWS,
    getData,
    languagesMethod,
} from '../../../../services/api'
import swal from 'sweetalert'
import makeAnimated from 'react-select/animated'
import Moment from 'moment'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {status} from '../../../../models/status'
import UpImage from '../../../uploadFile/upload-image'
import logo from '../../upload-image_03.jpg'
import {CatalogLanguage} from '../../../../models/catalogLanguage'

import Select from 'react-select'
import {validateStringSinCaracteresEspeciales} from '../../../validarCadena/validadorCadena'
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

type datosPuntoInteres = {
    id_sitio: number
    id_guia: number // id de la sala
    nombreSala: string
}
const animatedComponents = makeAnimated()
const AddPoint = () => {
    const navigate = useNavigate()
    const handleClose = () => setShow(false) //modal close qr
    const handleShow = () => setShow(true) //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    const {state} = useLocation()
    const [datospuntoInteres, setdatosPuntoInteres] = useState(state as datosPuntoInteres)
    const [sitio, setSitio] = useState({
        id_sitio: datospuntoInteres.id_sitio,
        descripcion: '',
        id_lenguaje: 0,
        nombre: '',
        geoX: '',
        geoY: '',
        portada_path: '',
        qr_path: '',
        es_portada_de_sitio: false,
        estado: 1,
        id_guia: datospuntoInteres.id_guia,
    })
    const [languages, setLanguages] = useState<CatalogLanguage[]>([])
    // useEffect(() => {
    //   console.log(sitio)
    // }, []);

    const [status, setStatus] = useState<status>({
        id_sitio: 0,
        favorito: true,
        publicado: true,
        oculto: false,
        cercania_activa: false,
        publicar_web: false,
        publicar_movil: false,
    })
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
                navigate(`/sitios/editSite/${datospuntoInteres.id_sitio}`)
            }
        })
    }
    const saveChanges = async () => {
        swal({
            title: '¿Quiere Seguir Editando ?',
            icon: 'warning',
            buttons: ['Sí', 'No'],
        }).then((res) => {
            if (res) {
                swal({
                    text: 'Descartado Correctamente',
                    icon: 'success',
                    timer: 2000,
                })
                navigate(`/sitios/editSite/${datospuntoInteres.id_sitio}`)
            }
        })
    }
    //petitions----------------------------------------------------------------------------
    const addNewPoint = async (tipo: string) => {
        // console.log(sitio)
        if (sitio.nombre != '' && sitio.id_lenguaje != 0 && sitio.portada_path != '') {
            const res: any = await postData(addNewPointInteres, sitio)
            //    console.log(res)

            navigate(`/template/punto/${sitio.id_sitio}/${tipo}/${res.point.id_punto}`, {
                state: sitio,
            })
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
    //get sitio-------------------------------------------------------------------------------------
    const [sitios, setSitios] = useState()
    useEffect(() => {
        getSites()
        getLanguages()
    }, [])

    const getSites = async () => {
        const site: any = await getValue(sitesMethod, datospuntoInteres.id_sitio)

        setSitios(site.site)
    }
    // UPLOAD IMAGE-------------------------------------------------------------------------
    const [modalupimg, setModalupIMG] = useState(false)
    const uploadImage = async (imagen: string) => {
        setSitio({
            id_sitio: datospuntoInteres.id_sitio,
            descripcion: sitio.descripcion,
            id_lenguaje: sitio.id_lenguaje,
            nombre: sitio.nombre,
            geoX: sitio.geoX,
            geoY: sitio.geoY,
            portada_path: URLAWS + 'sitePages/' + imagen,
            qr_path: sitio.qr_path,
            es_portada_de_sitio: sitio.es_portada_de_sitio,
            estado: sitio.estado,
            id_guia: datospuntoInteres.id_guia,
        })

        // console.log(sitio)
        if (imagen != '') {
            setModalupIMG(false)
        }
    }
    //GET LANNUGAGES---------------------------------------------------------------------------------

    const getLanguages = async () => {
        const language: any = await getData(languagesMethod)
        setLanguages(language.data as CatalogLanguage[])
        // console.log(language)
    }

    const languagesOptions = languages?.map((language) => ({
        value: language.id_lenguaje,
        label: language.nombre,
    }))

    const handleChangeLanguage = (event: any) => {
        sitio.id_lenguaje = event.value
        // console.log(sitio)
    }
    return (
        <>
            <div className=' '>
                <div
                    className='row'
                    style={{backgroundColor: '#1A1A27', backgroundSize: 'auto 100%'}}
                >
                    <div className='col-xs-12 col-md-5 col-lg-6 d-flex  py-5 px-9'>
                        <div id='center'>
                            <i
                                className='text-white fa-solid fa-less-than background-button '
                                id='center2'
                                style={{display: 'flex', marginRight: '6px'}}
                                onClick={(event) => {
                                    discardChanges()
                                }}
                            ></i>
                        </div>
                        <div id='center'>
                            {/* {site.nombre != '' ? (
                <span className='font-size: 10rem; '>
            <h1 style={{marginTop:'10px',marginRight:'5px'}} >{   site.nombre }</h1> 
               
                  
                </span>
              ) : (
                <p></p>
              )} */}
                        </div>
                        <div id='center'>
                            {/* <p style={{marginTop:'16px'}} > Ultima vez editado el {Moment(site.editado).format('DD/MM/YYYY hh:mm') + ' '} por{' '}</p>  */}
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex  py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>
                                <li className='nav-item'>
                                    <Button
                                        disabled
                                        className={
                                            status.favorito == false
                                                ? 'btn-secondary fa-regular fa-star background-button'
                                                : 'btn-secondary fas fa-star background-button'
                                        }
                                        id='center2'
                                        onClick={() => {
                                            // changeStatus(status.favorito, status.publicado, status.oculto)
                                        }}
                                        style={{
                                            color: '#4F4B4B',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </li>
                                <li className='nav-item'>
                                    <Button
                                        disabled
                                        className='btn-secondary fa-solid fa-qrcode background-button '
                                        id='center2'
                                        onClick={handleShow}
                                        style={{
                                            color: '#4F4B4B',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </li>

                                <Button
                                    disabled
                                    className={
                                        status.oculto == false
                                            ? 'btn-secondary fa-solid fa-eye-slash background-button'
                                            : 'btn-secondary fa-solid fa-eye background-button'
                                    }
                                    id='center2'
                                    onClick={() => {}}
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    className='btn-secondary fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        // var n = window.confirm('Esta seguro que descartar cambios?')
                                        // if (n == true) {
                                        //     window.location.href = "../sitios";
                                        // } else {
                                        // }

                                        discardChanges()
                                    }}
                                    style={{color: '#FFFFFF', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    disabled
                                    className='btn-secondary fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        // console.log('site')
                                        // saveChanges();
                                        // console.log(site)
                                        // navigate('/site')
                                    }}
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></Button>

                                <Button
                                    onClick={() => {
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)
                                        // changeStatus(status.favorito, status.publicado, status.oculto)
                                    }}
                                    disabled
                                    className={
                                        status.publicado == false
                                            ? 'btn-secondary fa-solid fa-download background-button'
                                            : 'btn-secondary fa-solid fa-upload background-button'
                                    }
                                    id='center2'
                                    style={{color: '#4F4B4B', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                {/* <Button disabled className='btn-secondary fa-solid fa-gear background-button' id='center2' style={{ color: '#4F4B4B', display: 'flex' }}></Button> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h1 style={{color: 'white', fontSize: '18px'}}>Configuración del punto de interes</h1>
            <h5 style={{color: '#565674', fontSize: '14px'}}>
                Lista de Sitios - Configuración del punto de interes
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
                                    src={sitio.portada_path == '' ? logo : sitio.portada_path}
                                    alt='...'
                                    className='card-img-top img1'
                                    onClick={
                                        sitio.portada_path == ''
                                            ? (e) => {
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
                                                    onClick={() => {
                                                        setModalupIMG(true)
                                                    }}
                                                    to={''}
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
                                                        setSitio({
                                                            id_sitio: datospuntoInteres.id_sitio,
                                                            descripcion: sitio.descripcion,
                                                            id_lenguaje: sitio.id_lenguaje,
                                                            nombre: sitio.nombre,
                                                            geoX: sitio.geoX,
                                                            geoY: sitio.geoY,
                                                            portada_path: '',
                                                            qr_path: sitio.qr_path,
                                                            es_portada_de_sitio:
                                                                sitio.es_portada_de_sitio,
                                                            estado: sitio.estado,
                                                            id_guia: sitio.id_guia,
                                                        })
                                                    }
                                                ></Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xs-12 col-md-6 col-xl-4'>
                                <div id='is-relative'>
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Sala a la que Pertenece
                                    </label>
                                    <br></br>
                                    <br />
                                    <input
                                        type='text'
                                        className='form-control'
                                        disabled
                                        style={{border: '0', fontSize: '14px', color: '#92929F'}}
                                        value={datospuntoInteres.nombreSala}
                                    ></input>

                                    <br></br>
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Nombre del punto de interés
                                    </label>
                                    <br />
                                    <br />
                                    <input
                                        type='text'
                                        className='form-control'
                                        style={{
                                            border: '1px',
                                            fontSize: '14px',
                                            color: '#92929F',
                                            background: '#1B1B29',
                                        }}
                                        // value={site.nombre == '' ? '' : site.nombre}
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSitio({
                                                    id_sitio: datospuntoInteres.id_sitio,
                                                    descripcion: sitio.descripcion,
                                                    id_lenguaje: sitio.id_lenguaje,
                                                    nombre: e.target.value,
                                                    geoX: sitio.geoX,
                                                    geoY: sitio.geoY,
                                                    portada_path: sitio.portada_path,
                                                    qr_path: sitio.qr_path,
                                                    es_portada_de_sitio: sitio.es_portada_de_sitio,
                                                    estado: sitio.estado,
                                                    id_guia: sitio.id_guia,
                                                })
                                            }
                                        }}
                                    ></input>

                                    <div className='row mt-5'>
                                        <div className='col-6'>
                                            <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                                GeoX
                                            </label>
                                            <input
                                                type='number'
                                                className='form-control'
                                                style={{
                                                    border: '0',
                                                    fontSize: '18px',
                                                    color: '#FFFFFF',
                                                }}
                                                value={sitio.geoX == '' ? '' : sitio.geoX}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setSitio({
                                                            id_sitio: datospuntoInteres.id_sitio,
                                                            descripcion: sitio.descripcion,
                                                            id_lenguaje: sitio.id_lenguaje,
                                                            nombre: sitio.nombre,
                                                            geoX: e.target.value,
                                                            geoY: sitio.geoY,
                                                            portada_path: sitio.portada_path,
                                                            qr_path: sitio.qr_path,
                                                            es_portada_de_sitio:
                                                                sitio.es_portada_de_sitio,
                                                            estado: sitio.estado,
                                                            id_guia: sitio.id_guia,
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
                                                type='number'
                                                className='form-control'
                                                style={{
                                                    border: '0',
                                                    fontSize: '18px',
                                                    color: '#FFFFFF',
                                                }}
                                                value={sitio.geoY == '' ? '' : sitio.geoY}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setSitio({
                                                            id_sitio: datospuntoInteres.id_sitio,
                                                            descripcion: sitio.descripcion,
                                                            id_lenguaje: sitio.id_lenguaje,
                                                            nombre: sitio.nombre,
                                                            geoX: sitio.geoX,
                                                            geoY: e.target.value,
                                                            portada_path: sitio.portada_path,
                                                            qr_path: sitio.qr_path,
                                                            es_portada_de_sitio:
                                                                sitio.es_portada_de_sitio,
                                                            estado: sitio.estado,
                                                            id_guia: sitio.id_guia,
                                                        })
                                                    }
                                                }}
                                            />
                                            <hr style={{position: 'relative', top: '-20px'}}></hr>
                                        </div>
                                    </div>

                                    <br />
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Selecciona Lenguaje
                                    </label>
                                    <br />
                                    <br />

                                    <Select
                                        options={languagesOptions}
                                        styles={customStyles}
                                        components={animatedComponents}
                                        onChange={handleChangeLanguage}
                                    />
                                    <br />

                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Descripcion
                                    </label>
                                    <Form.Control
                                        as='textarea'
                                        placeholder='Escribe una descripcion aqui'
                                        style={{height: '100px'}}
                                        defaultValue={
                                            sitio.descripcion == '' ? '' : sitio.descripcion
                                        }
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSitio({
                                                    id_sitio: datospuntoInteres.id_sitio,

                                                    descripcion: e.target.value,
                                                    id_lenguaje: sitio.id_lenguaje,
                                                    nombre: sitio.nombre,
                                                    geoX: sitio.geoX,
                                                    geoY: sitio.geoY,
                                                    portada_path: sitio.portada_path,
                                                    qr_path: sitio.qr_path,
                                                    es_portada_de_sitio: sitio.es_portada_de_sitio,
                                                    estado: sitio.estado,
                                                    id_guia: sitio.id_guia,
                                                })
                                            }
                                        }}
                                    />

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
                                            <p className='  col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión móvil.
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                onClick={() => {
                                                    addNewPoint('movil')
                                                    // console.log(sitio)
                                                    // window.location.href = "../sitios";

                                                    // console.log(
                                                    //     'creado con el boton de sitio mobil'
                                                    // )
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
                                            <p className='  col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión web
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                className='btn btn-secondary  col-md-12 col-sm-12 col-lg-12'
                                                onClick={() => {
                                                    addNewPoint('web')
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
                <UpImage
                    show={modalupimg}
                    onClose={() => setModalupIMG(false)}
                    cargarIMG={uploadImage}
                    ubicacionBucket={'sitePages'}
                    tipoArchivoPermitido={'image/*'}
                />
            </div>
        </>
    )
}

export default AddPoint
