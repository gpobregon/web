import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'
import Auth from '@aws-amplify/auth'
import {CognitoUser} from 'amazon-cognito-identity-js'

import {awsconfig} from '../../../../aws-exports'
import * as AWS from 'aws-sdk' 

import { 
    deleteData,
    deleteUserMethod
} from '../../../services/api'

import {
    ListUsersResponse,
    UsersListType,
    UserType,
} from 'aws-sdk/clients/cognitoidentityserviceprovider'
import swal from 'sweetalert'

async function deleteUser() {
    try {
        const result = await Auth.deleteUser()
        console.log(result)
    } catch (error) {
        console.log('Error deleting user', error)
    }
}

//   async function onRemoveAccount() {
//     Auth
//         .currentAuthenticatedUser()
//         .then((user: CognitoUser) => new Promise((resolve, reject) => {

//             user.deleteUser(error => {
//                 if (error) {
//                     return reject(error);
//                 }
//                 if (this.props.onSessionChange) {
//                     this.props.onSessionChange();
//                 }
//                 document.location.href = "/login";

//                 resolve();
//             });
//         }))
//         .catch(this.onError);
// }

//me elimina tambien el usuario con el que estoy logueado
const handleDeleteCognitoUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user.deleteUser((error: any, data: any) => {
        if (error) {
            throw error
        }
        // do stuff after deletion
    })
}

//   var params = {
//     UserPoolId: 'STRING_VALUE', /* required */
//     Username: 'STRING_VALUE' /* required */
//   };
//   cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });

const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        background: 'transparent',
        borderColor: state.isFocused ? '#474761' : '#323248',
        borderRadius: 6.175,
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
        borderRadius: 6.175,
        background: '#323248',
    }),
    menuList: (base: any) => ({
        ...base,
        padding: 0,
        borderRadius: 6.175,
    }),
}

const DeleteUser: FC<any> = ({show, onClose, user}) => {
    console.log("user hook: ", user);
    const [users, setUsers] = useState<UserType[]>([])
    console.log("users: ", users);
    const [existUsers, setExistUsers] = useState(false)
    const [params, setParams] = useState({name: ''})

    const getUsers = async () => {
        let params = {
            UserPoolId: awsconfig.userPoolId,
            AttributesToGet: ['name', 'email', 'custom:role'],
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

    const [dataUser, setDataUser] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        lastname: '',
        imageProfile: '',
        role: '',
        descripcion: '',
    })

    //esto me retorna el email del usuario con el que estoy logueado 
    const getEmail = async () => {
        Auth.currentUserInfo().then((user) => {
            setDataUser({
                email: user.attributes.email,
                name: user.attributes.name,
                phoneNumber: user.attributes['custom:phoneNumber'],
                lastname: user.attributes['custom:lastname'],
                imageProfile: user.attributes['custom:imageProfile'],
                role: user.attributes['custom:role'],
                descripcion: '',
            })
        })
    }  

    console.log('dataUser: ', dataUser)
    useEffect(() => { 
        getEmail()
    }, [])

    const deleteUsuarios = async () => { 
        var params = {
           
            UserPoolId: awsconfig.userPoolId /* required */,
            Username: user.Attributes[4].Value /* required */,
        } 
        
        if (dataUser.email == user.Attributes[4].Value) {
            swal('Acción denegada', 'No puedes eliminar tu propio usuario', 'warning')
        } else {
            return new Promise(async (resolve, reject) => {
                let cognito = new AWS.CognitoIdentityServiceProvider({region: awsconfig.region})
                cognito.adminDeleteUser(params, (err, data) => {
                    if (err) {
                        console.log(err)
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })   
                    let objeto = {id_usuario: user.Username}
                    
                 await deleteData(deleteUserMethod, objeto) 
                 setTimeout(() => document.location.href = '/usuarios/user-management', 750)
            }) 
        }
    } 
    console.log("user: ", user);

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'¿Seguro que deseas eliminar este usuario?'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.keys(user).length !== 0 ? (
                        <Row>
                            <Col lg={4} md={4} sm={3}>
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#a9a9a9',
                                        borderRadius: '50%',
                                    }}
                                ></div>
                            </Col>

                            <Col lg={4} md={4} sm={3}>
                                <div>{`${user.Attributes[2].Value}`}</div>
                                <div className='text-muted'>{`${user.Attributes[4].Value}`}</div>
                            </Col>

                            <Col lg={4} md={4} sm={3}>
                                <div>Rol</div>
                                <div className='text-muted'>{`${user.Attributes[3].Value}`}</div>
                            </Col>
                        </Row>
                    ) : (
                        <></>
                    )}

                    <Row>
                        <div style={{paddingTop: 50, textAlign: 'center'}}>
                            <span className='menu-icon me-0'>
                                <i className={`bi bi-exclamation-triangle fs-1 `}></i>
                            </span>
                            {' Esta acción no se puede deshacer '}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='btn btn-light-danger btn-active-danger'
                        onClick={() => {
                            deleteUsuarios()
                            
                        }}
                    >
                        {'Eliminar '}
                        <i className={`bi bi-trash-fill text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteUser
