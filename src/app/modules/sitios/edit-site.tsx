import React, {useState, useEffect, FC} from 'react'
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
    updateSiteMethod,
    URLAWS,
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
import UpImage from '../uploadFile/upload-image';
import {ModelOperation} from '@aws-amplify/datastore'
import {
    validateStringSinCaracteresEspeciales,
    validateStringSoloNumeros,
} from '../validarCadena/validadorCadena'
import { KTSVG } from '../../../_metronic/helpers'

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
    const {state} = useLocation()
    const [site, setSite] = useState(state as Site)
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
    useEffect(() => {
        // console.log(state)
        let aux=site.geo_json
       let auxSplit=aux.split('/')
        setNombreJson(auxSplit[auxSplit.length-1])
        getCategorys()

        setearStatus()
       
    }, [])
    const [status, setStatus] = useState<status>({
        id_sitio: site.id_sitio,
        favorito: site.favorito,
        publicado: site.favorito,
        oculto: site.oculto,
    })

    const setearStatus = () => {
        setStatus({
            id_sitio: site.id_sitio,
            favorito: site.favorito,
            publicado: site.favorito,
            oculto: site.oculto,
        })
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

    const mostrarCategorys = site.categorias.map((cat) => ({
        value: cat.id_categoria,
        label: cat.nombre,
    }))

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
    async function postDefault(route: string, object: any) {
        const sit: any = await postData(route, object)
    }
    const changeStatus = (favorito: boolean, publicado: boolean, oculto: boolean) => {
        setStatus({
            id_sitio: site.id_sitio,
            favorito: favorito,
            publicado: publicado,
            oculto: oculto,
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
        })
        // console.log(status.favorito)
        // console.log(site)
        postDefault(statesMethod, status)
        const getSites = async () => {
            const site: any = await getData(sitesMethod)
            // console.log(site)
        }
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
                navigate('/sitios')
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
        })
        console.log(site)
    }
    // UPLOAD IMAGE-------------------------------------------------------------------------

    const uploadImage = async (imagen: string) => {
        if(ArchivoPermitido =='.json'){
         
            site.geo_json= URLAWS +"sitePages/GeoJSON/"+ imagen
            setNombreJson(imagen)
        }
        else{
       
          site.portada_path= URLAWS +"sitePages/"+ imagen
        
      }
        if (imagen != '') {
          setModalupIMG(false)
        }
      };
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
                                className='btn-secondary fa-solid fa-less-than background-button '
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
                                {Moment(site.editado).format('DD/MM/YYYY hh:mm') + ' '} por{' '}
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
                                            // status.favorito == false
                                            status.favorito = !status.favorito
                                            changeStatus(
                                                status.favorito,
                                                status.publicado,
                                                status.oculto
                                            )
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
                                            setQr('sitios/view/' + site.id_sitio)
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
                                            ? 'btn-secondary fa-solid fa-eye-slash background-button'
                                            : 'btn-secondary fa-solid fa-eye background-button'
                                    }
                                    id='center2'
                                    onClick={() => {
                                        // status.oculto == false
                                        //   ? changeStatus(status.favorito, status.publicado, true)
                                        //   : changeStatus(status.favorito, status.publicado, false)
                                        status.oculto = !status.oculto
                                        changeStatus(
                                            status.favorito,
                                            status.publicado,
                                            status.oculto
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
                                        // console.log('site')
                                        postSite(site)

                                        // console.log(site)
                                        // navigate('/site')
                                    }}
                                    style={{color: '#92929F', display: 'flex', marginRight: '4px'}}
                                ></Button>

                                <Button
                                    onClick={() => {
                                        // status.publicado == false
                                        //   ? changeStatus(status.favorito, true, status.oculto)
                                        //   : changeStatus(status.favorito, false, status.oculto)
                                        status.publicado = !status.publicado
                                        changeStatus(
                                            status.favorito,
                                            status.publicado,
                                            status.oculto
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
                                                setArchivoPermitido("image/*")
                                                setUbicacionBucket("sitePages")
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
                                                        
                                                        setArchivoPermitido("image/*")
                                                        setUbicacionBucket("sitePages")
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
                                                })
                                            }
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr>
                               
                                    <label>Etiquetas</label>
                                    
                                    <div className='form-control'>
                                        <Select
                                            closeMenuOnSelect={false}
                                            styles={customStyles}
                                            components={animatedComponents}
                                            defaultValue={mostrarCategorys}
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
                                setArchivoPermitido(".json")
                                setUbicacionBucket("sitePages/GeoJSON")
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

                                    <div>{ site.geo_json==='' ? 'Subir GeoJSON' : nombreJson}</div>
                                </div>

                                <div
                                   
                                >
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
                                            <Link to={`/template/movil/${site.id_sitio}`}>
                                                <Button className='btn btn-info col-md-12 col-sm-12 col-lg-12'>
                                                    {' '}
                                                    <i className='fa-solid fa-pencil'></i> Crear
                                                </Button>
                                            </Link>
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
                                            <Link to={`/template/web/${site.id_sitio}`}>
                                                <Button
                                                    className='btn btn-secondary  col-md-12 col-sm-12 col-lg-12'
                                                    onClick={() => {
                                                        console.log(
                                                            'creado con el boton de sitio web'
                                                        )
                                                    }}
                                                >
                                                    <i className='fa-solid fa-pencil '></i> Crear
                                                </Button>
                                            </Link>
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
            <Interes id_sitio={site.id_sitio} />
            <UpImage
                show={modalupimg}
                onClose={() =>{setArchivoPermitido(""); setUbicacionBucket(""); setModalupIMG(false)}}
                cargarIMG={uploadImage}
                ubicacionBucket={unbicacionBucket}
                tipoArchivoPermitido={ArchivoPermitido}
            />
        </>
    )
}

export default EditSite
