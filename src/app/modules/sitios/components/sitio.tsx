import React, {FC} from 'react'
import {Col, Card, Button, Row} from 'react-bootstrap'
import {Site} from '../../../models/site'
import {getData, sitesMethod, deleteData} from '../../../services/api'
import swal from 'sweetalert'
import SitiosPage from '../SitiosPage'
import {Link, useNavigate} from 'react-router-dom'

type sitio = {
    id_sitio: number
    nombre: string
    descripcion: string
    ubicacion: string
    geoX: string
    geoY: string
    portada_path: string
    estado: number
    creado: Date
    editado: Date
    categorias: [
        {
            id_categoria: number
            nombre: string
            estado: number
        }
    ]
    id_municipio: number
    favorito: boolean
    publicado: boolean
    oculto: boolean
    permissionEditSite: boolean
    permissionDeleteSite: boolean
}

const Sitio: FC<sitio> = (props) => {
    const navigate = useNavigate()
    const deleteSites = async () => {
        if (props.permissionDeleteSite) {
            swal({
                title: '¿Estas seguro de Eliminar  ' + props.nombre + '?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then(async (res) => {
                if (res) {
                    await deleteData(sitesMethod, {id_sitio: props.id_sitio})
                    swal({
                        text: 'Se elimino con éxito',
                        icon: 'success',
                        timer: 2000,
                    })
                    navigate('/')
                    //  window.location.reload(); //reload page
                }
            })
        } else {
            swal({
                title: 'No tienes permiso para eliminar un sitio',
                icon: 'warning',
            })
        }
    }

    return (
        <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
            <Card
                style={{
                    backgroundColor: '#1e1e2d',
                    padding: 20,
                    margin: '20px',
                    width: '95%',
                    height: '100%',
                }}
            >
                <Card.Img
                    variant='top'
                    src={`${props.portada_path}`}
                    className='mb-5 card-img-top img1'
                    style={{
                        width: '100%',
                        height: '260px',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: 10,
                    }}
                />
                <div className='card-body'>
                    <div
                        className='d-flex flex-row'
                        style={{justifyContent: 'space-between', marginLeft: '-20px'}}
                    >
                        <Card.Title style={{}}>{props.nombre}</Card.Title>
                        <div style={{marginRight: '-20px'}}>
                            {props.favorito === true ? (
                                <i
                                    className={'fas fa-star '}
                                    style={{color: '#009EF7', fontSize: '17px'}}
                                ></i>
                            ) : (
                                <i
                                    className={'fa-regular fa-star '}
                                    style={{color: '#474761', fontSize: '17px'}}
                                ></i>
                            )}
                        </div>
                    </div>

                    <Card.Text className='text-muted' style={{marginLeft: '-20px'}}>
                        {props.ubicacion}
                    </Card.Text>
                </div>
                <div
                    className='d-flex flex-row'
                    style={{justifyContent: 'space-between', marginTop: '-40px'}}
                >
                    <Button
                        style={{width: '47%'}}
                        onClick={(event) => {
                            if (props.permissionEditSite) {
                                navigate('/sitios/edit', {
                                    state: {
                                        id_sitio: props.id_sitio,
                                        nombre: props.nombre,
                                        descripcion: props.descripcion,
                                        ubicacion: props.ubicacion,
                                        geoX: props.geoX,
                                        geoY: props.geoY,
                                        portada_path: props.portada_path,
                                        estado: props.estado,
                                        creado: props.creado,
                                        editado: props.editado,
                                        categorias: props.categorias,
                                        id_municipio: props.id_municipio,
                                        favorito: props.favorito,
                                        publicado: props.publicado,
                                        oculto: props.oculto,
                                    },
                                })
                            } else {
                                swal({
                                    title: 'No tienes permiso para editar un sitio',
                                    icon: 'warning',
                                })
                            }
                        }}
                    >
                        <i className='bi bi-pencil-square'></i>
                        Editar
                    </Button>
                    <Button className='bg-secondary' style={{width: '47%'}} onClick={deleteSites}>
                        <i className='bi bi-trash3'></i>
                        Eliminar
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Sitio
