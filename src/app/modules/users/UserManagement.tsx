import React, {FC, useState, useEffect} from 'react'
import {Button, Col, Container, Form, Row, Table} from 'react-bootstrap'
import Select from 'react-select'
import {initialQueryState, KTSVG, useDebounce} from '../../../_metronic/helpers'
import AddUser from './components/add-user'
import DeleteUser from './components/delete-user'
import makeAnimated from 'react-select/animated'
import {Link} from 'react-router-dom'
import {awsconfig} from '../../../aws-exports'
import {DataStore} from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import * as AWS from 'aws-sdk'
import {
    ListUsersResponse,
    UsersListType,
    UserType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider'

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: '#1B1B29',
        border: 'none',
        width: 150,
        color: '#92929F',
        '&:hover': {
            borderColor: '#323248',
        },
        '&:focus': {
            borderColor: '#323248',
        },
        '&:active': {
            borderColor: '#323248',
        },
    }),
    input: (base: any, state: any) => ({
        ...base,
        color: '#92929f',
    }),
    option: (base: any, state: any) => ({
        ...base,
        width: 150,
        background: state.isFocused ? '#009EF7' : '#323248',
        color: state.isFocused ? '#fff' : '#92929F',
        padding: 10,
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#fff',
    }),
    menu: (base: any) => ({
        ...base,
        width: 150,
        borderRadius: 6.175,
        background: '#323248',
    }),
    menuList: (base: any) => ({
        ...base,
        width: 150,
        padding: 0,
        borderRadius: 6.175,
    }),
}

const options = [
    {value: 'Admnistrador', label: 'Administrador'},
    {value: 'Editor', label: 'Editor'},
    {value: 'Gestor', label: 'Gestor'},
]

const animatedComponents = makeAnimated()

//esto me retorna el email del usuario con el que estoy logueado
// const getEmail = ()=>{
//     Auth.currentAuthenticatedUser().then((user) => {
//         console.log('user email = ' + user.attributes.email + ' ' + user.attributes.name  );
//       });
// }

