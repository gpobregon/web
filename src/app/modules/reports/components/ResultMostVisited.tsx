import moment from 'moment'
import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import {Row, Table} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import PDF from '../ExportReport/PDF'
import {Auth} from 'aws-amplify'

import {saveAs} from 'file-saver'
import {read, utils, writeFileXLSX} from 'xlsx'

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

const ResultMostVisited: FC<any> = ({show, data, site, name, photo, date}) => {
    // console.log('name: ', name)
    // console.log('data: ', data)
    // console.log('site: ', site)

    var date_report = new Date()
    var date_report_format = moment(date_report).format('DD/MM/YYYY')
    var hour_report_format = moment(date_report).format('HH:mm:ss')
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

    const genresOptions: {[key: number]: string} = {
        1: 'Femenino',
        2: 'Masculino',
        3: 'Prefiero no decirlo',
        4: 'Todos los generos',
    }

    const yearsOldOptions: {[key: number]: string} = {
        1: 'Menor de edad',
        2: '18 a 30',
        3: '31 a 50',
        4: '51 en adelante',
        5: 'Todas las edades',
    }
    const countryOptions: {[key: number]: string} = {
        1: 'Nacional',
        2: 'Extranjero',
        3: 'Todos los paises',
    }

    if (typeof site.pais === 'number') {
        site.tipopais = countryOptions[site.pais]
    }
    if (typeof site.edad === 'number') {
        site.tipoedad = yearsOldOptions[site.edad]
    }
    if (typeof site.genero === 'number') {
        site.tipogenero = genresOptions[site.genero]
    }

    var datos1 = Object.assign(
        [{}],
        [
            {
                total_visits: data[0]?.total_visitas,
                hombre: data[0]?.genero.hombre,
                mujer: data[0]?.genero.mujer,
                indefinido: data[0]?.genero.indefinido,
                menores: data[0]?.edad.menores,
                mayores: data[0]?.edad.mayores,
                tercera_edad: data[0]?.edad.tercera_edad,
                nacional: data[0]?.pais.nacional,
                internacional: data[0]?.pais.internacional,
            },
        ]
    )
    var datos = Object.assign(
        {},
        {rows: datos1},
        {name: name},
        {portada_path: photo},
        {tipo: 'Visitas por sitio'},
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

    /* get live table and export to XLSX */
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
        utils.sheet_add_json(ws, datos1, {
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
    }, [datos1])
    return (
        <div style={show == false ? {display: 'none'} : {display: 'block'}}>
            <Row className='mb-7'>
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
                    <Row>
                        <div className='col-xs-8 col-md-8 col-lg-8 py-5 px-9'>
                            <h2 className=''>{name}</h2>
                            <h6 className='text-muted'>
                                {moment(date.fecha_inicial).format('DD/MM/YYYY')} -{' '}
                                {moment(date.fecha_final).format('DD/MM/YYYY')}
                            </h6>
                        </div>
                        <div className='col-xs-4 col-md-4 col-lg-4 py-5 px-9'>
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
                    </Row>
                    <hr style={{border: '1px solid rgba(86, 86, 116, 0.1)'}} />
                    <Table bordered responsive className='text-center' size='sm' striped>
                        <thead>
                            <tr>
                                <th>Visitas</th>
                                <th colSpan={3}>Género</th>
                                <th colSpan={3}>Edad</th>
                                <th colSpan={2}>País</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total de visitas</td>

                                <td>Hombre</td>
                                <td>Mujer</td>
                                <td>Prefiero no decirlo</td>

                                <td>Menores de edad</td>
                                <td>Mayores de edad</td>
                                <td>Tercera edad</td>

                                <td>Nacionales</td>
                                <td>Extranjeros</td>
                            </tr>
                            {data?.map((item: any, index: any) => (
                                <tr key={index}>
                                    <td>{data[0].total_visitas}</td>

                                    <td>{data[0].genero.hombre}</td>
                                    <td>{data[0].genero.mujer}</td>
                                    <td>{data[0].genero.indefinido}</td>

                                    <td>{data[0].edad.menores}</td>
                                    <td>{data[0].edad.mayores}</td>
                                    <td>{data[0].edad.tercera_edad}</td>

                                    <td>{data[0].pais.nacional}</td>
                                    <td>{data[0].pais.internacional}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tr></tr>
                        {/* <tr>
                            <th colSpan={9}>
                                Reporte generado el {date_report_format} a las {hour_report_format}{' '}
                                por {user.name} {user.lastName}.
                            </th>
                        </tr> */}
                    </Table>
                    {/* <div className='d-flex justify-content-center'>
                        <ExcelExport
                            data={datos1}
                            ref={_export}
                            fileName={`[${site.id_sitio}]MasVisitados-${name}.xlsx`}
                        >
                            <Grid data={datos1} style={{textAlign: 'center'}} resizable={true}>
                                <GridColumn
                                    field='total_visits'
                                    title='Total de visitas'
                                    width='120px'
                                />
                                <GridColumn title='Género'>
                                    <GridColumn field='hombre' title='Hombre' width='100px' />
                                    <GridColumn field='mujer' title='Mujer' width='100px' />
                                    <GridColumn
                                        field='indefinido'
                                        title='Prefiero no decirlo'
                                        width='150px'
                                    />
                                </GridColumn>
                                <GridColumn title='Edad'>
                                    <GridColumn field='menores' title='Menores' width='100px' />
                                    <GridColumn field='mayores' title='Mayores' width='100px' />
                                    <GridColumn
                                        field='tercera_edad'
                                        title='Tercera edad'
                                        width='100px'
                                    />
                                </GridColumn>
                                <GridColumn title='País'>
                                    <GridColumn field='nacional' title='Nacionales' width='100px' />
                                    <GridColumn
                                        field='internacional'
                                        title='Extranjeros'
                                        width='100px'
                                    />
                                </GridColumn>
                            </Grid>
                        </ExcelExport>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ResultMostVisited
