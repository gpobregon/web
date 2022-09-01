import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Paso } from "../../../../models/paso";
import { Route } from "../../../../models/ruta";
import { addImagePrincipal, addImages, addPasos, ObtenerRuta, postData, URLAWS } from "../../../../services/api";
import logo from '../../upload-image_03.jpg';
import logo2 from '../../upload-image-h_04.jpg';
import UpImage from "../upload-image";
import { Imagen } from "../../../../models/imagenes";
type datosPuntoInteres2 = {
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

type datosPuntoInteres = {
    id_punto_a: number,
    id_punto_b: number,
    interes:datosPuntoInteres2
    nombre_punto_a: string,
    nombre_punto_b: string,
}
const AddRoute = () => {
    const { state } = useLocation()
    const [puntos, setpuntos] = useState(state as datosPuntoInteres)
    const [ruta, setruta] = useState<Route>()
    const [catidadpasos, setCatidadpasos] = useState<number>(0)
    const [arraypasos, setArraypasos] = useState<Paso[]>([])
    const [getimg, setGetimg] = useState<Imagen[]>([])
    const [modalupimg, setModalupIMG] = useState(false)
    const [agregrarPaso, setagregrarPaso] = useState<any>([])

    const [pasoss, setPasos] = useState({
        id_punto_a: puntos.id_punto_a,
        id_punto_b: puntos.id_punto_b,
        paso: arraypasos
    })
    const [arrayimagenes, setArrayimagenes] = useState<any[]>([])
    const [imganes, setImagenes] = useState({
        id_punto_a: puntos.id_punto_a,
        id_punto_b: puntos.id_punto_b,
        imagenes: arrayimagenes
    })
    const [imgprincipal, setImgprincipal] = useState({
        id_punto_a: puntos.id_punto_a,
        id_punto_b: puntos.id_punto_b,
        img_principal: ''
    })
    const hola = ''
    const obtenerRuta = async () => {
        const route: any = await postData(ObtenerRuta, { id_punto_a: puntos.id_punto_a, id_punto_b: puntos.id_punto_b })
        setruta(route)
        setGetimg(route.imagenes as Imagen[])
        setagregrarPaso(route.pasos)
        // console.log(route)
    }
    const [imgtempomodal, setImgtempomodal] = useState({
        imagen1: '',
        imagen2: '',
        imagen3: '',
    })
    const savechnage = async () => {
        // addImagePrincipal
        // addImages
        if (imgprincipal.img_principal != '' ) {
            await postData(addImagePrincipal, imgprincipal)
           
        }
       
        // if(arrayimagenes.length === 3){
        await postData(addImages, imganes)
        await postData(addPasos, { id_punto_a: ruta?.id_punto_a, id_punto_b: ruta?.id_punto_b, pasos: agregrarPaso })
        swal({
            text: "Se Guardo paso ",
            icon: "success",
            timer: 2000,

        })
        navigate('/sitios/edit-point-interes', {
            state: {
                id_punto: puntos.interes.id_punto,
                lenguajes: puntos.interes.lenguajes,
                id_sitio:  puntos.interes.id_sitio,
                id_guia:  puntos.interes.id_guia,
                nombre:  puntos.interes.nombre,
                descripcion:  puntos.interes.descripcion,
                geoX:  puntos.interes.geoX,
                geoY:  puntos.interes.geoY,
                portada_path:  puntos.interes.portada_path,
                qr_path:  puntos.interes.qr_path,
                es_portada_de_sitio:  puntos.interes.es_portada_de_sitio,
                estado:  puntos.interes.estado,
                es_visible:  puntos.interes.es_visible,
            },
        })
        // }else{
        //     swal("Error", "Debe seleccionar 3 imagenes de refencia", "error")
        // }
        // const g = await postData(addImages, imganes)
        // const a = await postData(addPasos, { id_punto_a: ruta?.id_punto_a, id_punto_b: ruta?.id_punto_b, pasos: agregrarPaso })
        // console.log(imganes)
        // console.log(imgprincipal)
        // console.log(agregrarPaso)
        // console.log(a)
        // var newArray = arrayimagenes.filter((item) => item.id_image !== 1);
        // console.log(newArray);
     
       
    }

    const [id, setId] = useState<number>(0)
    const [numeroImg, setnumeroImg] = useState<number>(0)
    const [contador, setContador] = useState<number>(0)
    const navigate = useNavigate()

    const imagenesReferencias = async (url: string) => {

        if (id === -1) {
            //agregar iamgen de referencia por primera vez 
            
            arrayimagenes.push({
                id_image: -1,
                descripcion: '',
                posicion_en_lista: 1,
                img_path: URLAWS + url,
                estado: 1
            })
            setImagenes({
                id_punto_a: puntos.id_punto_a,
                id_punto_b: puntos.id_punto_b,
                imagenes: arrayimagenes
            })
        } else if(id === 0) {
          //  agregar imagenPrincipal;
            setImgprincipal({
                id_punto_a: puntos.id_punto_a,
                id_punto_b: puntos.id_punto_b,
                img_principal: URLAWS + url
            })
            setruta({
                id_punto_a: ruta!.id_punto_a,
                id_punto_b: ruta!.id_punto_b,
                estado: ruta!.estado,
                img_principal: URLAWS + url, //mostrar la imagen principal en el modal
                imagenes: ruta!.imagenes,
                pasos: ruta!.pasos,

            })
        }else{
            //editar imagen de referencia
            getimg[numeroImg].img_path = URLAWS + url //mostrar la imagen en el modal
            arrayimagenes.push({
                id_image: id,
                descripcion: '',
                posicion_en_lista: numeroImg,
                img_path: URLAWS + url,
                estado: 1
            })
            setImagenes({
                id_punto_a: puntos.id_punto_a,
                id_punto_b: puntos.id_punto_b,
                imagenes: arrayimagenes
            })
        }
    }
    const uploadImage = async (imagen: string) => {


        if (imagen != '') {
            if (numeroImg === 1) {
                setImgtempomodal({
                    imagen1: URLAWS + imagen,
                    imagen2: imgtempomodal.imagen2,
                    imagen3: imgtempomodal.imagen3
                })
            } else if (numeroImg === 2) {
                setImgtempomodal({
                    imagen1: imgtempomodal.imagen1,
                    imagen2: URLAWS + imagen,
                    imagen3: imgtempomodal.imagen3
                })
            } else if (numeroImg === 3) {
                setImgtempomodal({
                    imagen1: imgtempomodal.imagen1,
                    imagen2: imgtempomodal.imagen2,
                    imagen3: URLAWS + imagen
                })
            }
            setModalupIMG(false)
            imagenesReferencias(imagen)
        }


    };




    useEffect(() => {
        if (contador === 0) {

            obtenerRuta()
        }
    }, [contador])

    const telefonosHandler = async (e: any, idx: any) => {
        const nuevaDesc = e.target.value;
        const tempPasos = agregrarPaso;

        tempPasos[idx].descripcion = nuevaDesc;

        setagregrarPaso(tempPasos);
    }

    const deletePaso = async (idx: any) => {
        var editEstadopaso = agregrarPaso;
        editEstadopaso[idx-1].estado = 0;
      
        await postData(addPasos, { id_punto_a: ruta?.id_punto_a, id_punto_b: ruta?.id_punto_b, pasos: editEstadopaso })
        var newArray = agregrarPaso.filter((item: any) => item.id_paso !== idx);
        setagregrarPaso(newArray);
       setContador(contador - 1)
       setagregrarPaso([])
        await obtenerRuta()
       
    }
    const addNewPaso = async () => {
        await postData(addPasos, { id_punto_a: ruta?.id_punto_a, id_punto_b: ruta?.id_punto_b, pasos: agregrarPaso })
        await obtenerRuta()
    }

    //alert methods-----------------------------------------------------------------------
    const alerta = async () => {
        swal({
            title: "Solo 5 pasos máximo",
            icon: "error",

        })
    }
    const alerta2 = async () => {
        swal({
            title: "Falta campos por completar",
            icon: "error",

        })
    }
       //alert methods-----------------------------------------------------------------------
       const discardChanges = async () => {
        swal({
            title: "¿Estas seguro de Descartar Los Cambios ?",
            icon: "warning",
            buttons: ["No", "Sí"],

        }).then(res => {
            if (res) {
                swal({
                    text: "Descartado Correctamente",
                    icon: "success",
                    timer: 2000,

                })
                navigate('/sitios/edit-point-interes', {
                    state: {
                        id_punto: puntos.interes.id_punto,
                        lenguajes: puntos.interes.lenguajes,
                        id_sitio:  puntos.interes.id_sitio,
                        id_guia:  puntos.interes.id_guia,
                        nombre:  puntos.interes.nombre,
                        descripcion:  puntos.interes.descripcion,
                        geoX:  puntos.interes.geoX,
                        geoY:  puntos.interes.geoY,
                        portada_path:  puntos.interes.portada_path,
                        qr_path:  puntos.interes.qr_path,
                        es_portada_de_sitio:  puntos.interes.es_portada_de_sitio,
                        estado:  puntos.interes.estado,
                        es_visible:  puntos.interes.es_visible,
                    },
                })
            }
        });
    }
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

                            <i className='fa-solid fa-less-than background-button ' id='center2' style={{ display: 'flex', marginRight: '6px', color: '#FFFFFF' }} 
                            onClick={() => {
                                discardChanges()
                            }} ></i>



                        </div>
                        <div id='center'>
                            <span className='font-size: 10rem; '>
                                <h3 style={{ marginTop: '10px', marginRight: '20px' }} >Creacion de Ruta</h3>


                            </span>
                        </div>
                        <div id='center'>
                            <p style={{ marginTop: '13px', color: '#565674' }} > De Punto de interes {puntos.id_punto_a} a Punto de Interes {puntos.id_punto_b} </p>
                        </div>
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6 d-flex py-5 px-9 justify-content-end'>
                        <div id='center2'>
                            <ul className='nav justify-content-end '>





                                <i
                                    className='fa-solid fa-xmark background-button'
                                    id='center2'
                                    onClick={() => {
                                        discardChanges()


                                    }}
                                    style={{ color: '#92929F', display: 'flex', marginRight: '4px' }}
                                ></i>
                                <i
                                    className='fa-solid fa-floppy-disk background-button'
                                    id='center2'
                                    onClick={() => {
                                        savechnage()
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
                                <label style={{ fontSize: '18px', color: '#92929F', background: "#28283D" }}> Punto de Interes {puntos.nombre_punto_a}</label>
                                <i className="bi bi-arrow-right-short" style={{ fontSize: '18px', color: '#FFFFFF' }}></i>
                                <label style={{ fontSize: '18px', color: '#92929F', background: "#28283D" }}> Punto de Interes {puntos.nombre_punto_b}</label>
                                <br></br>
                                <br></br>
                                <label style={{ fontSize: '18px', color: '#FFFFFF' }}>Indicaciones para llegar</label>

                                <br></br>
                                <br></br>
                                <hr style={{ position: 'relative', top: '-20px' }}></hr>

                                {
                                    agregrarPaso?.map((item: any, index: any) => (

                                        <div key={index}>
                                            <div className='row mt-6 gx-10 m-auto' >
                                                <label style={{ fontSize: '14px', color: '#FFFFFF' }}>Paso No {index + 1}</label>

                                                <div className=' col-md-11 col-xs-12 col-lg-11'>
                                                    <div className='row'>
                                                        <Form.Control
                                                            as="textarea"
                                                            placeholder="Escribe una indicación para llegar a este punto."
                                                            style={{ width: '100%', height: '100px' }}
                                                            defaultValue={item.descripcion}
                                                            onChange={(e) => {

                                                                telefonosHandler(e, index)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className=' col-md-1 col-xs-12 col-lg-1'>
                                                    <div className='row '>
                                                        <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => {
                                                            deletePaso(index + 1)
                                                        }}></Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }

                                <br></br>
                                <br></br>
                                <div className='row mt-6 gx-10 m-auto'>



                                    <Card style={{ display: 'flex', padding: 30, borderStyle: "dashed", borderWidth: '1px', borderColor: '#009EF7' }} onClick={(event) => {
                                        if (agregrarPaso.length < 5) {
                                            agregrarPaso.push({id_punto_a:puntos.id_punto_a,id_punto_b:puntos.id_punto_b, id_paso: -1, descripcion: '', posicion_en_lista: agregrarPaso.length + 1, estado: 1 })
                                            setContador(contador + 1)
                                            addNewPaso()
                                        } else {
                                            alerta()
                                        }
                                    }}>
                                        <Card.Title className='text-center' style={{ justifyContent: 'center' }}>


                                            <i >


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


                                            <img className="card-img-top" src={
                                                ruta?.img_principal == ''
                                                    ? logo2
                                                    : ruta?.img_principal
                                            }
                                                alt="Card image cap"

                                                onClick={
                                                    ruta?.img_principal == ''
                                                        ? (e) => {
                                                            setModalupIMG(true)
                                                            setId(0)
                                                        }
                                                        : (e) => { }
                                                }
                                                style={{ height: '450px', borderRadius: '10px' }} />
                                            <div className="card-body">
                                                <Row>
                                                    {/* <p style={{ color: '#565674' }}>Imagen:</p>
                                                    <p >mapa_005.jpg</p> */}
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Link
                                                            className='bi bi-arrow-left-right background-button text-info'
                                                            to={''} 
                                                            onClick={() => { setModalupIMG(true)}}
                                                        ></Link>

                                                    </Col>


                                                    <Col>
                                                        <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => {
                                                            setruta({
                                                                id_punto_a: ruta!.id_punto_a,
                                                                id_punto_b: ruta!.id_punto_b,
                                                                estado: ruta!.estado,
                                                                img_principal: '',
                                                                imagenes: ruta!.imagenes,
                                                                pasos: ruta!.pasos,

                                                            })

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
                                                {
                                                    getimg.length === 0 ?
                                                        <>
                                                            <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6 '>
                                                                <Card.Img
                                                                    src={
                                                                        imgtempomodal.imagen1 == ''
                                                                            ? logo
                                                                            :  imgtempomodal.imagen1
                                                                    }
                                                                    alt="Card image cap"
                                                                    style={{ height: '248px', borderRadius: '10px' }}
                                                                    onClick={
                                                                        imgtempomodal.imagen1 == ''
                                                                            ? (e) => {
                                                                                setModalupIMG(true)
                                                                                setId(-1)
                                                                                setnumeroImg(1)
                                                                            }
                                                                            : (e) => { }
                                                                    }

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
                                                                                onClick={() => { setModalupIMG(true)}}
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
                                                                    src={
                                                                        imgtempomodal.imagen2 == ''
                                                                            ? logo
                                                                            :  imgtempomodal.imagen2
                                                                    }
                                                                    alt="Card image cap"
                                                                    style={{ height: '248px', borderRadius: '10px' }}
                                                                    onClick={
                                                                        imgtempomodal.imagen2 == ''
                                                                            ? (e) => {
                                                                                setModalupIMG(true)
                                                                                setId(-1)
                                                                                setnumeroImg(2)
                                                                            }
                                                                            : (e) => { }
                                                                    }

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
                                                                                onClick={() => { setModalupIMG(true)}}
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
                                                                    src={
                                                                        imgtempomodal.imagen3 == ''
                                                                            ? logo
                                                                            :  imgtempomodal.imagen3
                                                                    }
                                                                    alt="Card image cap"
                                                                    style={{ height: '248px', borderRadius: '10px' }}
                                                                    onClick={
                                                                        imgtempomodal.imagen3 == ''
                                                                            ? (e) => {
                                                                                setModalupIMG(true)
                                                                                setId(-1)
                                                                                setnumeroImg(3)
                                                                            }
                                                                            : (e) => { }
                                                                    }

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
                                                                                onClick={() => { setModalupIMG(true)}}
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
                                                        </> :
                                                        <>
                                                            {getimg?.map((img, index) => (
                                                                <div className='card div-image col-xs-2 col-md-2 col-lg-2 mt-6' key={index}>
                                                                    <Card.Img
                                                                        src={
                                                                            img.img_path == ''
                                                                                ? logo
                                                                                : img.img_path
                                                                        }
                                                                        alt="Card image cap"
                                                                        style={{ height: '248px', borderRadius: '10px' }}
                                                                        onClick={
                                                                            img.img_path == ''
                                                                                ? (e) => {
                                                                                    setModalupIMG(true)
                                                                                    setId(img.id_image)
                                                                                    setnumeroImg(index)
                                                                                }
                                                                                : (e) => { }
                                                                        }

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
                                                                                    onClick={() => {     setModalupIMG(true)
                                                                                        setId(img.id_image)
                                                                                        setnumeroImg(index)}}
                                                                                ></Link>
                                                                            </Col>
                                                                            <Col>
                                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                                            </Col>
                                                                            <Col>
                                                                                {/* <Link className='bi bi-crop background-button text-info' to={''}></Link> */}
                                                                            </Col>
                                                                            <Col>
                                                                                <Link className='bi bi-trash background-button text-danger' to={''} onClick={() => { img.img_path = '' }}></Link>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        </>
                                                }



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
            <UpImage
                show={modalupimg}
                onClose={() => setModalupIMG(false)}
                cargarIMG={uploadImage}
            />
        </>
    );
}
export default AddRoute;