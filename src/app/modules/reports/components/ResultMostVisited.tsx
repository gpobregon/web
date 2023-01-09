import moment from 'moment'
import React, {FC, useState} from 'react'
import { Row, Table} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
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

const ResultMostVisited: FC<any> = ({show, data, site, name, photo}) => {
    // console.log('name: ', name)
    // console.log('data: ', data)
    // console.log('site: ', site)
    const optionsWithIcons = [{
        value: 1,
        label: 'PDF',
    },{
        value: 2,
        label:"Excel"
    }]
    
    var datos=Object.assign({},{rows:data[0]},{name:name},{portada_path:photo},{tipo:"Más visitados"},{site:site})
    const handleChangeLanguage = (event: any) => {
      console.log('event: ', event)
      setShowPDF(true)
    }
    const [showPDF, setShowPDF] = useState(false) //modal show qr
    const handleClose = () => setShowPDF(false) //modal close qr
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
                                {moment(site.fecha_inicial).format('DD/MM/YYYY')} -{' '}
                                {moment(site.fecha_final).format('DD/MM/YYYY')}
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
                            {data?.map((item: any,index:any) => (
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
                    </Table>
                </div>
            </div>
                    <PDF
                     show={showPDF}
                     onClose={handleClose}
                     DATA={datos}
                    />
           
        </div>
    )
}

export default ResultMostVisited
