import { type } from 'os';
import React, { FC, useEffect, useState } from 'react';
import { Col, Card, Button, Row, Modal } from 'react-bootstrap';
import { getRooms, postData, updateSiteMethod } from '../../../../services/api'
import { Room } from "../../../../models/rooms";
import Rooms from './components/rooms';
import { PointInteres } from "../../../../models/sitio-interes";

type id_sitio = {
    id_sitio: number
}

const Interes: FC<id_sitio> = (props) => {
    const [room, setRooms] = useState<Room[]>([])
    const [puntoInteres, setPuntoInteres] = useState<PointInteres[]>([])
    const handleClose = () => setShow(false)  //modal close qr
    const handleShow = () => setShow(true)  //modal open qr
    const [show, setShow] = useState(false) //modal show qr
    useEffect(() => {
        getSalas()
    }, [])


    const getSalas = async () => {
        const rooms: any = await postData(getRooms, props)
        setRooms(rooms.salas as Room[])
    }

    const seteatPuntoInteres = (interes: any) => {
        setPuntoInteres(interes)
        console.log(puntoInteres)
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
                                    <Button variant="secondary" size="sm" onClick={() => {
                                        seteatPuntoInteres(sala.points_of_interest as PointInteres[])
                                    }}
                                        style={{ marginRight: '4px' }}>
                                        Sitio {sala.id_sala}
                                    </Button>
                                ))}

                                <Button variant="secondary" size="sm">
                                    Nueva Sala
                                </Button>
                            </div>
                            <hr style={{ position: 'relative' }}></hr>
                            <br></br>
                            <div className='row'>
                                <div className='col-xs-12 col-md-6 col-lg-6'>
                                    <p style={{ marginTop: '10px', marginLeft: '15px', display: 'flex' }}>Agregado Recientemente</p>

                                </div>
                                <div className='col-xs-12 col-md-6 col-lg-6 d-flex justify-content-end'>

                                    <div id='center2'>
                                        <ul className='nav justify-content-end'>
                                            <li className='nav-item '>
                                                <i className="bi-solid bi-plus background-button"
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px', fontSize: '23px' }}></i>

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
                                                <Card.Subtitle className="text-white" style={{ alignItems: 'flex-start', paddingLeft: 10 }} >{punto.nombre}</Card.Subtitle>
                                                <Card.Subtitle className='text-muted' style={{ alignItems: 'flex-start', paddingLeft: 10, paddingTop: 5 }} >{punto.descripcion}</Card.Subtitle>
                                                <span className='menu-ico' style={{ left: 10, position: 'absolute' }}>

                                                    <i className={`bi bi-list`} style={{ fontSize: 20 }}></i>
                                                </span>
                                            </Card>
                                        </div>
                                        <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-end'>

                                            <div id='center2'>
                                                <ul className='nav justify-content-end'>
                                                    <li className='nav-item '>
                                                        <i className="fa-solid fa-qrcode background-button "
                                                            style={{ color: '#92929F', display: 'flex', marginRight: '30px', fontSize: '23px' }}
                                                            onClick={handleShow}
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
                                                    <li className='nav-item '>
                                                        <i className="bi bi bi-circle"
                                                            style={{ color: '#92929F', display: 'flex', marginRight: '8px', fontSize: '23px', marginTop: '15px' }}></i>

                                                    </li>
                                                    <li className='nav-item '>

                                                        <p style={{ display: 'flex', marginRight: '30px', fontSize: '14px', marginTop: '15px' }}> imagen principal</p>
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
                                    </div>
                                ))
                            }



                            <div className='row'>
                                <div className='col-xs-12 col-md-12 col-lg-6'>

                                    <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}>
                                        <Card.Title className='text-center' style={{ flexDirection: 'row' }}>

                                        </Card.Title>
                                        <Card.Subtitle className="text-white" style={{ alignItems: 'flex-start', paddingLeft: 10 }} >pana</Card.Subtitle>
                                        <Card.Subtitle className='text-muted' style={{ alignItems: 'flex-start', paddingLeft: 10, paddingTop: 5 }} >descripcion</Card.Subtitle>
                                        <span className='menu-ico' style={{ left: 10, position: 'absolute' }}>

                                            <i className={`bi bi-list`} style={{ fontSize: 20 }}></i>
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
                                                <i className="bi bi-record-circle"
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '8px', fontSize: '23px', marginTop: '15px' }}></i>

                                            </li>
                                            <li className='nav-item '>

                                                <p style={{ display: 'flex', marginRight: '30px', fontSize: '14px', marginTop: '15px' }}> imagen principal</p>
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
                            </div>


                            <br></br>
                            <br></br>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Row>
                                    <Col sm='4' md='12' className='pb-10' >

                                        <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}>
                                            <Card.Title className='text-center' style={{ flexDirection: 'row' }}>
                                                <a href="sitios/create" >
                                                    <Card.Subtitle className='text-muted mb-4'>   <i className={`bi bi-plus`}>Click para agregar un nuevo punto de interés.</i></Card.Subtitle>
                                                </a>
                                            </Card.Title>

                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>


                    <div className='col-3'>
                        <div className='card div-image'>
                            <br />
                            <h4 style={{ fontSize: '18px' }}>Vista Previa de Sala</h4>
                            <Card.Img
                                src={' https://icon-library.com/images/upload-file-icon/upload-file-icon-24.jpg'}
                                alt='...'
                                className='card-img-top img2'

                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Interes;
