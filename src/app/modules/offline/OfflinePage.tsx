import React, {FC, useContext, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Button, Col, Form, Row, Table, Card} from 'react-bootstrap'
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'
import {getData, getRolesMethod, postData} from '../../services/api'
import {OfflinePartWithContent} from '../../models/offline-config'
import {roleManager} from '../../models/roleManager'
import swal from 'sweetalert'
import {LoadingContext} from '../../utility/component/loading/context'
import {Amplify, Auth} from 'aws-amplify'
import {useAuth} from '../auth'

const OfflineManagement: FC<any> = ({show}) => {
    const {setShowLoad} = useContext(LoadingContext)
    const {state} = useLocation()

    const [url_get] = useState('offline/part')
    const [url_edit_type] = useState('offline/part/content/update')
    let [listParts, setListParts] = useState<OfflinePartWithContent[]>([])
    let [arr, setArr] = useState<any[]>([])
    let [arrWithRows, setArrWithRows] = useState<any[]>([])
    const [partes, setPartes] = useState<any[]>([])
    let alt_permisOfflineSites: boolean = true
    let alt_permisOfflinePoints: boolean = true

    let navigate = useNavigate()
    const [roles, setRoles] = useState<roleManager[]>([])
    const [existRoles, setExistRoles] = useState(false)

    const [permissionOfflineSites, setPermissionOfflineSites] = useState(true)
    const [permissionOfflinePoints, setPermissionOfflinePoints] = useState(true)

    async function getOfflineParts() {
        listParts = []
        arr = []
        arrWithRows = []
        const parts: any = await getData(url_get)
        // // console.log(parts);

        var p = parts.map((cat: any) => {
            let contenidos = []
            for (var i = 0; i < cat.tipos_contenido.length; i++) {
                // console.log("CAT TIPOS CONTENIDO");

                // console.log(cat.tipos_contenido[i]);
                // console.log("TIENE PERMSO?");
                // console.log("NORMS");

                // console.log(permissionOfflineSites);
                // console.log(permissionOfflinePoints);

                // console.log("ALTS");

                // console.log(alt_permisOfflineSites);
                // console.log(alt_permisOfflinePoints);

                // console.log(cat.tipos_contenido[i].nombre === 'Sitios' && !permissionOfflineSites);
                // console.log(cat.tipos_contenido[i].nombre === 'Puntos de interés' && !permissionOfflinePoints);

                contenidos.push({
                    id_type: cat.tipos_contenido[i].id_type,
                    nombre: cat.tipos_contenido[i].nombre,
                    checked: cat.tipos_contenido[i].checked,
                    estado: cat.tipos_contenido[i].estado,
                    disabled:
                        (cat.tipos_contenido[i].nombre === 'Sitios' && permissionOfflineSites) ||
                        (cat.tipos_contenido[i].nombre === 'Puntos de interés' &&
                            permissionOfflinePoints),
                })
            }
            // console.log("CONTENIDOOOOOS");
            // // console.log(contenidos);

            listParts.push({
                id_part: cat.id_part,
                nombre: cat.nombre,
                estado: cat.estado,
                tipos_contenido: contenidos,
            })
        })

        listParts.map((m: OfflinePartWithContent, index) => {
            // let el = <div key={index} id={m.id_part.toString()} className='col-md-6 col-xs-12' style={{marginTop:'10px',marginBottom:'10px' }}  >
            //         <h2>{m.nombre}</h2>
            //     </div> ;
            // arr.push(el)

            m.tipos_contenido.map((t: any) => {
                let x = (
                    <Col md={12} sm={12} lg={12}>
                        <Form.Check
                            key={t.id_type}
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                marginRight: '0px',
                                color: '#C7C7C7',
                            }}
                            inline
                            disabled={t.disabled}
                            id={t.id_type}
                            label={t.nombre}
                            checked={t.checked}
                            onClick={async (e: any) => {
                                await validateRole()

                                if (m.nombre === 'Sitios' && !permissionOfflineSites) {
                                    swal({
                                        title: 'No tienes los permisos para cambiar el contenido descargable de los sitios',
                                        icon: 'warning',
                                    })
                                    return
                                }

                                if (m.nombre === 'Puntos de interés' && !permissionOfflinePoints) {
                                    swal({
                                        title: 'No tienes los permisos para cambiar el contenido descargable de los puntos de interés',
                                        icon: 'warning',
                                    })
                                    return
                                }

                                e.target.checked = !e.target.checked
                                // for(var i=0;i<listParts.length;i++){
                                //     for(var j=0;j<listParts.at(i)!.tipos_contenido.length;j++){
                                //         // console.log("C");
                                //         if(listParts.at(i)!.tipos_contenido.at(j)!.id_type==Number(e.target.id)){
                                //             listParts.at(i)!.tipos_contenido.at(j)!.checked = !listParts.at(i)!.tipos_contenido.at(j)!.checked
                                var indexType = m.tipos_contenido.findIndex(
                                    (b) => b.id_type == e.target.id
                                )
                                var indexPart = listParts.findIndex((b) => b.id_part == m.id_part)
                                var x2 = m.tipos_contenido.at(indexType)
                                // // console.log(x);
                                // // console.log(x2);
                                listParts.at(indexPart)!.tipos_contenido.at(indexType)!.checked =
                                    !listParts.at(indexPart)!.tipos_contenido.at(indexType)!.checked

                                await postData(url_edit_type, {
                                    id_part: -1,
                                    id_type: x2.id_type,
                                    nombre: x2.nombre,
                                    checked: x2.checked,
                                    estado: x2.estado,
                                })
                                setListParts(listParts)
                            }}
                            name='group1'
                            // type={type}
                        />
                    </Col>
                )
                arr.push(x)
                // // console.log("ADADSDAS");

                // // console.log(arr);
            })
            // arrWithRows.push(arr[0])
            // for(var i =1;i<arr.length;i=i+3){

            let x = (
                <div
                    key={index}
                    id={m.id_part.toString()}
                    className='col-md-6 col-xs-12'
                    style={{marginTop: '10px', marginBottom: '10px'}}
                >
                    <p style={{fontSize: '17px', color: '#C7C7C7'}}>{m.nombre}</p>
                    {arr}
                </div>
            )
            // let x = <Row >{arr[i]}{arr[i+1]}{arr[i+2]}</Row>
            arrWithRows.push(x)
            // }
            arr = []
        })
        //        setArr(arr)
        setArrWithRows(arrWithRows)
    }

    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
        setExistRoles(true)
    }

    //para cerrar sesión despues de cambiar contraseña, no olvida el dispositivo :c
    const {currentUser, logout} = useAuth()
    const forgotDevice = async () => {
        try {
            logout()
            await Amplify.Auth.forgetDevice()
        } catch (error) {
            console.log('no jalo', error)
        }
    }

    //fin

    const validateRole = async () => {
        setShowLoad(true)
        Auth.currentUserInfo().then(async (user) => {
            try {
                // console.log(user)
                const filter = roles.filter((role) => {
                    return user.attributes['custom:role'] === role.nombre
                })
                // console.log("FILTER");

                // console.log(filter);

                if (filter[0]?.gestor_offline === false) {
                    navigate('/error/401', {replace: true})
                } else {
                    alt_permisOfflineSites = filter[0]?.offline_sitios
                    alt_permisOfflinePoints = filter[0]?.offline_puntos
                    // console.log("ALT SETS");
                    // console.log(alt_permisOfflineSites);
                    // console.log(alt_permisOfflinePoints);

                    setPermissionOfflineSites(filter[0]?.offline_sitios)
                    setPermissionOfflinePoints(filter[0]?.offline_puntos)
                    //getOfflineParts(alt_permisOfflineSites,alt_permisOfflinePoints)
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

    useEffect(() => {
        setShowLoad(true)
        getRoles()
        getOfflineParts()
        validateRole()
    }, [existRoles, listParts, permissionOfflineSites, permissionOfflinePoints])

    useEffect(() => {
        listParts = []
        getRoles()
        //        getOfflineParts()
        // // console.log(listParts);
    }, [listParts])

    return (
        <>
            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        <h1 className='m-0'>Gestor Offline</h1>
                    </div>
                </div>
            </div>

            <Row className='mt-5 mb-9'>
                <div className='text-left col-xs-12 col-md-12 col-lg-12  px-11'>
                    <h2 className='text mb-0'>Configuración de Contenido Descargable</h2>
                    <p style={{color: '#C7C7C7'}}>Lista de categorías</p>
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
                    <Row>
                        <Col md={3} sm={3} style={{paddingRight: '1rem'}}>
                            <h1>Ítems disponibles fuera de línea</h1>
                            <p className='text-justify' style={{color: '#C7C7C7'}}>
                                En este apartado puede seleccionar el contenido que el usuario podrá
                                descargar en su aplicación tanto para sitios como para puntos de
                                interés de un sitio.
                            </p>
                        </Col>
                        <Col md={1} sm={1} style={{width: '1px'}}>
                            <div className='d-flex ' style={{height: '100%', width: '1px'}}>
                                <div className='vr' style={{width: '1px'}}></div>
                            </div>
                        </Col>

                        <Col md={8} sm={8}>
                            <div
                                className='d-flex align-items-center position-relative'
                                style={{width: '100%', justifyContent: 'space-between'}}
                            >
                                <h1>Contenido Descargable</h1>
                            </div>
                            <Row>
                                {arrWithRows.map((e) => {
                                    return e
                                })}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default OfflineManagement
