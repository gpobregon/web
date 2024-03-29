import React, {useContext, useEffect, useState} from 'react'
import {Container, Col, Row, Card} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {roleManager} from '../../models/roleManager'
import {getData, getRolesMethod} from '../../services/api'
import {LoadingContext} from '../../utility/component/loading/context'
import {Amplify, Auth} from 'aws-amplify'
import {useAuth} from '../auth'
import swal from 'sweetalert'

const ReportsPage = () => {
    let navigate = useNavigate()
    const {setShowLoad} = useContext(LoadingContext)
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    //para cerrar sesión despues de cambiar contraseña, no olvida el dispositivo :c
    const {currentUser, logout} = useAuth()
    const forgotDevice = async () => {
        try {
            logout()
            await Amplify.Auth.forgetDevice()
        } catch (error) {
        }
    }

    //fin

    const validateRole = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                // console.log("filter: ", filter);
                if (filter[0]?.gestor_reportes === false) {
                    navigate('/error/401', {replace: true})
                }
            } catch (error) {
                swal(
                    'Se ha cambiado la contraseña de tu usuario',
                    'Cierra sesión y vuelve a ingresar',
                    'warning'
                )
                await forgotDevice()
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    } 

    const validateUsuarios = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                console.log("filter: ", filter);
                if (filter[0]?.reporte_usuarios_generar === true) {
                    navigate('/reportes/reporte-de-usuario')
                }else{ 
                    swal({
                        title: 'No tienes permiso para entrar a este reporte',
                        icon: 'warning',
                    })
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    } 

    const validateVisitas = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                console.log("filter: ", filter);
                if (filter[0]?.reporte_visitas_generar === true) {
                    navigate('/reportes/sitios-mas-visitados')
                }else{ 
                    swal({
                        title: 'No tienes permiso para entrar a este reporte',
                        icon: 'warning',
                    })
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    } 

    const validateCalificacion = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                console.log("filter: ", filter);
                if ( filter[0]?.reporte_calificacion_generar === true) {
                    navigate('/reportes/sitios-por-calificacion')
                }else{ 
                    swal({
                        title: 'No tienes permiso para entrar a este reporte',
                        icon: 'warning',
                    })
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    }

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
    }, [existRoles])

    return (
        <>
            <Container fluid>
                <Row className='pb-9'>
                    <div className='text-left'>
                        <h1 className='text-dark mt-0'>Reportes</h1>
                        <h2 className='text-muted mb-0'>Lista de categorías</h2>
                    </div>
                </Row>
                <Row className='g-10'>
                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>
                        {/* <Link to='/reportes/reporte-de-usuario'> */}
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }} 
                                onClick = {() => validateUsuarios()}
                            > 
                            
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-people text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>Usuarios</Card.Subtitle>
                            </Card>
                        {/* </Link> */}
                    </Col>

                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>
                        {/* <Link to='/reportes/sitios-mas-visitados'> */}
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }} 
                                onClick = {() => validateVisitas()}
                            >
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-book text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>
                                    Visitas por sitio
                                </Card.Subtitle>
                            </Card>
                        {/* </Link> */}
                    </Col>

                    <Col sm='4' md='3' style={{cursor: 'pointer'}}>
                        {/* <Link to='/reportes/sitios-por-calificacion'> */}
                            <Card
                                className='d-flex justify-content-center align-items-center p-5'
                                style={{
                                    height: 270,
                                }} 
                                onClick = {() => validateCalificacion()}
                            >
                                <Card.Title
                                    className='mb-4'
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className='menu-ico'>
                                        <i
                                            className='bi bi-emoji-smile text-white'
                                            style={{fontSize: 64}}
                                        ></i>
                                    </span>
                                </Card.Title>
                                <Card.Subtitle className='mb-4 fs-3'>
                                    Sitios por calificación
                                </Card.Subtitle>
                            </Card>
                        {/* </Link> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ReportsPage
