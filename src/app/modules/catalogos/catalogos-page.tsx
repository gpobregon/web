import React, {useState, useEffect, useContext} from 'react'
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
    getRolesMethod,
    languagesMethod,
    lengthTagsMethod,
    postData,
    updateCategoryMethod,
    updateLanguageMethod,
} from '../../services/api'
import swal from 'sweetalert'
import {Link, useNavigate} from 'react-router-dom'
import {roleManager} from '../../models/roleManager'
import {ConsoleLogger} from '@aws-amplify/core'
import {LoadingContext} from '../../utility/component/loading/context'
import {Amplify, Auth} from 'aws-amplify'
import favicon from '../../../../public/manifest.json'
import {useAuth} from '../auth'
const alertLanguageDone = async () => {
    swal({
        text: 'Lenguaje creado',
        icon: 'success',
    })
}

const CatalogosPage = () => {
    const {setShowLoad} = useContext(LoadingContext)
    const [modalAddTag, setModalAddTag] = useState(false)
    const [modalAddLanguage, setModalAddLanguage] = useState({show: false, language: {}})
    const [modalUpdateIdioma, setModalUpdateIdioma] = useState({show: false, language: {}})
    const [modalUpdateTag, setModalUpdateTag] = useState({show: false, catalogo: {}})
    const [catalogos, setCatalogos] = useState<CatalogTag[]>([])
    const [totalTags, setTotalTags] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
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

    const [newTag, setNewTag] = useState({
        id_categoria: 0,
        nombre: '',
        icono: '',
        estado: 1,
        id_lenguaje: 0,
    })

    const [idioma, setIdioma] = useState({
        id_lenguaje: 0,
        nombre: '',
        descripcion: '',
        estado: 1,
        json_web: '',
        json_movil: '',
    })

    const [newIdioma, setNewIdioma] = useState({
        id_lenguaje: 0,
        nombre: '',
        descripcion: '',
        estado: 1,
        json_web: '',
        json_movil: '',
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

        const tagsLength: any = await getData(lengthTagsMethod)
        setTotalTags(tagsLength.count)

        let pagesLength = Math.ceil(tagsLength.count / 12)
        setTotalPages(pagesLength)
    }

    const getLanguages = async () => {
        const lenguaje: any = await getData(languagesMethod)
        setLanguages(lenguaje.data as CatalogLanguage[])
    }

    const alertNotNullInputsObj = async (data: any) => {
        let keys = Object.keys(data),
            msg = ''

        for (let key of keys) {
            if (
                data[key] !== null &&
                data[key] !== undefined &&
                data[key] !== 0 &&
                data[key] !== ''
            )
                continue
            msg += `El campo ${key} es obligatorio\n`
        }

        msg.trim()

        swal({
            text: msg,
            icon: 'warning',
        })
    }

    const addTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '' && tag.id_lenguaje != 0) {
            setNewTag({
                id_categoria: 0,
                nombre: '',
                icono: '',
                estado: 1,
                id_lenguaje: 0,
            })
            await postData(addCategoryMethod, tag)
            setModalAddTag(false)
            swal({
                text: 'Categoría creada',
                icon: 'success',
            })
            getTags()
        } else {
            alertNotNullInputsObj({
                nombre: tag.nombre,
                icono: tag.icono,
                lenguaje: tag.id_lenguaje,
            })
        }
    }

    const addLanguage = async (language: any) => {
        if (
            language.nombre !== '' &&
            language.descripcion !== '' &&
            language.json_web !== '' &&
            language.json_movil !== ''
        ) {
            setNewIdioma({
                id_lenguaje: 0,
                nombre: '',
                descripcion: '',
                estado: 1,
                json_web: '',
                json_movil: '',
            })
            await postData(addLanguageMethod, language)
            setModalAddLanguage({show: false, language: {}})
            swal({
                text: 'Lenguaje creado',
                icon: 'success',
            })
            getLanguages()
        } else {
            alertNotNullInputsObj({
                nombre: language.nombre,
                descripcion: language.descripcion,
                ['json web']: language.json_web,
                ['jsown movil']: language.json_movil,
            })
        }
    }

    const updateTag = async (tag: any) => {
        if (tag.nombre != '' && tag.icono != '' && tag.id_lenguaje != 0) {
            setTag({
                id_categoria: 0,
                nombre: '',
                icono: '',
                estado: 1,
                id_lenguaje: 0,
            })
            await postData(updateCategoryMethod, tag)
            setModalUpdateTag({show: false, catalogo: {}})
            swal({
                text: 'Categoría actualizada',
                icon: 'success',
            })
            getTags()
        } else {
            alertNotNullInputsObj({
                nombre: tag.nombre,
                icono: tag.icono,
                lenguaje: tag.id_lenguaje,
            })
        }
    }

    const updateIdioma = async (idioma: any) => {
        if (
            idioma.nombre !== '' &&
            idioma.descripcion !== '' &&
            idioma.json_web !== '' &&
            idioma.json_movil !== ''
        ) {
            setIdioma({
                id_lenguaje: 1,
                nombre: '',
                descripcion: '',
                estado: 1,
                json_web: '',
                json_movil: '',
            })
            await postData(updateLanguageMethod, idioma)
            setModalUpdateIdioma({show: false, language: {}})
            swal({
                text: 'Idioma actualizado',
                icon: 'success',
            })
            getLanguages()
        } else {
            alertNotNullInputsObj({
                nombre: idioma.nombre,
                descripcion: idioma.descripcion,
                json_web: idioma.json_web,
                json_movil: idioma.json_movil,
            })
        }
    }

    const deleteTag = async (tag: any) => {
        let flag = false

        await swal({
            title: '¿Estás seguro de eliminar esta categoría?',
            icon: 'warning',
            dangerMode: true,
            buttons: ['No', 'Sí'],
        }).then((willDelete) => {
            if (willDelete) {
                flag = true
            }
        })

        if (flag) {
            const deleteInfo: any = await deleteData(categorysMethod, tag)

            if (deleteInfo.category.en_uso === undefined) {
                setModalUpdateTag({show: false, catalogo: {}})
                swal({
                    title: `Categoría eliminada`,
                    icon: 'success',
                })
            } else {
                setModalUpdateTag({show: false, catalogo: {}})
                swal({
                    title: 'Error al eliminar la categoría',
                    text: `Esta categoría esta siendo usada en/los sitios: \n ${deleteInfo.category.en_uso}`,
                    icon: 'warning',
                })
            }
        }

        setTimeout(getTags, 500)
    }

    const deleteIdioma = async (idioma: any) => {
        let flag = false

        await swal({
            title: '¿Estás seguro de eliminar este idioma?',
            icon: 'warning',
            dangerMode: true,
            buttons: ['No', 'Sí'],
        }).then((willDelete) => {
            if (willDelete) {
                flag = true
            }
        })

        if (flag) {
            const deleteInfo: any = await deleteData(languagesMethod, idioma)

            if (deleteInfo.en_uso === undefined) {
                setModalUpdateIdioma({show: false, language: {}})
                swal({
                    title: 'Se ha eliminado el idioma',
                    icon: 'success',
                })
            } else {
                setModalUpdateIdioma({show: false, language: {}})
                swal({
                    title: 'Error al eliminar la categoría',
                    text: `Esta categoría esta siendo usada en: \n 
                        la/las categorías: ${deleteInfo.en_uso.enUso.categorias.toString()} \n 
                        el/los sitios: ${deleteInfo.en_uso.enUso.sitios.toString()} \n
                        el/los puntos: ${deleteInfo.en_uso.enUso.puntos.toString()}`,
                    icon: 'warning',
                })
            }
        }

        setTimeout(getLanguages, 500)
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

    const showModalAddTag = async () => {
        await validateRole()

        if (permissionCreateTag) {
            setModalAddTag(true)
        } else {
            swal({
                title: 'No tienes permiso para crear una categoría',
                icon: 'warning',
            })
        }
    }

    const showModalLanguage = async () => {
        await validateRole()

        if (permissionCreateLanguage) {
            setModalAddLanguage({show: true, language: {}})
        } else {
            swal({
                title: 'No tienes permiso para crear un lenguaje',
                icon: 'warning',
            })
        }
    }

    const showModalUpdateTag = async (catalogo: any) => {
        await validateRole()

        if (permissionEditTag) {
            setTag({
                id_categoria: catalogo.id_categoria,
                nombre: catalogo.nombre,
                icono: catalogo.icono,
                estado: 1,
                id_lenguaje: catalogo.idioma.id,
            })
            setModalUpdateTag({show: true, catalogo})
        } else {
            swal({
                title: 'No tienes permiso para editar una categoría',
                icon: 'warning',
            })
        }
    }

    const showModalUpdateIdioma = async (language: any) => {
        await validateRole()

        if (permissionEditLanguage) {
            setIdioma({
                id_lenguaje: language.id_lenguaje,
                nombre: language.nombre,
                descripcion: language.descripcion,
                estado: 1,
                json_web: language.json_web,
                json_movil: language.json_movil,
            })
            setModalUpdateIdioma({show: true, language})
        } else {
            swal({
                title: 'No tienes permiso para editar un lenguaje',
                icon: 'warning',
            })
        }
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

    let navigate = useNavigate()
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionCreateLanguage, setPermissionCreateLanguage] = useState(true)
    const [permissionEditLanguage, setPermissionEditLanguage] = useState(true)
    const [permissionDeleteLanguage, setPermissionDeleteLanguage] = useState(true)

    const [permissionCreateTag, setPermissionCreateTag] = useState(true)
    const [permissionEditTag, setPermissionEditTag] = useState(true)
    const [permissionDeleteTag, setPermissionDeleteTag] = useState(true)

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    const validateRole = async () => {
        setShowLoad(true)

        Auth.currentUserInfo().then(async (user) => {
            try {
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })

                if (filter[0]?.gestor_categorias_idiomas === false) {
                    navigate('/error/401', {replace: true})
                } else {
                    setPermissionCreateLanguage(filter[0]?.idioma_crear)
                    setPermissionEditLanguage(filter[0]?.idioma_editar)
                    setPermissionDeleteLanguage(filter[0]?.idioma_eliminar)

                    setPermissionCreateTag(filter[0]?.categoria_crear)
                    setPermissionEditTag(filter[0]?.categoria_editar)
                    setPermissionDeleteTag(filter[0]?.categoria_eliminar)
                }
            } catch (error) {
                swal(
                    'Se ha cambiado la contraseña de tu usuario',
                    'Cierra sesión y vuelve a ingresar',
                    'warning'
                )
                await forgotDevice()
            }
        })

        setTimeout(() => setShowLoad(false), 1000)
    }

    //para cerrar sesión despues de cambiar contraseña, no olvida el dispositivo :c
    const {currentUser, logout} = useAuth()
    const forgotDevice = async () => {
        try {
            logout()
            await Amplify.Auth.forgetDevice()
        } catch (error) {}
    }

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        validateRole()
    }, [existRoles])

    useEffect(() => {
        getRoles()
        getTags()
        getLanguages()
    }, [pageNumber])

    return (
        <>
            <Container fluid>
                <Row>
                    <div className='text-left mb-10'>
                        <h1 className='text-dark mt-0'>
                            Categorías{' '}
                            <span className='text-muted'>
                                | <span className='fs-5'>{`${totalTags}`} en total</span>
                            </span>
                        </h1>
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
                                className='d-flex align-items-center justify-content-center px-5'
                                style={{
                                    height: '46px',
                                    backgroundColor: '#2B2B40',
                                    borderRadius: '5px',
                                }}
                            >
                                {`Página ${pageNumber} de ${totalPages}`}
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
                    tag={newTag}
                    setTag={setNewTag}
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
                    validateRole={validateRole}
                    permissionDeleteTag={permissionDeleteTag}
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
                    <div className='d-flex flex-row-reverse'>
                        <a
                            style={{paddingLeft: 30}}
                            href={
                                'https://mcd-archivos.s3.amazonaws.com/plantillasIdiomas/plantilla_es_website.json'
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Button variant='primary' className='mt-md-0 mt-4'>
                                <span className='menu-icon me-0  '>
                                    <i className={`bi bi-file-earmark-arrow-down fs-2`}></i>
                                </span>
                                {' Descargar json web'}
                            </Button>
                        </a>

                        <a
                            style={{paddingLeft: 30}}
                            href={
                                'https://mcd-archivos.s3.amazonaws.com/plantillasIdiomas/plantilla_es_movil.json'
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <Button variant='primary' className='mt-md-0 mt-4'>
                                <span className='menu-icon me-0  '>
                                    <i className={`bi bi-file-earmark-arrow-down fs-2`}></i>
                                </span>
                                {' Descargar json movil'}
                            </Button>
                        </a>

                        <Button
                            variant='primary'
                            className='mt-md-0 mt-4'
                            onClick={showModalLanguage}
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
                    show={modalAddLanguage.show}
                    setShow={setModalAddLanguage}
                    onClose={() => setModalAddLanguage({show: false, language: {}})}
                    language={newIdioma}
                    setLanguage={setNewIdioma}
                    addLanguage={addLanguage}
                />

                <UpdateLanguage
                    show={modalUpdateIdioma.show}
                    setShow={setModalUpdateIdioma}
                    onClose={() => setModalUpdateIdioma({show: false, language: {}})}
                    // language={modalUpdateIdioma.language}
                    idioma={idioma}
                    setIdioma={setIdioma}
                    updateIdioma={updateIdioma}
                    deleteIdioma={deleteIdioma}
                    validateRole={validateRole}
                    permissionDeleteLanguage={permissionDeleteLanguage}
                />
            </Container>
        </>
    )
}

export default CatalogosPage
