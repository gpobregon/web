import React, {FC, useContext, useEffect, useState} from 'react'
import Select from 'react-select'
import {Col, Card, Button, Row, Modal, Form} from 'react-bootstrap'
import {
    postData,
    addNewPointInteres,
    updatePointInteres,
    sitesMethod,
    getValue,
    URLAWS,
    statePointInteres,
    getData,
    languagesMethod,
    statePointInteresPublished,
    getRolesMethod,
    getPuntoInteres,
    publishPI,
} from '../../../../services/api'
import swal from 'sweetalert'
import makeAnimated from 'react-select/animated'
import Moment from 'moment'
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import {status} from '../../../../models/status'
import logo from '../../upload-image_03.jpg'
import {QRCodeCanvas} from 'qrcode.react'
import UpImage from '../../../uploadFile/upload-image'
import {CatalogLanguage} from '../../../../models/catalogLanguage'
import SalaRutas from '../rutas-sitios-interes/sala-rutas'
import {CostExplorer} from 'aws-sdk'
import {validateStringSinCaracteresEspeciales} from '../../../validarCadena/validadorCadena'
import {Auth} from 'aws-amplify'
import {roleManager} from '../../../../models/roleManager'
import {LoadingContext} from '../../../../utility/component/loading/context'
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
const EditPoint = () => {
    const navigate = useNavigate()
    const handleClose = () => setShow(false) //modal close qr
    const handleShow = () => setShow(true) //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    //get sitio-------------------------------------------------------------------------------------
    const {state} = useLocation()
    const {id_punto, id_sitio} = useParams()
    const [nombreSalas, setNombreSalas] = useState('')
    // const [datospuntoInteres, setdatosPuntoInteres] = useState(state as datosPuntoInteres)
    const [sitio, setSitio] = useState({
        id_punto: 0,
        id_sitio: 0,
        descripcion: '',
        id_lenguaje: 0,
        lenguajes: [{id_punto: 0, id_lenguaje: 0, descripcion: ''}],
        nombre: '',
        geoX: '',
        geoY: '',
        portada_path: '',
        qr_path: '',
        es_portada_de_sitio: '',
        estado: false,
        es_visible: false,
        id_lenguaje_anterior: 0,
        publicado: false,
        nombre_usuario_edito: '',
        publicar_web: false,
        publicar_movil: false,
    })

    const ObtenerPuntoInteres = async () => {
        const punto: any = await postData(getPuntoInteres, {id_punto: Number(id_punto)})
        setNombreSalas(punto.sala_nombre)
        setSitio({
            id_punto: Number(id_punto),
            id_sitio: Number(id_sitio),
            descripcion: '',
            id_lenguaje: punto.lenguajes[0].id_lenguaje ? punto.lenguajes[0].id_lenguaje : 0,
            lenguajes: punto.lenguajes,
            nombre: punto.nombre,
            geoX: punto.geoX,
            geoY: punto.geoY,
            portada_path: punto.portada_path,
            qr_path: punto.qr_path,
            es_portada_de_sitio: punto.es_portada_de_sitio,
            estado: punto.estado,
            es_visible: punto.es_visible,
            id_lenguaje_anterior: 0,
            publicado: punto.publicado,
            nombre_usuario_edito: '',
            publicar_web: punto.publicar_web,
            publicar_movil: punto.publicar_movil,
        })
        // console.log(punto)
    }
    // console.log('sitio', sitio)
    const changeOculto = async (oculto: boolean) => {
        await postData(statePointInteres, {
            id_punto: id_punto,
            es_visible: oculto,
        })
        setSitio({
            id_punto: sitio.id_punto,
            id_sitio: sitio.id_sitio,
            lenguajes: sitio.lenguajes,
            descripcion: sitio.descripcion,
            id_lenguaje: sitio.id_lenguaje,
            nombre: sitio.nombre,
            geoX: sitio.geoX,
            geoY: sitio.geoY,
            portada_path: sitio.portada_path,
            qr_path: sitio.qr_path,
            es_portada_de_sitio: sitio.es_portada_de_sitio,
            estado: sitio.estado,
            es_visible: oculto,
            publicado: sitio.publicado,
            id_lenguaje_anterior: sitio.id_lenguaje_anterior,
            nombre_usuario_edito: sitio.nombre_usuario_edito,
            publicar_web: sitio.publicar_web,
            publicar_movil: sitio.publicar_movil,
        })
    }
    const changePublicado = async (publicado1: boolean) => {
        await postData(statePointInteresPublished, {
            id_punto: id_punto,
            publicado: publicado1,
        })

        setSitio({
            id_punto: sitio.id_punto,
            id_sitio: sitio.id_sitio,
            lenguajes: sitio.lenguajes,
            descripcion: sitio.descripcion,
            id_lenguaje: sitio.id_lenguaje,
            nombre: sitio.nombre,
            geoX: sitio.geoX,
            geoY: sitio.geoY,
            portada_path: sitio.portada_path,
            qr_path: sitio.qr_path,
            es_portada_de_sitio: sitio.es_portada_de_sitio,
            estado: sitio.estado,
            es_visible: sitio.es_visible,
            publicado: publicado1,
            id_lenguaje_anterior: sitio.id_lenguaje_anterior,
            nombre_usuario_edito: sitio.nombre_usuario_edito,
            publicar_web: sitio.publicar_web,
            publicar_movil: sitio.publicar_movil,
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
                // console.log(sitios)
                navigate(`/sitios/editSite/${id_sitio}`)
            }
        })
    }
    async function postSiteMaquetar(tipo: string) {
        await updatePoint()
        navigate(`/template/punto/${sitio.id_sitio}/${tipo}/${sitio.id_punto}`, {state: sitio})
    }

    const saveChanges = async () => {
        swal({
            title: '¿Quiere seguir editando ?',
            icon: 'warning',
            buttons: ['Sí', 'No'],
        }).then(async (res) => {
            if (res) {
                await updatePoint()
                swal({
                    text: 'Punto de Interes Editado',
                    icon: 'success',
                    timer: 2000,
                })
                navigate(`/sitios/editSite/${id_sitio}`)
            }
            await updatePoint()
        })
    }
    //petitions----------------------------------------------------------------------------

    const updatePoint = async () => {
        await postData(updatePointInteres, sitio)
        await publishTypePoint()
        // console.log(updatePoint)
        // console.log(sitio)
    }

    // const getSites = async () => {
    //     const site: any = await getValue(sitesMethod, datospuntoInteres.id_sitio)
    //     setSitios(site.site)
    // }
    //obtener lenguajes-------------------------------------------------------------------------------------
    const [languages, setLanguages] = useState<CatalogLanguage[]>([])

    // let lenaguajeDefault = ''
    // for (let i = 0; i < languages.length; i++) {
    //     if (languages[i].id_lenguaje === sitio.id_lenguaje[0].value) {
    //         // setLenaguajeDefault(languages[i].descripcion)

    //         lenaguajeDefault = languages[i].nombre
    //     }
    // }

    // const languageEscogido = sitio.id_lenguaje?.map((language) => ({
    //     value: language.value,
    //     label: lenaguajeDefault,
    // }))

    const publishTypePoint = async () => {
        if (sitio.publicar_movil === true && sitio.publicar_web === true) {
            await postData(publishPI, {
                id_sitio: sitio.id_sitio,
                modo_publicacion: 3,
            })
        } else if (sitio.publicar_movil === true && sitio.publicar_web === false) {
            await postData(publishPI, {
                id_sitio: sitio.id_sitio,
                modo_publicacion: 1,
            })
        } else if (sitio.publicar_movil === false && sitio.publicar_web === true) {
            await postData(publishPI, {
                id_sitio: sitio.id_sitio,
                modo_publicacion: 2,
            })
        }
    }

    const getLanguages = async () => {
        const language: any = await getData(languagesMethod)
        setLanguages(language.data as CatalogLanguage[])
        // console.log(language)
    }

    const languagesOptions = languages?.map((language) => ({
        value: language.id_lenguaje,
        label: language.nombre,
    }))

    //funcion de select de lenguajes-----------------------------------------------------------------------
    // hace una comparacion del lenguaje escogido con el lenguaje del punto de interes
    // si son iguales se muestra el lenguaje la descripcion del punto de interes
    //si el lengauje no existe en el punto de interes se muestra un mensaje para asocarlo
    const [descripcion, setDescripcion] = useState('')
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false)
    const handleChangeLanguage = async (event: any) => {
        const result = sitio.lenguajes?.filter((language) => language.id_lenguaje === event.value)
        if (result[0]?.descripcion) {
            // console.log(event.value)
            setDescripcion(result[0]?.descripcion)
            setMostrarDescripcion(true)
            sitio.descripcion = descripcion
            sitio.id_lenguaje = event.value
            sitio.id_lenguaje_anterior = event.value
            // console.log(sitio)
        } else {
            setDescripcion('')
            swal({
                title: '¿Estas seguro de asociar ' + event.label + ' a este punto de interés?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then((res) => {
                setMostrarDescripcion(false)
                if (res) {
                    setMostrarDescripcion(true)
                    setSitio({
                        id_punto: sitio.id_punto,
                        id_sitio: sitio.id_sitio,
                        lenguajes: sitio.lenguajes,
                        descripcion: descripcion,
                        id_lenguaje: event.value,
                        nombre: sitio.nombre,
                        geoX: sitio.geoX,
                        geoY: sitio.geoY,
                        portada_path: sitio.portada_path,
                        qr_path: sitio.qr_path,
                        es_portada_de_sitio: sitio.es_portada_de_sitio,
                        estado: sitio.estado,
                        es_visible: sitio.es_visible,
                        publicado: true,
                        id_lenguaje_anterior: -1,
                        nombre_usuario_edito: sitio.nombre_usuario_edito,
                        publicar_web: sitio.publicar_web,
                        publicar_movil: sitio.publicar_movil,
                    })
                }
            })
        }

        // console.log(descripcion)
    }

    // UPLOAD IMAGE-------------------------------------------------------------------------
    const [modalupimg, setModalupIMG] = useState(false)
    const uploadImage = async (imagen: string) => {
        setSitio({
            id_punto: Number(id_punto),
            id_sitio: Number(id_sitio),
            descripcion: sitio.descripcion,
            id_lenguaje: sitio.id_lenguaje,
            lenguajes: sitio.lenguajes,
            nombre: sitio.nombre,
            geoX: sitio.geoX,
            geoY: sitio.geoY,
            portada_path: URLAWS + 'sitePages/' + imagen,
            qr_path: sitio.qr_path,
            es_portada_de_sitio: sitio.es_portada_de_sitio,
            estado: sitio.estado,
            es_visible: sitio.es_visible,
            publicado: true,
            id_lenguaje_anterior: sitio.id_lenguaje_anterior,
            nombre_usuario_edito: sitio.nombre_usuario_edito,
            publicar_web: sitio.publicar_web,
            publicar_movil: sitio.publicar_movil,
        })

        if (imagen != '') {
            setModalupIMG(false)
        }
    }
    const handleBlur = () => {
        swal({
            text: 'Nota: Recuerda guardar los cambios \n  antes de editar otro idioma.',
            icon: 'warning',
            timer: 2000,
        })
    }
    //DONWLOAD QR-------------------------------------------------------------------------
    const downloadQRCode = () => {
        const canvas = document.getElementById('qrCode') as HTMLCanvasElement
        const pngUrl = canvas!.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = `${sitio.nombre}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    useEffect(() => {
        // getSites()
        getLanguages()
        ObtenerPuntoInteres()
    }, [])

    // * Restricción por rol
    const {setShowLoad} = useContext(LoadingContext)
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionPostPoint, setPermissionPostPoint] = useState(true)
    const [permissionMockPoint, setPermissionMockPoint] = useState(true)

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
                setPermissionPostPoint(filter[0]?.sitio_punto_publicar)
                setPermissionMockPoint(filter[0]?.sitio_punto_maquetar)
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

    const blockInvalidChar = (e: {key: string; preventDefault: () => any}) =>
        ['e', 'E'].includes(e.key) && e.preventDefault()

    return (
        <>
            <div className=' '>
                <div
                    className='row'
                    style={{backgroundColor: '#1A1A27', backgroundSize: 'auto 100%'}}
                >
                    <div className='col-xs-12 col-md-5 col-lg-6 d-flex  py-5 px-9'>
                        <div id='center'>
                            <Button
                                className='btn-secondary fa-solid fa-chevron-left background-button '
                                id='center2'
                                style={{display: 'flex', marginRight: '6px'}}
                                onClick={(event) => {
                                    discardChanges()
                                }}
                            ></Button>
                        </div>
                        <div id='center'>
                            {/* {sitio.nombre != '' ? (
                <span className='font-size: 10rem; '>
            <h1 style={{marginTop:'10px',marginRight:'5px'}} >{   sitio.nombre }</h1> 
               
                  
                </span>
              ) : (
                <p></p>
              )} */}
                            <span className='font-size: 10rem; '>
                                <h3 style={{marginTop: '10px', marginRight: '20px'}}>
                                    {sitio.nombre}
                                </h3>
                            </span>
                        </div>
                        <div id='center'>
                            {/* <p style={{marginTop:'16px'}} > Ultima vez editado el {Moment(site.editado).format('DD/MM/YYYY hh:mm') + ' '} por{' '}</p>  */}
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex  py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>
                                <li className='nav-item'>
                                    {/* <i
                                        className={
                                            status.favorito == false
                                                ? 'fa-regular fa-star background-button'
                                                : 'fas fa-star background-button'
                                        }
                                        id='center2'
                                        onClick={() => {

                                            status.favorito = !status.favorito
                                            // changeStatus(status.favorito, status.publicado, status.oculto)

                                        }}
                                        style={{ display: 'flex', marginRight: '4px' }} ></i> */}
                                </li>
                                <li className='nav-item'>
                                    <Button
                                        className='btn-secondary fa-solid fa-qrcode background-button '
                                        id='center2'
                                        onClick={handleShow}
                                        style={{
                                            color: '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </li>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Escanee su Código QR</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{textAlign: 'center'}}>
                                        <Modal.Dialog>Sitio: {sitio.nombre}</Modal.Dialog>
                                        <QRCodeCanvas
                                            id='qrCode'
                                            value={sitio.qr_path}
                                            size={300}
                                            level={'H'}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant='secondary' onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant='primary' onClick={downloadQRCode}>
                                            Descargar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Button
                                    className={
                                        sitio.es_visible == false
                                            ? 'btn-secondary fa-solid fa-eye-slash background-button'
                                            : 'btn-secondary fa-solid fa-eye background-button'
                                    }
                                    id='center2'
                                    onClick={() => {
                                        // status.oculto == false
                                        //   ? changeStatus(status.favorito, status.publicado, true)
                                        //   : changeStatus(status.favorito, status.publicado, false)
                                        sitio.es_visible = !sitio.es_visible
                                        changeOculto(sitio.es_visible)
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    className='btn-secondary fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        discardChanges()
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    className='btn-secondary fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        if (!permissionPostPoint) {
                                            swal({
                                                title: 'No tienes permiso para publicar cambios de un punto de interés',
                                                icon: 'warning',
                                            })
                                            return
                                        }
                                        saveChanges()
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>

                                <Button
                                    onClick={() => {
                                        sitio.publicado = !sitio.publicado
                                        changePublicado(sitio.publicado)
                                    }}
                                    className={
                                        sitio.publicado == false
                                            ? 'btn-secondary fa-solid fa-download background-button'
                                            : 'btn-secondary fa-solid fa-upload background-button'
                                    }
                                    id='center2'
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    onClick={() => {
                                        //toogleSave()
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)

                                        setSitio({
                                            ...sitio,
                                            publicar_movil: !sitio.publicar_movil,
                                        })
                                    }}
                                    className={'btn-secondary fa-solid fa-mobile background-button'}
                                    id='center2'
                                    style={{
                                        color: false ? '#009ef7' : '#92929F',
                                        display: 'flex',
                                        marginRight: '4px',
                                    }}
                                ></Button>
                                <Button
                                    onClick={() => {
                                        //toogleSave()
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)
                                        setSitio({...sitio, publicar_web: !false})
                                    }}
                                    className={
                                        'btn-secondary fa-solid fa-computer background-button'
                                    }
                                    id='center2'
                                    style={{
                                        color: false ? '#009ef7' : '#92929F',
                                        display: 'flex',
                                        marginRight: '4px',
                                    }}
                                ></Button>
                                {/* <Button className='btn-secondary fa-solid fa-gear background-button' id='center2' style={{ color: '#92929F', display: 'flex' }}></Button> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h1 style={{color: 'white', fontSize: '18px'}}>Editar el punto de interés</h1>
            <h5 style={{color: '#565674', fontSize: '14px'}}>
                Lista de Sitios - Configuración del punto de interés
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
                                                    to={''}
                                                    onClick={() => {
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
                                                        setSitio({
                                                            id_punto: sitio.id_punto,
                                                            id_sitio: sitio.id_sitio,
                                                            lenguajes: sitio.lenguajes,
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
                                                            es_visible: sitio.es_visible,
                                                            publicado: true,
                                                            id_lenguaje_anterior:
                                                                sitio.id_lenguaje_anterior,
                                                            nombre_usuario_edito:
                                                                sitio.nombre_usuario_edito,
                                                            publicar_web: sitio.publicar_web,
                                                            publicar_movil: sitio.publicar_movil,
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
                                        value={nombreSalas}
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
                                        value={sitio.nombre == '' ? '' : sitio.nombre}
                                        onChange={(e) => {
                                            if (
                                                validateStringSinCaracteresEspeciales(
                                                    e.target.value
                                                )
                                            ) {
                                                setSitio({
                                                    id_punto: sitio.id_punto,
                                                    id_sitio: sitio.id_sitio,
                                                    lenguajes: sitio.lenguajes,
                                                    descripcion: sitio.descripcion,
                                                    id_lenguaje: sitio.id_lenguaje,
                                                    nombre: e.target.value,
                                                    geoX: sitio.geoX,
                                                    geoY: sitio.geoY,
                                                    portada_path: sitio.portada_path,
                                                    qr_path: sitio.qr_path,
                                                    es_portada_de_sitio: sitio.es_portada_de_sitio,
                                                    estado: sitio.estado,
                                                    es_visible: sitio.es_visible,
                                                    publicado: true,
                                                    id_lenguaje_anterior:
                                                        sitio.id_lenguaje_anterior,
                                                    nombre_usuario_edito:
                                                        sitio.nombre_usuario_edito,
                                                    publicar_web: sitio.publicar_web,
                                                    publicar_movil: sitio.publicar_movil,
                                                })
                                            }
                                        }}
                                    ></input>

                                    <br />

                                    <div className='row'>
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
                                                onKeyDown={blockInvalidChar}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setSitio({
                                                            id_punto: sitio.id_punto,
                                                            id_sitio: sitio.id_sitio,
                                                            lenguajes: sitio.lenguajes,
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
                                                            es_visible: sitio.es_visible,
                                                            publicado: true,
                                                            id_lenguaje_anterior:
                                                                sitio.id_lenguaje_anterior,
                                                            nombre_usuario_edito:
                                                                sitio.nombre_usuario_edito,
                                                            publicar_web: sitio.publicar_web,
                                                            publicar_movil: sitio.publicar_movil,
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
                                                onKeyDown={blockInvalidChar}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setSitio({
                                                            id_punto: sitio.id_punto,
                                                            id_sitio: sitio.id_sitio,
                                                            lenguajes: sitio.lenguajes,
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
                                                            es_visible: sitio.es_visible,
                                                            publicado: true,
                                                            id_lenguaje_anterior:
                                                                sitio.id_lenguaje_anterior,
                                                            nombre_usuario_edito:
                                                                sitio.nombre_usuario_edito,
                                                            publicar_web: sitio.publicar_web,
                                                            publicar_movil: sitio.publicar_movil,
                                                        })
                                                    }
                                                }}
                                            />
                                            <hr style={{position: 'relative', top: '-20px'}}></hr>
                                        </div>
                                    </div>

                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Lenguajes
                                    </label>
                                    <br />
                                    <br />

                                    <Select
                                        //   defaultValue={ {value:datospuntoInteres.lenguajes[0].value, label:datospuntoInteres.lenguajes[0].label} }
                                        options={languagesOptions}
                                        styles={customStyles}
                                        components={animatedComponents}
                                        onChange={handleChangeLanguage}
                                        placeholder={'Seleccione un lenguaje'}
                                    />
                                    <br />
                                    {mostrarDescripcion == true && (
                                        <>
                                            <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                                Descripcion
                                            </label>
                                            <Form.Control
                                                as='textarea'
                                                placeholder='Escribe una descripcion aqui'
                                                style={{height: '100px'}}
                                                value={descripcion}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setDescripcion(e.target.value)
                                                        sitio.descripcion = e.target.value
                                                    }
                                                }}
                                            />
                                        </>
                                    )}

                                    <br></br>
                                    {/* <label>Etiquetas</label>
                <br />
                <div className='form-control'> */}
                                    {/* <Select
                    closeMenuOnSelect={false}
                    styles={customStyles}
                    components={animatedComponents}
                    // value={editcategorys}
                    isMulti
                    options={categorys}
                    placeholder={categorysHolder}
                    onChange={handleChange}
                  ></Select> */}
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
                                            <i className=' fa-solid fa-mobile-screen-button text-info fa-10x text-center '></i>
                                        </div>
                                        <br></br>
                                        <br />
                                        <div className='row'>
                                            <p className='  col-md-12 text-center mt-5'>
                                                Maquetar los elementos del punto de Interes para
                                                versión móvil.
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                onClick={() => {
                                                    if (!permissionMockPoint) {
                                                        swal({
                                                            title: 'No tienes permiso para maquetar un punto de interés',
                                                            icon: 'warning',
                                                        })
                                                        return
                                                    }
                                                    // addNewPoint();
                                                    // window.location.href = "../sitios";

                                                    postSiteMaquetar('movil')
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
                                                Maquetar los elementos del punto de Interes para
                                                versión Web.
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                className='btn btn-secondary  col-md-12 col-sm-12 col-lg-12'
                                                onClick={() => {
                                                    if (!permissionMockPoint) {
                                                        swal({
                                                            title: 'No tienes permiso para maquetar un punto de interés',
                                                            icon: 'warning',
                                                        })
                                                        return
                                                    }
                                                    postSiteMaquetar('web')
                                                }}
                                            >
                                                <i className='fa-solid fa-pencil '></i> Crear
                                            </Button>
                                        </div>
                                        <UpImage
                                            show={modalupimg}
                                            onClose={() => setModalupIMG(false)}
                                            cargarIMG={uploadImage}
                                            ubicacionBucket={'sitePages'}
                                            tipoArchivoPermitido={'image/*'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <h3>Creación de rutas entre puntos de interés</h3>
            <SalaRutas
                id_punto_a={Number(id_punto)}
                id_sitio={Number(id_sitio)}
                // puntosIteres={sitio}
                nombrepunto_a={sitio.nombre}
            />
        </>
    )
}

export default EditPoint
