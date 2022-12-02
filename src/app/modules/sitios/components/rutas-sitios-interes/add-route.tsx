import {useContext, useEffect, useState} from 'react'
import {Card, Col, Form, Row} from 'react-bootstrap'
import swal from 'sweetalert'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {Paso} from '../../../../models/paso'
import {Route} from '../../../../models/ruta'
import {
    addImagePrincipal,
    addImages,
    addPasos,
    getData,
    getRolesMethod,
    languagesMethod,
    ObtenerRuta,
    postData,
    URLAWS,
} from '../../../../services/api'
import logo from '../../upload-image_03.jpg'
import logo2 from '../../upload-image-h_04.jpg'
import UpImage from '../../../uploadFile/upload-image'
import {Imagen} from '../../../../models/imagenes'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {CatalogLanguage} from '../../../../models/catalogLanguage'
import {roleManager} from '../../../../models/roleManager'
import {Auth} from 'aws-amplify'
import {validateStringSinCaracteresEspeciales} from '../../../validarCadena/validadorCadena'
import {LoadingContext} from '../../../../utility/component/loading/context'
import { DeleteImage } from '../../../deleteFile/delete-image'
type datosPuntoInteres2 = {
    id_punto: number
    lenguajes: [
        {
            id_punto: number
            id_lenguaje: number
            descripcion: string
        }
    ]
    id_sitio: number

    nombre: string
    descripcion: string
    geoX: number
    geoY: number
    portada_path: string
    qr_path: string
    es_portada_de_sitio: boolean
    estado: boolean
    es_visible: boolean
    publicado: boolean
    nombreSala: string
}

