import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Button, InputGroup, Form, Stack} from 'react-bootstrap'

import Catalogo from './components/catalogo'
import UpdateCatalogo from './components/update-catalogo'
import Language from './components/language'
import AddLanguaje from './components/add-language'
import AddCatalogo from './components/add-catalogo'

const CatalogosPage = () => {
    const [modalAddTag, setModalAddTag] = useState(false)
    const [modalUpdateTag, setModalUpdateTag] = useState({show: false, catalogo: {}})
    const [addModalLanguage, setAddModalLanguage] = useState({show: false, language: {}})

    const [optionSort, setOptionSort] = useState('Agregado recientemente')
    const [searchInput, setSearchInput] = useState('')
    const [catalogos, setCatalogos] = useState({
        /* count: 100,
        pages: 20,
        page: 5,
        sites: 2, */
        data: [
            {
                id: 1,
                nombre: 'Parque',
                icono: 'tree',
                idioma: {
                    id: 1,
                    nombre: 'Español (Guatemala)',
                    descripcion: 'El idioma español está disponible',
                },
            },
            {
                id: 2,
                nombre: 'Edificio',
                icono: 'building',
                idioma: {
                    id: 2,
                    nombre: 'Inglés (EEUU)',
                    descripcion: 'English language is available',
                },
            },
            {
                id: 3,
                nombre: 'Carro',
                icono: 'car-front',
                idioma: {
                    id: 1,
                    nombre: 'Español (Guatemala)',
                    descripcion: 'El idioma español está disponible',
                },
            },
            {
                id: 4,
                nombre: 'Avion',
                icono: 'airplane',
                idioma: {
                    id: 2,
                    nombre: 'Inglés (EEUU)',
                    descripcion: 'English language is available',
                },
            },
            {
                id: 5,
                nombre: 'Tecnologia',
                icono: 'apple',
                idioma: {
                    id: 1,
                    nombre: 'Español (Guatemala)',
                    descripcion: 'El idioma español está disponible',
                },
            },
            {
                id: 6,
                nombre: 'Museo',
                icono: 'bank',
                idioma: {
                    id: 2,
                    nombre: 'Inglés (EEUU)',
                    descripcion: 'English language is available',
                },
            },
            {
                id: 7,
                nombre: 'Libro',
                icono: 'book',
                idioma: {
                    id: 1,
                    nombre: 'Español (Guatemala)',
                    descripcion: 'El idioma español está disponible',
                },
            },
            {
                id: 8,
                nombre: 'Radio',
                icono: 'boombox',
                idioma: {
                    id: 2,
                    nombre: 'Inglés (EEUU)',
                    descripcion: 'English language is available',
                },
            },
        ],
    })

    const [stateLanguage, setStateLanguage] = useState({
        data: [
            {
                id: 1,
                nombre: 'Español (Guatemala)',
                descripcion: 'El idioma español está disponible',
            },
            {
                id: 2,
                nombre: 'Inglés (EEUU)',
                descripcion: 'English language is available',
            },
        ],
    })

    const [filteredResults, setFilteredResults] = useState(catalogos.data)

    /* useEffect(() => {
        getEtiquetas()

        console.log(etiquetas)
        // console.log(catalogos.data[0].idioma.nombre)
    }, []) */

    /* const getEtiquetas =async () => {
        setEtiquetas(catalogos.data as Etiquetas[])


        // const lenguaje: any = await getData(sitesMethod)
        // console.log(site)
        // setFilterSites(lenguaje.etiquetas as Site[])
        // setSites(site.site as Site[])
    } */

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = catalogos.data.filter((item) => {
                return Object.values(item.nombre)
                    .join('')
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(catalogos.data)
        }
    }

    const toggleOptionSort = () => {
        if (optionSort == 'Agregado recientemente') {
            const sortAscending = [...catalogos.data].sort((a, b) => a.id - b.id)
            setCatalogos({data: sortAscending})
            setOptionSort('Agregado anteriormente')
        } else if (optionSort == 'Agregado anteriormente') {
            const sortDescending = [...catalogos.data].sort((a, b) => b.id - a.id)
            setCatalogos({data: sortDescending})
            setOptionSort('Agregado recientemente')
        }
    }

    const showModalUpdateTag = (catalogo: any) => {
        setModalUpdateTag({show: true, catalogo})
    }

    const showModalAddTag = () => {
        setModalAddTag(true)
    }

    const showModalLanguage = (language: any) => {
        setAddModalLanguage({show: true, language})
    }

    return (
        <>
            <Container fluid>
                <Row className='pb-9'>
                    <div className='text-left'>
                        <h1 className='text-dark mt-0'>Categorías</h1>
                        <h2 className='text-muted mb-0'>Lista de categorías</h2>
                    </div>
                </Row>

                <Row className='pb-9'>
                    <div className='d-flex'>
                        <Form.Control
                            className='me-5'
                            style={{maxWidth: '300px', height: '46px'}}
                            placeholder='Buscar categoría'
                            onChange={(event) => searchItems(event.target.value)}
                        />

                        <Button variant='secondary' className='text-center'>
                            <i className='fs-2 bi-search px-0 fw-bolder'></i>
                        </Button>
                    </div>
                </Row>

                <Row className='pb-9'>
                    <div className='d-sm-flex justify-content-between align-items-center'>
                        <div
                            className='d-flex align-items-center fs-5 text-muted'
                            style={{cursor: 'pointer'}}
                            onClick={toggleOptionSort}
                        >
                            <i className='bi-sort-up fs-1 me-2'></i>
                            {`${optionSort}`}
                        </div>

                        <Button
                            variant='primary'
                            className='mt-md-0 mt-4'
                            onClick={() => showModalAddTag()}
                        >
                            <span className='menu-icon me-0'>
                                <i className={`bi-tag fs-2`}></i>
                            </span>
                            {' Nueva categoria'}
                        </Button>
                    </div>
                </Row>

                <Row>
                    {searchInput.length > 1
                        ? filteredResults.map((catalogo) => (
                              <Catalogo
                                  key={catalogo.id.toString()}
                                  data={catalogo}
                                  showModal={() => showModalUpdateTag(catalogo)}
                              />
                          ))
                        : catalogos.data.map((catalogo) => (
                              <Catalogo
                                  key={catalogo.id.toString()}
                                  data={catalogo}
                                  showModal={() => showModalUpdateTag(catalogo)}
                              />
                          ))}
                </Row>

                <UpdateCatalogo
                    show={modalUpdateTag.show}
                    catalogo={modalUpdateTag.catalogo}
                    onClose={() => setModalUpdateTag({show: false, catalogo: {}})}
                />

                <AddCatalogo show={modalAddTag} onClose={() => setModalAddTag(false)} />
            </Container>

            <Container fluid>
                <Row className='mt-12 mb-9'>
                    <div className='text-left'>
                        <h1 className='text-dark mt-0'>Idiomas</h1>
                        <h2 className='text-muted mb-0'>Lista de idiomas disponible</h2>
                    </div>
                </Row>

                <Row className='mb-9'>
                    <div className='d-flex justify-content-end'>
                        <Button
                            variant='primary'
                            className='mt-md-0 mt-4'
                            onClick={() => setAddModalLanguage({show: true, language: {}})}
                        >
                            <span className='menu-icon me-0  '>
                                <i className={`bi-plus-circle fs-2`}></i>
                            </span>
                            {' Nuevo Idioma'}
                        </Button>
                    </div>
                </Row>

                <Row>
                    {stateLanguage.data.map((language) => (
                        <Language
                            key={language.id.toString()}
                            data={language}
                            onClickLanguage={() => showModalLanguage(language)}
                        />
                    ))}
                </Row>

                <AddLanguaje
                    sendLanguage={sendLanguage}
                    show={addModalLanguage.show}
                    language={addModalLanguage.language}
                    onClose={() => setAddModalLanguage({show: false, language: {}})}
                />
            </Container>
        </>
    )
}

//-------------------------------------INTENTANDO ENVIAR DATOS Y GUARDARLOS---------------------------

const sendLanguage = () => {
    console.log('Lenguaje enviado ')
}

export default CatalogosPage
