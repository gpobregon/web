import React, {FC, useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {
    Button,
    Col,
    Form,
    Row,
    Accordion,
    Table,
    Card,
    Container,
    InputGroup,
    FloatingLabel,
} from 'react-bootstrap'
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'
import {
    addRolesMethod,
    getData,
    getRolesMethod,
    editRoleMethod,
    postData,
    deleteRoleMethod,
    deleteData,
} from '../../services/api'
import {roleManager} from '../../models/roleManager'
import swal from 'sweetalert'
import {validateStringSinCaracteresEspeciales} from '../validarCadena/validadorCadena'
import {Auth} from 'aws-amplify'

const RoleManagement: FC<any> = ({show}) => {
    const [roles, setRoles] = useState<roleManager[]>([])
    const [buttonAcept, setButtonAcept] = useState(false)
    const [banderID, setBanderID] = useState(0)
    const [stateRole, setStateRole] = useState({
        id_rol: 0,
        nombre: '',
        descripcion: '',
        idioma_crear: false,
        idioma_editar: false,
        idioma_eliminar: false,
        categoria_crear: false,
        categoria_editar: false,
        categoria_eliminar: false,
        sitio_crear: false,
        sitio_editar: false,
        sitio_eliminar: false,
        sitio_favorito: false,
        sitio_publicar: false,
        sitio_visible: false,
        sitio_maquetar: false,
        sitio_sala_crear: false,
        sitio_establecer_imagen_principal: false,
        sitio_punto_crear: false,
        sitio_punto_editar: false,
        sitio_punto_eliminar: false,
        sitio_punto_ordenar: false,
        sitio_punto_visible: false,
        sitio_punto_publicar: false,
        sitio_punto_maquetar: false,
        sitio_punto_ruta_crear: false,
        sitio_punto_ruta_editar: false,
        sitio_punto_ruta_eliminar: false,
        sitio_punto_ruta_pasos_crear: false,
        sitio_punto_ruta_pasos_editar: false,
        sitio_punto_ruta_pasos_eliminar: false,
        sitio_punto_ruta_imagen_crear: false,
        sitio_punto_ruta_imagen_editar: false,
        sitio_punto_ruta_imagen_eliminar: false,
        sitio_punto_ruta_mapa_crear: false,
        sitio_punto_ruta_mapa_editar: false,
        sitio_punto_ruta_mapa_eliminar: false,
        notificacion_crear: false,
        notificacion_programada_editar: false,
        notificacion_programada_eliminar: false,
        notificacion_historial_editar: false,
        notificacion_historial_eliminar: false,
        offline_sitios: false,
        offline_puntos: false,
        reportes: false,
        usuarios_crear: false,
        usuarios_editar: false,
        usuarios_eliminar: false,
        usuarios_buscar: false,
        rol_crear: false,
        rol_editar: false,
        rol_eliminar: false,
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
            descripcion: 'Descripción del nuevo rol',
            idioma_crear: false,
            idioma_editar: false,
            idioma_eliminar: false,
            categoria_crear: false,
            categoria_editar: false,
            categoria_eliminar: false,
            sitio_crear: false,
            sitio_editar: false,
            sitio_eliminar: false,
            sitio_favorito: false,
            sitio_publicar: false,
            sitio_visible: false,
            sitio_maquetar: false,
            sitio_sala_crear: false,
            sitio_establecer_imagen_principal: false,
            sitio_punto_crear: false,
            sitio_punto_editar: false,
            sitio_punto_eliminar: false,
            sitio_punto_ordenar: false,
            sitio_punto_visible: false,
            sitio_punto_publicar: false,
            sitio_punto_maquetar: false,
            sitio_punto_ruta_crear: false,
            sitio_punto_ruta_editar: false,
            sitio_punto_ruta_eliminar: false,
            sitio_punto_ruta_pasos_crear: false,
            sitio_punto_ruta_pasos_editar: false,
            sitio_punto_ruta_pasos_eliminar: false,
            sitio_punto_ruta_imagen_crear: false,
            sitio_punto_ruta_imagen_editar: false,
            sitio_punto_ruta_imagen_eliminar: false,
            sitio_punto_ruta_mapa_crear: false,
            sitio_punto_ruta_mapa_editar: false,
            sitio_punto_ruta_mapa_eliminar: false,
            notificacion_crear: false,
            notificacion_programada_editar: false,
            notificacion_programada_eliminar: false,
            notificacion_historial_editar: false,
            notificacion_historial_eliminar: false,
            offline_sitios: false,
            offline_puntos: false,
            reportes: false,
            usuarios_crear: false,
            usuarios_editar: false,
            usuarios_eliminar: false,
            usuarios_buscar: false,
            rol_crear: false,
            rol_editar: false,
            rol_eliminar: false,
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
        setTimeout(() => (document.location.href = '/usuarios/role-management'), 750)
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
            buttons: ['No', 'Sí'],
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

                    setTimeout(() => (document.location.href = '/usuarios/role-management'), 750)
                } else {
                    console.log('deleteInfo: ', deleteInfo)
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

    for (let rol of roles) {
        console.log(rol)
    }
    console.log('----------------------------------------')

    let navigate = useNavigate()
    const [existRoles, setExistRoles] = useState(false)

    const [permissionCreateRole, setPermissionCreateRole] = useState(true)
    const [permissionEditRole, setPermissionEditRole] = useState(true)
    const [permissionDeleteRole, setPermissionDeleteRole] = useState(true)

    const validateRole = async () => {
        Auth.currentUserInfo().then((user) => {
            const filter = roles.filter((role) => {
                return user.attributes['custom:role'] === role.nombre
            })

            if (filter[0]?.gestor_usuarios === false) {
                navigate('/error/401', {replace: true})
            } else {
                setPermissionCreateRole(filter[0]?.rol_crear)
                setPermissionEditRole(filter[0]?.rol_editar)
                setPermissionDeleteRole(filter[0]?.rol_eliminar)
            }
        })
    }

    useEffect(() => {
        getRoles()
        validateRole()
    }, [existRoles, permissionEditRole, permissionDeleteRole])

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
                    <Button
                        variant='primary'
                        className='mt-md-0 mt-4'
                        onClick={() => {
                            if (!permissionCreateRole) {
                                swal({
                                    title: 'No tienes permiso para crear un rol',
                                    icon: 'warning',
                                })
                                return
                            }
                            addRole()
                        }}
                    >
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
                                    idioma_crear: rol.idioma_crear,
                                    idioma_editar: rol.idioma_editar,
                                    idioma_eliminar: rol.idioma_eliminar,
                                    categoria_crear: rol.categoria_crear,
                                    categoria_editar: rol.categoria_crear,
                                    categoria_eliminar: rol.categoria_eliminar,
                                    sitio_crear: rol.sitio_crear,
                                    sitio_editar: rol.sitio_editar,
                                    sitio_eliminar: rol.sitio_eliminar,
                                    sitio_favorito: rol.sitio_favorito,
                                    sitio_publicar: rol.sitio_publicar,
                                    sitio_visible: rol.sitio_visible,
                                    sitio_maquetar: rol.sitio_maquetar,
                                    sitio_sala_crear: rol.sitio_sala_crear,
                                    sitio_establecer_imagen_principal:
                                        rol.sitio_establecer_imagen_principal,
                                    sitio_punto_crear: rol.sitio_punto_crear,
                                    sitio_punto_editar: rol.sitio_punto_editar,
                                    sitio_punto_eliminar: rol.sitio_punto_eliminar,
                                    sitio_punto_ordenar: rol.sitio_punto_ordenar,
                                    sitio_punto_visible: rol.sitio_punto_visible,
                                    sitio_punto_publicar: rol.sitio_punto_publicar,
                                    sitio_punto_maquetar: rol.sitio_punto_maquetar,
                                    sitio_punto_ruta_crear: rol.sitio_punto_ruta_crear,
                                    sitio_punto_ruta_editar: rol.sitio_punto_ruta_editar,
                                    sitio_punto_ruta_eliminar: rol.sitio_punto_eliminar,
                                    sitio_punto_ruta_pasos_crear: rol.sitio_punto_ruta_pasos_crear,
                                    sitio_punto_ruta_pasos_editar: rol.sitio_punto_ruta_mapa_editar,
                                    sitio_punto_ruta_pasos_eliminar:
                                        rol.sitio_punto_ruta_imagen_eliminar,
                                    sitio_punto_ruta_imagen_crear:
                                        rol.sitio_punto_ruta_imagen_crear,
                                    sitio_punto_ruta_imagen_editar:
                                        rol.sitio_punto_ruta_imagen_editar,
                                    sitio_punto_ruta_imagen_eliminar:
                                        rol.sitio_punto_ruta_imagen_eliminar,
                                    sitio_punto_ruta_mapa_crear: rol.sitio_punto_ruta_mapa_crear,
                                    sitio_punto_ruta_mapa_editar: rol.sitio_punto_ruta_mapa_editar,
                                    sitio_punto_ruta_mapa_eliminar:
                                        rol.sitio_punto_ruta_mapa_eliminar,
                                    notificacion_crear: rol.notificacion_crear,
                                    notificacion_programada_editar:
                                        rol.notificacion_programada_editar,
                                    notificacion_programada_eliminar:
                                        rol.notificacion_programada_eliminar,
                                    notificacion_historial_editar:
                                        rol.notificacion_historial_editar,
                                    notificacion_historial_eliminar:
                                        rol.notificacion_historial_eliminar,
                                    offline_sitios: rol.offline_sitios,
                                    offline_puntos: rol.offline_puntos,
                                    reportes: rol.reportes,
                                    usuarios_crear: rol.usuarios_crear,
                                    usuarios_editar: rol.usuarios_editar,
                                    usuarios_eliminar: rol.usuarios_eliminar,
                                    usuarios_buscar: rol.usuarios_buscar,
                                    rol_crear: rol.rol_crear,
                                    rol_editar: rol.rol_editar,
                                    rol_eliminar: rol.rol_eliminar,
                                    gestor_sitios: rol.gestor_sitios,
                                    gestor_notificaciones: rol.gestor_notificaciones,
                                    gestor_puntos_de_interes: rol.gestor_puntos_de_interes,
                                    gestor_reportes: rol.gestor_reportes,
                                    gestor_usuarios: rol.gestor_usuarios,
                                    gestor_offline: rol.gestor_offline,
                                    gestor_roles: rol.gestor_roles,
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
                                                    disabled={!permissionEditRole}
                                                    style={{
                                                        fontSize: 18,
                                                        borderColor: 'transparent',
                                                        backgroundColor: 'transparent',
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
                                                disabled={!permissionEditRole}
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
                                            style={{width: '100%', justifyContent: 'space-between'}}
                                        >
                                            <h1>Funciones de este Rol</h1>
                                            <div className='d-flex justify-content-end'>
                                                <i
                                                    className='bi bi-trash text-danger'
                                                    style={{fontSize: 20, cursor: 'pointer'}}
                                                    onClick={() => {
                                                        if (!permissionDeleteRole) {
                                                            swal({
                                                                title: 'No tienes permiso para eliminar un rol',
                                                                icon: 'warning',
                                                            })
                                                            return
                                                        }
                                                        deleteRole({
                                                            id_rol: rol.id_rol,
                                                        })
                                                    }}
                                                ></i>
                                            </div>
                                        </div>

                                        <div
                                            style={{
                                                display:
                                                    permissionEditRole === true ? 'block' : 'none',
                                            }}
                                        >
                                            {/* ----------------------------------------------CATEGORIAS E IDIOMAS--------------------------------------------------------------------------- */}

                                            <Row style={{paddingTop: 15}}>
                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='0'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_categorias_idiomas
                                                                    }
                                                                    label='Catalogos'
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
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Categorías
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.categoria_crear
                                                                                    }
                                                                                    label='Crear categoría'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                categoria_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.categoria_editar
                                                                                    }
                                                                                    label='Editar categoría'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                categoria_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.categoria_eliminar
                                                                                    }
                                                                                    label='Eliminar categoría'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                categoria_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>

                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Idiomas
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.idioma_crear
                                                                                    }
                                                                                    label='Crear idioma'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                idioma_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.idioma_editar
                                                                                    }
                                                                                    label='Editar idioma'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                idioma_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.idioma_eliminar
                                                                                    }
                                                                                    label='Eliminar idioma'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                idioma_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>

                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='1'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_offline
                                                                    }
                                                                    label='Offline  '
                                                                    onChange={(e) => {
                                                                        setStateRole((role) => ({
                                                                            ...role,
                                                                            id_rol: role.id_rol,
                                                                            gestor_offline:
                                                                                e.target.checked,
                                                                        }))

                                                                        // await postData(editRoleMethod, stateRole)
                                                                        // getRoles()
                                                                    }}
                                                                />
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Configuración de
                                                                            contenido descargable
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.offline_sitios
                                                                                    }
                                                                                    label='Seleccionar contenido descarble de Sitios'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                offline_sitios:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.offline_puntos
                                                                                    }
                                                                                    label='Seleccionar contenido descarble de Puntos de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                offline_puntos:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>

                                            {/* -----------------------------------------------SITIOS Y REPORTES-------------------------------------------------------------------------- */}

                                            <Row style={{paddingTop: 15}}>
                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='2'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_sitios
                                                                    }
                                                                    label='Sitios'
                                                                    onChange={(e) => {
                                                                        setStateRole((role) => ({
                                                                            ...role,
                                                                            id_rol: role.id_rol,
                                                                            gestor_sitios:
                                                                                e.target.checked,
                                                                        }))

                                                                        // await postData(editRoleMethod, stateRole)
                                                                        // getRoles()
                                                                    }}
                                                                />
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    <Accordion.Item eventKey='3'>
                                                                        <Accordion.Header>
                                                                            Gestor de sitios
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_crear
                                                                                    }
                                                                                    label='Crear sitio'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_editar
                                                                                    }
                                                                                    label='Editar sitio'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_eliminar
                                                                                    }
                                                                                    label='Eliminar sitio'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>

                                                                <Accordion>
                                                                    <Accordion.Item eventKey='4'>
                                                                        <Accordion.Header>
                                                                            Configuración de Sitios
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_favorito
                                                                                    }
                                                                                    label='Marcar destacado'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_favorito:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_publicar
                                                                                    }
                                                                                    label='Publicar sitio'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_publicar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_visible
                                                                                    }
                                                                                    label='Cambiar visibilidad'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_visible:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_maquetar
                                                                                    }
                                                                                    label='Maquetación móvil y web'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_maquetar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_sala_crear
                                                                                    }
                                                                                    label='Crear salas'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_sala_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_establecer_imagen_principal
                                                                                    }
                                                                                    label='Establecer imagen principal'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_establecer_imagen_principal:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>

                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Configuración de Puntos
                                                                            de interés
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_crear
                                                                                    }
                                                                                    label='Crear punto de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_editar
                                                                                    }
                                                                                    label='Editar punto de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_eliminar
                                                                                    }
                                                                                    label='Eliminar punto de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_ordenar
                                                                                    }
                                                                                    label='Ordenar punto de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_ordenar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_visible
                                                                                    }
                                                                                    label='Cambiar visibilidad'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_visible:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_maquetar
                                                                                    }
                                                                                    label='Maquetación móvil y web'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_maquetar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.sitio_punto_publicar
                                                                                    }
                                                                                    label='Publicar puntos de interés'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                sitio_punto_publicar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Accordion>
                                                                                <Accordion.Item eventKey='1'>
                                                                                    <Accordion.Header>
                                                                                        Rutas
                                                                                    </Accordion.Header>
                                                                                    <Accordion.Body>
                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_crear
                                                                                                }
                                                                                                label='Crear Ruta'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_crear:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_editar
                                                                                                }
                                                                                                label='Editar Ruta'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_editar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_eliminar
                                                                                                }
                                                                                                label='Eliminar Ruta'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_eliminar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_pasos_crear
                                                                                                }
                                                                                                label='Crear pasos'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_pasos_crear:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_pasos_editar
                                                                                                }
                                                                                                label='Editar pasos'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_pasos_editar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_pasos_eliminar
                                                                                                }
                                                                                                label='Eliminar pasos'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_pasos_eliminar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_mapa_crear
                                                                                                }
                                                                                                label='Cargar mapa'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_mapa_crear:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_mapa_editar
                                                                                                }
                                                                                                label='Editar mapa'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_mapa_editar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_mapa_eliminar
                                                                                                }
                                                                                                label='Eliminar mapa'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_mapa_eliminar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_imagen_crear
                                                                                                }
                                                                                                label='Cargar imagen de referencia'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_imagen_crear:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_imagen_editar
                                                                                                }
                                                                                                label='Editar imagen de referencia'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_imagen_editar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>

                                                                                        <Row
                                                                                            style={{
                                                                                                paddingTop: 15,
                                                                                            }}
                                                                                        >
                                                                                            <Form.Check
                                                                                                inline
                                                                                                defaultChecked={
                                                                                                    rol.sitio_punto_ruta_imagen_eliminar
                                                                                                }
                                                                                                label='Eliminar imagen de referencia'
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    setStateRole(
                                                                                                        (
                                                                                                            role
                                                                                                        ) => ({
                                                                                                            ...role,
                                                                                                            id_rol: role.id_rol,
                                                                                                            sitio_punto_ruta_imagen_eliminar:
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .checked,
                                                                                                        })
                                                                                                    )

                                                                                                    // await postData(editRoleMethod, stateRole)
                                                                                                    // getRoles()
                                                                                                }}
                                                                                            />
                                                                                        </Row>
                                                                                    </Accordion.Body>
                                                                                </Accordion.Item>
                                                                            </Accordion>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>

                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='1'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_reportes
                                                                    }
                                                                    label='Reportes'
                                                                    onChange={(e) => {
                                                                        setStateRole((role) => ({
                                                                            ...role,
                                                                            id_rol: role.id_rol,
                                                                            gestor_reportes:
                                                                                e.target.checked,
                                                                        }))

                                                                        // await postData(editRoleMethod, stateRole)
                                                                        // getRoles()
                                                                    }}
                                                                />
                                                            </Accordion.Header>
                                                            <Accordion.Body></Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>

                                            {/* -----------------------------------------------ALERTAS Y USUARIOS-------------------------------------------------------------------------- */}

                                            <Row style={{paddingTop: 15}}>
                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='1'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_notificaciones
                                                                    }
                                                                    label='Alertas'
                                                                    onChange={(e) => {
                                                                        setStateRole((role) => ({
                                                                            ...role,
                                                                            id_rol: role.id_rol,
                                                                            gestor_notificaciones:
                                                                                e.target.checked,
                                                                        }))

                                                                        // await postData(editRoleMethod, stateRole)
                                                                        // getRoles()
                                                                    }}
                                                                />
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Notificaciones
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.notificacion_crear
                                                                                    }
                                                                                    label='Crear notificación'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                notificacion_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.notificacion_programada_editar
                                                                                    }
                                                                                    label='Editar notificaciones programadas'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                notificacion_programada_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.notificacion_programada_eliminar
                                                                                    }
                                                                                    label='Eliminar notificaciones programadas'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                notificacion_programada_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.notificacion_historial_editar
                                                                                    }
                                                                                    label='Editar notificaciones de historial'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                notificacion_historial_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.notificacion_historial_eliminar
                                                                                    }
                                                                                    label='Eliminar notificaciones de historial'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                notificacion_historial_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>

                                                <Col md={6} sm={6}>
                                                    <Accordion>
                                                        <Accordion.Item eventKey='1'>
                                                            <Accordion.Header>
                                                                <Form.Check
                                                                    inline
                                                                    defaultChecked={
                                                                        rol.gestor_usuarios
                                                                    }
                                                                    label='Usuarios'
                                                                    onChange={(e) => {
                                                                        setStateRole((role) => ({
                                                                            ...role,
                                                                            id_rol: role.id_rol,
                                                                            gestor_usuarios:
                                                                                e.target.checked,
                                                                        }))

                                                                        // await postData(editRoleMethod, stateRole)
                                                                        // getRoles()
                                                                    }}
                                                                />
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Gestión de usuarios
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.usuarios_crear
                                                                                    }
                                                                                    label='Crear usuarios'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                usuarios_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.usuarios_editar
                                                                                    }
                                                                                    label='Editar roles de usuarios'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                usuarios_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.usuarios_eliminar
                                                                                    }
                                                                                    label='Eliminar usuarios'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                usuarios_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.usuarios_buscar
                                                                                    }
                                                                                    label='Buscar usuarios'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                usuarios_buscar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>

                                                                <Accordion>
                                                                    <Accordion.Item eventKey='1'>
                                                                        <Accordion.Header>
                                                                            Gestión de roles
                                                                        </Accordion.Header>
                                                                        <Accordion.Body>
                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.rol_crear
                                                                                    }
                                                                                    label='Crear roles'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                rol_crear:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.rol_editar
                                                                                    }
                                                                                    label='Editar roles'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                rol_editar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>

                                                                            <Row
                                                                                style={{
                                                                                    paddingTop: 15,
                                                                                }}
                                                                            >
                                                                                <Form.Check
                                                                                    inline
                                                                                    defaultChecked={
                                                                                        rol.rol_eliminar
                                                                                    }
                                                                                    label='Eliminar roles'
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        setStateRole(
                                                                                            (
                                                                                                role
                                                                                            ) => ({
                                                                                                ...role,
                                                                                                id_rol: role.id_rol,
                                                                                                rol_eliminar:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            })
                                                                                        )

                                                                                        // await postData(editRoleMethod, stateRole)
                                                                                        // getRoles()
                                                                                    }}
                                                                                />
                                                                            </Row>
                                                                        </Accordion.Body>
                                                                    </Accordion.Item>
                                                                </Accordion>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </Col>
                                            </Row>
                                        </div>
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
