import React, {useState, useEffect, FC, useContext} from 'react'
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
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Site} from '../../models/site'
import Moment from 'moment'
import {
    getData,
    sitesMethod,
    deleteData,
    postData,
    categorysMethod,
    statesMethod,
    updateSiteMethod,
    URLAWS,
    getRolesMethod,
    getValue,
} from '../../services/api'
import {Tag} from '../../models/tag'
import {status} from '../../models/status'
import swal from 'sweetalert'
import {useForm} from 'react-hook-form'
import {number} from 'yup/lib/locale'
import {Category} from '../../models/category'
import Interes from './components/sitios-interes/sala-interes'
import {QRCodeCanvas} from 'qrcode.react'
import logo from './upload-image_03.jpg'
import UpImage from '../uploadFile/upload-image'
import {ModelOperation} from '@aws-amplify/datastore'
import {
    validateStringSinCaracteresEspeciales,
    validateStringSoloNumeros,
} from '../validarCadena/validadorCadena'
import {KTSVG} from '../../../_metronic/helpers'
import {Auth} from 'aws-amplify'
import {LoadingContext} from '../../utility/component/loading/context'
import {ContentContext} from '../template/movil/context'
import {roleManager} from '../../models/roleManager'

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

const EditSite = () => {
    //const { toogleSave, discardChange } = useContext(ContentContext)
    const {setShowLoad} = useContext(LoadingContext)
    const {id} = useParams()
    const {state} = useLocation()
    const [site, setSite] = useState<Site>({
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
        categorias: [{id_categoria: 0, nombre: '', estado: 0}],
        id_municipio: 0,
        favorito: false,
        publicado: false,
        oculto: false,
        geo_json: '',
        cercania_activa: false,
        nombre_usuario_edito: '',
        qr_path: '',
        telefono: '',
        website: '', 
        qr_image_path: ''
    })
    console.log('site: ', site)

    const handleClose = () => setShow(false) //modal close qr
    const handleShow = () => setShow(true) //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    const [qr, setQr] = useState<any>() //modal qr
    let [categorys, setCategorys] = useState<Tag[]>([])
    const [editcategorys, setEditCategory] = useState<Tag[]>([])
    const navigate = useNavigate()
    const [nombreJson, setNombreJson] = useState('')
    const [unbicacionBucket, setUbicacionBucket] = useState('')
    const [ArchivoPermitido, setArchivoPermitido] = useState('')
    const [mostrarCategorias, setmostrarCategorias] = useState<any>()
    const getSite = async () => {
        const sitio: any = await getValue(sitesMethod, Number(id))
        setSite(sitio.site)
        let aux = sitio.site.geo_json
        let auxSplit = aux.split('/')
        setNombreJson(auxSplit[auxSplit.length - 1])
        getCategorys()

        setearStatus(sitio.site)

        const mostrarCategorys = await sitio.site.categorias.map((cat: any) => ({
            value: Number(cat.id_categoria),
            label: cat.nombre,
        }))

        setmostrarCategorias(mostrarCategorys)
    }
    useEffect(() => {
        getSite()
        //  console.log(state)
    }, [])
    const [status, setStatus] = useState<status>({
        id_sitio: site.id_sitio,
        favorito: site.favorito,
        publicado: site.publicado,
        oculto: site.oculto,
        cercania_activa: site.cercania_activa,
    })

    const setearStatus = (sitio: Site) => {
        setStatus({
            id_sitio: sitio.id_sitio,
            favorito: sitio.favorito,
            publicado: sitio.publicado,
            oculto: sitio.oculto,
            cercania_activa: sitio.cercania_activa,
        })
        // console.log(status)
    }
    async function getCategorys() {
        const category: any = await getData(categorysMethod)

        category.map((cat: any) => {
            categorys.push({value: cat.id_categoria, label: cat.nombre})
        })
    }

    // const mostrarCategorys = () => {
    //   site.categorias.map((cat: any) => {
    //     editcategorys.push({ value: Number.parseInt(cat.id_categoria), label: cat.nombre })
    //   }
    //   )

    // }

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    }

    //methods to post data to api------------------------------------------------------

    async function postSite(sitee: any) {
        if (
            site.nombre != '' &&
            site.geoX != '' &&
            site.geoY != '' &&
            site.ubicacion != '' &&
            site.categorias.length > 0
        ) {
            const sit: any = await postData(updateSiteMethod, sitee)
            saveChanges()
        } else {
            alertNotNullInputs()
        }
    }

    // obtener usuario que editó
    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
        role: '',
        descripcion: '',
    })
    const getUser = async () => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
                role: user.attributes['custom:role'],
                descripcion: '',
            })
        })
    }

    //methods to post data to api------------------------------------------------------

    async function postSiteMaquetar(sitee: any, tipo: string) {
        if (
            site.nombre != '' &&
            site.geoX != '' &&
            site.geoY != '' &&
            site.ubicacion != '' &&
            site.portada_path != '' &&
            site.geo_json != ''
        ) {
            const sit: any = await postData(updateSiteMethod, sitee)
            navigate(`/template/sitio/${tipo}/${sitee.id_sitio}`)
        } else {
            alertNotNullInputs()
        }
    }

    async function postDefault(route: string, object: any) {
        const sit: any = await postData(route, object)
    }
    const changeStatus = async (
        favorito: boolean,
        publicado: boolean,
        oculto: boolean,
        cercania: boolean
    ) => {
        setShowLoad(true)
        const respuesta3: any = await postData(statesMethod, {
            id_sitio: site.id_sitio,
            favorito: favorito,
            publicado: publicado,
            oculto: oculto,
            cercania_activa: cercania,
        })
        if (!respuesta3.hasOwnProperty('titulo')) {
            setStatus({
                id_sitio: site.id_sitio,
                favorito: favorito,
                publicado: publicado,
                oculto: oculto,
                cercania_activa: cercania,
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
                categorias: site.categorias,
                id_municipio: site.id_municipio,
                favorito: status.favorito,
                publicado: status.publicado,
                oculto: status.oculto,
                geo_json: site.geo_json,
                cercania_activa: status.cercania_activa,
                nombre_usuario_edito: dataUser.name,
                qr_path: site.qr_path,
                telefono: site.telefono,
                website: site.website, 
                qr_image_path: site.website
            })
        } else {
            swal({
                text: `¡${respuesta3.titulo}!`,
                icon: 'error',
            })
        }

        // console.log(status.favorito)
        // console.log(site)

        const getSites = async () => {
            const site: any = await getData(sitesMethod)
            // console.log(site)
        }
        setShowLoad(false)
    }

    //alert methods-----------------------------------------------------------------------
    const discardChanges = async () => {
        swal({
            title: '¿Estas seguro de descartar los cambios ?',
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
    const saveChanges = async () => {
        swal({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                swal({
                    text: 'Cambios guardados',
                    icon: 'success',
                    timer: 2000,
                })
                navigate('/sitios')
                // window.location.href = "../sitios";
            }
        })
    }

    const [categoria, setcategoria] = useState([
        {
            id_categoria: 1,
            nombre: '',
            estado: 0,
        },
    ])
    const handleChange = (event: any) => {
        setmostrarCategorias(event.target)
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

        console.log(arrtempo)
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
            cercania_activa: status.cercania_activa,
            nombre_usuario_edito: dataUser.name,
            qr_path: site.qr_path,
            telefono: site.telefono,
            website: site.website, 
            qr_image_path: site.website
        })
        // console.log(site)
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

    //DONWLOAD QR-------------------------------------------------------------------------
    const downloadQRCode = () => {
        const canvas = document.getElementById('qrCode') as HTMLCanvasElement
        const pngUrl = canvas!.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = 'qr.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    // * Restricción por rol
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionFavoriteSite, setPermissionFavoriteSite] = useState(true)
    const [permissionPostSite, setPermissionPostSite] = useState(true)
    const [permissionChangeVisibilitySite, setPermissionChangeVisibilitySite] = useState(true)
    const [permissionMockSite, setPermissionMockSite] = useState(true)

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
                setPermissionFavoriteSite(filter[0]?.sitio_favorito)
                setPermissionPostSite(filter[0]?.sitio_publicar)
                setPermissionChangeVisibilitySite(filter[0]?.sitio_visible)
                setPermissionMockSite(filter[0]?.sitio_maquetar)
            }
        })
        setTimeout(() => setShowLoad(false), 1000)
    }

    // * Fin restricción por rol

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
        getUser()
    }, [existRoles])

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
                    <div className='col-xs-12 col-md-5 col-lg-7 d-flex py-5 px-9'>
                        <div id='center'>
                            <Button
                                className='btn-secondary fa-solid fa-chevron-left background-button'
                                id='center2'
                                style={{display: 'flex', marginRight: '6px', color: '#FFFFFF'}}
                                onClick={() => {
                                    discardChanges()
                                }}
                            ></Button>
                        </div>
                        <div id='center'>
                            {site.nombre != '' ? (
                                <span className='font-size: 10rem; '>
                                    <h1 style={{marginTop: '10px', marginRight: '5px'}}>
                                        {site.nombre}
                                    </h1>
                                </span>
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <div id='center'>
                            <p style={{marginTop: '16px'}}>
                                {'   '} Ultima vez editado el{' '}
                                {Moment(site.editado).format('DD/MM/YYYY hh:mm') + ' '} por
                                {' ' + site.nombre_usuario_edito}
                            </p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-5 d-flex py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>
                                <li className='nav-item'>
                                    <Button
                                        className={
                                            status.favorito == false
                                                ? 'btn-secondary text-white  fa-regular fa-star background-button'
                                                : 'btn-secondary text-primary fas fa-star background-button'
                                        }
                                        id='center2'
                                        onClick={() => {
                                            if (!permissionFavoriteSite) {
                                                swal({
                                                    title: 'No tienes permiso para marcar como destacado un sitio',
                                                    icon: 'warning',
                                                })
                                                return
                                            }
                                            // status.favorito == false
                                            if (!status.favorito) {
                                                status.favorito = !status.favorito
                                                changeStatus(status.favorito, true, false, true)
                                            }
                                            // : changeStatus(false, status.publicado, status.oculto)
                                        }}
                                        style={{display: 'flex', marginRight: '4px'}}
                                    ></Button>
                                </li>
                                <li className='nav-item'>
                                    <Button
                                        className='btn-secondary fa-solid fa-qrcode background-button '
                                        id='center2'
                                        onClick={() => {
                                            setQr(site.qr_path)
                                            handleShow()
                                        }}
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
                                        <Modal.Dialog>Sitio: {site.nombre}</Modal.Dialog>
                                        <QRCodeCanvas
                                            id='qrCode'
                                            value={qr}
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
                                        status.oculto == false
                                            ? 'btn-secondary fa-solid fa-eye background-button'
                                            : 'btn-secondary fa-solid fa-eye-slash background-button'
                                    }
                                    id='center2'
                                    onClick={() => {
                                        if (!permissionChangeVisibilitySite) {
                                            swal({
                                                title: 'No tienes permiso para cambiar la visibilidad de un sitio',
                                                icon: 'warning',
                                            })
                                            return
                                        }
                                        // status.oculto == false
                                        //   ? changeStatus(status.favorito, status.publicado, true)
                                        //   : changeStatus(status.favorito, status.publicado, false)
                                        status.oculto = !status.oculto
                                        changeStatus(
                                            status.favorito,
                                            status.publicado,
                                            status.oculto,
                                            status.cercania_activa
                                        )
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
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
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                <Button
                                    className='btn-secondary fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        if (!permissionPostSite) {
                                            swal({
                                                title: 'No tienes permiso para publicar cambios de un sitio',
                                                icon: 'warning',
                                            })
                                            return
                                        }
                                        postSite(site)
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>

                                <Button
                                    onClick={() => {
                                        //toogleSave()
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)
                                        status.publicado = !status.publicado
                                        changeStatus(
                                            status.favorito,
                                            status.publicado,
                                            status.oculto,
                                            status.cercania_activa
                                        )
                                    }}
                                    className={
                                        status.publicado == false
                                            ? 'btn-secondary fa-solid fa-download background-button'
                                            : 'btn-secondary fa-solid fa-upload background-button'
                                    }
                                    id='center2'
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>

                                <Button
                                    onClick={() => {
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)
                                        status.cercania_activa = !status.cercania_activa
                                        changeStatus(
                                            status.favorito,
                                            status.publicado,
                                            status.oculto,
                                            status.cercania_activa
                                        )
                                    }}
                                    className={
                                        status.cercania_activa == false
                                            ? 'btn-secondary fa-solid bi-cursor background-button'
                                            : 'btn-secondary fa-solid bi-cursor-fill background-button'
                                    }
                                    id='center2'
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>
                                {/* <Button className='btn-secondary fa-solid fa-gear background-button' id='center2' style={{ color: '#92929F', display: 'flex' }}></Button> */}
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
                                                            favorito: status.favorito,
                                                            publicado: status.publicado,
                                                            oculto: status.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: status.cercania_activa,
                                                            nombre_usuario_edito: dataUser.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website, 
                                                            qr_image_path: site.website
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
                                                    favorito: status.favorito,
                                                    publicado: status.publicado,
                                                    oculto: status.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: status.cercania_activa,
                                                    nombre_usuario_edito: dataUser.name,
                                                    qr_path: site.qr_path,
                                                    telefono: site.telefono,
                                                    website: site.website, 
                                                    qr_image_path: site.website
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
                                                type='number'
                                                pattern='[0-9]*'
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
                                                            favorito: status.favorito,
                                                            publicado: status.publicado,
                                                            oculto: status.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: status.cercania_activa,
                                                            nombre_usuario_edito: dataUser.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website, 
                                                            qr_image_path: site.website
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
                                                pattern='[0-9]*'
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
                                                            favorito: status.favorito,
                                                            publicado: status.publicado,
                                                            oculto: status.oculto,
                                                            geo_json: site.geo_json,
                                                            cercania_activa: status.cercania_activa,
                                                            nombre_usuario_edito:
                                                                site.nombre_usuario_edito,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website, 
                                                            qr_image_path: site.website
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
                                                    favorito: status.favorito,
                                                    publicado: status.publicado,
                                                    oculto: status.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: status.cercania_activa,
                                                    nombre_usuario_edito: dataUser.name,
                                                    qr_path: site.qr_path,
                                                    telefono: site.telefono,
                                                    website: site.website, 
                                                    qr_image_path: site.website
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
                                                    favorito: status.favorito,
                                                    publicado: status.publicado,
                                                    oculto: status.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: status.cercania_activa,
                                                    nombre_usuario_edito: dataUser.name,
                                                    qr_path: site.qr_path,
                                                    telefono: e.target.value,
                                                    website: site.website, 
                                                    qr_image_path: site.website
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
                                                    favorito: status.favorito,
                                                    publicado: status.publicado,
                                                    oculto: status.oculto,
                                                    geo_json: site.geo_json,
                                                    cercania_activa: status.cercania_activa,
                                                    nombre_usuario_edito: dataUser.name,
                                                    qr_path: site.qr_path,
                                                    telefono: site.telefono,
                                                    website: e.target.value, 
                                                    qr_image_path: site.website
                                                })
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr>

                                    <label>Etiquetas</label>

                                    <div className='form-control'>
                                        <Select
                                            closeMenuOnSelect={false}
                                            styles={customStyles}
                                            components={animatedComponents}
                                            value={mostrarCategorias}
                                            isMulti
                                            options={categorys}
                                            // placeholder={categorysHolder}
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
                                                setArchivoPermitido('.json')
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
                                                        {site.geo_json === ''
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
                                            <p className='  col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión móvil.
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                className='btn btn-info col-md-12 col-sm-12 col-lg-12'
                                                onClick={() => {
                                                    if (!permissionMockSite) {
                                                        swal({
                                                            title: 'No tienes permiso para maquetar',
                                                            icon: 'warning',
                                                        })
                                                        return
                                                    }
                                                    postSiteMaquetar(site, 'movil')
                                                }}
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
                                            <p className='col-md-12 text-center mt-5'>
                                                Maquetar los elementos del sitio para versión web
                                            </p>
                                        </div>
                                        <br></br>
                                        <div className='row'>
                                            <Button
                                                className='btn btn-secondary  col-md-12 col-sm-12 col-lg-12'
                                                onClick={() => {
                                                    if (!permissionMockSite) {
                                                        swal({
                                                            title: 'No tienes permiso para maquetar',
                                                            icon: 'warning',
                                                        })
                                                        return
                                                    }
                                                    postSiteMaquetar(site, 'web')
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
            <h3>Puntos de interés</h3>
            <Interes id_sitio={Number(id)} />
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

export default EditSite
