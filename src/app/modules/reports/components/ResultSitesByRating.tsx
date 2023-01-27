import { Auth } from 'aws-amplify'
import moment from 'moment'
import React, {FC, useCallback, useContext, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { utils, writeFileXLSX } from 'xlsx' 
import { getData, getRolesMethod } from '../../../services/api'
import { roleManager } from '../../../models/roleManager'
import { LoadingContext } from '../../../utility/component/loading/context'
import swal from 'sweetalert'

import PDF from '../ExportReport/PDF'

const animatedComponents = makeAnimated()
const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: 'transparent',
        borderColor: state.isFocused ? '#474761' : '#323248',
        borderRadius: 6.175,
        color: '#92929F',
        '&:hover': {
            borderColor: '#323248',
        },
        '&:focus': {
            borderColor: '#323248',
        },
        '&:active': {
            borderColor: '#323248',
        },
    }),
    input: (base: any, state: any) => ({
        ...base,
        color: '#92929f',
    }),
    option: (base: any, state: any) => ({
        ...base,
        background: state.isFocused ? '#009EF7' : '#323248',
        color: state.isFocused ? '#fff' : '#92929F',
        padding: 10,
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#fff',
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: 6.175,
        background: '#323248',
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0,
        borderRadius: 6.175,
    }),
}

