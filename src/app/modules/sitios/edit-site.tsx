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
    Popover,
} from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Link, Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Site} from '../../models/site'
import Moment from 'moment'
import {
    getData,
    sitesMethod,
    statelockSite,
    postData,
    categorysMethod,
    statesMethod,
    updateSiteMethod,
    URLAWS,
    getRolesMethod,
    getValue,
    publishSite,
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
import {DeleteImage} from '../deleteFile/delete-image'
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
import {styled} from '@mui/system'
import {Tooltip, tooltipClasses, TooltipProps} from '@mui/material'

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
    //preguntar si quiere salir de la pestana
    window.onunload = async function (e) {
        await postData(statelockSite, {
            id_sitio: site.id_sitio,
            bloqueado_por_edicion: false,
            bloqueado_por_edicion_id: '',
            bloqueado_por_edicion_nombre: '',
        })
    }

    //const { toogleSave, discardChange } = useContext(ContentContext)
    const {setShowLoad} = useContext(LoadingContext)
    const [loadingSite, setloadingSite] = useState(true)
    const {id} = useParams()
    const {state} = useLocation()
    const [botonActivo, setbotonActivo] = useState(false)

    // obtener usuario que editó

    const [dataUserHeader, setDataUserHeader] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
        role: '',
        descripcion: '',
        id: '',
    })

    const getUserForHeader = async () => {
        tryCharging()
        Auth.currentUserInfo().then(async (user) => {
            if (
                site.bloqueado_por_edicion_id != user.attributes.sub &&
                site.bloqueado_por_edicion_id != '' &&
                site.bloqueado_por_edicion &&
                site.bloqueado_por_edicion_id != null
            ) {
                swal({
                    text: `Este sitio está siendo editado por: '${site.bloqueado_por_edicion_nombre}'`,
                    icon: 'error',
                    timer: 5000,
                })
                navigate('/sitios')
                return
            }
            setDataUserHeader({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
                role: user.attributes['custom:role'],
                descripcion: '',
                id: user.attributes.sub,
            })

            await saveLocked(true, user.attributes.sub, user.attributes.name) //bloquear sitio
        })
    }

    const getUser = async () => {
        tryCharging()
        Auth.currentUserInfo().then(async (user) => {
            await saveLocked(true, user.attributes.sub, user.attributes.name)
        })
    }

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
        qr_image_path: '',
        publicar_web: false,
        publicar_movil: false,
        bloqueado_por_edicion: false,
        bloqueado_por_edicion_id: '',
        bloqueado_por_edicion_nombre: '',
    })

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
    const [paraCargar, setParaCargar] = useState(false)
    const tryCharging = () => {
        setParaCargar(true)
    }

    const getSite = async () => {
        const sitio: any = await getValue(sitesMethod, Number(id))
        setSite({
            ...sitio.site,
        })

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

        getUserForHeader()

        setloadingSite(false)
    }

    //metodo para guarda automaticamente el bloqueo del sitio
    const saveLocked = async (bloqueado_por_edicion: boolean, idUser: string, nameUser: string) => {
        site.bloqueado_por_edicion = bloqueado_por_edicion
        site.bloqueado_por_edicion_id = idUser
        site.bloqueado_por_edicion_nombre = nameUser
        if (site.id_sitio != 0) {
            await postData(statelockSite, {
                id_sitio: site.id_sitio,
                bloqueado_por_edicion: bloqueado_por_edicion,
                bloqueado_por_edicion_id: site.bloqueado_por_edicion_id,
                bloqueado_por_edicion_nombre: nameUser,
            })

            setSite({
                ...site,
            })
        }
    }
    //fin

    //para verificar si el sitio esta bloqueado
    const verifySite = async () => {
        if ((site.bloqueado_por_edicion = false)) {
            setbotonActivo(false)
        } else {
            setbotonActivo(true)
        }
    }

    const [status, setStatus] = useState<status>({
        id_sitio: site.id_sitio,
        favorito: site.favorito,
        publicado: site.publicado,
        oculto: site.oculto,
        cercania_activa: site.cercania_activa,
        publicar_web: site.publicar_web,
        publicar_movil: site.publicar_movil,
    })

    const setearStatus = (sitio: Site) => {
        setStatus({
            id_sitio: sitio.id_sitio,
            favorito: sitio.favorito,
            publicado: sitio.publicado,
            oculto: sitio.oculto,
            cercania_activa: sitio.cercania_activa,
            publicar_web: sitio.publicar_web,
            publicar_movil: sitio.publicar_movil,
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

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    }

    const alertNotNullInputCategories = async (data: any) => {
        let keys = Object.keys(data),
            msg = ''

        for (let key of keys) {
            if (data[key] != 0 && data[key] >= 1) continue
            msg += `El campo ${key} es obligatorio\n`
        }
        msg.trim()

        swal({
            text: msg,
            icon: 'warning',
        })
    }

    const alertNotNullInputsObj = async (data: any) => {
        let keys = Object.keys(data),
            msg = ''

        for (let key of keys) {
            if (
                data[key] !== null &&
                data[key] !== undefined &&
                data[key] !== 0 &&
                data[key] !== ''
            )
                continue
            msg += `El campo ${key} es obligatorio\n`
        }

        msg.trim()

        swal({
            text: msg,
            icon: 'warning',
        })
    }
    //methods to post data to api------------------------------------------------------

    async function postSite(sitee: any) {
        if (site.categorias.length >= 1 && site.categorias[0].id_categoria != 0) {
            if (
                site.nombre != '' &&
                site.geoX != '' &&
                site.geoY != '' &&
                site.ubicacion != '' &&
                site.categorias.length >= 1 &&
                site.categorias[0].id_categoria != 0
            ) {
                saveChanges(sitee)
            } else {
                alertNotNullInputsObj({
                    nombre: site.nombre,
                    geoX: site.geoX,
                    geoY: site.geoY,
                    ubicación: site.ubicacion,
                    categorias: site.categorias,
                })
            }
        } else {
            alertNotNullInputCategories({
                categorias: site.categorias,
            })
        }
    }

    const publishTypeSite = async () => {
        if (status.publicar_movil === true && status.publicar_web === true) {
            await postData(publishSite, {
                id_sitio: site.id_sitio,
                modo_publicacion: 3,
            })
        } else if (status.publicar_movil === true && status.publicar_web === false) {
            await postData(publishSite, {
                id_sitio: site.id_sitio,
                modo_publicacion: 1,
            })
        } else if (status.publicar_movil === false && status.publicar_web === true) {
            await postData(publishSite, {
                id_sitio: site.id_sitio,
                modo_publicacion: 2,
            })
        }
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

    const changeStatus = async (
        favorito: boolean,
        publicado: boolean,
        oculto: boolean,
        cercania: boolean,
        publicarWeb: boolean,
        publicarMovil: boolean
    ) => {
        if (favorito) {
            swal({
                title:
                    publicarMovil === true && publicarWeb === true
                        ? '¿Deseas autorizar la publicación del sitio en web y móvil?'
                        : publicarMovil === true && publicarWeb === false
                        ? '¿Deseas autorizar la publicación del sitio unicamente en móvil?'
                        : publicarMovil === false && publicarWeb === true
                        ? '¿Deseas autorizar la publicación del sitio unicamente en web?'
                        : '¿Deseas desautorizar la publicación del sitio?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then(async (res) => {
                if (res) {
                    setShowLoad(true)
                    await postData(statesMethod, {
                        id_sitio: site.id_sitio,
                        favorito: true,
                        publicado: true,
                        oculto: false,
                        cercania_activa: cercania,
                        publicar_web: publicarWeb,
                        publicar_movil: publicarMovil,
                    })
                    setShowLoad(false)
                    swal({
                        text: 'Actualizado Correctamente',
                        icon: 'success',
                        timer: 2000,
                    })
                }
            })
            status.cercania_activa = cercania
            status.publicar_web = publicarWeb
            status.publicar_movil = publicarMovil
        } else {
            setShowLoad(true)
            const response = await postData(statesMethod, {
                id_sitio: site.id_sitio,
                favorito: favorito,
                publicado: publicado,
                oculto: oculto,
                cercania_activa: cercania,
                publicar_web: publicarWeb,
                publicar_movil: publicarMovil,
            })
            setShowLoad(false)
            if (response === null) return
            status.oculto = oculto
            status.publicado = publicado
            status.favorito = favorito
            status.cercania_activa = cercania
            status.publicar_web = publicarWeb
            status.publicar_movil = publicarMovil

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
                nombre_usuario_edito: dataUserHeader.name,
                qr_path: site.qr_path,
                telefono: site.telefono,
                website: site.website,
                qr_image_path: site.website,
                publicar_web: status.publicar_web,
                publicar_movil: status.publicar_movil,
                bloqueado_por_edicion: site.bloqueado_por_edicion,
                bloqueado_por_edicion_id: site.bloqueado_por_edicion_id,
                bloqueado_por_edicion_nombre: site.bloqueado_por_edicion_nombre,
            })
            setbotonActivo(true)
        }
    }

    //alert methods-----------------------------------------------------------------------
    const discardChanges = async () => {
        swal({
            title: '¿Estas seguro de descartar los cambios ?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then(async (res) => {
            if (res) {
                setShowLoad(true)
                await postData(statelockSite, {
                    id_sitio: site.id_sitio,
                    bloqueado_por_edicion: false,
                    bloqueado_por_edicion_id: '',
                    bloqueado_por_edicion_nombre: '',
                })

                setShowLoad(false)
                swal({
                    text: 'Descartado Correctamente',
                    icon: 'success',
                    timer: 2000,
                })
                navigate('/sitios')
            }
        })
    }
    const saveChanges = async (sitee: any) => {
        swal({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then(async (res) => {
            if (res) {
                setShowLoad(true)
                const sit: any = await postData(updateSiteMethod, sitee)
                setShowLoad(false)
                swal({
                    text: 'Cambios guardados',
                    icon: 'success',
                    timer: 2000,
                })
                navigate('/sitios')
            }
        })
    }

    //esto es para las etiquetas
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
            nombre_usuario_edito: dataUserHeader.name,
            qr_path: site.qr_path,
            telefono: site.telefono,
            website: site.website,
            qr_image_path: site.website,
            publicar_web: status.publicar_web,
            publicar_movil: status.publicar_movil,
            bloqueado_por_edicion: site.bloqueado_por_edicion,
            bloqueado_por_edicion_id: site.bloqueado_por_edicion_id,
            bloqueado_por_edicion_nombre: site.bloqueado_por_edicion_nombre,
        })
        setbotonActivo(true)
    }
    // UPLOAD IMAGE-------------------------------------------------------------------------

    const uploadImage = async (imagen: string) => {
        let arr = imagen.split('.')
        //esta validacion solo es unicamente para ver que sea un archivo admitido en la carga
        if (arr[arr.length - 1] === 'geojson') {
            // esta validacion es para vereficcar apartado selecciona la carga (geojson o img)
            if (ArchivoPermitido === '.geojson') {
                site.geo_json = URLAWS + 'sitePages/GeoJSON/' + imagen
                setNombreJson(imagen)
            } else {
                swal({
                    text: '¡Tipo de archivo no admitido!',
                    icon: 'warning',
                    timer: 2000,
                })
            }
        } else if (
            arr[arr.length - 1] === 'jpg' ||
            arr[arr.length - 1] === 'bmp' ||
            arr[arr.length - 1] === 'gif' ||
            arr[arr.length - 1] === 'jpeg' ||
            arr[arr.length - 1] === 'png'
        ) {
            if (ArchivoPermitido === 'image/*') {
                site.portada_path = URLAWS + 'sitePages/' + imagen
            } else {
                swal({
                    text: '¡Tipo de archivo no admitido!',
                    icon: 'warning',
                    timer: 2000,
                })
            }
        } else {
            swal({
                text: '¡Tipo de archivo no admitido!',
                icon: 'warning',
                timer: 2000,
            })
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
        downloadLink.download = `${site.nombre}.png`
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

    //method para desbloquear sitio con Boton
    const unlockSite = async () => {
        setSite({
            ...site,
            bloqueado_por_edicion: false,
            bloqueado_por_edicion_id: '',
            bloqueado_por_edicion_nombre: '',
        })
        let converterToFalse = site

        converterToFalse.bloqueado_por_edicion = false

        await postSite(site)
    }

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
    }, [existRoles])

    useEffect(() => {
        // getUser()
        getSite()
    }, [loadingSite])

    const blockInvalidChar = (e: {key: string; preventDefault: () => any}) =>
        ['e', 'E'].includes(e.key) && e.preventDefault()

    const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
        <Tooltip {...props} classes={{popper: className}} />
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            color: '#FFF',
            fontSize: 12,
            fontWeight: 500,
        },
    }))

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
                                {Moment(site.editado).format('DD/MM/YYYY HH:mm') + ' '} por
                                {' ' + site.nombre_usuario_edito}
                            </p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-5 d-flex py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>
                                <li className='nav-item'>
                                    <CustomTooltip title='Sitio destacado'>
                                        <Button
                                            className={
                                                status.favorito == false
                                                    ? 'btn-secondary text-white  fa-regular fa-star background-button'
                                                    : 'btn-secondary text-primary fas fa-star background-button'
                                            }
                                            id='center2'
                                            onClick={async () => {
                                                await validateRole()

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
                                                    changeStatus(
                                                        status.favorito,
                                                        true,
                                                        false,
                                                        true,
                                                        true,
                                                        true
                                                    )
                                                }
                                                // : changeStatus(false, status.publicado, status.oculto)
                                            }}
                                            style={{display: 'flex', marginRight: '4px'}}
                                        ></Button>
                                    </CustomTooltip>
                                </li>
                                <li className='nav-item'>
                                    <CustomTooltip title='Generar QR'>
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
                                    </CustomTooltip>
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
                                <CustomTooltip title='Visibilidad del sitio'>
                                    <Button
                                        className={
                                            status.oculto == false
                                                ? 'btn-secondary fa-solid fa-eye background-button'
                                                : 'btn-secondary fa-solid fa-eye-slash background-button'
                                        }
                                        id='center2'
                                        onClick={async () => {
                                            await validateRole()

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

                                            changeStatus(
                                                status.favorito,
                                                status.publicado,
                                                !status.oculto,
                                                status.cercania_activa,
                                                status.publicar_web,
                                                status.publicar_movil
                                            )
                                        }}
                                        style={{
                                            color: !status.oculto ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Descartar cambios'>
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
                                        style={{
                                            color: '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Guardar cambios'>
                                    <Button
                                        className='btn-secondary fa-solid fa-floppy-disk background-button'
                                        id='center2'
                                        onClick={async () => {
                                            
                                            postSite(site)
                                        }}
                                        style={{
                                            color: '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Publicar'>
                                    <Button
                                        onClick={async () => {
                                            await validateRole()

                                            if (!permissionPostSite) {
                                                swal({
                                                    title: 'No tienes permiso para publicar cambios de un sitio',
                                                    icon: 'warning',
                                                })
                                                return
                                            }
                                            changeStatus(
                                                status.favorito,
                                                !status.publicado,
                                                status.oculto,
                                                status.cercania_activa,
                                                status.publicar_web,
                                                status.publicar_movil
                                            )
                                            publishTypeSite()
                                        }}
                                        className={
                                            status.publicado == false
                                                ? 'btn-secondary fa-solid fa-download background-button'
                                                : 'btn-secondary fa-solid fa-upload background-button'
                                        }
                                        id='center2'
                                        style={{
                                            color: status.publicado ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Mostrar maqueta movil'>
                                    <Button
                                        onClick={() => {
                                            //toogleSave()
                                            // status.publicado == false
                                            //   ? changeStatus(status.favorito, true, status.oculto)
                                            //   : changeStatus(status.favorito, false, status.oculto)

                                            changeStatus(
                                                status.favorito,
                                                status.publicado,
                                                status.oculto,
                                                status.cercania_activa,
                                                status.publicar_web,
                                                !status.publicar_movil
                                            )
                                        }}
                                        className={
                                            status.publicado == false
                                                ? 'btn-secondary fa-solid fa-mobile background-button'
                                                : 'btn-secondary fa-solid fa-mobile background-button'
                                        }
                                        id='center2'
                                        style={{
                                            color: status.publicar_movil ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Mostrar maqueta web'>
                                    <Button
                                        onClick={() => {
                                            //toogleSave()
                                            // status.publicado == false
                                            //   ? changeStatus(status.favorito, true, status.oculto)
                                            //   : changeStatus(status.favorito, false, status.oculto)

                                            changeStatus(
                                                status.favorito,
                                                status.publicado,
                                                status.oculto,
                                                status.cercania_activa,
                                                !status.publicar_web,
                                                status.publicar_movil
                                            )
                                        }}
                                        className={
                                            status.publicado == false
                                                ? 'btn-secondary fa-solid fa-computer background-button'
                                                : 'btn-secondary fa-solid fa-computer background-button'
                                        }
                                        id='center2'
                                        style={{
                                            color: status.publicar_web ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                <CustomTooltip title='Cercania activa'>
                                    <Button
                                        onClick={() => {
                                            // status.publicado == false
                                            //   ? changeStatus(status.favorito, true, status.oculto)
                                            //   : changeStatus(status.favorito, false, status.oculto)

                                            changeStatus(
                                                status.favorito,
                                                status.publicado,
                                                status.oculto,
                                                !status.cercania_activa,
                                                status.publicar_web,
                                                status.publicar_movil
                                            )
                                        }}
                                        className={
                                            status.cercania_activa == false
                                                ? 'btn-secondary fa-solid bi-cursor background-button'
                                                : 'btn-secondary fa-solid bi-cursor-fill background-button'
                                        }
                                        id='center2'
                                        style={{
                                            color: status.cercania_activa ? '#009ef7' : '#92929F',
                                            display: 'flex',
                                            marginRight: '4px',
                                        }}
                                    ></Button>
                                </CustomTooltip>
                                {/* <Button className='btn-secondary fa-solid fa-gear background-button' id='center2' style={{ color: '#92929F', display: 'flex' }}></Button> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h1 style={{color: 'white', fontSize: '18px'}}>Configuración del sitio</h1>
                        <h5 style={{color: '#565674', fontSize: '14px'}}>
                            Lista de Sitios - Configuración del Sitio
                        </h5>
                    </div>
                    <Button
                        variant='primary'
                        className='mt-md-0 mt-4'
                        // disabled={!botonActivo}
                        onClick={() => unlockSite()}
                    >
                        <span className='menu-icon me-0'>
                            <i className={`bi bi-unlock-fill fs-1 `}></i>
                        </span>
                        {'Desbloquear sitio'}
                    </Button>
                </div>
            </div>

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
                                                            nombre_usuario_edito:
                                                                dataUserHeader.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.website,
                                                            publicar_web: status.publicar_web,
                                                            publicar_movil: status.publicar_movil,
                                                            bloqueado_por_edicion:
                                                                site.bloqueado_por_edicion,
                                                            bloqueado_por_edicion_id:
                                                                site.bloqueado_por_edicion_id,
                                                            bloqueado_por_edicion_nombre:
                                                                site.bloqueado_por_edicion_nombre,
                                                        })
                                                        setbotonActivo(true)
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
                                                    onClick={() => {
                                                        DeleteImage('sitePages', site.portada_path)
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
                                                            nombre_usuario_edito:
                                                                dataUserHeader.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.website,
                                                            publicar_web: status.publicar_web,
                                                            publicar_movil: status.publicar_movil,
                                                            bloqueado_por_edicion:
                                                                site.bloqueado_por_edicion,
                                                            bloqueado_por_edicion_id:
                                                                site.bloqueado_por_edicion_id,
                                                            bloqueado_por_edicion_nombre:
                                                                site.bloqueado_por_edicion_nombre,
                                                        })
                                                        setbotonActivo(true)
                                                    }}
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
                                                    nombre_usuario_edito: dataUserHeader.name,
                                                    qr_path: site.qr_path,
                                                    telefono: site.telefono,
                                                    website: site.website,
                                                    qr_image_path: site.website,
                                                    publicar_web: status.publicar_web,
                                                    publicar_movil: status.publicar_movil,
                                                    bloqueado_por_edicion:
                                                        site.bloqueado_por_edicion,
                                                    bloqueado_por_edicion_id:
                                                        site.bloqueado_por_edicion_id,
                                                    bloqueado_por_edicion_nombre:
                                                        site.bloqueado_por_edicion_nombre,
                                                })
                                                setbotonActivo(true)
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
                                                onKeyDown={blockInvalidChar}
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
                                                            nombre_usuario_edito:
                                                                dataUserHeader.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.website,
                                                            publicar_web: status.publicar_web,
                                                            publicar_movil: status.publicar_movil,
                                                            bloqueado_por_edicion:
                                                                site.bloqueado_por_edicion,
                                                            bloqueado_por_edicion_id:
                                                                site.bloqueado_por_edicion_id,
                                                            bloqueado_por_edicion_nombre:
                                                                site.bloqueado_por_edicion_nombre,
                                                        })
                                                        setbotonActivo(true)
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
                                                onKeyDown={blockInvalidChar}
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
                                                                dataUserHeader.name,
                                                            qr_path: site.qr_path,
                                                            telefono: site.telefono,
                                                            website: site.website,
                                                            qr_image_path: site.website,
                                                            publicar_web: status.publicar_web,
                                                            publicar_movil: status.publicar_movil,
                                                            bloqueado_por_edicion:
                                                                site.bloqueado_por_edicion,
                                                            bloqueado_por_edicion_id:
                                                                site.bloqueado_por_edicion_id,
                                                            bloqueado_por_edicion_nombre:
                                                                site.bloqueado_por_edicion_nombre,
                                                        })
                                                        setbotonActivo(true)
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
                                                nombre_usuario_edito: dataUserHeader.name,
                                                qr_path: site.qr_path,
                                                telefono: site.telefono,
                                                website: site.website,
                                                qr_image_path: site.website,
                                                publicar_web: status.publicar_web,
                                                publicar_movil: status.publicar_movil,
                                                bloqueado_por_edicion: site.bloqueado_por_edicion,
                                                bloqueado_por_edicion_id:
                                                    site.bloqueado_por_edicion_id,
                                                bloqueado_por_edicion_nombre:
                                                    site.bloqueado_por_edicion_nombre,
                                            })
                                            setbotonActivo(true)
                                        }}
                                    ></input>
                                    <hr style={{position: 'relative', top: '-20px'}}></hr>

                                    <br />
                                    <label style={{fontSize: '14px', color: '#FFFFFF'}}>
                                        Teléfono
                                    </label>
                                    <br></br>
                                    <input
                                        type='text'
                                        maxLength={8}
                                        className='form-control'
                                        style={{border: '0', fontSize: '18px', color: '#FFFFFF'}}
                                        value={site.telefono != '' ? site.telefono : ''}
                                        onChange={(e) => {
                                            if (validateStringSoloNumeros(e.target.value)) {
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
                                                    nombre_usuario_edito: dataUserHeader.name,
                                                    qr_path: site.qr_path,
                                                    telefono: e.target.value,
                                                    website: site.website,
                                                    qr_image_path: site.website,
                                                    publicar_web: status.publicar_web,
                                                    publicar_movil: status.publicar_movil,
                                                    bloqueado_por_edicion:
                                                        site.bloqueado_por_edicion,
                                                    bloqueado_por_edicion_id:
                                                        site.bloqueado_por_edicion_id,
                                                    bloqueado_por_edicion_nombre:
                                                        site.bloqueado_por_edicion_nombre,
                                                })
                                                setbotonActivo(true)
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
                                                nombre_usuario_edito: dataUserHeader.name,
                                                qr_path: site.qr_path,
                                                telefono: site.telefono,
                                                website: e.target.value,
                                                qr_image_path: site.website,
                                                publicar_web: status.publicar_web,
                                                publicar_movil: status.publicar_movil,
                                                bloqueado_por_edicion: site.bloqueado_por_edicion,
                                                bloqueado_por_edicion_id:
                                                    site.bloqueado_por_edicion_id,
                                                bloqueado_por_edicion_nombre:
                                                    site.bloqueado_por_edicion_nombre,
                                            })
                                            setbotonActivo(true)
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
                                                        {site.geo_json === '' ? (
                                                            'Subir GeoJSON'
                                                        ) : (
                                                            <a
                                                                href={site.geo_json}
                                                                target='_blank'
                                                                rel='noopener noreferrer'
                                                            >
                                                                {nombreJson}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() => {
                                                        setArchivoPermitido('.geojson')
                                                        setUbicacionBucket('sitePages/GeoJSON')
                                                        setModalupIMG(true)
                                                    }}
                                                >
                                                    <KTSVG
                                                        path='/media/icons/duotune/general/gen035.svg'
                                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3'
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                        <div style={{textAlign: 'center', color: 'gray'}}>
                                            Formato permitido: .geojson
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
                                            <i className=' fa-solid fa-mobile-screen-button text-info fa-10x text-center '></i>
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
                                                onClick={async () => {
                                                    await validateRole()

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
                                                onClick={async () => {
                                                    await validateRole()

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
