import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import {getData, sitesMethod, deleteData, postData, getRolesMethod} from '../../services/api'
import Sitio from './components/sitio'
import {Site} from '../../models/site'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import moment from 'moment'
import logo from './upload-image_03.jpg'
import QRCode from 'qrcode.react'
import {roleManager} from '../../models/roleManager'
import {Auth} from 'aws-amplify'
import swal from 'sweetalert'

const SitiosPage = () => {
    const [sites, setSites] = useState<Site[]>([])
    const [busqueda, setBusqueda] = useState('')
    const [filterSites, setFilterSites] = useState<Site[]>([])
    const [estado, setEstado] = useState(true)
    const [up, setUp] = useState(true)
    const [cantidadSite, setCantidadSite] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [optionSort, setOptionSort] = useState('Agregado recientemente')
    const [resultIcon, setResultIcon] = useState('bi-sort-up')
    const search = (search: string) => {
        if (!search) {
            setFilterSites(sites)
        } else {
            setFilterSites(
                sites.filter((elemento: Site) =>
                    elemento.nombre.toLowerCase().includes(search.toLocaleLowerCase())
                )
            )
        }
    }

    const handlerChange = (e: {target: {value: string}}) => {
        setBusqueda(e.target.value)
        search(e.target.value)
    }

    const getSites = async () => {
        const site: any = await postData(sitesMethod, {page: pageNumber, quantity: '8'})
        // console.log(site)
        setCantidadSite(site.site.length)
        setFilterSites(site.site as Site[])
        setSites(site.site as Site[])
        const countNextResults: any = await postData(sitesMethod, {
            page: pageNumber + 1,
            quantity: '8',
        })
        if (countNextResults.site.length == 0) {
            setToggleButtonsPagination({
                previous: false,
                next: true,
            })
        } else if (countNextResults.site.length > 0) {
            setToggleButtonsPagination({
                previous: toggleButtonsPagination.previous,
                next: false,
            })
        }
       
        
        let pagesLength = Math.ceil(site.site.length / 8)
        setTotalPages(pagesLength)
    }

    const ordernarAsc = () => {
        const numAscending = [...sites].sort((a, b) => moment(a.creado).diff(b.creado))
        setSites(numAscending)
        setFilterSites(numAscending)
        console.log(numAscending)
        setEstado(false)
        setUp(false)
    }

    const ordenarDesc = () => {
        const numDescending = [...sites].sort((a, b) => moment(b.creado).diff(a.creado))
        setSites(numDescending)
        setFilterSites(numDescending)
        console.log(numDescending)
        setEstado(true)
        setUp(true)
    }

    const toggleOptionSort = () => {
        if (optionSort == 'Agregado recientemente') {
            const numAscending = [...sites].sort((a, b) => moment(a.creado).diff(b.creado))
            setSites(numAscending)
            setFilterSites(numAscending)
            setOptionSort('Agregado anteriormente')
            setResultIcon('bi-sort-down')
        } else if (optionSort == 'Agregado anteriormente') {
            const numDescending = [...sites].sort((a, b) => moment(b.creado).diff(a.creado))
            setSites(numDescending)
            setFilterSites(numDescending)
            setOptionSort('Agregado recientemente')
            setResultIcon('bi-sort-up')
        }
    }

    const downloadQR = () => {
        const canvas = document.getElementById('123456') as HTMLCanvasElement
        const pngUrl = canvas!.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = 'qr.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    //paginacion de sitios por pagina --------------------------------------------------------------

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

    const [permissionCreateSite, setPermissionCreateSite] = useState(true)
    const [permissionEditSite, setPermissionEditSite] = useState(true)
    const [permissionDeleteSite, setPermissionDeleteSite] = useState(true)

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    const validateRole = async () => {
        Auth.currentUserInfo().then((user) => {
            const filter = roles.filter((role) => {
                return user.attributes['custom:role'] === role.nombre
            })

            if (filter[0]?.gestor_sitios === false) {
                navigate('/errors/404', {replace: true})
            }
        })
    }

    useEffect(() => {
        getRoles()
        validateRole()
    }, [existRoles])

    //UseEffect para obtener los sitios --------------------------------------------------------------
    useEffect(() => {
        getSites()
    }, [pageNumber])
    return (
        <Container fluid>
            <div className='col-xs-12 '>
                <div
                    className=' card rounded-0 bgi-no-repeat bgi-position-x-end bgi-size-cover '
                    style={{
                        backgroundColor: '#1A1A27',
                        borderRadius: '5px',
                    }}
                >
                    <div className='col-xs-12 col-md-12 col-lg-12 row align-items-start'>
                        <div className='col-md-4 col-xs-12 searchDash  py-5 px-9'>
                            <h3 className=''>Gestor de Sitios</h3>
                            <h5 className='' style={{color: '#565674', fontSize: '10px'}}>
                                 {cantidadSite} en total
                            </h5>
                        </div>

                        <div className='col-md-5 col-xs-12 searchDash  py-4 px-10'>
                            <div className='d-flex align-items-center position-relative '>
                                <input
                                    type='text'
                                    id='kt_filter_search'
                                    className='form-control form-control-white form-control-sm  inputBuscar'
                                    placeholder='Search'
                                    value={busqueda}
                                    onChange={handlerChange}
                                />
                            </div>
                        </div>

                        <div className='col-md-3 col-xs-2  py-6  '>
                          
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
                                className='d-flex align-items-center justify-content-center px-4'
                                style={{
                                    height: '50px',
                                    backgroundColor: '#2B2B40',
                                    borderRadius: '5px',
                                }}
                            >
                                <h5  style={{ fontSize: '13px'}}>Página {pageNumber} de {totalPages}</h5>
                            
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
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
            <div className='d-flex justify-content-between'>
                <div
                    className='d-flex align-items-center fs-5 text-muted'
                    style={{cursor: 'pointer'}}
                    onClick={toggleOptionSort}
                >
                    <i className={`${resultIcon} fs-1 me-2`}></i>
                    {`${optionSort}`}
                </div>
                <Button
                    className='btn btn-primary'
                    onClick={() => {
                        if (permissionCreateSite) {
                            navigate('/sitios/create', {replace: true})
                        } else {
                            swal({
                                title: 'No tienes permiso para crear un sitio',
                                icon: 'warning',
                            })
                        }
                    }}
                >
                    <i className='bi bi-file-earmark-plus'></i>
                    {'Nuevo sitio'}
                </Button>
            </div>
            <div className='row g-4'>
                {filterSites?.map((sitio) => (
                    <Sitio
                        {...sitio}
                        key={sitio.id_sitio.toString()}
                        permissionEditSite={permissionEditSite}
                        permissionDeleteSite={permissionDeleteSite}
                    />
                ))}

                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                    <Card
                        style={{
                            backgroundColor: '#1e1e2d',
                            margin: '20px',
                            padding: 20,
                            width: '95%',
                            height: '100%',
                            display: 'table',
                        }}
                    >
                        <div
                            style={{
                                whiteSpace: 'nowrap',
                                textOverflow: ' ellipsis',
                                overflow: 'hidden',
                                display: 'table-cell',
                                verticalAlign: 'middle',
                                textAlign: 'center',
                            }}
                            onClick={() => {
                                if (permissionCreateSite) {
                                    navigate('/sitios/create', {replace: true})
                                } else {
                                    swal({
                                        title: 'No tienes permiso para crear un sitio',
                                        icon: 'warning',
                                    })
                                }
                            }}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='
                                33.33px'
                                height='
                                41.67px'
                                fill='white'
                                className='bi bi-file-earmark-plus'
                                viewBox='0 0 16 16'
                            >
                                <path d='M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z' />
                                <path d='M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z' />
                            </svg>
                            <Card.Text
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: ' ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                Nuevo Sitio
                            </Card.Text>
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    )
}

export default SitiosPage
