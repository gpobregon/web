import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Col,
    Form,
    Row,
    Table,
    Card,
    Container,
    InputGroup,
    FloatingLabel,
} from 'react-bootstrap'
import { initialQueryState, KTSVG, useDebounce } from '../../../_metronic/helpers'
import {
    addRolesMethod,
    getData,
    getRolesMethod,
    editRoleMethod,
    postData,
    deleteRoleMethod,
    deleteData,
} from '../../services/api'
import { roleManager } from '../../models/roleManager'
import swal from 'sweetalert'
import { validateStringSinCaracteresEspeciales } from '../validarCadena/validadorCadena'

const RoleManagement: FC<any> = ({ show }) => {
    const [roles, setRoles] = useState<roleManager[]>([])
    const [buttonAcept, setButtonAcept] = useState(false)
    const [banderID, setBanderID] = useState(0)
    const [stateRole, setStateRole] = useState({
        id_rol: 0,
        nombre: '',
        descripcion: '',
        gestor_sitios: false,
        gestor_notificaciones: false,
        gestor_puntos_de_interes: false,
        gestor_reportes: false,
        gestor_usuarios: false,
        gestor_offline: false,
        gestor_roles: false,
        gestor_categorias_idiomas: false,
        estado: 1,
    })

    const [clicked, setClicked] = useState(false)

    //TODO: get roles
    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
    }

    //TODO: add role
    const addRole = async () => {
        await postData(addRolesMethod, {
            nombre: 'Nuevo rol',
            descripcion: 'descripción del rol',
            gestor_sitios: false,
            gestor_notificaciones: false,
            gestor_puntos_de_interes: false,
            gestor_reportes: false,
            gestor_usuarios: false,
            gestor_offline: false,
            gestor_roles: false,
            gestor_categorias_idiomas: false,
            estado: 1,
        }) 
        swal({
            title: 'Se ha agregado un nuevo rol',
            icon: 'success',
        })
        setTimeout(() => document.location.href = '/usuarios/role-management', 750)
    }

    //TODO: update role
    const updateRole = async (role: any) => {
        await postData(editRoleMethod, role)
        getRoles()
    }




    //TODO: delete role
    const deleteRole = async (role: any) => {
        let flag = false

        await swal({
            title: '¿Estás seguro de eliminar este rol?',
            icon: 'warning',
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                flag = true
            }
        })

        try {
            if (flag) {
                const deleteInfo: any = await deleteData(deleteRoleMethod, role)
                if (deleteInfo.id_rol.en_uso === undefined) {

                    swal({
                        title: 'Se ha eliminado el rol',
                        icon: 'success',
                    })

                    setTimeout(() => document.location.href = '/usuarios/role-management', 750)
                } else {
                    console.log("deleteInfo: ", deleteInfo);
                    swal({
                        title: 'Error al eliminar rol',
                        text: `Este rol esta siendo usado por usuarios`,
                        icon: 'warning',
                    })
                    setTimeout(getRoles, 500)
                    // el/los usuarios: ${deleteInfo.id_rol.en_uso.id_usuario.toString()} \n
                }
            }
        } catch (error) {
            console.log(error)
        }





        // await deleteData(deleteRoleMethod, role)
        // getRoles()
        // swal({
        //     title: 'Se ha eliminado el rol',
        //     icon: 'success',
        // })
    }

    useEffect(() => {
        getRoles()
    }, [])

    for (let rol of roles) {
        console.log(rol)
    }
    console.log('----------------------------------------')

    return (
        <Container fluid>
            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        <Link to='/usuarios'>
                            <Button variant='secondary' className='text-center me-4'>
                                <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                            </Button>
                        </Link>
                        <h1 className='m-0'>Gestión de roles / Funcionalidades</h1>
                    </div>
                </div>
            </div>
            <Row className='mt-12 mb-9'>
                <div className='text-left'>
                    <h2 className='text-muted mb-0'>Configuración de roles</h2>
                </div>

                <div className='d-flex justify-content-end'>
                    <Button variant='primary' className='mt-md-0 mt-4' onClick={() => addRole()}>
                        <span className='menu-icon me-0  '>
                            <i className={`bi bi-plus fs-1`}></i>
                        </span>
                        {' Nuevo Rol'}
                    </Button>
                </div>
            </Row>

            {roles ? (
                roles.map((rol, index) => (
                    <div
                        key={index}
                        onFocus={() => {
                            if (clicked == false) {
                                setButtonAcept(true)
                                setBanderID(index)
                                setStateRole({
                                    id_rol: rol.id_rol,
                                    nombre: rol.nombre,
                                    descripcion: rol.descripcion,
                                    gestor_sitios: rol.gestor_sitios,
                                    gestor_notificaciones: rol.gestor_notificaciones,
                                    gestor_puntos_de_interes: rol.gestor_puntos_de_interes,
                                    gestor_reportes: rol.gestor_reportes,
                                    gestor_usuarios: rol.gestor_usuarios,
                                    gestor_offline: rol.gestor_offline,
                                    gestor_roles: rol.gestor_offline,
                                    gestor_categorias_idiomas: rol.gestor_categorias_idiomas,
                                    estado: 1,
                                })
                            }

                            setClicked(true)
                        }}
                    >
                        <div
                            className='mb-9'
                            style={{
                                backgroundColor: '#1E1E2D',
                                borderRadius: '5px',
                            }}
                        >
                            <div className='col-xs-12 col-md-12 col-lg-12 p-9'>
                                <Row>
                                    <Col lg={4} md={4} sm={4}>
                                        <div>
                                            <InputGroup className='mb-5'>
                                                <Form.Control
                                                    defaultValue={rol.nombre}
                                                    style={{
                                                        fontSize: 18,
                                                        borderColor: 'transparent',
                                                        borderBottomWidth: '2px',
                                                        borderBottomStyle: 'solid',
                                                        borderBottomColor: '#565674',
                                                        borderRadius: 0,
                                                    }}
                                                    onChange={(e) => {
                                                        if (
                                                            validateStringSinCaracteresEspeciales(
                                                                e.target.value
                                                            )
                                                        ) {
                                                            setStateRole((role) => ({
                                                                ...role,
                                                                id_rol: role.id_rol,
                                                                nombre: e.target.value,
                                                            }))
                                                        }
                                                    }}
                                                />
                                                <InputGroup.Text
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        borderColor: 'transparent',
                                                        borderBottomWidth: '2px',
                                                        borderBottomStyle: 'solid',
                                                        borderBottomColor: '#565674',
                                                        borderRadius: 0,
                                                    }}
                                                >
                                                    <i className='bi bi-pencil fs-1'></i>
                                                </InputGroup.Text>
                                            </InputGroup>

                                            <div className='mb-3'>Descripción del rol</div>
                                            <Form.Control
                                                as='textarea'
                                                className='p-5'
                                                defaultValue={rol.descripcion}
                                                style={{
                                                    height: '100px',
                                                    backgroundColor: '#1B1B29',
                                                    borderColor: 'transparent',
                                                }}
                                                onChange={(e) => {
                                                    if (
                                                        validateStringSinCaracteresEspeciales(
                                                            e.target.value
                                                        )
                                                    ) {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            descripcion: e.target.value,
                                                        }))
                                                    }
                                                }}
                                            />
                                        </div>
                                        {buttonAcept === true && index === banderID ? (
                                            <div className='d-flex align-items-center mt-5'>
                                                {/* cheque */}
                                                <Button
                                                    variant='btn btn-outline-primary me-1'
                                                    onClick={async () => {
                                                        await postData(editRoleMethod, stateRole)
                                                        setButtonAcept(false)
                                                        setClicked(false)

                                                        setTimeout(getRoles, 500)
                                                        setTimeout(getRoles, 1000)
                                                        setTimeout(getRoles, 1500)
                                                        setTimeout(getRoles, 2000)
                                                    }}
                                                >
                                                    <i className={`bi bi-check fs-3`}></i>
                                                </Button>
                                                {/* la X */}
                                                <Button
                                                    variant='btn btn-outline-danger ms-1'
                                                    onClick={() => {
                                                        setButtonAcept(false)
                                                        setClicked(false)
                                                    }}
                                                >
                                                    <i className={`bi bi-x fs-3`}></i>
                                                </Button>
                                            </div>
                                        ) : null}
                                    </Col>

                                    <Col md={8} sm={8}>
                                        <div
                                            className='d-flex align-items-center'
                                            style={{ width: '100%', justifyContent: 'space-between' }}
                                        >
                                            <h1>Funciones de este Rol</h1>
                                            <div className='d-flex justify-content-end'>
                                                <i
                                                    className='bi bi-trash text-danger'
                                                    style={{ fontSize: 20, cursor: 'pointer' }}
                                                    onClick={() =>
                                                        deleteRole({
                                                            id_rol: rol.id_rol,
                                                        })
                                                    }
                                                ></i>
                                            </div>
                                        </div>

                                        <Row style={{ paddingTop: 15 }}>
                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_sitios}
                                                    label='Editar sitios'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_sitios: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>

                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_notificaciones}
                                                    label='Gestor de notificaciones'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_notificaciones: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row style={{ paddingTop: 15 }}>
                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_puntos_de_interes}
                                                    label='Editar puntos de Interés'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_puntos_de_interes:
                                                                e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>

                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_reportes}
                                                    label='Gestionar Reportes'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_reportes: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row style={{ paddingTop: 15 }}>
                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_usuarios}
                                                    label='Editar Usuarios'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_usuarios: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>

                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_offline}
                                                    label='Gestor Offline'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_offline: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row style={{ paddingTop: 15 }}>
                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_roles}
                                                    label='Editar Roles'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_roles: e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>

                                            <Col md={6} sm={6}>
                                                <Form.Check
                                                    inline
                                                    defaultChecked={rol.gestor_categorias_idiomas}
                                                    label='Gestor de Categorias e Idiomas'
                                                    onChange={(e) => {
                                                        setStateRole((role) => ({
                                                            ...role,
                                                            id_rol: role.id_rol,
                                                            gestor_categorias_idiomas:
                                                                e.target.checked,
                                                        }))

                                                        // await postData(editRoleMethod, stateRole)
                                                        // getRoles()
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
        </Container>
    )
}

export default RoleManagement
