import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {Link, useLocation} from 'react-router-dom'
import Site from '../../models/site'
//import { COUNTRIES } from './countries';

export function SiteForm() {
  const {state} = useLocation()
  const {site} = state as any
  const [country, setCountry] = React.useState<any[]>([])

  React.useEffect(() => {
    obtenerCountries()
  }, [])

  const obtenerCountries = async () => {
    const data = await fetch('https://restcountries.com/v2/all')
    const countries = await data.json()
    console.log(countries)
    setCountry(countries)
  }
  const suggestions = country.map((country) => {
    return {
      id: country,
      text: country,
    }
  })

  const KeyCodes = {
    comma: 188,
    enter: 13,
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  const App = () => {
    const [tags, setTags] = React.useState([
      {id: 'Thailand', text: 'Thailand'},
      {id: 'India', text: 'India'},
      {id: 'Vietnam', text: 'Vietnam'},
      {id: 'Turkey', text: 'Turkey'},
    ])
  }

  return (
    <>
      <h1>Configuración del sitio</h1>
      <h5>Lista de Sitios - Configuración del Sitio</h5>
      <br />
      <div className='row'>
        <div className='card'>
          <div className='col-3'>
            <br></br>
            <br />
            <div className='card-header div-edit row'>
              <div className='card div-image'>
                <br></br>
                <Card.Img
                  src='https://s.yimg.com/ny/api/res/1.2/0yhjL_7szDpB1NIVnAm0mg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTcxNjtjZj13ZWJw/https://s.yimg.com/uu/api/res/1.2/cgf._bZWNyuziq6ie5CUIg--~B/aD04ODQ7dz0xMTg2O2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/5f2acfff720e9a2c822eaa0b4f37e3dd'
                  className='card-img-top img1'
                  alt='...'
                />
                <div>
                  <div className='card-body '>
                    <Row>
                      <Col>
                        <Link
                          className='bi bi-arrow-left-right background-button text-info'
                          to={''}
                        ></Link>
                      </Col>
                      <Col>
                        <Link className='bi bi-crop background-button text-info' to={''}></Link>
                      </Col>
                      <Col>
                        <Link className='bi bi-trash background-button text-danger' to={''}></Link>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>

              <div className='col-4'>
                <br></br>

                <div id='is-relative'>
                  <input type='text' className='form-control' value={site ? site.name : ''} onChange={e => {
                    console.log(e.target.value)
                    site.name=e.target.value;
                  }} />
                  <span id='icon'>
                    <i className='fa-solid fa-pencil'></i>
                  </span>
                </div>
                <br />
                <br />
                <br />
                <label>Ubicación</label>
                <br></br>
                <input type='search' className='form-control'></input>
                <br></br>
                <br />
                <br />
                <label>Etiquetas</label>
                <br />
                <textarea className='form-control' />
              </div>
              <div className='col-5'>
                <div className='row'>
                  <div className='col'>
                    <div className='row'>
                      <h2 className='col-md-6 offset-md-3'>Sitio Web</h2>
                    </div>
                    <br></br>
                    <div className='row'>
                      <i
                        className=' fa-solid fa-mobile-screen-button text-info fa-10x 
                  col-6 offset-md-3'
                      ></i>
                    </div>
                    <br></br>
                    <br />
                    <div className='row'>
                      <p className=' text-movil col-8 offset-md-2'>
                        Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Aenean sollicit
                        bibendum.
                      </p>
                    </div>
                    <br></br>
                    <div className='row'>
                      <Link className='btn btn-info col-md-6 offset-md-3' to={''}>
                        <i className='fa-solid fa-pencil '></i> Crear
                      </Link>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='row'>
                      <h2 className='col-md-6 offset-md-3'>Sitio Movil</h2>
                    </div>
                    <br />
                    <div className='row'>
                      <i className='col-md-6 offset-md-2 fa-solid fa-display text-secondary fa-10x'></i>
                    </div>
                    <br></br>
                    <br />
                    <div className='row'>
                      <p className=' text-movil col-8 offset-md-2'>
                        Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Aenean sollicit
                        bibendum.
                      </p>
                    </div>
                    <br></br>
                    <div className='row'>
                      <Link className='btn btn-secondary col-md-6 offset-md-3' to={''}>
                        <i className='fa-solid fa-pencil '></i> Crear
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