const ResultSitesByRating: FC<any> = ({show, data, site, name, photo,users}) => { 
    const {setShowLoad} = useContext(LoadingContext)
    const [roles, setRoles] = useState<roleManager[]>([])

    const [user, setDataUser] = useState({
        name: '',
        lastName: '',
    }) 

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
    }

    const exportValidate = async (event: any) => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                console.log("filter: ", filter);
                if (filter[0]?.reporte_calificacion_exportar === false) {
                    swal({
                        title: 'No tienes permiso para exportar este reporte',
                        icon: 'warning',
                    })
                }else{ 
                    if (event.value == 1) {
                        PDF(datos)
                    } else if (event.value == 2) {
                        exportFile()
                    }
                }
            } catch (error) {
                console.log("error: ", error);
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    }


    useEffect(() => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                name: user.attributes.name,
                lastName: user.attributes['custom:lastname'],
            })
        }) 
        getRoles()
    }, [])


    const optionsWithIcons = [
        {
            value: 1,
            label: 'PDF',
        },
        {
            value: 2,
            label: 'Excel',
        },
    ]

    const calificaciones: {[key: number]: string} = {
        1: 'Pésima',
        2: 'Buena',
        3: 'Excelente',
        4: 'Todas las calificaciones',
    }
    if (typeof site.calificacion === 'number') {
        site.tipocalificacion = calificaciones[site.calificacion]
    }
    

    var datos = Object.assign(
        {},
        {calificaciones: data[0]},
        {name: name},
        {portada_path: photo},
        {tipo: 'Calificaciones'},
        {site: site},
        {users: users}
    )

    const handleChangeLanguage = (event: any) => {
        if (event.value == 1) {
            PDF(datos)
        } else if (event.value == 2) {
            exportFile()
        }
    }

    const exportFile = useCallback(() => {
        // const ws1 = utils.json_to_sheet(pres);
        //colocar encabezado en el excel
        var ws = utils.aoa_to_sheet([
            ['MINISTERIO DE CULTURA Y DEPORTES'],
            [`Reporte: ${datos.tipo}`],
            [
                `Filtro: Calificacion: ${datos.site.tipocalificacion}`,
            ],
            [`Periodo consultado: ${datos.site.fecha_inicial} - ${datos.site.fecha_final}`],
            [`Sitio: ${datos.name} (${datos.site.id_sitio})`],
        ])

        //colocar datos en tabla el excel Calficaciones generales
        const wb = utils.book_new()
        utils.sheet_add_json(ws, data, {
            origin: 'A8',
            cellStyles: true,
        })

        utils.sheet_add_aoa(
            ws,
            [
                [
                    'Total Visitas',
                    'Pésima',
                    'Buena',
                    'Excelente',
                ],
            ],
            {origin: 'A8'}
        )

        utils.book_append_sheet(wb, ws, 'Califiaciones Generales')

        //colocar datos en tabla el excel Calficaciones por usuario
        const ws2 = utils.aoa_to_sheet([
            ['MINISTERIO DE CULTURA Y DEPORTES'],
            [`Reporte: ${datos.tipo}`],
            [
                `Filtro: Calificacion: ${datos.site.tipocalificacion}`,
            ],
            [`Periodo consultado: ${datos.site.fecha_inicial} - ${datos.site.fecha_final}`],
            [`Sitio: ${datos.name} (${datos.site.id_sitio})`],
        ])

     
        utils.sheet_add_json(ws2, datos.users, {
            origin: 'A8',
            cellStyles: true,
        })

        utils.sheet_add_aoa(
            ws2,
            [
                [
                    'Nombre',
                    'Apellido',
                    'Genero',
                    'País',
                    "Comentario", 
                    "Puntuación",
                ],
            ],
            {origin: 'A8'}
        )

        utils.book_append_sheet(wb, ws2, 'Califiaciones por usuario')


        writeFileXLSX(wb, `[${datos.site.id_sitio}]${datos.tipo}-${datos.name}.xlsx`, {
            Props: {Author: `${user.name} ${user.lastName}`},
        })
    }, [datos])

 
    return (
        <>
            <div style={show == false ? {display: 'none'} : {display: 'block'}}>
                <Row className='mb-7' style={{paddingTop: 20}}>
                    <div className='text-left'>
                        <h3 className='text-dark mt-0'>Resultados de la busqueda</h3>
                    </div>
                </Row>
                <div
                    className=''
                    style={{
                        backgroundColor: '#1E1E2D',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                        <div className='d-flex align-items-center'>
                            <div
                                className='me-8'
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    backgroundColor: '#a9a9a9',
                                    borderRadius: '50%',
                                }}
                            >
                                <img
                                    src={photo}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                            <div className='col-xs-9 col-md-9 col-lg-9 py-5 '>
                                <h2 className=''>{name}</h2>
                                <h6 className='text-muted'>
                                    {moment(site.fecha_inicial).format('DD/MM/YYYY')} -{' '}
                                    {moment(site.fecha_final).format('DD/MM/YYYY')}
                                </h6>
                            </div>
                            <div className='col-xs-2 col-md-2 col-lg-2 py-5'>
                                <div className='d-flex justify-content-end'>
                                    <Select
                                        options={optionsWithIcons}
                                        styles={customStyles}
                                        components={animatedComponents}
                                        className={'mb-4'}
                                        // onChange={handleChangeLanguage} 
                                        onChange={exportValidate}
                                        placeholder='Exportar'
                                    />
                                </div>
                            </div>
                        </div>

                        <hr style={{border: '1px solid rgba(255 255 255)', color: '#FFF'}} />
                    </div>

                    <div
                        className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'
                        style={{textAlign: 'center'}}
                    >
                        <Row className='mb-5'>
                            <Col lg={3} md={3} sm={4}>
                                <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                    <Form.Label>Total de visitas</Form.Label>
                                </Form.Group>
                            </Col>

                            <Col lg={3} md={3} sm={4}>
                                <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                    <i
                                        className='bi bi-emoji-frown'
                                        style={{fontSize: 20, paddingRight: 10}}
                                    ></i>
                                    <Form.Label>Pésima</Form.Label>
                                </Form.Group>
                            </Col>

                            <Col lg={3} md={3} sm={4}>
                                <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                    <i
                                        className='bi bi-emoji-smile'
                                        style={{fontSize: 20, paddingRight: 10}}
                                    ></i>
                                    <Form.Label>Buena</Form.Label>
                                </Form.Group>
                            </Col>

                            <Col lg={3} md={3} sm={4}>
                                <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                    <i
                                        className='bi bi-emoji-smile'
                                        style={{fontSize: 20, paddingRight: 10}}
                                    ></i>
                                    <Form.Label>Excelente</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>

                        {data?.map((item: any) => (
                            <Row>
                                <Col lg={3} md={3} sm={4}>
                                    <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                        <Form.Label>{data[0].total_visitas}</Form.Label>
                                    </Form.Group>
                                </Col>

                                <Col lg={3} md={3} sm={4}>
                                    <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                        <Form.Label>{data[0].pesima}</Form.Label>
                                    </Form.Group>
                                </Col>

                                <Col lg={3} md={3} sm={4}>
                                    <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                        <Form.Label>{data[0].buena}</Form.Label>
                                    </Form.Group>
                                </Col>

                                <Col lg={3} md={3} sm={4}>
                                    <Form.Group className='mb-4 m-lg-0 m-xxl-0'>
                                        <Form.Label>{data[0].excelente}</Form.Label>
                                    </Form.Group>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            </div>

            {/* <div style={show == false ? {display: 'none'} : {display: 'block'}}>
                <div
                    className=''
                    style={{
                        backgroundColor: '#1E1E2D',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                        <Table striped bordered hover variant='dark' className='align-middle'>
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Usuario</th>
                                    <th>Ultima visita</th>
                                    <th>País</th>
                                    <th>Genero</th>
                                    <th>Edad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((item: any) => (
                                    <tr>
                                        <td>
                                            <div
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#a9a9a9',
                                                    borderRadius: '50%',
                                                }}
                                            ></div>
                                        </td>
                                        <td>
                                            <div>nombre</div>
                                        </td>
                                        <td className='text-muted'>apellido</td>
                                        <td className='text-muted'>genero</td>
                                        <td className='text-muted'>comentario</td>
                                        <td className='text-muted'>puntuacion</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ResultSitesByRating
