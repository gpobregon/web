import {type} from 'os'
import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import {Col, Card, Button, Row, Modal} from 'react-bootstrap'
import {
    RoomsMethod,
    postData,
    updateSiteMethod,
    addRoom,
    deleteData,
    delPointInteres,
    editRoom,
    statePointInteres,
    changePointOfInterestFront,
    OrderPointOfInterest,
    getData,
    languagesMethod,
    getRolesMethod,
} from '../../../../services/api'
import {Room} from '../../../../models/rooms'
import swal from 'sweetalert'
import {PointInteres} from '../../../../models/sitio-interes'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import {safeUseLayoutEffect} from 'react-table'
import {number} from 'yup'
import {QRCodeCanvas} from 'qrcode.react'
import logo from '../../upload-image_03.jpg'
import AddRoom from './add-room'
import UpdateRoom from './update-room'
import domtoimage from 'dom-to-image'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import SalaRutas from '../rutas-sitios-interes/sala-rutas'
import {CatalogLanguage} from '../../../../models/catalogLanguage'
import {Auth} from 'aws-amplify'
import {roleManager} from '../../../../models/roleManager'
import {LoadingContext} from '../../../../utility/component/loading/context'

type id_sitio = {
    id_sitio: number
}

const Interes: FC<id_sitio> = (props) => {
    const navigate = useNavigate()
    const [room, setRooms] = useState<Room[]>([])
    const [puntoInteres, setPuntoInteres] = useState<PointInteres[]>([])
    const [idsala, setIdSala] = useState<number>()
    const [nombresala, setNombreSala] = useState<String>()
    const [upRoom, setupdateRoom] = useState({
        id_sitio: props.id_sitio,
        id_sala: 0,
        nombre: '',
        descripcion: '',
        tipo: true,
        estado: 1,
    })

    const [modalAddRoom, setModalAddRoom] = useState(false)
    const [modalUpdateRoom, setModalUpdateRoom] = useState(false)
    const handleClose = () => setShow(false) //modal close qr
    const handleShow = () => setShow(true) //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    const [qr, setQr] = useState<any>() //modal qr
    const [name, setNombre] = useState<any>() //modal qr
    const [vista, setVistaPrevia] = useState(false) //mostrar vsta previa
    const [imagen, setImagenPrevia] = useState('') //mostrar vsta previa
    const [languages, setLanguages] = useState<CatalogLanguage[]>([]) //catalogo de idiomas
    const changeStatus = async (idpunto: number, oculto: boolean) => {
        await postData(statePointInteres, {id_punto: idpunto, es_visible: oculto})
        setPuntoInteres([])
        setRooms([])
        getSalas()
        swal({
            text: 'Se cambio visibilidad con éxito',
            icon: 'success',
            timer: 2000,
        })
    }
    const changeImagePrincipal = async (idpunto: number, idsitio: number, idsala: number) => {
        const res: any = await postData(changePointOfInterestFront, {
            id_punto: idpunto,
            id_sitio: idsitio,
            id_sala: idsala,
        })

        setPuntoInteres([])
        setRooms([])
        swal({
            text: 'Se cambio Imagen principal',
            icon: 'success',
            timer: 2000,
        })
        getSalas()
    }
    const getLanguages = async () => {
        const language: any = await getData(languagesMethod)
        setLanguages(language.data as CatalogLanguage[])
        // console.log(language)
    }

    useEffect(() => {
        getSalas()
        getLanguages()
    }, [puntoInteres])

    const getSalas = async () => {
        const rooms: any = await postData(RoomsMethod, props)
        setRooms(rooms.salas as Room[])
        setVistaPrevia(false)
        // console.log(rooms.salas)
    }

    const seteatPuntoInteres = (interes: any) => {
        setPuntoInteres(interes)
        // console.log(puntoInteres)
    }

    const addNewRoom = async (createRoom: any) => {
        try {
            await postData(addRoom, createRoom)
            setModalAddRoom(false)
            getSalas()
        } catch (error) {
            alert(error)
        }
    }

    const updateRooom = async (Room: any) => {
        await postData(editRoom, Room)

        setModalUpdateRoom(false)
        getSalas()
    }

    const showModalUpdateRoom = () => {
        console.log(upRoom)
        setModalUpdateRoom(true)
    }

    const deleteRoom = (nombre: string, id: number, longitud: number) => {
        if (longitud > 0) {
            swal({
                icon: 'error',
                title: '¡Error al Eliminar Sala: \n' + nombre + '!',
                text: 'No se puede eliminar una sala con puntos de interés',
            })
        } else {
            swal({
                title: '¿Estas seguro de Eliminar Sala ' + nombre + '?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then(async (res) => {
                if (res) {
                    await deleteData(RoomsMethod, {id_sala: id})
                    getSalas()
                    swal({
                        text: 'Se elimino con éxito',
                        icon: 'success',
                        timer: 2000,
                    })
                }
            })
        }
    }
    const deletePointInteres = (id_punto: number, id_sitio: number) => {
        // console.log(id_punto,id_sitio,idsala)
        swal({
            title: '¿Estas seguro de Eliminar este punto de interes ?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then(async (res) => {
            if (res) {
                await deleteData(delPointInteres, {
                    id_punto: id_punto,
                    id_lenguaje: 1,
                    id_sitio: id_sitio,
                    id_guia: idsala,
                    estado: 0,
                })
                console.log({
                    id_punto: id_punto,
                    id_lenguaje: 1,
                    id_sitio: id_sitio,
                    id_guia: idsala,
                    estado: 0,
                })
                setPuntoInteres([])
                swal({
                    text: 'Se elimino con éxito',
                    icon: 'success',
                    timer: 2000,
                })
                getSalas()
            }
        })
    }

    //descargar QR------------------------------------------------------
    const downloadQRCode = (nombreArchivo: string) => {
        const canvas = document.getElementById('qrCode') as HTMLCanvasElement
        const pngUrl = canvas!.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = `${nombreArchivo}.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    //ordenamiento drag and drop------------------------------------------------------

    const [newFruitItem, setNewFruitItem] = React.useState('')

    //save reference for dragItem and dragOverItem
    const dragItem = React.useRef<any>(null)
    const dragOverItem = React.useRef<any>(null)
    const handleSort = async () => {
        //duplicate items
        let _fruitItems = [...puntoInteres]

        //remove and save the dragged item content
        const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0]

        //switch the position
        _fruitItems.splice(dragOverItem.current, 0, draggedItemContent)

        //reset the position ref
        dragItem.current = null
        dragOverItem.current = null

        //update the actual array
        setPuntoInteres(_fruitItems)
        // console.log(_fruitItems)
        const a = await postData(OrderPointOfInterest, {puntos: _fruitItems})
        console.log(a)
    }
    //handle name change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFruitItem(e.target.value)
    }

    //handle new item addition
    // const handleAddItem = () => {
    // 	const _fruitItems = [...puntoInteres]
    // 	_fruitItems.push(newFruitItem)
    // 	setPuntoInteres(_fruitItems)
    // }

    // * Restricción por rol
    const {setShowLoad} = useContext(LoadingContext)

    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionCreateRoom, setPermissionCreateRoom] = useState(true)
    const [permissionSetPrincipalImage, setPermissionSetPrincipalImage] = useState(true)

    const [permissionCreatePoint, setPermissionCreatePoint] = useState(true)
    const [permissionEditPoint, setPermissionEditPoint] = useState(true)
    const [permissionDeletePoint, setPermissionDeletePoint] = useState(true)
    const [permissionSortPoint, setPermissionSortPoint] = useState(true)
    const [permissionChangeVisibilityPoint, setPermissionChangeVisibilityPoint] = useState(true)
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
                setPermissionCreateRoom(filter[0]?.sitio_sala_crear)
                setPermissionSetPrincipalImage(filter[0]?.sitio_establecer_imagen_principal)

                setPermissionCreatePoint(filter[0]?.sitio_punto_crear)
                setPermissionEditPoint(filter[0]?.sitio_punto_editar)
                setPermissionDeletePoint(filter[0]?.sitio_punto_eliminar)
                setPermissionSortPoint(filter[0]?.sitio_punto_ordenar)
                setPermissionChangeVisibilityPoint(filter[0]?.sitio_punto_visible)
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

    return (
        <>
            <div className=' '>
                <div className='row'>
                    <div className='col-9'>
                        <div className='card'>
                            <br></br>
                            <div style={{marginLeft: '15px'}}>
                                {/* {
                                room?.map(sala => <Rooms {...sala} key={sala.id_sala.toString()} />)
                                }  */}

                                {room?.map((sala, index) => (
                                    <div
                                        className='btn-group'
                                        role='group'
                                        aria-label='Basic example'
                                        key={index}
                                    >
                                        <Button
                                            variant='outline-dark'
                                            size='sm'
                                            onClick={() => {
                                                seteatPuntoInteres(
                                                    sala.points_of_interest as PointInteres[]
                                                )
                                                setIdSala(sala.id_sala)
                                                setNombreSala(sala.nombre)
                                                setVistaPrevia(false)
                                            }}
                                        >
                                            {sala.nombre}
                                        </Button>

                                        <Button
                                            variant='outline-dark'
                                            size='sm'
                                            onClick={() => {
                                                setupdateRoom({
                                                    id_sala: sala.id_sala,
                                                    id_sitio: upRoom.id_sitio,
                                                    nombre: sala.nombre,
                                                    descripcion: sala.descripcion,
                                                    tipo: true,
                                                    estado: 1,
                                                })
                                                setModalUpdateRoom(true)
                                            }}
                                            style={{width: '5px', height: '40px'}}
                                        >
                                            <i
                                                className='fa-solid fa-pencil '
                                                style={{
                                                    color: '#92929F',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            ></i>
                                        </Button>
                                        <Button
                                            variant='outline-dark'
                                            size='sm'
                                            onClick={() => {
                                                deleteRoom(
                                                    sala.nombre,
                                                    sala.id_sala,
                                                    sala.points_of_interest.length
                                                )
                                            }}
                                            style={{width: '5px', height: '40px'}}
                                        >
                                            <i
                                                className='fa-solid fa-xmark '
                                                style={{
                                                    color: '#92929F',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            ></i>
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    variant='outline-dark'
                                    size='sm'
                                    onClick={async () => {
                                        await validateRole()

                                        if (!permissionCreateRoom) {
                                            swal({
                                                title: 'No tienes permiso para crear salas',
                                                icon: 'warning',
                                            })
                                            return
                                        }
                                        setModalAddRoom(true)
                                    }}
                                >
                                    Nueva Sala
                                    <i
                                        className='fa-solid bi-plus '
                                        id='center2'
                                        onClick={() => {}}
                                        style={{
                                            color: '#92929F',
                                            fontSize: '20px',
                                            marginTop: '-5px',
                                        }}
                                    ></i>
                                </Button>
                            </div>
                            <hr style={{position: 'relative'}}></hr>
                            <br></br>
                            {/* <div className='row'>
                                <div className='col-xs-12 col-md-6 col-lg-6'>


                                </div>
                                <div className='col-xs-12 col-md-6 col-lg-6 d-flex justify-content-end'>

                                    <div id='center2'>
                                        <ul className='nav justify-content-end'>
                                            <li className='nav-item '>

                                                <i className="bi-solid bi-plus background-button"
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px', fontSize: '23px' }}
                                                    onClick={(event) => {
                                                        if (idsala != undefined) {
                                                            navigate('/sitios/create-point-interes', {
                                                                state: {
                                                                    id_sitio: props.id_sitio,
                                                                    id_guia: idsala
                                                                },
                                                            })
                                                        } else {
                                                            swal({
                                                                icon: "error",
                                                                title: "¡Error al agregar nuevo punto de interes !",
                                                                text: "Para agregar punto de interes, primero debes selecionar una una sala",
                                                            });
                                                        }
                                                    }}></i>

                                            </li>
                                            <li className='nav-item'>
                                                <i
                                                    className={
                                                        'fa-solid fa-eye-slash background-button'
                                                        // status.oculto == false
                                                        //     ? 'fa-solid fa-eye-slash background-button'
                                                        //     : 'fa-solid fa-eye background-button'
                                                    }
                                                    id='center2'
                                                    onClick={() => {
                                                        // status.oculto == false
                                                        //   ? changeStatus(status.favorito, status.publicado, true)
                                                        //   : changeStatus(status.favorito, status.publicado, false)
                                                        // status.oculto = !status.oculto
                                                        // changeStatus(status.oculto)
                                                    }}
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                                ></i>
                                            </li>
                                            <i className="bi-solid bi-trash3 background-button"
                                                id='center2'
                                                style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}></i>
                                            <i
                                                className='fa-solid fa-gear background-button'
                                                id='center2'
                                                onClick={() => {


                                                }}
                                                style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                            ></i>
                                        </ul>
                                    </div>

                                </div>
                            </div> */}

                            <br></br>
                            <br></br>

                            <div className='list-container'>
                                {puntoInteres.map((punto, index) => (
                                    <div
                                        key={index}
                                        className='list-item'
                                        draggable
                                        onDragStart={async () => {
                                            await validateRole()

                                            if (!permissionSortPoint) {
                                                swal({
                                                    title: 'No tienes permiso para ordenar puntos de interés',
                                                    icon: 'warning',
                                                })
                                                return
                                            }
                                            dragItem.current = index
                                        }}
                                        onDragEnter={(e) => (dragOverItem.current = index)}
                                        onDragEnd={handleSort}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <div className='row'>
                                            <div className='col-xs-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-start '>
                                                <Card
                                                    style={{
                                                        display: 'flex',
                                                        padding: ' 0px 12px 0px 12px',
                                                        height: '100%',
                                                        justifyContent: 'center',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <Card.Title
                                                        className='text-center'
                                                        style={{flexDirection: 'row'}}
                                                    ></Card.Title>
                                                    <Card.Subtitle
                                                        className='text-white'
                                                        style={{
                                                            alignItems: 'flex-start',
                                                            paddingLeft: 20,
                                                            marginLeft: '75px',
                                                        }}
                                                    >
                                                        {punto.nombre}
                                                    </Card.Subtitle>
                                                    <Card.Subtitle
                                                        className='text-muted'
                                                        style={{
                                                            alignItems: 'flex-start',
                                                            paddingLeft: 20,
                                                            paddingTop: 5,
                                                            marginLeft: '75px',
                                                        }}
                                                    >
                                                        {punto.descripcion}
                                                    </Card.Subtitle>
                                                    <span
                                                        className='menu-ico'
                                                        style={{left: 10, position: 'absolute'}}
                                                    >
                                                        <i
                                                            className={`bi bi-list`}
                                                            style={{
                                                                fontSize: 20,
                                                                marginRight: '10px',
                                                            }}
                                                        ></i>
                                                        <Card.Img
                                                            src={`${punto.portada_path}`}
                                                            style={{
                                                                width: '60px',
                                                                height: '40px',
                                                                borderRadius: '10px',
                                                            }}
                                                            alt='...'
                                                            className='card-img-top img1'
                                                            onClick={() => {
                                                                setVistaPrevia(true)
                                                                setImagenPrevia(punto.portada_path)
                                                            }}
                                                        />
                                                    </span>
                                                </Card>
                                            </div>
                                            <div className='col-xs-12 col-md-12 col-lg-12 col-xl-6 d-flex justify-content-end'>
                                                <ul className='nav justify-content-end'>
                                                    <li className='nav-item '>
                                                        <Button
                                                            className='btn-secondary fa-solid fa-qrcode background-button '
                                                            style={{
                                                                color: '#92929F',
                                                                display: 'flex',
                                                                marginRight: '30px',
                                                                fontSize: '23px',
                                                            }}
                                                            onClick={() => {
                                                                setQr(punto.qr_path)
                                                                setNombre(punto.nombre)
                                                                handleShow()
                                                            }}
                                                        ></Button>
                                                    </li>
                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>
                                                                Escanee su Código QR
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body style={{textAlign: 'center'}}>
                                                            <Modal.Dialog>
                                                                Punto de Interes: {name}
                                                            </Modal.Dialog>
                                                            <QRCodeCanvas
                                                                id='qrCode'
                                                                value={qr}
                                                                size={300}
                                                                level={'H'}
                                                            />
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button
                                                                variant='secondary'
                                                                onClick={handleClose}
                                                            >
                                                                Close
                                                            </Button>
                                                            <Button
                                                                variant='primary'
                                                                onClick={() => {
                                                                    downloadQRCode(name)
                                                                }}
                                                            >
                                                                Descargar
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                    <li className='nav-item '>
                                                        <p
                                                            style={{
                                                                display: 'flex',
                                                                marginRight: '30px',
                                                                fontSize: '14px',
                                                                marginTop: '15px',
                                                            }}
                                                        >
                                                            <i
                                                                className={
                                                                    punto.es_portada_de_sitio ==
                                                                    false
                                                                        ? 'bi bi bi-circle'
                                                                        : 'bi bi-record-circle'
                                                                }
                                                                onClick={async () => {
                                                                    await validateRole()

                                                                    if (
                                                                        !permissionSetPrincipalImage
                                                                    ) {
                                                                        swal({
                                                                            title: 'No tienes permiso para establecer una imagen principal',
                                                                            icon: 'warning',
                                                                        })
                                                                        return
                                                                    }

                                                                    !punto.es_visible &&
                                                                        (await postData(
                                                                            statePointInteres,
                                                                            {
                                                                                id_punto:
                                                                                    punto.id_punto,
                                                                                es_visible:
                                                                                    true,
                                                                            }
                                                                        ))
                                                                    punto.es_portada_de_sitio =
                                                                        !punto.es_portada_de_sitio
                                                                    changeImagePrincipal(
                                                                        punto.id_punto,
                                                                        punto.id_sitio,
                                                                        Number(idsala)
                                                                    )
                                                                }}
                                                                style={{
                                                                    color: '#92929F',
                                                                    display: 'flex',
                                                                    marginRight: '8px',
                                                                    fontSize: '23px',
                                                                }}
                                                            ></i>
                                                            imagen principal
                                                        </p>
                                                    </li>

                                                    <li className='nav-item'>
                                                        <Button
                                                            disabled={
                                                                punto.es_portada_de_sitio && true
                                                            }
                                                            className={
                                                                punto.es_visible == false
                                                                    ? 'btn-secondary fa-solid fa-eye-slash background-button'
                                                                    : 'btn-secondary fa-solid fa-eye background-button'
                                                            }
                                                            id='center2'
                                                            onClick={async () => {
                                                                await validateRole()

                                                                if (
                                                                    !permissionChangeVisibilityPoint
                                                                ) {
                                                                    swal({
                                                                        title: 'No tienes permiso para cambiar la visibilidad de los puntos de interés',
                                                                        icon: 'warning',
                                                                    })
                                                                    return
                                                                }
                                                                punto.es_visible = !punto.es_visible
                                                                changeStatus(
                                                                    punto.id_punto,
                                                                    punto.es_visible
                                                                )
                                                            }}
                                                            style={{
                                                                color: '#92929F',
                                                                display: 'flex',
                                                                marginRight: '4px',
                                                            }}
                                                        ></Button>
                                                    </li>
                                                    <Button
                                                        className='btn-secondary fa-solid  fa-pencil background-button'
                                                        style={{
                                                            color: '#92929F',
                                                            display: 'flex',
                                                            marginRight: '4px',
                                                        }}
                                                        onClick={async () => {
                                                            await validateRole()

                                                            if (!permissionEditPoint) {
                                                                swal({
                                                                    title: 'No tienes permiso para editar un punto de interés',
                                                                    icon: 'warning',
                                                                })
                                                                return
                                                            }
                                                            // let lenaguajeDefault = ''
                                                            // for (
                                                            //     let i = 0;
                                                            //     i < languages.length;
                                                            //     i++
                                                            // ) {
                                                            //     for (
                                                            //         let j = 0;
                                                            //         j < punto.lenguajes.length;
                                                            //         j++
                                                            //     ) {
                                                            //         if (
                                                            //             languages[i]
                                                            //                 .id_lenguaje ===
                                                            //             punto.lenguajes[j]
                                                            //                 .id_lenguaje
                                                            //         ) {
                                                            // setLenaguajeDefault(languages[i].descripcion)

                                                            //             lenaguajeDefault =
                                                            //                 languages[i].nombre
                                                            //         }
                                                            //     }
                                                            // }
                                                            // console.log(punto.lenguajes)
                                                            // console.log(lenaguajeDefault)
                                                            // const languageEscogido =
                                                            //     punto.lenguajes.map(
                                                            //         (language) => ({
                                                            //             value: language.id_lenguaje,
                                                            //             label: lenaguajeDefault,
                                                            //         })
                                                            //     )
                                                            // console.log(languageEscogido)
                                                            navigate(
                                                                `/sitios/edit-point-interes/${punto.id_sitio}/${punto.id_punto}`,
                                                                {
                                                                    state: {
                                                                        id_punto: punto.id_punto,
                                                                        lenguajes: punto.lenguajes,
                                                                        id_sitio: punto.id_sitio,
                                                                        id_guia: idsala,
                                                                        nombre: punto.nombre,
                                                                        descripcion:
                                                                            punto.descripcion,
                                                                        geoX: punto.geoX,
                                                                        geoY: punto.geoY,
                                                                        portada_path:
                                                                            punto.portada_path,
                                                                        qr_path: punto.qr_path,
                                                                        es_portada_de_sitio:
                                                                            punto.es_portada_de_sitio,
                                                                        estado: punto.estado,
                                                                        es_visible:
                                                                            punto.es_visible,
                                                                        nombreSala: nombresala,
                                                                        publicado: punto.publicado,
                                                                    },
                                                                }
                                                            )
                                                        }}
                                                    ></Button>
                                                    <Button
                                                        className='btn-secondary  bi-trash3 background-button'
                                                        id='center2'
                                                        style={{
                                                            color: '#92929F',
                                                            display: 'flex',
                                                            marginRight: '20px',
                                                        }}
                                                        onClick={async () => {
                                                            await validateRole()

                                                            if (!permissionDeletePoint) {
                                                                swal({
                                                                    title: 'No tienes permiso para eliminar un punto de interés',
                                                                    icon: 'warning',
                                                                })
                                                                return
                                                            }
                                                            // console.log(punto.es_portada_de_sitio)
                                                            deletePointInteres(
                                                                punto.id_punto,
                                                                punto.id_sitio
                                                            )
                                                            getSalas()
                                                        }}
                                                    ></Button>

                                                    {/* <i
                                                        className='fa-solid fa-gear background-button'
                                                        id='center2'
                                                        onClick={() => {


                                                        }}
                                                        style={{ color: '#92929F', display: 'flex', marginRight: '20px' }}
                                                    ></i> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <br></br>
                            <br></br>

                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Row>
                                    <Col sm='12' md='12' className='pb-10'>
                                        <Card
                                            style={{
                                                display: 'flex',
                                                paddingTop: 40,
                                                paddingBottom: 20,
                                                height: 15,
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                borderStyle: 'dashed',
                                                borderWidth: '1px',
                                                borderColor: '#009EF7',
                                            }}
                                            onClick={async () => {
                                                await validateRole()

                                                if (!permissionCreatePoint) {
                                                    swal({
                                                        title: 'No tienes permiso para crear un nuevo punto de interés',
                                                        icon: 'warning',
                                                    })
                                                    return
                                                }

                                                if (idsala != undefined) {
                                                    navigate('/sitios/create-point-interes', {
                                                        state: {
                                                            id_sitio: props.id_sitio,
                                                            id_guia: idsala,
                                                            nombreSala: nombresala,
                                                        },
                                                    })
                                                } else {
                                                    swal({
                                                        icon: 'error',
                                                        title: `¡Error al agregar nuevo punto de interes !`,
                                                        text: `Nota: Para agregar punto de interes, \n primero debes selecionar una una sala`,
                                                    })
                                                }
                                            }}
                                        >
                                            <Card.Title
                                                className='text-center'
                                                style={{flexDirection: 'row'}}
                                            >
                                                <i>
                                                    <Card.Subtitle className='text-muted mb-4'>
                                                        {' '}
                                                        <i className={`bi bi-plus`}>
                                                            Click para agregar un nuevo punto de
                                                            interés.
                                                        </i>
                                                    </Card.Subtitle>
                                                </i>
                                            </Card.Title>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>

                    <div className='col-3'>
                        {vista === true ? (
                            <Card className='text-center'>
                                <Card.Body>
                                    <Card.Title>Vista Previa de Sala</Card.Title>
                                    {/* <Card.Img src={logo}/> */}
                                    <Card.Img src={imagen} />
                                </Card.Body>
                            </Card>
                        ) : null}
                    </div>
                    <AddRoom
                        show={modalAddRoom}
                        onClose={() => setModalAddRoom(false)}
                        addRoom={addNewRoom}
                        id_sitio={props.id_sitio}
                    />
                    <UpdateRoom
                        show={modalUpdateRoom}
                        onClose={() => {
                            setModalUpdateRoom(false)
                        }}
                        updateRoom={updateRooom}
                        room={upRoom}
                    />
                </div>
            </div>
        </>
    )
}

export default Interes
