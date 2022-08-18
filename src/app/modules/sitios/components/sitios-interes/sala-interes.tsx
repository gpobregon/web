import { type } from 'os';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Col, Card, Button, Row, Modal } from 'react-bootstrap';
import { RoomsMethod, postData, updateSiteMethod, addRoom, deleteData, delPointInteres, editRoom } from '../../../../services/api'
import { Room } from "../../../../models/rooms";
import swal from "sweetalert";
import { PointInteres } from "../../../../models/sitio-interes";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { safeUseLayoutEffect } from 'react-table';
import { number } from 'yup';
import { QRCodeCanvas } from "qrcode.react";
import logo from '../../upload-image_03.jpg';
import AddRoom from './add-room';
import UpdateRoom from './update-room';
import domtoimage from 'dom-to-image';

type id_sitio = {
    id_sitio: number
}

const Interes: FC<id_sitio> = (props) => {
    const navigate = useNavigate()
    const [room, setRooms] = useState<Room[]>([])
    const [puntoInteres, setPuntoInteres] = useState<PointInteres[]>([])
    const [idsala, setIdSala] = useState<number>()
    const [upRoom, setupdateRoom] = useState({
        id_sitio: props.id_sitio,
        id_sala: 0,
        nombre: '',
        descripcion: '',
        tipo:true,
        estado:1,
    })

    const [modalAddRoom, setModalAddRoom] = useState(false)
    const [modalUpdateRoom, setModalUpdateRoom] = useState(false)
    const handleClose = () => setShow(false)  //modal close qr
    const handleShow = () => setShow(true)  //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    const [qr, setQr] = useState<any>() //modal qr
    const [status, setStatus] = useState({
        oculto: true,
    })
    const changeStatus = (oculto: boolean) => {
        setStatus({
            oculto: oculto,
        })

        // postData(statePointInteres, status)

    }
    useEffect(() => {
        getSalas()
    }, [])


    const getSalas = async () => {
        const rooms: any = await postData(RoomsMethod, props)
        // console.log(rooms)
        setRooms(rooms.salas as Room[])
    }

    const seteatPuntoInteres = (interes: any) => {
        setPuntoInteres(interes)
        console.log(puntoInteres)
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

    const showModalUpdateRoom = () =>{ 
        console.log(upRoom)
        setModalUpdateRoom(true)
    }

    const deleteRoom = (id: number, longitud: number) => {
        if (longitud > 0) {
            swal({
                icon: "error",
                title: "¡Error al Eliminar Sala" + id + "!",
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
    const deletePointInteres = (id_punto: number, id_sitio: number) => {
        // console.log(id_punto,id_sitio,idsala)
        swal({
            title: "¿Estas seguro de Eliminar este punto de interes ?",
            icon: "warning",
            buttons: ["No", "Sí"],

        }).then(async res => {
            if (res) {
               await deleteData(delPointInteres, { id_punto: id_punto, id_lenguaje: 1, id_sitio: id_sitio, id_guia: idsala, estado: 0 })
              
                setPuntoInteres([])
                swal({
                    text: "Se elimino con éxito",
                    icon: "success",
                    timer: 2000,

                })
                getSalas()


            }
        });
    }

    //descargar QR------------------------------------------------------
    const downloadQRCode = async  () => {
    //     const qrCodeURL = document.getElementById('qrCode')  as HTMLCanvasElement
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    //   console.log(qrCodeURL)
    //   let aEl = document.createElement("a");
    //   aEl.href = qrCodeURL;
    //   aEl.download = "QR_Code.png";
    //   document.body.appendChild(aEl);
    //   aEl.click();
    //   document.body.removeChild(aEl);
    

    domtoimage.toJpeg(document.getElementById('qrCode')!, { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
}
   
      
    
    

    return (
        <>
            <div className=' '>
                <div className='row'>
                    <div className='col-9'>
                        {/* <div className='card'>
                            <br></br>
                            <div>
                                <Button variant="secondary" size="sm">
                                    Sitio 01
                                </Button>{' '}
                                <Button variant="secondary" size="sm">
                                    Nueva Sala
                                </Button>
                            </div>
                            <br></br>
                        </div> */}


                        <div className='card'>
                            <br></br>
                            <div style={{ marginLeft: '15px' }}>
                                {/* {
                                room?.map(sala => <Rooms {...sala} key={sala.id_sala.toString()} />)
                                }  */}

                                {room?.map((sala) => (
                                    <><Button variant="outline-dark" size="sm" onClick={() => {
                                        seteatPuntoInteres(sala.points_of_interest as PointInteres[]);
                                        setIdSala(sala.id_sala);
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
                                                    estado: 1, 
                                                })
                                                setModalUpdateRoom(true)}}
                                            style={{ width: '5px', height: '40px' }} >
                                            <i className='fa-solid fa-pencil '
                                                style={{ color: '#92929F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                </i>
                                        </Button>
                                        <Button variant="outline-dark" size="sm"
                                            onClick={() => { deleteRoom(sala.id_sala, sala.points_of_interest.length) }}
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
                            <div className='row'>
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
                                                        status.oculto == false
                                                            ? 'fa-solid fa-eye-slash background-button'
                                                            : 'fa-solid fa-eye background-button'
                                                    }
                                                    id='center2'
                                                    onClick={() => {
                                                        // status.oculto == false
                                                        //   ? changeStatus(status.favorito, status.publicado, true)
                                                        //   : changeStatus(status.favorito, status.publicado, false)
                                                        status.oculto = !status.oculto
                                                        changeStatus(status.oculto)
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
                            </div>


                            <br></br>
                            <br></br>

                            {
                                puntoInteres?.map((punto) => (
                                    <div className='row'>
                                        <div className='col-xs-12 col-md-12 col-lg-6'>

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


                                                        style={{ width: '25%', height: '25%', borderRadius: '10px' }}
                                                        alt='...'
                                                        className='card-img-top img1'

                                                    />
                                                </span>
                                            </Card>
                                        </div>
                                        <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-end'>

                                            <div id='center2'>
                                                <ul className='nav justify-content-end'>
                                                    <li className='nav-item '>
                                                        <i className="fa-solid fa-qrcode background-button "
                                                            style={{ color: '#92929F', display: 'flex', marginRight: '30px', fontSize: '23px' }}
                                                            onClick={() => {
                                                                setQr(punto.qr_path)
                                                                handleShow()
                                                                console.log(punto)
                                                            }}

                                                        ></i>

                                                    </li>
                                                    <Modal show={show} onHide={handleClose}id="qrCode">
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Escanee su Código QR</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body style={{ textAlign: 'center' }}>

                                                            <QRCodeCanvas 
                                                                
                                                                value={qr}
                                                                size={300}

                                                                level={"H"}
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
                                                    <li className='nav-item '>

                                                        <p style={{ display: 'flex', marginRight: '30px', fontSize: '14px', marginTop: '15px' }}> <i className="bi bi bi-circle"
                                                            style={{ color: '#92929F', display: 'flex', marginRight: '8px', fontSize: '23px' }}></i>imagen principal</p>
                                                    </li>

                                                    <li className='nav-item'>

                                                        <i
                                                            className={
                                                                status.oculto == false
                                                                    ? 'fa-solid fa-eye-slash background-button'
                                                                    : 'fa-solid fa-eye background-button'
                                                            }
                                                            id='center2'
                                                            onClick={() => {
                                                                status.oculto = !status.oculto
                                                                changeStatus(status.oculto)
                                                            }}
                                                            style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                                        ></i>
                                                    </li>
                                                    <i className="fa-solid  fa-pencil background-button"
                                                        style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                                        onClick={(event) => {
                                                            navigate('/sitios/edit-point-interes', {
                                                                state: {
                                                                    id_punto: punto.id_punto,
                                                                    lenguajes: punto.lenguajes,
                                                                    id_sitio: punto.id_sitio,
                                                                    id_guia: idsala,
                                                                    nombre: punto.nombre,
                                                                    descripcion: punto.descripcion,
                                                                    geoX: punto.geoX,
                                                                    geoY: punto.geoY,
                                                                    portada_path: punto.portada_path,
                                                                    qr_path: punto.qr_path,
                                                                    es_portada_de_sitio: punto.es_portada_de_sitio,
                                                                    estado: punto.estado,
                                                                },
                                                            })
                                                        }}
                                                    ></i>
                                                    <i className="bi-solid bi-trash3 background-button"
                                                        id='center2'
                                                        style={{ color: '#92929F', display: 'flex', marginRight: '20px' }}
                                                        onClick={() => {
                                                            // console.log(punto.es_portada_de_sitio)
                                                            deletePointInteres(punto.id_punto, punto.id_sitio);
                                                            getSalas()
                                                        }}
                                                    ></i>

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
                                ))
                            }



                            {/* <div className='row'>
                                <div className='col-xs-12 col-md-12 col-lg-6'>

                                    <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column' }}>
                                        <Card.Title className='text-center' style={{ flexDirection: 'row' }}>
                                        </Card.Title>
                                        <Card.Subtitle className="text-white" style={{ alignItems: 'flex-start', paddingLeft: 10,marginLeft:'75px' }} >pana</Card.Subtitle>
                                        <Card.Subtitle className='text-muted' style={{ alignItems: 'flex-start', paddingLeft: 10, paddingTop: 5,marginLeft:'75px' }} >descripcion</Card.Subtitle>
                                        <span className='menu-ico' style={{ left: 10, position: 'absolute' }}>

                                            <i className={`bi bi-list`} style={{ fontSize: 20,marginRight:'10px' }}></i>
                                            <Card.Img
                                                src={

                                                    'https://icon-library.com/images/upload-file-icon/upload-file-icon-24.jpg'

                                                }
                                                style={{ width: '15%', height: '15%',borderRadius:'10px' }}
                                                alt='...'
                                                className='card-img-top img1'

                                            />
                                        </span>
                                    </Card>
                                   
                                </div>
                                <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-end'>
                               
                                    <div id='center2'>
                                        <ul className='nav justify-content-end'>
                                            <li className='nav-item '>
                                                
                                            <i className="fa-solid fa-qrcode background-button "
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '30px', fontSize: '23px' }}></i>
                                            </li>
                                            <li className='nav-item '>
                                           
                                                <p style={{ display: 'flex', marginRight: '30px', fontSize: '14px', marginTop: '15px' }}>  <i className="bi bi-record-circle"
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '8px', fontSize: '23px' }}></i>imagen principal</p>
                                            </li>
                                            <li className='nav-item'>
                                                <i
                                                    className='fa-solid fa-eye background-button'
                                                    id='center2'
                                                    // onClick={handleShow}
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
                                                style={{ color: '#92929F', display: 'flex', marginRight: '20px' }}
                                            ></i>
                                        </ul>
                                    </div>

                                </div>
                            </div> */}


                            <br></br>
                            <br></br>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Row>
                                    <Col sm='4' md='12' className='pb-10' >

                                        <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}>
                                            <Card.Title className='text-center' style={{ flexDirection: 'row' }}>


                                                <i onClick={(event) => {
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

                                                }}>



                                                    <Card.Subtitle className='text-muted mb-4'>   <i className={`bi bi-plus`}>Click para agregar un nuevo punto de interés.</i></Card.Subtitle>
                                                </i>
                                            </Card.Title>

                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>


                    <div className='col-3' >
                        {/* <div className='card div-image'>
                            <br />
                            <h4 style={{ fontSize: '18px' ,textAlign:'center'}}>Vista Previa de Sala</h4>
                            <Card.Img 
                                src={' https://icon-library.com/images/upload-file-icon/upload-file-icon-24.jpg'}
                              
                             

                            />

                            
                        </div> */}

                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Vista Previa de Sala</Card.Title>
                                <Card.Img src={logo}/>
                            </Card.Body>
                        </Card>
                    </div>
                    <AddRoom
                        show={modalAddRoom}
                        onClose={() => setModalAddRoom(false)}
                        addRoom={addNewRoom}
                        id_sitio={props.id_sitio}
                    />
                    <UpdateRoom
                        show={modalUpdateRoom}
                        onClose={() => {setModalUpdateRoom(false)}}
                        updateRoom={updateRooom}
                        room={upRoom}
                    />
                </div>
            </div>
        </>
    );
}

export default Interes;