// getEmail()
const UserManagement: FC<any> = ({show}) => {
    // let iterationRows = [1, 2, 3, 4, 5, 6]
    // let users: Array<any> = []
    const [users, setUsers] = useState<UserType[]>([])
    const [existUsers, setExistUsers] = useState(false)
    const [modalAddUser, setModalAddUser] = useState(false)
    const [modalDeleteUser, setModalDeleteUser] = useState({show: false, user: {}})
    const [buttonAcept, setButtonAcept] = useState(false)
    const [banderID, setBanderID] = useState(0)
    //const banderID: any = 0

    const showModalAddUser = () => {
        setModalAddUser(true)
    }

    const showModalDeleteUser = (user: any) => {
        setModalDeleteUser({show: true, user})
    }

    const getUsers = async () => {
        let params = {
            UserPoolId: awsconfig.userPoolId,
            AttributesToGet: ['name', 'email', 'custom:role', 'custom:phoneNumber'],
        }

        return new Promise((resolve, reject) => {
            let cognito = new AWS.CognitoIdentityServiceProvider({region: awsconfig.region})
            cognito.listUsers(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(data)

                    setUsers(data.Users as UserType[])
                    setExistUsers(true)
                }
            })
        })
    }  



    const getPropertiesSelect = (item: any) => {
        if (existUsers == true) {
            return {
                label: item?.Atributes[1]?.Value ?? '',
                value: item?.Atributes[1]?.Value ?? '',
            }
        } else {
            return {
                label: '',
                value: '',
            }
        }
    }

    



    useEffect(() => {
        getUsers() 
    }, [])  

    

    return (
        <Container fluid>
            <div
                className=''
                style={{
                    backgroundColor: '#1E1E2D',
                    borderRadius: '5px',
                }}
            >
                <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                    <div className='d-flex align-items-center'>
                        <Link to='/usuarios'>
                            <Button variant='secondary' className='text-center me-4'>
                                <i className='fs-2 bi-chevron-left px-0 fw-bolder'></i>
                            </Button>
                        </Link>
                        <h1 className='m-0'>Usuarios</h1>
                    </div>
                </div>
            </div>

            {existUsers == true ? (
                <div style={show == false ? {display: 'none'} : {display: 'block'}}>
                    <Row className='mb-7'>
                        <div className='text-left' style={{paddingTop: 20}}>
                            <h3 className='text-dark mt-0'>Gestión de Usuarios</h3>
                        </div>
                    </Row>
                    <div
                        className=''
                        style={{
                            backgroundColor: '#1E1E2D',
                            borderRadius: '5px',
                        }}
                    >
                        <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9 '>
                            {/* <div className='d-flex align-items-center position-relative my-1'>  */}
                            <div
                                className='d-flex align-items-center position-relative  '
                                style={{width: '100%', justifyContent: 'space-between'}}
                            >
                                <KTSVG
                                    path='/media/icons/duotune/general/gen021.svg'
                                    className='svg-icon-1 position-absolute ms-6'
                                />
                                <input
                                    type='text'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid w-250px ps-14'
                                    placeholder='Buscar'
                                />
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        variant='primary'
                                        className='mt-md-0 mt-4'
                                        onClick={() => showModalAddUser()}
                                    >
                                        <span className='menu-icon me-0'>
                                            <i className={`bi bi-plus fs-1 `}></i>
                                        </span>
                                        {' Nuevo Usuario'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className='col-xs-12 col-md-12 col-lg-12 py-5 px-9'>
                            <Table bordered hover variant='dark' className='align-middle'>
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Usuario</th>
                                        <th>Teléfono</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {existUsers == true ? (
                                        users?.map((item: any) => (
                                            <tr key={item.Username}>
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
                                                    <div>{item.Attributes[1].Value}</div>
                                                    <div className='text-muted'>
                                                        {item.Attributes[3].Value}
                                                    </div>
                                                </td>
                                                <td className='text-muted'>{item.Attributes[0].Value}</td>
                                                <td className='d-flex'>
                                                    {existUsers ? (
                                                        <>
                                                        <Select
                                                            options={options}
                                                            styles={customStyles}
                                                            components={animatedComponents}
                                                            onChange={() => {
                                                                setButtonAcept(true)
                                                                setBanderID(item)
                                                            }} 
                                                            // value={item?.Attributes[2]?.Value ? item.Attributes[2].Value : '' }

                                                            defaultValue={{
                                                                label: 
                                                                    item?.Attributes[2]?.Value ?? '',
                                                                value:
                                                                    item?.Attributes[2]?.Value ?? '',
                                                            }}
                                                        /> 
                                                        </> 
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {buttonAcept === true && item === banderID ? (
                                                        <div>
                                                            <Button
                                                                variant='btn btn-light btn-active-light-primary'
                                                                style={{marginLeft: 10}}
                                                            >
                                                                <i
                                                                    className={`bi bi-check text-white fs-3`}
                                                                ></i>
                                                            </Button>
                                                            <Button
                                                                variant='btn btn-light btn-active-light-primary'
                                                                style={{marginLeft: 10}}
                                                            >
                                                                <i
                                                                    className={`bi bi-x text-white fs-3`}
                                                                ></i>
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                </td>
                                                <td>
                                                    <label
                                                        className='btn btn-light btn-active-light-danger btn-sm'
                                                        onClick={() => showModalDeleteUser(item)}
                                                    >
                                                        {'Eliminar '}
                                                        <span className='menu-icon me-0'>
                                                            <i className={`bi bi-trash-fill`}></i>
                                                        </span>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <AddUser
                        show={modalAddUser}
                        onClose={() => setModalAddUser(false)}
                        //addUser={addUser}
                    />

                    <DeleteUser
                        show={modalDeleteUser.show}
                        onClose={() => setModalDeleteUser({show: false, user: {}})} 
                        user = {modalDeleteUser.user}
                    />
                </div>
            ) : (
                <></>
            )}
        </Container>
    )
}

export default UserManagement
