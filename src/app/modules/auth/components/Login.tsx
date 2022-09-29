import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {Amplify, Auth} from 'aws-amplify'
import {awsconfig} from '../../../../aws-exports'
import {useAuth} from '../core/Auth'
import swal from 'sweetalert'
import {validateStringEmail, validateStringPassword} from '../../validarCadena/validadorCadena'
Amplify.configure(awsconfig)
Amplify.configure(awsconfig)

const alertNotNullInputs = async () => {
    swal({
        text: 'Credenciales incorrectas',
        icon: 'warning',
    })
}
const alertEmail = async () => {
    swal({
        text: '¡Email no valido!',
        icon: 'warning',
    })
}

const alertEmailNoIngresado = async () => {
    swal({
        text: '¡Email no ingresado!',
        icon: 'warning',
    })
}

const alertPassword = async () => {
    swal({
        text: '¡Contraseña no valida!',
        icon: 'warning',
    })
}

const alertPasswordNoEnviado = async () => {
    swal({
        text: '¡Contraseña no Ingresada!',
        icon: 'warning',
    })
}

export function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [changePassword, setChangePassword] = useState(false)
    const [user, setUser] = useState(null)
    const {saveAuth, setCurrentUser} = useAuth()

    const [validEmail, setValidEmail] = useState(false)
    const [touchedEmailInput, setTouchedEmailInput] = useState(false)

    const [validPassword, setValidPassword] = useState(false)
    const [touchedPasswordInput, setTouchedPasswordInput] = useState(false)

    // const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    // const [message, setMessage] = useState('')
    // const [pwdRequisite, setPwdRequisite] = useState(false)
    // const [checks, setChecks] = useState({
    //     capsLettercheck: false,
    //     numberCheck: false,
    //     pwdLengthCheck: false,
    //     specialChaCheck: false,
    // })

    const login = async (email: string, password: string) => {
        try {
            const user = await Auth.signIn(email, password)
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                setChangePassword(true)
            }
            setUser(user)
            setCurrentUser(user)
            saveAuth(user)
            return user
        } catch (error) {
            alertNotNullInputs()
            console.log(error)
            return null
        }
    }

    const onChangePassword = async () => {
        try {
            const result = await Auth.completeNewPassword(user, newPassword)
            if (result) {
                setUser(user)
                setCurrentUser(result)
                saveAuth(result)
                return result
            }
            return null
        } catch (error) {
            return error
        }
    }

    const handleSubmit = async (values: any) => {
        setLoading(true)
        try {
            if (changePassword) {
                const user = await onChangePassword()
            } else {
                const user = await login(email, password)
            }
        } catch (error: any) {
            console.error(error.message)
            setLoading(false)
        }
        return false
    }

    const emailValidation = () => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (regEx.test(email)) {
            passwordValidation()
        } else if (!regEx.test(email) && email !== '') {
            alertEmail()
        } else {
            alertEmailNoIngresado()
        }
    }

    const passwordValidation = () => {
        const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
        if (regEx.test(password)) {
            handleSubmit(true)
        } else if (!regEx.test(password) && password !== '') {
            alertPassword()
        } else {
            alertPasswordNoEnviado()
        }
    }

    return (
        <Form style={{width: '50%'}}>
            {
                !changePassword ? (
                    <>
                        <div className='text-left mb-10'>
                            <h1 className='text-dark mb-3'>Iniciar sesión</h1>
                            <span>
                                {
                                    'Bienvenidos al sistema de administración del Ministerio de Cultura y Deporte, inicia sesión para comenzar a gestionar el contenido.'
                                }
                            </span>
                        </div>
                        <Form.Group className='mb-3'>
                            <Form.Label>Correo electronico</Form.Label>
                            <Form.Control
                                type='email'
                                onChange={(event) => {
                                    setTouchedEmailInput(true)

                                    if (validateStringEmail(event.target.value)) {
                                        setEmail(event.target.value)
                                    }

                                    setValidEmail(validateStringEmail(event.target.value))
                                }}
                                placeholder='Introduce tu correo electronico'
                            />
                            {validEmail && touchedEmailInput ? (
                                <Form.Label className='mt-2 text-primary'>
                                    Correo electrónico válido
                                </Form.Label>
                            ) : !validEmail && touchedEmailInput ? (
                                <Form.Label className='mt-2 text-danger'>
                                    Correo electrónico no válido
                                </Form.Label>
                            ) : null}
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>{'Contraseña'}</Form.Label>
                            <Form.Control
                                type='password'
                                onChange={(event) => {
                                    setTouchedPasswordInput(true)

                                    if (validateStringPassword(event.target.value)) {
                                        setPassword(event.target.value)
                                    }

                                    setValidPassword(validateStringPassword(event.target.value))
                                }}
                                placeholder='Introduce tu contraseña'
                            />
                            {validPassword && touchedPasswordInput ? (
                                <Form.Label className='mt-2 text-primary'>
                                    Contraseña válida
                                </Form.Label>
                            ) : !validPassword && touchedPasswordInput ? (
                                <Form.Label className='mt-2 text-danger'>
                                    Contraseña no válida
                                </Form.Label>
                            ) : null}
                        </Form.Group>

                        <div className='d-flex mb-10 mt-10 justify-content-end '>
                            <Link to='/auth/forgot-password' style={{paddingLeft: 10}}>
                                {'Olvidé mi contraseña'}
                            </Link>
                        </div>

                        <Button variant='primary w-100' onClick={emailValidation} disabled={!validPassword || !validEmail}>
                            {'Iniciar sesión'}
                        </Button>
                    </>
                ) : null
                // <>
                //     <div className='text-left mb-10'>
                //         <h1 className='text-dark mb-3'>Cambio de contraseña</h1>
                //         <span>
                //             {
                //                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                //             }
                //         </span>
                //     </div>
                //     <Form.Group className='mb-3'>
                //         <Form.Label>{'Nueva Contraseña'}</Form.Label>
                //         <Form.Control
                //             type='password'
                //             value={newPassword}
                //             onChange={(event) => setNewPassword(event.target.value)}
                //             placeholder='Introduce tu nueva contraseña'
                //         />
                //     </Form.Group>

                //     <Form.Group className='mb-3'>
                //         <Form.Label>{'Confirme Contraseña'}</Form.Label>
                //         <Form.Control
                //             type='password'
                //             value={newPasswordConfirm}
                //             onChange={(event) => setNewPasswordConfirm(event.target.value)}
                //             placeholder='Confirma tu nueva contraseña'
                //         />
                //     </Form.Group>
                //     <Button variant='primary' onClick={handleSubmit} style={{width: '100%'}}>
                //         {'Cambiar contraseña e Iniciar sesión'}
                //     </Button>
                // </>
            }
        </Form>
    )
}