type datosPuntoInteres = {
    id_punto_a: number
    id_punto_b: number
    id_sitio: number
    nombre_punto_a: string
    nombre_punto_b: string
}
const AddRoute = () => {
    const {state} = useLocation()
    const [puntos, setpuntos] = useState(state as datosPuntoInteres)
    const [ruta, setruta] = useState<Route>()

    const [getimg, setGetimg] = useState<Imagen>({
        id_punto_a: 0,
        id_punto_b: 0,
        imagen_ref1: '',
        imagen_ref2: '',
        imagen_ref3: '',
    })
    const [modalupimg, setModalupIMG] = useState(false)
    const [agregrarPaso, setagregrarPaso] = useState<any>([])

    const [imgprincipal, setImgprincipal] = useState({
        id_punto_a: puntos.id_punto_a,
        id_punto_b: puntos.id_punto_b,
        img_principal: '',
    })
    const [lenguajes, setLenguajes] = useState({
        id_lenguaje: 0,
    })
    const obtenerRuta = async () => {
        const route: any = await postData(ObtenerRuta, {
            id_punto_a: puntos.id_punto_a,
            id_punto_b: puntos.id_punto_b,
            id_lenguaje: lenguajes.id_lenguaje,
        })
        setruta(route)
        setagregrarPaso(route.pasos)
        // console.log(route)

        // console.log(getimg)
        if (getimg.imagen_ref1 === '' && getimg.imagen_ref2 === '' && getimg.imagen_ref3 === '') {
            setGetimg({
                id_punto_a: puntos.id_punto_a,
                id_punto_b: puntos.id_punto_b,
                imagen_ref1: route.imagen_ref1,
                imagen_ref2: route.imagen_ref2,
                imagen_ref3: route.imagen_ref3,
            })
            imgprincipal.img_principal = route.img_principal
        }
    }
    const [imgtempomodal, setImgtempomodal] = useState({
        imagen1: '',
        imagen2: '',
        imagen3: '',
    })
    const savechnage = async () => {
        // addImagePrincipal
        // addImages
        if (lenguajes.id_lenguaje != 0) {
            // if (imgprincipal.img_principal != '') {
            if (getimg.imagen_ref1 === null) {
                getimg.imagen_ref1 = ''
            }
            if (getimg.imagen_ref2 === null) {
                getimg.imagen_ref2 = ''
            }
            if (getimg.imagen_ref3 === null) {
                getimg.imagen_ref3 = ''
            }
            // console.log(getimg)
            await postData(addImagePrincipal, imgprincipal)
            await postData(addImages, getimg)
            // } else {
            //     swal('Error', 'Falta agregar alguna imagen', 'error')
            //     return
            // }

            await postData(addPasos, {
                id_punto_a: ruta?.id_punto_a,
                id_punto_b: ruta?.id_punto_b,
                pasos: agregrarPaso,
                id_lenguaje: lenguajes.id_lenguaje,
            })
            swal({
                title: '¿Quiere seguir editando ?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then(async (res) => {
                if (res) {
                    swal({
                        text: 'Se Guardó guía correctamente ',
                        icon: 'success',
                        timer: 2000,
                    })
                } else {
                    navigate(`/sitios/edit-point-interes/${puntos.id_sitio}/${puntos.id_punto_a}`)
                }
            })
        } else {
            swal('Error', 'Falta seleccionar el lenguaje', 'error')
        }
        // const g = await postData(addImages, imganes)
        // const a = await postData(addPasos, { id_punto_a: ruta?.id_punto_a, id_punto_b: ruta?.id_punto_b, pasos: agregrarPaso })
        // console.log(imganes)
        // console.log(imgprincipal)
        // console.log(agregrarPaso)
        // console.log(a)
        // var newArray = arrayimagenes.filter((item) => item.id_image !== 1);
        // console.log(newArray);
    }

    const [id, setId] = useState<number>(0)
    const [numeroImg, setnumeroImg] = useState<number>(0)
    const [contador, setContador] = useState<number>(0)
    const navigate = useNavigate()

    const uploadImage = async (imagen: string) => {
        if (imagen != '') {
            if (numeroImg === 1) {
                getimg.imagen_ref1 = URLAWS + 'sitePages/' + imagen
            } else if (numeroImg === 2) {
                getimg.imagen_ref2 = URLAWS + 'sitePages/' + imagen
            } else if (numeroImg === 3) {
                getimg.imagen_ref3 = URLAWS + 'sitePages/' + imagen
            } else if (numeroImg === 0) {
                imgprincipal.img_principal = URLAWS + 'sitePages/' + imagen
            }

            setModalupIMG(false)
        }
    }
    //Selecciona idoma de la guia
    const [languages, setLanguages] = useState<CatalogLanguage[]>([])
    const getLanguages = async () => {
        const language: any = await getData(languagesMethod)
        setLanguages(language.data as CatalogLanguage[])
        // console.log(language)
    }
    const languagesOptions = languages?.map((language) => ({
        value: language.id_lenguaje,
        label: language.nombre,
    }))

    useEffect(() => {
        if (contador === 0) {
            // obtenerRuta()
            getLanguages()
        }
    }, [contador])

    //estilo select de idioma ==============================
    const animatedComponents = makeAnimated()
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
    // seleccionar idioma de la guia ==============================
    const handleChangeLanguage = async (e: any) => {
        lenguajes.id_lenguaje = e.value
        setagregrarPaso([])
        await obtenerRuta()
        // console.log(lenguajes.id_lenguaje)
    }
    // termina seleccionar idioma de la guia ==============================

    const telefonosHandler = async (e: any, idx: any) => {
        const nuevaDesc = e.target.value
        const tempPasos = agregrarPaso

        tempPasos[idx].descripcion = nuevaDesc

        setagregrarPaso(tempPasos)
    }

    const deletePaso = async (idx: any) => {
        var editEstadopaso = agregrarPaso
        editEstadopaso[idx - 1].estado = 0

        await postData(addPasos, {
            id_punto_a: ruta?.id_punto_a,
            id_punto_b: ruta?.id_punto_b,
            pasos: editEstadopaso,
            id_lenguaje: lenguajes.id_lenguaje,
        })
        var newArray = agregrarPaso.filter((item: any) => item.id_paso !== idx)
        setagregrarPaso(newArray)
        setContador(contador - 1)
        // setagregrarPaso([])
        await obtenerRuta()
    }
    const addNewPaso = async () => {
        const a: any = await postData(addPasos, {
            id_punto_a: puntos.id_punto_a,
            id_punto_b: puntos.id_punto_b,
            pasos: agregrarPaso,
            id_lenguaje: lenguajes.id_lenguaje,
        })
        console.log(a)
        console.log({
            id_punto_a: puntos.id_punto_a,
            id_punto_b: puntos.id_punto_b,
            pasos: agregrarPaso,
            id_lenguaje: lenguajes.id_lenguaje,
        })
        await obtenerRuta()
    }

    //alert methods-----------------------------------------------------------------------
    const alerta = async () => {
        swal({
            title: 'Solo 5 pasos máximo',
            icon: 'error',
        })
    }
    const alerta2 = async () => {
        swal({
            title: 'Falta campos por completar',
            icon: 'error',
        })
    }
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
                navigate(`/sitios/edit-point-interes/${puntos.id_sitio}/${puntos.id_punto_a}`)
            }
        })
    }

    // * Restricción por rol
    const {setShowLoad} = useContext(LoadingContext)
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionCreateRouteSteps, setPermissionCreateRouteSteps] = useState(true)
    const [permissionEditRouteSteps, setPermissionEditRouteSteps] = useState(true)
    const [permissionDeleteRouteSteps, setPermissionDeleteRouteSteps] = useState(true)

    const [permissionCreateRouteImage, setPermissionCreateRouteImage] = useState(true)
    const [permissionEditRouteImage, setPermissionEditRouteImage] = useState(true)
    const [permissionDeleteRouteImage, setPermissionDeleteRouteImage] = useState(true)

    const [permissionCreateRouteMap, setPermissionCreateRouteMap] = useState(true)
    const [permissionEditRouteMap, setPermissionEditRouteMap] = useState(true)
    const [permissionDeleteRouteMap, setPermissionDeleteRouteMap] = useState(true)

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    const validateRole = async () => {
        setShowLoad(true)

        Auth.currentUserInfo().then((user) => {
            const filter = roles.filter((role) => {
                return user.attributes['custom:role'] === role.nombre
            })

            if (filter[0]?.sitio_editar === false) {
                navigate('/error/401', {replace: true})
            } else {
                setPermissionCreateRouteSteps(filter[0]?.sitio_punto_maquetar)
                setPermissionEditRouteSteps(filter[0]?.sitio_punto_maquetar)
                setPermissionDeleteRouteSteps(filter[0]?.sitio_punto_maquetar)

                setPermissionCreateRouteImage(filter[0]?.sitio_punto_maquetar)
                setPermissionEditRouteImage(filter[0]?.sitio_punto_maquetar)
                setPermissionDeleteRouteImage(filter[0]?.sitio_punto_maquetar)

                setPermissionCreateRouteMap(filter[0]?.sitio_punto_maquetar)
                setPermissionEditRouteMap(filter[0]?.sitio_punto_maquetar)
                setPermissionDeleteRouteMap(filter[0]?.sitio_punto_maquetar)
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    }

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
    }, [existRoles])

    // * Fin restricción por rol

    return (
        <>
            <div className=' '>
                <div
                    className='row'
                    style={{
                        backgroundColor: '#1A1A27',
                        backgroundSize: 'auto 100%',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-5 col-lg-6 d-flex py-5 px-9'>
                        <div id='center'>
                            <i
                                className='fa-solid fa-chevron-left background-button '
                                id='center2'
                                style={{display: 'flex', marginRight: '6px', color: '#FFFFFF'}}
                                onClick={() => {
                                    discardChanges()
                                }}
                            ></i>
                        </div>
                        <div id='center'>
                            <span className='font-size: 10rem; '>
                                <h3 style={{marginTop: '10px', marginRight: '20px'}}>
                                    Creacion de Ruta
                                </h3>
                            </span>
                        </div>
                        <div id='center'>
                            <p style={{marginTop: '13px', color: '#565674'}}>
                                {' '}
                                De Punto de interes {puntos.id_punto_a} a Punto de Interes{' '}
                                {puntos.id_punto_b}{' '}
                            </p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>
                                <i
                                    className='fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        discardChanges()
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></i>
                                <i
                                    className='fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        savechnage()
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></i>

                                {/* <i className='fa-solid fa-gear background-button' id='center2' style={{ color: '#92929F', display: 'flex' }}></i> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col'>
                    <h1 style={{color: 'white', fontSize: '18px'}}>Configuración del sitio</h1>
                    <h5 style={{color: '#565674', fontSize: '14px'}}>
                        Lista de Sitios - Configuración del Sitio
                    </h5>
                </div>
                <div className='col d-flex align-items-center justify-content-end'>
                    <Select
                        styles={customStyles}
                        components={animatedComponents}
                        options={languagesOptions}
                        placeholder={'Seleccione un lenguaje'}
                        onChange={handleChangeLanguage}
                    />
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='card centrado'>
                    <div className='centrado'>
                        <br></br>
                        <br />
                        <div className='card-header row'>
                            <div className='col-xs-12 col-md-5 col-lg-5'>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        color: '#92929F',
                                        background: '#28283D',
                                    }}
                                >
                                    {' '}
                                    Punto de Interes: {puntos.nombre_punto_a}
                                </label>
                                <i
                                    className='bi bi-arrow-right-short'
                                    style={{fontSize: '18px', color: '#FFFFFF'}}
                                ></i>
                                <label
                                    style={{
                                        fontSize: '18px',
                                        color: '#92929F',
                                        background: '#28283D',
                                    }}
                                >
                                    {' '}
                                    Punto de Interes: {puntos.nombre_punto_b}
                                </label>
                                <br></br>
                                <br></br>
                                <label style={{fontSize: '18px', color: '#FFFFFF'}}>
                                    Indicaciones para llegar
                                </label>

                                <br></br>
                                <br></br>
                                <hr style={{position: 'relative', top: '-20px'}}></hr>

                                {agregrarPaso?.map((item: any, index: any) => (
                                    <div key={index}>
                                        <div className='row mt-6 gx-10 m-auto'>
                                            <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                                Paso No {index + 1}
                                            </label>

                                            <div className=' col-md-11 col-xs-12 col-lg-11'>
                                                <div className='row'>
                                                    <Form.Control
                                                        as='textarea'
                                                        onLoad={async () => await validateRole()}
                                                        disabled={!permissionEditRouteSteps}
                                                        placeholder='Escribe una indicación para llegar a este punto.'
                                                        style={{width: '100%', height: '100px'}}
                                                        defaultValue={item.descripcion}
                                                        onChange={(e) => {
                                                            if (
                                                                validateStringSinCaracteresEspeciales(
                                                                    e.target.value
                                                                )
                                                            ) {
                                                                telefonosHandler(e, index)
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className=' col-md-1 col-xs-12 col-lg-1'>
                                                <div className='row '>
                                                    <Link
                                                        className='bi bi-trash background-button text-danger'
                                                        to={''}
                                                        onClick={async () => {
                                                            await validateRole()

                                                            if (!permissionDeleteRouteSteps) {
                                                                swal({
                                                                    title: 'No tienes permiso para eliminar pasos en la ruta',
                                                                    icon: 'warning',
                                                                })
                                                                return
                                                            }
                                                            deletePaso(index + 1)
                                                        }}
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <br></br>
                                <br></br>
                                <div className='row mt-6 gx-10 m-auto'>
                                    {lenguajes.id_lenguaje === 0 ? (
                                        <>
                                            <Card
                                                style={{
                                                    display: 'flex',
                                                    padding: 30,
                                                    borderStyle: 'dashed',
                                                    borderWidth: '1px',
                                                    borderColor: 'white',
                                                }}
                                            >
                                                <Card.Title
                                                    className='text-center'
                                                    style={{justifyContent: 'center'}}
                                                >
                                                    <i>
                                                        <Card.Subtitle className='text-muted mb-4'>
                                                            {' '}
                                                            Debes seleccionar un lenguaje antes de
                                                            agregar un paso.
                                                        </Card.Subtitle>
                                                    </i>
                                                </Card.Title>
                                            </Card>
                                        </>
                                    ) : (
                                        <>
                                            <Card
                                                style={{
                                                    display: 'flex',
                                                    padding: 30,
                                                    borderStyle: 'dashed',
                                                    borderWidth: '1px',
                                                    borderColor: '#009EF7',
                                                }}
                                                onClick={async (event) => {
                                                    await validateRole()

                                                    if (!permissionCreateRouteSteps) {
                                                        swal({
                                                            title: 'No tienes permiso para crear pasos en la ruta',
                                                            icon: 'warning',
                                                        })
                                                        return
                                                    }

                                                    if (agregrarPaso.length < 5) {
                                                        agregrarPaso.push({
                                                            id_punto_a: puntos.id_punto_a,
                                                            id_punto_b: puntos.id_punto_b,
                                                            id_paso: -1,
                                                            descripcion: '',
                                                            posicion_en_lista:
                                                                agregrarPaso.length + 1,
                                                            estado: 1,
                                                        })
                                                        setContador(contador + 1)
                                                        addNewPaso()
                                                    } else {
                                                        alerta()
                                                    }
                                                }}
                                            >
                                                <Card.Title
                                                    className='text-center'
                                                    style={{justifyContent: 'center'}}
                                                >
                                                    <i>
                                                        <Card.Subtitle className='text-muted mb-4'>
                                                            {' '}
                                                            <i className={`bi bi-plus`}>
                                                                Click para añadir un nuevo paso.
                                                            </i>
                                                        </Card.Subtitle>
                                                    </i>
                                                </Card.Title>
                                            </Card>
                                        </>
                                    )}
                                </div>

                                <div className='row mt-6 gx-10 '>
                                    {/* <div className=' col-md-8 col-xs-12 col-lg-8'>
                                    </div>
                                    <div className=' col-md-4 col-xs-12 col-lg-4'>
                                    </div> */}
                                    <label style={{fontSize: '14px', color: '#565674'}}>
                                        5 pasos máximo
                                    </label>
                                </div>
                            </div>
                            <div className='col-xs-12 col-md-7 col-lg-7 mb-7'>
                                <div className='row mt-6 gx-10 m-auto'>
                                    <div className=' col-md-12 col-xs-12 col-lg-12'>
                                        {lenguajes.id_lenguaje != 0 && (
                                            <>
                                                <h5 className='card-title'>Mapa de Ruta</h5>
                                                <div
                                                    className='card mb-3'
                                                    style={{background: '#1B1B29'}}
                                                >
                                                    <img
                                                        className='card-img-top'
                                                        src={
                                                            imgprincipal.img_principal == ''
                                                                ? logo2
                                                                : imgprincipal.img_principal
                                                        }
                                                        alt='Card image cap'
                                                        onClick={
                                                            imgprincipal.img_principal == ''
                                                                ? async (e) => {
                                                                      await validateRole()

                                                                      if (!permissionEditRouteMap) {
                                                                          swal({
                                                                              title: 'No tienes permiso para cambiar el mapa de una ruta',
                                                                              icon: 'warning',
                                                                          })
                                                                          return
                                                                      }
                                                                      setModalupIMG(true)
                                                                      setnumeroImg(0)
                                                                  }
                                                                : (e) => {}
                                                        }
                                                        style={{
                                                            height: '450px',
                                                            borderRadius: '10px',
                                                        }}
                                                    />
                                                    <div className='card-body'>
                                                        <Row>
                                                            {/* <p style={{ color: '#565674' }}>Imagen:</p>
                                                    <p >mapa_005.jpg</p> */}
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Link
                                                                    className='bi bi-arrow-left-right background-button text-info'
                                                                    to={''}
                                                                    onClick={async () => {
                                                                        await validateRole()

                                                                        if (
                                                                            !permissionEditRouteMap
                                                                        ) {
                                                                            swal({
                                                                                title: 'No tienes permiso para cambiar el mapa de una ruta',
                                                                                icon: 'warning',
                                                                            })
                                                                            return
                                                                        }

                                                                        setModalupIMG(true)
                                                                        setnumeroImg(0)
                                                                    }}
                                                                ></Link>
                                                            </Col>

                                                            <Col>
                                                                <Link
                                                                    className='bi bi-trash background-button text-danger'
                                                                    to={''}
                                                                    onClick={async () => {
                                                                        await validateRole()

                                                                        if (
                                                                            !permissionDeleteRouteMap
                                                                        ) {
                                                                            swal({
                                                                                title: 'No tienes permiso para eliminar el mapa de una ruta',
                                                                                icon: 'warning',
                                                                            })
                                                                            return
                                                                        }
                                                                        DeleteImage('sitePages/routes',imgprincipal.img_principal)
                                                                        imgprincipal.img_principal =
                                                                            ''
                                                                    }}
                                                                ></Link>
                                                            </Col>
                                                            <Col></Col>
                                                            <Col></Col>
                                                            <Col></Col>
                                                            <Col></Col>
                                                            <Col></Col>
                                                            <Col></Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <br></br>

                                                <div className='row mt-6 gx-10 '>
                                                    <div className='card-header row'>
                                                        <h5 className='card-title'>
                                                            Imagenes de Referencia
                                                        </h5>
                                                        <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6 '>
                                                            <Card.Img
                                                                src={
                                                                    getimg.imagen_ref1 == '' ||
                                                                    getimg.imagen_ref1 == null
                                                                        ? logo
                                                                        : getimg.imagen_ref1
                                                                }
                                                                alt='Card image cap'
                                                                style={{
                                                                    height: '248px',
                                                                    borderRadius: '10px',
                                                                }}
                                                                onClick={
                                                                    getimg.imagen_ref1 == '' ||
                                                                    getimg.imagen_ref1 == null
                                                                        ? async (e) => {
                                                                              await validateRole()

                                                                              if (
                                                                                  !permissionEditRouteImage
                                                                              ) {
                                                                                  swal({
                                                                                      title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                      icon: 'warning',
                                                                                  })
                                                                                  return
                                                                              }
                                                                              setModalupIMG(true)

                                                                              setnumeroImg(1)
                                                                          }
                                                                        : (e) => {}
                                                                }
                                                            />
                                                            <div className='card-body '>
                                                                <Row>
                                                                    <Col>
                                                                        {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                                    </Col>

                                                                    <Col>
                                                                        <Link
                                                                            className='bi bi-arrow-left-right background-button text-info'
                                                                            to={''}
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionEditRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                setModalupIMG(true)

                                                                                setnumeroImg(1)
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
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionDeleteRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para eliminar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                DeleteImage('sitePages/routes', getimg.imagen_ref1)
                                                                                getimg.imagen_ref1 =
                                                                                    ''
                                                                            }}
                                                                        ></Link>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>

                                                        <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6'>
                                                            <Card.Img
                                                                src={
                                                                    getimg.imagen_ref2 == '' ||
                                                                    getimg.imagen_ref2 == null
                                                                        ? logo
                                                                        : getimg.imagen_ref2
                                                                }
                                                                alt='Card image cap'
                                                                style={{
                                                                    height: '248px',
                                                                    borderRadius: '10px',
                                                                }}
                                                                onClick={
                                                                    getimg.imagen_ref2 == '' ||
                                                                    getimg.imagen_ref2 == null
                                                                        ? async (e) => {
                                                                              await validateRole()

                                                                              if (
                                                                                  !permissionEditRouteImage
                                                                              ) {
                                                                                  swal({
                                                                                      title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                      icon: 'warning',
                                                                                  })
                                                                                  return
                                                                              }
                                                                              setModalupIMG(true)
                                                                              setnumeroImg(2)
                                                                          }
                                                                        : (e) => {}
                                                                }
                                                            />
                                                            <div className='card-body '>
                                                                <Row>
                                                                    <Col>
                                                                        {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                                    </Col>

                                                                    <Col>
                                                                        <Link
                                                                            className='bi bi-arrow-left-right background-button text-info'
                                                                            to={''}
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionEditRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                setModalupIMG(true)

                                                                                setnumeroImg(2)
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
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionDeleteRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para eliminar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                DeleteImage('sitePages/routes', getimg.imagen_ref2)
                                                                                getimg.imagen_ref2 =
                                                                                    ''
                                                                            }}
                                                                        ></Link>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>

                                                        <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6'>
                                                            <Card.Img
                                                                src={
                                                                    getimg.imagen_ref3 == '' ||
                                                                    getimg.imagen_ref3 == null
                                                                        ? logo
                                                                        : getimg.imagen_ref3
                                                                }
                                                                alt='Card image cap'
                                                                style={{
                                                                    height: '248px',
                                                                    borderRadius: '10px',
                                                                }}
                                                                onClick={
                                                                    getimg.imagen_ref3 == '' ||
                                                                    getimg.imagen_ref3 == null
                                                                        ? async (e) => {
                                                                              await validateRole()

                                                                              if (
                                                                                  !permissionEditRouteImage
                                                                              ) {
                                                                                  swal({
                                                                                      title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                      icon: 'warning',
                                                                                  })
                                                                                  return
                                                                              }

                                                                              setModalupIMG(true)

                                                                              setnumeroImg(3)
                                                                          }
                                                                        : (e) => {}
                                                                }
                                                            />
                                                            <div className='card-body '>
                                                                <Row>
                                                                    <Col>
                                                                        {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                                    </Col>

                                                                    <Col>
                                                                        <Link
                                                                            className='bi bi-arrow-left-right background-button text-info'
                                                                            to={''}
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionEditRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para cambiar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                setModalupIMG(true)

                                                                                setnumeroImg(3)
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
                                                                            onClick={async () => {
                                                                                await validateRole()

                                                                                if (
                                                                                    !permissionDeleteRouteImage
                                                                                ) {
                                                                                    swal({
                                                                                        title: 'No tienes permiso para eliminar las imagenes de referencia de una ruta',
                                                                                        icon: 'warning',
                                                                                    })
                                                                                    return
                                                                                }
                                                                                DeleteImage('sitePages/routes', getimg.imagen_ref3)
                                                                                getimg.imagen_ref3 =
                                                                                    ''
                                                                            }}
                                                                        ></Link>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <UpImage
                show={modalupimg}
                onClose={() => setModalupIMG(false)}
                cargarIMG={uploadImage}
                ubicacionBucket={'sitePages/routes'}
                tipoArchivoPermitido={'image/*'}
            />
        </>
    )
}
export default AddRoute
