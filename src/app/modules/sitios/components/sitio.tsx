import React, {FC, useEffect, useState} from 'react'
import {Col, Card, Button, Row} from 'react-bootstrap'
import {Site} from '../../../models/site'
import {getData, sitesMethod, deleteData, postData, statelockSite} from '../../../services/api'
import swal from 'sweetalert'
import SitiosPage from '../SitiosPage'
import {Link, useNavigate} from 'react-router-dom'
import {Auth} from 'aws-amplify'
import {userInfo} from 'os'

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
    validateRole: any
    permissionEditSite: boolean
    permissionDeleteSite: boolean
    geo_json: string
    cercania_activa: boolean
    bloqueado_por_edicion: boolean
    bloqueado_por_edicion_id: string
    bloqueado_por_edicion_nombre: string
}

const Sitio: FC<sitio> = (props) => {
    const navigate = useNavigate()

    const [idSitioState, setIdSitioState] = useState({
        idSite: props.id_sitio,
        nombreSite: props.nombre,
        idUserEditing: props.bloqueado_por_edicion_id,
        bloqueado: props.bloqueado_por_edicion,
        nombreUsuario: props.bloqueado_por_edicion_nombre,
    })

    // obtener usuario que editó
    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
        role: '',
        descripcion: '',
        id: '',
    })

    const getUser = async () => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
                role: user.attributes['custom:role'],
                descripcion: '',
                id: user.attributes.sub,
            })
        })
    }

    const AllowAccess = async () => {
        await props.validateRole()

        if (props.permissionEditSite) {
            if (idSitioState.bloqueado == null || idSitioState.bloqueado == false) {
                // setIdSitioState({
                //     idSite: props.id_sitio,
                //     nombreSite: props.nombre,
                //     idUserEditing: dataUser.id,
                //     bloqueado: true,
                //     nombreUsuario: dataUser.name,
                // })
                
                navigate(`/sitios/editSite/${props.id_sitio}`)
            } else {
                if (idSitioState.idUserEditing == dataUser.id) {
                    navigate(`/sitios/editSite/${props.id_sitio}`)
                } else {
                    swal({
                        text: `Este sitio está siendo editado por: '${props.bloqueado_por_edicion_nombre}'`,
                        icon: 'error',
                        
                        // buttons: ['Cancelar', 'Forzar desbloqueo'],
                        // dangerMode: true,
                    }).then(async (res) => {
                        // if (res) {
                        //     await postData(sitesMethod, {bloqueado_por_edicion: false})
                        //     navigate(`/sitios/editSite/${props.id_sitio}`)
                        // }
                        // swal({
                        //     title:'¿Seguro que quieres forzar el desbloqueo?',
                        //     text: 'Si lo haces, el sitio se desbloqueará y el usuario que lo estaba editando perderá los cambios que hubiera hecho',
                        //     icon: 'warning',
                        //     buttons: ['Cancelar', 'Forzar desbloqueo'],
                        //     dangerMode: true,
                        // }).then(async (res) => {
                        //     if (res) {
                        //         const sit: any = await postData(statelockSite, {
                        //             id_sitio: props.id_sitio,
                        //             bloqueado_por_edicion: true,
                        //             bloqueado_por_edicion_id: dataUser.id,
                        //             bloqueado_por_edicion_nombre: dataUser.name,
                        //         })
                        //         navigate(`/sitios/editSite/${props.id_sitio}`)
                        //     }
                        // })
                    })
                }
            }
        } else {
            swal({
                title: 'No tienes permiso para editar un sitio',
                icon: 'warning',
            })
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const deleteSites = async () => {
        await props.validateRole()

        if (props.permissionDeleteSite) {
            swal({
                title: '¿Estas seguro de Eliminar  ' + props.nombre + '?',
                icon: 'warning',
                buttons: ['No', 'Sí'],
            }).then(async (res) => {
                if (res) {
                    if (!props.favorito) {
                        await deleteData(sitesMethod, {id_sitio: props.id_sitio})
                        swal({
                            text: 'Se elimino con éxito',
                            icon: 'success',
                            timer: 2000,
                        })                    
                        navigate('/')
                    } else {
                        swal({
                            title: 'Error',
                            text: 'No se puede eliminar un sitio Destacado, Intenta con otro sitio',
                            icon: 'error',
                            timer: 2000,
                        })
                    }
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
                    <Button style={{width: '47%'}} onClick={AllowAccess}>
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
