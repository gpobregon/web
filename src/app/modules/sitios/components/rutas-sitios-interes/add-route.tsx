import { Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddRoute = () => {
    return (
        <>

            <div className=' '>
                <div className='row' style={{
                    backgroundColor: '#1A1A27',
                    backgroundSize: 'auto 100%',
                    borderRadius: '5px',
                }}>
                    <div className='col-xs-12 col-md-5 col-lg-6 d-flex py-5 px-9' >
                        <div id='center'>

                            <i className='fa-solid fa-less-than background-button ' id='center2' style={{ display: 'flex', marginRight: '6px', color: '#FFFFFF' }} onClick={() => {
                            }} ></i>



                        </div>
                        <div id='center'>
                            <span className='font-size: 10rem; '>
                                <h3 style={{ marginTop: '10px', marginRight: '20px' }} >Creacion de Ruta</h3>


                            </span>
                        </div>
                        <div id='center'>
                            <p style={{ marginTop: '13px', color: '#565674' }} > De Punto de interes 01 a Punto de Interes 02 </p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>





                                <i
                                    className='fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        // var n = window.confirm('Esta seguro que descartar cambios?')
                                        // if (n == true) {
                                        //     window.location.href = "../sitios";
                                        // } else {
                                        // }


                                    }}
                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                ></i>
                                <i
                                    className='fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {

                                    }}
                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                ></i>


                                <i className='fa-solid fa-gear background-button' id='center2' style={{ color: '#92929F', display: 'flex' }}></i>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <br />
            <h1 style={{ color: 'white', fontSize: '18px' }}>Configuración del sitio</h1>
            <h5 style={{ color: '#565674', fontSize: '14px' }}>Lista de Sitios - Configuración del Sitio</h5>
            <br />
            <div className='row'>
                <div className='card centrado'>
                    <div className='centrado'>
                        <br></br>
                        <br />
                        <div className='card-header row'>
                            <div className='col-xs-12 col-md-5 col-lg-5'>
                                <br></br>
                                <label style={{ fontSize: '18px', color: '#FFFFFF' }}>Indicaciones para llegar</label>
                                <br></br>
                                <br></br>
                                <hr style={{ position: 'relative', top: '-20px' }}></hr>


                                <div className='row mt-6 gx-10 m-auto'>
                                    <label style={{ fontSize: '14px', color: '#FFFFFF' }}>Paso No 01</label>

                                    <div className=' col-md-11 col-xs-12 col-lg-11'>
                                        <div className='row'>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Escribe una indicación para llegar a este punto."
                                                style={{ width: '100%', height: '100px' }}
                                                // value={sitio.descripcion == '' ? '' : sitio.descripcion}
                                                onChange={() => {

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className=' col-md-1 col-xs-12 col-lg-1'>
                                        <div className='row '>
                                            <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => {

                                            }}></Link>
                                        </div>
                                    </div>

                                </div>
                                <br></br>
                                <br></br>
                                <div className='row mt-6 gx-10 m-auto'>



                                    <Card style={{ display: 'flex', padding: 30, borderStyle: "dashed", borderWidth: '1px', borderColor: '#009EF7' }}>
                                        <Card.Title className='text-center' style={{ justifyContent: 'center' }}>


                                            <i onClick={(event) => {


                                            }}>



                                                <Card.Subtitle className='text-muted mb-4'>   <i className={`bi bi-plus`}>Click para añadir un nuevo paso.</i></Card.Subtitle>
                                            </i>
                                        </Card.Title>

                                    </Card>
                                </div>

                                <div className='row mt-6 gx-10 '>
                                    {/* <div className=' col-md-8 col-xs-12 col-lg-8'>
                                    </div>
                                    <div className=' col-md-4 col-xs-12 col-lg-4'>
                                    </div> */}
                                    <label style={{ fontSize: '14px', color: '#565674' }}>5 pasos máximo</label>

                                </div>
                            </div>
                            <div className='col-xs-12 col-md-7 col-lg-7 mb-7'>
                                <div className='row mt-6 gx-10 m-auto'>
                                    <div className=' col-md-12 col-xs-12 col-lg-12'>
                                        <h5 className="card-title">Mapa de Ruta</h5>
                                        <div className="card mb-3" style={{ background: '#1B1B29' }}>


                                            <img className="card-img-top" src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg" alt="Card image cap" />
                                            <div className="card-body">
                                                <Row>
                                                    <p style={{ color: '#565674' }}>Imagen:</p>
                                                    <p >mapa_005.jpg</p>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Link
                                                            className='bi bi-arrow-left-right background-button text-info'
                                                            to={''}
                                                        ></Link>

                                                    </Col>


                                                    <Col>
                                                        <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => {


                                                        }}></Link>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='row mt-6 gx-10 '>
                                            <div className='card-header row'>
                                                <h5 className="card-title">Imagenes de Referencia</h5>
                                                <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6 '>
                                                    <Card.Img
                                                        src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg"
                                                        alt='...'
                                                        className='card-img-top img1'

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
                                                                ></Link>
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => { }}></Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>


                                                <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6'>
                                                    <Card.Img
                                                        src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg"
                                                        alt='...'
                                                        className='card-img-top img1'

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
                                                                ></Link>
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => { }}></Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>


                                                <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6'>
                                                    <Card.Img
                                                        src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg"
                                                        alt='...'
                                                        className='card-img-top img1'

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
                                                                ></Link>
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                            </Col>
                                                            <Col>
                                                                <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => { }}></Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </div>
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
        </>
    );
}
export default AddRoute;