import React, {FC, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Select from 'react-select/dist/declarations/src/Select'
import {getData, getDataReport, getValue, postData} from '../../../services/api'
import {UserReportModel} from '../UserReportModel'

const ResultUserReport: FC<any> = ({show}) => {
    const [existUsers, setExistUsers] = useState(false)
    const [userReport, setUserReport] = useState<UserReportModel[]>([])
    console.log('userReport: ', userReport)
    const [filteredResults, setFilteredResults] = useState(userReport)
    let iterationRows = [1, 2, 3, 4, 5, 6]

    const [type, setType] = useState({
        tipo_reporte: 'usuarios',
    })

    const typeReport = async (typee: any) => {
        setType({
            tipo_reporte: 'usuarios',
        })
        const sit: any = await postData(getDataReport, typee)
        console.log('sit: ', sit)
        setExistUsers(true)
        // let claves = Object.keys(sit)
        // for (let i = 0; i < claves.length; i++) {
        //     let clave = claves[i]
        //     console.log('clave: ', clave)
        // }

        // for (const property in sit) {
        //     console.log(`${property}: ${sit[property]}`);
        //   }
    }

    useEffect(() => {
        typeReport(type)
    }, [])

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
                        ></div>
                        <div>
                            <h2 className=''>Museo de Arte Moderno</h2>
                            <h6 className='text-muted'>17/07/2022 - 22/07/2022</h6>
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
                            {iterationRows.map((item) => (
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
                                        <div>Mark</div>
                                        <div className='text-muted'>example@gmail.com</div>
                                    </td>
                                    <td className='text-muted'>12/08/2022</td>
                                    <td className='text-muted'>Guatemala</td>
                                    <td className='text-muted'>Masculino</td>
                                    <td className='text-muted'>23</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ResultUserReport
