import { Button, Card, Col, Row } from "react-bootstrap";

const SalaRutas = () => {
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

                                <><Button variant="outline-dark" size="sm" onClick={() => {

                                }}
                                >
                                    Sala 01

                                </Button>
                                    <Button variant="outline-dark" size="sm"
                                        onClick={() => {

                                        }}
                                        style={{ width: '5px', height: '40px' }} >
                                        <i className='fa-solid fa-pencil '
                                            style={{ color: '#92929F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        </i>
                                    </Button>
                                    <Button variant="outline-dark" size="sm"
                                        onClick={() => { }}
                                        style={{ width: '5px', height: '40px' }} >
                                        <i className='fa-solid fa-xmark '
                                            style={{ color: '#92929F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        </i>
                                    </Button>
                                </>


                                <Button variant="outline-dark" size="sm" onClick={() => { }}>
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



                                <div className='row'>
                                    <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-start'>

                                        <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}>
                                            <Card.Title className='text-center' style={{ flexDirection: 'row' }}>

                                            </Card.Title>
                                            <Card.Subtitle className="text-white" style={{ alignItems: 'flex-start', paddingLeft: 10, marginLeft: '75px' }} >punto de interes</Card.Subtitle>
                                            <Card.Subtitle className='text-muted' style={{ alignItems: 'flex-start', paddingLeft: 10, paddingTop: 5, marginLeft: '75px' }} >descripcion interes</Card.Subtitle>
                                            <span className='menu-ico' style={{ left: 10, position: 'absolute' }}>

                                                <i className={`bi bi-list`} style={{ fontSize: 20, marginRight: '10px' }}></i>
                                                <Card.Img
                                                    src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg"

                                                    // {`${punto.portada_path}`}


                                                    style={{ width: '25%', height: '25%', borderRadius: '10px' }}
                                                    alt='...'
                                                    className='card-img-top img1'
                                                    onClick={() => {

                                                    }}

                                                />
                                            </span>
                                        </Card>
                                    </div>
                                    <div className='col-xs-12 col-md-12 col-lg-6 d-flex justify-content-end'>

                                        <div id='center2'>
                                            <ul className='nav justify-content-end'>
                                                <Button className="btn btn-secondary " style={{ marginRight: '10px' }}>
                                                <i className="bi bi-signpost"></i>
                                                {/* <i className="bi bi-signpost-split"></i> */}
                                                    {'Crear Ruta'}


                                                </Button>
                                        

                                                <i className="bi-solid bi-trash3 background-button"
                                                    id='center2'
                                                    style={{ color: '#92929F', display: 'flex', marginRight: '20px' }}
                                                    onClick={() => {
                                                        // console.log(punto.es_portada_de_sitio)

                                                    }}
                                                ></i>

                                         
                                            </ul>
                                        </div>

                                    </div>
                                </div>



                            </div>
                            <br></br>
                            <br></br>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Row>
                                    <Col sm='4' md='12' className='pb-10' >

                                        <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', borderStyle: "dashed", borderWidth: '1px', borderColor: '#009EF7' }}>
                                            <Card.Title className='text-center' style={{ flexDirection: 'row' }}>


                                                <i onClick={(event) => {


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



                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title>Vista Previa de Sala</Card.Title>
                                {/* <Card.Img src={logo}/> */}
                                <Card.Img src="https://www.guatemala.com/fotos/2019/05/Finca-El-Espinero-Tecpan-Guatemala-885x500.jpg" />
                            </Card.Body>
                        </Card>


                    </div>

                </div>

            </div>
        </>
    );
}
export default SalaRutas;