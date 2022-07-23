import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {KTSVG} from '../../../_metronic/helpers'
import {Link, useNavigate} from 'react-router-dom'
import {Route, Routes, Navigate} from 'react-router-dom'
import {mockedSites} from '../../mocks/sites'
import Site from '../../models/site'


export function SiteList() {
  const [sites, setSites] = useState<Site[]>([])
  const [valor, setValor] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    setSites(mockedSites)
    console.log('Sites: ' + mockedSites, sites)
    return () => {}
  }, [valor])

  return (
    <>
      <div
        className='container card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover'
        style={{
          backgroundColor: '#1A1A27',
          backgroundSize: 'auto 100%',
        }}
      >
        <div className='row align-items-start'>
          <div className='col'>
            <h3 className='letterTitle'>
              Gestor de Sitios <span className='lettersmall'>| 272 en total</span>
            </h3>
          </div>
          <div className='col searchDash'>
            <div className='d-flex align-items-center position-relative me-4'>
              <KTSVG
                path='/media/icons/duotune/general/gen021.svg'
                className='svg-icon-3 position-absolute ms-3'
              />
              <input
                type='text'
                id='kt_filter_search'
                className='form-control form-control-white form-control-sm w-155px ps-9'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='col'>
            <ul className='pagination'>
              <li className='page-item previous disabled'>
                <a href='#' className='page-link'>
                  <i className='previous'></i>
                </a>
              </li>
              <li className='page-item'>
                <a href='#' className='page-link'>
                  1
                </a>
              </li>
              <span className='letra'>de</span>
              <li className='page-item letra1'>
                <a href='#' className='page-link'>
                  22
                </a>
              </li>
              <li className='page-item next'>
                <a href='#' className='page-link'>
                  <i className='next'></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className='container1'>
        <div className='row align-items-start'>
          <div className='col agregadosRecientemente'>
            <span className='bi bi-sort-up'> Agregados recientemente</span>
          </div>
          <div className='col'></div>
          <div className='col-2 letterButtonAdd'>
            <Link to='/site/form' className='btn btn-info'>
              <i className='bi bi-file-earmark-plus'></i>Nuevo Sitio
            </Link>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
          {sites.map((site) => {
            return (
              <div className='col'>
                <div className='card tamañoCards' style={{width: '300px', height: '370px'}}>
                  <Card.Img
                    style={{
                      borderRadius: '25px',
                    }}
                    variant='top'
                    src={site.img}
                  />
                  <div className='card-body'>
                    <h5 className='card-title titlesPlaces'>{site.name}</h5>
                    <p className='card-text subTextCards'>Ubicacion</p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        className='btn btn-info letterButton'
                        onClick={(event) => {
                          navigate('/site/form', {state: {site}})
                        }}
                      >
                        <i className='bi bi-pencil-square'></i> Editar
                      </Button>
                      <a
                        href='#'
                        className='btn btn-outline btn-outline btn-outline-info btn-active-light-info letterButton'
                      >
                        <i className='bi bi-trash'></i> Eliminar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          
        </div>
      </div>

      <br />

      <div>
        <ul className='pagination'>
          <li className='page-item previous disabled'>
            <a href='#' className='page-link'></a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link'>
              1
            </a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link'>
              2
            </a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link'>
              3
            </a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link'>
              4
            </a>
          </li>
          <li className='page-item'>
            <a href='#' className='page-link'>
              5
            </a>
          </li>
          <li className='page-item next'>
            <a href='#' className='page-link'></a>
          </li>
        </ul>
      </div>
    </>
  )
}
