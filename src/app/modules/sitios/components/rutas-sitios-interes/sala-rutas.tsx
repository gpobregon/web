import { Room } from "../../../../models/rooms";
import { FC, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { PointInteres } from "../../../../models/sitio-interes";
import { addRoom, addRoute, deleteData, deleteRuta, editRoom, getRoutefInterest, OrderPointOfInterest, postData, RoomsMethod, statePointInteresPublished } from "../../../../services/api";
import swal from "sweetalert";
import AddRoom from "../sitios-interes/add-room";
import UpdateRoom from "../sitios-interes/update-room";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import React from "react";
type datosPuntoInteres = {
    id_punto: number
    lenguajes: [
        {
            id_punto: number
            id_lenguaje: number
            descripcion: string
        }
    ]
    id_sitio: number
    id_guia: number
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
}
type id_punto_a = {
    id_punto_a: number
    id_sitio: number
    puntosIteres: datosPuntoInteres
}

const SalaRutas: FC<id_punto_a> = (props) => {
    const [room, setRooms] = useState<Room[]>([])
    const [puntoInteres, setPuntoInteres] = useState<PointInteres[]>([])
    const [rutas, setRutas] = useState<any[]>([]);
    const [idsala, setIdSala] = useState<number>()
    const [modalAddRoom, setModalAddRoom] = useState(false)
    const [modalUpdateRoom, setModalUpdateRoom] = useState(false)
    const [vista, setVistaPrevia] = useState(false) //mostrar vsta previa
    const [imagen, setImagenPrevia] = useState('') //mostrar vsta previa
    const navigate = useNavigate()
    const [upRoom, setupdateRoom] = useState({
        id_sitio: props.id_sitio,
        id_sala: 0,
        nombre: '',
        descripcion: '',
        tipo: true,
        estado: 1,
    })
    const getRutas = async () => {
        const data: any = await postData(getRoutefInterest, { id_punto_a: props.id_punto_a });
        setRutas(data as any[])

        if (data.length === 0) {
            setRutas([{ id_punto: 0 }])
        }
        // console.log(data);
        // for (let i = 0; i < puntoInteres.length; i++) {
        //     for (let j = 0; j < data.length; j++) {
        //         if (puntoInteres[i].id_punto === data[j].id_punto) {

        //             puntoInteres[i].rutaActiva = true
        //         } else {
        //             if (puntoInteres[i].rutaActiva) {

        //             } else {
        //                 puntoInteres[i].rutaActiva = false
        //             }
        //         }
        //     }


        // }
        // console.log(puntoInteres);

    }

    const getSalas = async () => {
        const rooms: any = await postData(RoomsMethod, { id_sitio: props.id_sitio })
        await getRutas()
        // console.log(rooms);
        setRooms(rooms.salas as Room[])
        setVistaPrevia(false)
        // setVistaPrevia(false)
    }
    const seteatPuntoInteres = (interes: any) => {
        setPuntoInteres(interes)
        getRutas()
    }
    const deleteRoom = (id: string, longitud: number) => {
        if (longitud > 0) {
            swal({
                icon: "error",
                title: "¡Error al Eliminar Sala: \n" + id + "!",
                text: "No se puede eliminar una sala con puntos de interés",
            });
        } else {
            swal({
                title: "¿Estas seguro de Eliminar Sala " + id + "?",
                icon: "warning",
                buttons: ["No", "Sí"],

            }).then(async res => {
                if (res) {
                    await deleteData(RoomsMethod, { id_sala: id })
                    getSalas()
                    swal({
                        text: "Se elimino con éxito",
                        icon: "success",
                        timer: 2000,

                    })
                }
            });
        }

    }
    const addNewRoom = async (createRoom: any) => {
        await postData(addRoom, createRoom)
        setModalAddRoom(false)
        getSalas()
    }

    const updateRooom = async (Room: any) => {
        await postData(editRoom, Room)

        setModalUpdateRoom(false)
        getSalas()
    }
    //ordenamiento drag and drop------------------------------------------------------

    const [newFruitItem, setNewFruitItem] = React.useState("")

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
        await postData(OrderPointOfInterest, { puntos: _fruitItems })

    }
    const agregarRuta = async (puntoa: number, puntob: number) => {
        const rooms: any = await postData(addRoute, { id_punto_a: puntoa, id_punto_b: puntob, estado: 1 })

    }
    const eliminarRuta = async (id: number) => {

        swal({
            title: "¿Estas seguro de Eliminar Ruta ?",
            icon: "warning",
            buttons: ["No", "Sí"],

        }).then(async res => {
            if (res) {
                await postData(deleteRuta, { id_punto_a: props.id_punto_a, id_punto_b: id })
                setPuntoInteres([])
                setRooms([])
                getRutas();
                getSalas();
                swal({
                    text: "Se elimino con éxito",
                    icon: "success",
                    timer: 2000,

                })
            }
        });

    }


    useEffect(() => {
        getSalas();
        getRutas();
    }, [])
    return (
        <>
            <div className=' '>
                <div className='row'>
                    <div className='col-9'>
                        <div className='card'>
                            <br></br>
                            <div style={{ marginLeft: '15px' }}>


                                {room?.map((sala, index) => (


                                    <>
                                        <Button variant="outline-dark" size="sm" onClick={() => {
                                            var temporal = sala.points_of_interest as PointInteres[]
                                            for (let i = 0; i < temporal.length; i++) {
                                                for (let j = 0; j < rutas.length; j++) {
                                                    if (temporal[i].id_punto === rutas[j].id_punto) {

                                                        temporal[i].rutaActiva = true
                                                    } else {
                                                        if (temporal[i].rutaActiva) {

                                                        } else {
                                                            temporal[i].rutaActiva = false
                                                        }
                                                    }
                                                }


                                            }
                                            seteatPuntoInteres(temporal);
                                            setIdSala(sala.id_sala);
                                            // getRutas();
                                            setVistaPrevia(false)
                                        }}
                                        >
                                            {sala.nombre}

                                        </Button>
                                        <Button variant="outline-dark" size="sm"
                                            onClick={() => {
                                                setupdateRoom({
                                                    id_sala: sala.id_sala,
                                                    id_sitio: upRoom.id_sitio,
                                                    nombre: sala.nombre,
                                                    descripcion: sala.descripcion,
                                                    tipo: true,
                                                    estado: 1
                                                })
                                                setModalUpdateRoom(true)
                                            }}
                                            style={{ width: '5px', height: '40px' }} >
                                            <i className='fa-solid fa-pencil '
                                                style={{ color: '#92929F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            </i>
                                        </Button>
                                        <Button variant="outline-dark" size="sm"
                                            onClick={() => { deleteRoom(sala.nombre, sala.points_of_interest.length) }}
                                            style={{ width: '5px', height: '40px' }} >
                                            <i className='fa-solid fa-xmark '
                                                style={{ color: '#92929F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            </i>
                                        </Button>
                                    </>


                                ))
                                }
                                <Button variant="outline-dark" size="sm" onClick={() => setModalAddRoom(true)}>
                                    Nueva Sala
                                    <i
                                        className='fa-solid bi-plus '
                                        id='center2'
                                        onClick={() => {
                                        }}
                                        style={{ color: '#92929F', fontSize: '20px', marginTop: '-5px' }}
                                    ></i>
                                </Button>
                            </div>
                            <hr style={{ position: 'relative' }}></hr>
                            <br></br>

                            <div className="list-container">

                                {
                                    puntoInteres.map((punto, index) => (
                                        props.id_punto_a != punto.id_punto ?
                                            <div
                                                key={index}
                                                className="list-item"
                                                draggable
                                                onDragStart={(e) => (dragItem.current = index)}
                                                onDragEnter={(e) => (dragOverItem.current = index)}
                                                onDragEnd={handleSort}
                                                onDragOver={(e) => e.preventDefault()}>

                                                <div className='row'>
                                                    <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-start'>

                                                        <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}>
                                                            <Card.Title className='text-center' style={{ flexDirection: 'row' }}>

                                                            </Card.Title>
                                                            <Card.Subtitle className="text-white" style={{ alignItems: 'flex-start', paddingLeft: 10, marginLeft: '75px' }} >{punto.nombre}</Card.Subtitle>
                                                            <Card.Subtitle className='text-muted' style={{ alignItems: 'flex-start', paddingLeft: 10, paddingTop: 5, marginLeft: '75px' }} >{punto.descripcion}</Card.Subtitle>
                                                            <span className='menu-ico' style={{ left: 10, position: 'absolute' }}>

                                                                <i className={`bi bi-list`} style={{ fontSize: 20, marginRight: '10px' }}></i>
                                                                <Card.Img
                                                                    src=

                                                                    {`${punto.portada_path}`}


                                                                    style={{ width: '60px', height: '40px', borderRadius: '10px' }}
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

                                                    <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-end'>

                                                        <div id='center2'>

                                                            <ul className='nav justify-content-end'>
                                                                {

                                                                    punto.rutaActiva === true ?
                                                                        <>
                                                                            <Button className="btn btn-secondary " style={{ marginRight: '10px' }}
                                                                                onClick={() => {

                                                                                    navigate('/sitios/add-route', {
                                                                                        state: {
                                                                                            id_punto_a: props.id_punto_a,
                                                                                            id_punto_b: punto.id_punto,
                                                                                            interes: props.puntosIteres,
                                                                                            nombre_punto_a: props.puntosIteres.nombre,
                                                                                            nombre_punto_b: punto.nombre,
                                                                                        }
                                                                                    })
                                                                                }}>

                                                                                <i className="bi bi-signpost-split"></i>
                                                                                {'Editar Ruta'}


                                                                            </Button>
                                                                            <i className="bi-solid bi-trash3 background-button"
                                                                                id='center2'
                                                                                style={{ color: '#92929F', display: 'flex', marginRight: '20px' }}
                                                                                onClick={() => {
                                                                                    // console.log(punto.es_portada_de_sitio)
                                                                                    eliminarRuta(punto.id_punto)
                                                                                }}
                                                                            ></i>

                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button className="btn btn-secondary " style={{ marginRight: '10px' }}
                                                                                onClick={() => {
                                                                                    agregarRuta(props.id_punto_a, punto.id_punto)
                                                                                    navigate('/sitios/add-route', {
                                                                                        state: {
                                                                                            id_punto_a: props.id_punto_a,
                                                                                            id_punto_b: punto.id_punto,
                                                                                            interes: props.puntosIteres,
                                                                                            nombre_punto_a: props.puntosIteres.nombre,
                                                                                            nombre_punto_b: punto.nombre,
                                                                                        }
                                                                                    })
                                                                                }}>
                                                                                <i className="bi bi-signpost"></i>
                                                                                {/* <i className="bi bi-signpost-split"></i> */}
                                                                                {'Crear Ruta'}
                                                                            </Button>

                                                                        </>
                                                                }


                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                    ))}

                            </div>
                            <br></br>
                            <br></br>


                        </div>
                    </div>

                    <div className='col-3' >

                        {vista === true ?

                            <Card className="text-center">
                                <Card.Body>
                                    <Card.Title>Vista Previa de Sala</Card.Title>
                                    <Card.Img src={imagen} />
                                </Card.Body>
                            </Card>
                            : null}

                    </div>

                </div>

            </div>
            <AddRoom
                show={modalAddRoom}
                onClose={() => setModalAddRoom(false)}
                addRoom={addNewRoom}
                id_sitio={props.id_sitio}
            />
            <UpdateRoom
                show={modalUpdateRoom}
                onClose={() => { setModalUpdateRoom(false) }}
                updateRoom={updateRooom}
                room={upRoom}
            />
        </>
    );
}
export default SalaRutas;