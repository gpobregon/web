import React, {FC, useEffect, useState} from 'react'
import {Button, Col, Form, Row, Table} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Select from 'react-select/dist/declarations/src/Select'
import {getData, getDataReport, getSitiosPublicados, getValue, postData} from '../../../services/api' 
import Moment from 'moment'
import { PublishSite } from '../../../models/publishSite'


const ResultUserReport: FC<any> = ({show, data, site}) => { 
    let [publishSite, setPublishSite] = useState<PublishSite[]>([])
    console.log("publishSite: ", publishSite);
    console.log("site: ", site);
    console.log("data en html: ", data); 
    const [nameSite, setNameSite] = useState({ 
        nombreSitio: ''
    }) 
    console.log("nameSite: ", nameSite);


    const getSite = async () => {
        getPublishSites()
    }
    async function getPublishSites() {
        const sites: any = await getData(getSitiosPublicados)
        // console.log('sites: ', sites.data)

        sites.data.map((sit: any) => {
            publishSite.push({value: sit.id_sitio, label: sit.nombre})
        })
    } 

    const findName =async () => {
        getSite() 
        const filter = publishSite.filter((item)=> site.id_sitio === item.value)
        console.log("filter: ", filter); 
        setNameSite({ 
            nombreSitio: filter[0].label
        })
    }

    useEffect(() => {
        getSite() 
        findName()
        //getPublishSites() 
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
                            <h2 className=''>{nameSite.nombreSitio}</h2>
                            <h6 className='text-muted'>{site.fecha_inicial} / {site.fecha_final}</h6>
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
                                        <div>{item.nombre}</div>
                                    </td>
                                    <td className='text-muted'>{Moment(item.ultima_visita).format('DD/MM/YYYY')}</td>
                                    <td className='text-muted'>{item.pais}</td>
                                    <td className='text-muted'>{item.genero}</td>
                                    <td className='text-muted'>{item.edad}</td>
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
