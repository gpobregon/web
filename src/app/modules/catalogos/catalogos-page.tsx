import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Button, InputGroup, Form, Stack} from 'react-bootstrap'

import Catalogo from './components/catalogo'
import UpdateCatalogo from './components/update-catalogo'
import UpdateLanguage from './components/update-language'
import Language from './components/language'
import AddLanguaje from './components/add-language'
import AddCatalogo from './components/add-catalogo'
import {CatalogTag} from '../../models/catalogTag'
import {CatalogLanguage} from '../../models/catalogLanguage'
import {
    addCategoryMethod,
    addLanguageMethod,
    categorysMethod,
    deleteData,
    getData,
    languagesMethod,
    postData,
    updateCategoryMethod,
    updateLanguageMethod,
} from '../../services/api'
import swal from 'sweetalert'

const CatalogosPage = () => {
    const [modalAddTag, setModalAddTag] = useState(false)
    const [modalAddLanguage, setModalAddLanguage] = useState(false)

    const [modalUpdateTag, setModalUpdateTag] = useState({show: false, catalogo: {}})
    const [modalUpdateIdioma, setModalUpdateIdioma] = useState({show: false, language: {}})

    const [optionSort, setOptionSort] = useState('Agregado recientemente')
    const [searchInput, setSearchInput] = useState('')
    const [catalogos, setCatalogos] = useState<CatalogTag[]>([])
    const [filteredResults, setFilteredResults] = useState(catalogos)

    const [languages, setLanguages] = useState<CatalogLanguage[]>([])
    const [language, setLanguage] = useState({
        id_lenguaje: 1,
        nombre: '',
        descripcion: '',
        estado: 1,
    })

    useEffect(() => {
        getTags()
        getLanguages()
    }, [])

    const getTags = async () => {
        const catalogos: any = await postData(categorysMethod, {page: '1', quantity: '8'})
        setCatalogos(catalogos as CatalogTag[])
    }

    const getLanguages = async () => {
        const lenguaje: any = await getData(languagesMethod)
        setLanguages(lenguaje.data as CatalogLanguage[])
    }

    const alertNotNullInputs = async () => {
        swal({
            text: '¡Faltan campos por completar!',
            icon: 'warning',
        })
    }

    // TODO: addTag
    const addTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '') {
            await postData(addCategoryMethod, tag)
            setModalAddTag(false)
            getTags()
        } else {
            alertNotNullInputs()
        }
    }

    // TODO: addLanguage
    const addLanguage = async (language: any) => {
        if (language.nombre != '' && language.descripcion != '') {
            await postData(addLanguageMethod, language)
            setModalAddLanguage(false)
            getLanguages()
        } else {
            alertNotNullInputs()
        }
    }

    // TODO: updateTag
    const updateTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '') {
            await postData(updateCategoryMethod, tag)
            setModalUpdateTag({show: false, catalogo: {}})
            getTags()
        } else {
            alertNotNullInputs()
        }
    }

    // TODO: updateIdioma
    const updateIdioma = async (idioma: any) => {
        if (idioma.nombre != '' && idioma.descripcion != '') {
            await postData(updateLanguageMethod, idioma)
            setModalUpdateIdioma({show: false, language: {}})
            getLanguages()
        } else {
            alertNotNullInputs()
        }
    }

    // TODO: deleteTag
    const deleteTag = async (tag: any) => {
        await deleteData(categorysMethod, tag)
        setModalUpdateTag({show: false, catalogo: {}})
        getTags()
        swal({
            title: 'Se ha eliminado la etiqueta',
            icon: 'success',
        })
    }

    //TODO: deleteLanguage
    const deleteIdioma = async (idioma: any) => {
        await deleteData(languagesMethod, idioma)
        setModalUpdateIdioma({show: false, language: {}})
        getLanguages()
        swal({
            title: 'Se ha eliminado el idioma',
            icon: 'success',
        })
    }

    const searchItems = (searchValue: any) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = catalogos.filter((item) => {
                return Object.values(item.nombre)
                    .join('')
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(catalogos)
        }
    }

    const toggleOptionSort = () => {
        if (optionSort == 'Agregado recientemente') {
            const sortAscending = [...catalogos].sort((a, b) => a.id_categoria - b.id_categoria)
            setCatalogos(sortAscending)
            setOptionSort('Agregado anteriormente')
        } else if (optionSort == 'Agregado anteriormente') {
            const sortDescending = [...catalogos].sort((a, b) => b.id_categoria - a.id_categoria)
            setCatalogos(sortDescending)
            setOptionSort('Agregado recientemente')
        }
    }

    const showModalAddTag = () => {
        setModalAddTag(true)
    }
    const showModalLanguage = () => {
        setModalAddLanguage(true)
    }

    const showModalUpdateTag = (catalogo: any) => {
        setModalUpdateTag({show: true, catalogo})
    }

    const showModalUpdateIdioma = (language: any) => {
        setModalUpdateIdioma({show: true, language})
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <div className='text-left mb-10'>
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
                        ? filteredResults?.map((catalogo) => (
                              <Catalogo
                                  key={catalogo.id_categoria.toString()}
                                  data={catalogo}
                                  showModal={() => showModalUpdateTag(catalogo)}
                              />
                          ))
                        : catalogos?.map((catalogo) => (
                              <Catalogo
                                  key={catalogo.id_categoria.toString()}
                                  data={catalogo}
                                  showModal={() => showModalUpdateTag(catalogo)}
                              />
                          ))}
                </Row>
                <AddCatalogo
                    show={modalAddTag}
                    onClose={() => setModalAddTag(false)}
                    addTag={addTag}
                />

                <UpdateCatalogo
                    show={modalUpdateTag.show}
                    onClose={() => setModalUpdateTag({show: false, catalogo: {}})}
                    catalogo={modalUpdateTag.catalogo}
                    updateTag={updateTag}
                    deleteTag={deleteTag}
                />
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
                            onClick={() => setModalAddLanguage(true)}
                        >
                            <span className='menu-icon me-0  '>
                                <i className={`bi-plus-circle fs-2`}></i>
                            </span>
                            {' Nuevo Idioma'}
                        </Button>
                    </div>
                </Row>

                <Row>
                    {languages.map((language) => (
                        <Language
                            key={language.id_lenguaje.toString()}
                            data={language}
                            showModal={() => showModalUpdateIdioma(language)}
                        />
                    ))}
                </Row>

                <AddLanguaje
                    show={modalAddLanguage}
                    onClose={() => setModalAddLanguage(false)}
                    addLanguage={addLanguage}
                />

                <UpdateLanguage
                    show={modalUpdateIdioma.show}
                    onClose={() => setModalUpdateIdioma({show: false, language: {}})}
                    language={modalUpdateIdioma.language}
                    updateIdioma={updateIdioma}
                    deleteIdioma={deleteIdioma}
                />
            </Container>
        </>
    )
}

export default CatalogosPage
