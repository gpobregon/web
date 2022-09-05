import React, {useState, useEffect} from 'react'
import {Container, Col, Row, Button, InputGroup, Form, Stack} from 'react-bootstrap'
import moment from 'moment'

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

    const [catalogos, setCatalogos] = useState<CatalogTag[]>([])
    const [languages, setLanguages] = useState<CatalogLanguage[]>([])

    const [searchInput, setSearchInput] = useState('')
    const [optionSort, setOptionSort] = useState('Agregado recientemente')
    const [resultIcon, setResultIcon] = useState('bi-sort-up')
    const [filteredResults, setFilteredResults] = useState(catalogos)

    const [tag, setTag] = useState({
        id_categoria: 0,
        nombre: '',
        icono: '',
        estado: 1,
        id_lenguaje: 0,
    })

    const [idioma, setIdioma] = useState({
        id_lenguaje: 1,
        nombre: '',
        descripcion: '',
        estado: 1,
    })

    const getTags = async () => {
        const catalogos: any = await postData(categorysMethod, {page: pageNumber, quantity: '12'})
        setCatalogos(catalogos as CatalogTag[])

        const countNextResults: any = await postData(categorysMethod, {
            page: pageNumber + 1,
            quantity: '12',
        })

        if (countNextResults.length == 0) {
            setToggleButtonsPagination({
                previous: false,
                next: true,
            })
        } else if (countNextResults.length > 0) {
            setToggleButtonsPagination({
                previous: toggleButtonsPagination.previous,
                next: false,
            })
        }
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

    const addTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '') {
            await postData(addCategoryMethod, tag)
            setModalAddTag(false)
            getTags()
        } else {
            alertNotNullInputs()
        }
    }

    const addLanguage = async (language: any) => {
        if (language.nombre != '' && language.descripcion != '') {
            await postData(addLanguageMethod, language)
            setModalAddLanguage(false)
            getLanguages()
        } else {
            alertNotNullInputs()
        }
    }

    const updateTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '') {
            await postData(updateCategoryMethod, tag)
            setModalUpdateTag({show: false, catalogo: {}})
            getTags()
        } else {
            alertNotNullInputs()
        }
    }

    const updateIdioma = async (idioma: any) => {
        if (idioma.nombre != '' && idioma.descripcion != '') {
            await postData(updateLanguageMethod, idioma)
            setModalUpdateIdioma({show: false, language: {}})
            getLanguages()
        } else {
            alertNotNullInputs()
        }
    }

    const deleteTag = async (tag: any) => {
        await swal({
            title: '¿Estás seguro de eliminar esta categoría?',
            icon: 'warning',
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteData(categorysMethod, tag)
                setModalUpdateTag({show: false, catalogo: {}})
                swal({
                    title: 'Se ha eliminado la etiqueta',
                    icon: 'success',
                })
            }
        })

        getTags()
        getTags()
        getTags()
    }

    const deleteIdioma = async (idioma: any) => {
        await swal({
            title: '¿Estás seguro de eliminar este idioma?',
            icon: 'warning',
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteData(languagesMethod, idioma)
                setModalUpdateIdioma({show: false, language: {}})
                swal({
                    title: 'Se ha eliminado el idioma',
                    icon: 'success',
                })
            }
        })

        getLanguages()
        getLanguages()
        getLanguages()
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
            const sortAscending = [...catalogos].sort((a, b) => moment(b.creado).diff(a.creado))
            setCatalogos(sortAscending)
            setOptionSort('Agregado anteriormente')
            setResultIcon('bi-sort-down')
        } else if (optionSort == 'Agregado anteriormente') {
            const sortDescending = [...catalogos].sort((a, b) => moment(a.creado).diff(b.creado))
            setCatalogos(sortDescending)
            setOptionSort('Agregado recientemente')
            setResultIcon('bi-sort-up')
        }
    }

    const showModalAddTag = () => {
        setModalAddTag(true)
    }
    const showModalLanguage = () => {
        setModalAddLanguage(true)
    }

    const showModalUpdateTag = (catalogo: any) => {
        setTag({
            id_categoria: catalogo.id_categoria,
            nombre: catalogo.nombre,
            icono: catalogo.icono,
            estado: 1,
            id_lenguaje: catalogo.idioma.id,
        })
        setModalUpdateTag({show: true, catalogo})
    }

    const showModalUpdateIdioma = (language: any) => {
        setIdioma({
            id_lenguaje: language.id_lenguaje,
            nombre: language.nombre,
            descripcion: language.descripcion,
            estado: 1,
        })
        setModalUpdateIdioma({show: true, language})
    }

    let [pageNumber, setPageNumber] = useState(1)
    const [toggleButtonsPagination, setToggleButtonsPagination] = useState({
        previous: true,
        next: false,
    })

    const handlePrevPage = () => {
        if (pageNumber == 1) {
            setToggleButtonsPagination({
                previous: true,
                next: toggleButtonsPagination.next,
            })
        } else {
            setPageNumber(pageNumber - 1)
        }
    }

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
        setToggleButtonsPagination({
            previous: false,
            next: false,
        })
    }

    useEffect(() => {
        getTags()
        getLanguages()
    }, [pageNumber])

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
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <Form.Control
                                className='me-5'
                                style={{maxWidth: '300px'}}
                                placeholder='Buscar categoría'
                                onChange={(event) => searchItems(event.target.value)}
                            />

                            <Button variant='secondary' className='text-center'>
                                <i className='fs-2 bi-search px-0 fw-bolder'></i>
                            </Button>
                        </div>

                        <div className='d-flex'>
                            <Button
                                variant='outline-secondary'
                                className='text-center'
                                title='Página anterior'
                                disabled={toggleButtonsPagination.previous}
                                onClick={() => handlePrevPage()}
                            >
                                <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                            </Button>

                            <div
                                className='d-flex align-items-center justify-content-center'
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    backgroundColor: '#2B2B40',
                                    borderRadius: '5px',
                                }}
                            >
                                {`${pageNumber}`}
                            </div>

                            <Button
                                variant='outline-secondary'
                                className='text-center'
                                title='Página siguiente'
                                disabled={toggleButtonsPagination.next}
                                onClick={() => handleNextPage()}
                            >
                                <i className='fs-2 bi-chevron-right px-0 fw-bolder'></i>
                            </Button>
                        </div>
                    </div>
                </Row>

                <Row className='pb-9'>
                    <div className='d-sm-flex justify-content-between align-items-center'>
                        <div
                            className='d-flex align-items-center fs-5 text-muted'
                            style={{cursor: 'pointer'}}
                            onClick={toggleOptionSort}
                        >
                            <i className={`${resultIcon} fs-1 me-2`}></i>
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
                    tag={tag}
                    setTag={setTag}
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
                    idioma={idioma}
                    setIdioma={setIdioma}
                    updateIdioma={updateIdioma}
                    deleteIdioma={deleteIdioma}
                />
            </Container>
        </>
    )
}

export default CatalogosPage
