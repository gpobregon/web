import React, {FC, useCallback, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import Moment from 'moment'

import PDF from '../ExportReport/PDF'
import { Auth } from 'aws-amplify'
import { utils, writeFileXLSX } from 'xlsx'

const ResultUserReport: FC<any> = ({show, data, site, name, photo}) => {
    const [user, setDataUser] = useState({
        name: '',
        lastName: '',
    })

    
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

    var datos = Object.assign(
        {},
        {rows: data},
        {name: name},
        {portada_path: photo},
        {tipo: 'usuarios'},
        {site: site}
    )

    const handleChangeLanguage = (event: any) => {
        if (event.value == 1) {
            PDF(datos)
        } else if (event.value == 2) {
            exportFile()
        }
    }

    useEffect(() => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                name: user.attributes.name,
                lastName: user.attributes['custom:lastname'],
            })
        })
    }, [])

    const exportFile = useCallback(() => {
        // const ws1 = utils.json_to_sheet(pres);
        //colocar encabezado en el excel
        var ws = utils.aoa_to_sheet([
            ['MINISTERIO DE CULTURA Y DEPORTES'],
            [`Sitios ${datos.tipo}`],
            [
                `Filtro: Pais: ${datos.site.tipopais} - Edad: ${datos.site.tipoedad} - Genero: ${datos.site.tipogenero}`,
            ],
            [`Periodo consultado: ${datos.site.fecha_inicial} - ${datos.site.fecha_final}`],
            [`Sitio: ${datos.name} (${datos.site.id_sitio})`],
        ])

        //colocar datos en tabla el excel
        const wb = utils.book_new()
        utils.sheet_add_json(ws, datos, {
            origin: 'A8',
            cellStyles: true,
        })

        utils.sheet_add_aoa(
            ws,
            [
                [
                    'Total Visitas',
                    'Hombre',
                    'Mujer',
                    'Sin sexo',
                    'Menor edad',
                    'Mayores edad',
                    'Tercera edad',
                    'Nacional',
                    'Internacional',
                ],
            ],
            {origin: 'A8'}
        )

        utils.book_append_sheet(wb, ws, 'Data')

        writeFileXLSX(wb, `[${datos.site.id_sitio}]${datos.tipo}-${datos.name}.xlsx`, {
            Props: {Author: `${user.name} ${user.lastName}`},
        })
    }, [datos])

    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
                <div className='text-left' style={{paddingTop: 20}}>
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
                            {Moment(site.fecha_inicial).format('DD/MM/YYYY')} - {Moment(site.fecha_final).format('DD/MM/YYYY')}
                            </h6>
                        </div>
                        <div className='col-xs-2 col-md-2 col-lg-2 py-5'>
                            <div className='d-flex justify-content-end'>
                                <Select
                                    options={optionsWithIcons}
                                    styles={customStyles}
                                    components={animatedComponents}
                                    className={'mb-4'}
                                    onChange={handleChangeLanguage}
                                    placeholder='Exportar'
                                />
                            </div>
                        </div>
                    </div>
                    <hr style={{border: '1px solid rgba(255 255 255)', color: '#FFF'}} />
                </div>

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
                            {data?.map((item: any ) => (
                                <tr key={item}>
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
                                        <div>{item?.nombre}</div>
                                    </td>
                                    <td className='text-muted'>
                                        {Moment(item?.ultima_visita).format('DD/MM/YYYY')}
                                    </td>
                                    <td className='text-muted'>{item?.pais}</td>
                                    <td className='text-muted'>{item?.genero}</td>
                                    <td className='text-muted'>{item?.edad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

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

export default ResultUserReport
