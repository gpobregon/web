import React, {useState, FC, useEffect} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {Button, Modal, Form, Row, Col} from 'react-bootstrap'
import {
    validateStringEmail,
    validateStringEmailAlert,
    validateStringPassword,
    validateStringPasswordAlert,
    validateStringPhoneNumber,
    validateStringPhoneNumberAlert,
    validateStringSinCaracteresEspeciales,
    validateStringSoloNumeros,
} from '../../validarCadena/validadorCadena'
import {roleManager} from '../../../models/roleManager'
import {addUserMethod, getData, getRolesMethod, postData} from '../../../services/api'
import {Amplify, Auth} from 'aws-amplify'
import {awsconfig} from '../../../../aws-exports'
import {useAuth} from '../../auth/core/Auth'
import swal from 'sweetalert'
import {FormControl, IconButton, InputAdornment, OutlinedInput} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

Amplify.configure(awsconfig)

const alertUserDone = async () => {
    swal({
        text: 'Usuario creado',
        icon: 'success',
    })
}

interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
}

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

const animatedComponents = makeAnimated()

const options = [
    {value: 'Admnistrador', label: 'Administrador'},
    {value: 'Editor', label: 'Editor'},
    {value: 'Gestor', label: 'Gestor'},
]

const alertLlenar = async () => {
    swal({
        text: '¡campos incompletos!',
        icon: 'warning',
    })
}

const alertEmail = async () => {
    swal({
        text: '¡Email invalido!',
        icon: 'warning',
    })
}

const AddUser: FC<any> = ({show, onClose}) => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        name: '',
        lastname: '',
        role: '',
        passwordConfirm: '',
        phoneNumber: '',
        imageProfile:
            'https://mcd-archivos.s3.amazonaws.com/fotoPerfiles/Usuario-Vacio-300x300.png',
    })

    const [num, setNum] = useState('')

    const handleNumChange = (event: any) => {
        const limit = 4
        setNum(event.target.value.slice(0, limit))
    }

    const [validEmail, setValidEmail] = useState(false)
    const [touchedEmailInput, setTouchedEmailInput] = useState(false)

    const [validPassword, setValidPassword] = useState(false)
    const [touchedPasswordInput, setTouchedPasswordInput] = useState(false)

    const [validRepeatPassword, setValidRepeatPassword] = useState(false)
    const [touchedRepeatPasswordInput, setTouchedRepeatPasswordInput] = useState(false)

    const [validPhone, setValidPhone] = useState(false)
    const [touchedPhoneInput, setTouchedPhoneInput] = useState(false)

    const [roles, setRoles] = useState<roleManager[]>([])
    //TODO: get roles
    const getRoles = async () => {
        const role: any = await getData(getRolesMethod)
        setRoles(role.data as roleManager[])
    }

    useEffect(() => {
        getRoles()
    }, [])

    const rolesOptions = roles.map((role) => ({
        value: role.nombre,
        label: role.nombre,
    }))

    const signUp = async () => {
        if (
            user.lastname != '' &&
            user.name != '' &&
            user.password != '' &&
            user.passwordConfirm != '' &&
            user.role != '' &&
            user.username != '' &&
            user.phoneNumber != ''
        ) {
            const regExPassword =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ])[A-Za-z\d¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ]{8,}$/g
            if (regExPassword.test(user.password) == false) {
                swal(
                    'La contraseña no es válida',
                    'La contraseña debe de contener:\n• Al menos una letra mayúscula, una minúscula, un número y un caracter especial (!@#$%&*?)\n• Tener al menos un total de 8 caracteres\n',
                    'warning'
                )
                return
            }
            if (user.password == user.passwordConfirm) {
                const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

                if (regEx.test(user.username)) {
                    try {
                        const userData = await Auth.signUp({
                            username: user.username,
                            password: user.password,
                            attributes: {
                                name: user.name,
                                'custom:lastname': user.lastname,
                                'custom:role': user.role,
                                'custom:phoneNumber': user.phoneNumber,
                                'custom:imageProfile': user.imageProfile,
                            },
                            autoSignIn: {
                                // optional - enables auto sign in after user is confirmed
                                enabled: false,
                            },
                        })
                        const filter = roles.filter((item) => {
                            return user.role === item.nombre
                        })
                        let objeto = {
                            id_usuario: userData.userSub,
                            id_rol: filter[0].id_rol,
                            foto: user.imageProfile,
                        }
                        await postData(addUserMethod, objeto)

                        onClose()
                        document.location.href = '/usuarios/user-management'
                    } catch (error) {
                        swal(
                            'Contraseña o email invalidos',
                            'Recuerda escribir una contraseña que incluya un signo especial, una letra minuscula, una letra mayuscula y un minimo de 6 caracteres en total',
                            'warning'
                        )
                        return false
                    }
                } else if (!regEx.test(user.username) && user.username !== '') {
                    alertEmail()
                }
            } else {
                swal('Las contraseñas no coninciden', 'Intentalo de nuevo', 'warning')
            }
        } else {
            swal('Campos inválidos', 'Por favor ingresa correctamente los campos', 'warning')
        }
        //Registro del usuario de AWS en base de datos de back office
        //paso 1: recuperar el id proveniente de AWS

        //paso 2: recuperar el id del role de back office
        //paso 3: consumir la api de usuario guardando los valores del paso 1 y 2 y la imagen dejarla vacia
    }

    const handleChangeRole = (event: any) => {
        setUser({
            username: user.username,
            password: user.password,
            name: user.name,
            lastname: user.lastname,
            role: event.value,
            passwordConfirm: user.passwordConfirm,
            phoneNumber: user.phoneNumber,
            imageProfile: user.imageProfile,
        })
    }

    const blockInvalidChar = (e: {key: string; preventDefault: () => any}) =>
        ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()

    const [password, setPassword] = useState('')
    const [data, setData] = useState({newPassword: '', confirmPassword: ''})
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    })
    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value})
        setTouchedPasswordInput(true)

        if (validateStringPassword(event.target.value)) {
            setPassword(event.target.value)
        }

        setValidPassword(validateStringPassword(event.target.value))
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Nuevo usuario'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className='mb-5'>
                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type='text'
                                    className='mb-4'
                                    onChange={(e) => {
                                        if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                            setUser({
                                                username: user.username,
                                                password: user.password,
                                                name: e.target.value,
                                                lastname: user.lastname,
                                                role: user.role,
                                                passwordConfirm: user.passwordConfirm,
                                                phoneNumber: user.phoneNumber,
                                                imageProfile: user.imageProfile,
                                            })
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type='text'
                                    className='mb-4'
                                    onChange={(e) => {
                                        if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                            setUser({
                                                username: user.username,
                                                password: user.password,
                                                name: user.name,
                                                lastname: e.target.value,
                                                role: user.role,
                                                passwordConfirm: user.passwordConfirm,
                                                phoneNumber: user.phoneNumber,
                                                imageProfile: user.imageProfile,
                                            })
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type='text'
                                    className='mb-4'
                                    onChange={(e) => {
                                        setTouchedEmailInput(true)

                                        if (validateStringEmail(e.target.value)) {
                                            setUser({
                                                username: e.target.value,
                                                password: user.password,
                                                name: user.name,
                                                lastname: user.lastname,
                                                role: user.role,
                                                passwordConfirm: user.passwordConfirm,
                                                phoneNumber: user.phoneNumber,
                                                imageProfile: user.imageProfile,
                                            })
                                        }

                                        setValidEmail(validateStringEmail(e.target.value))
                                    }}
                                />
                                {validEmail && touchedEmailInput ? (
                                    <Form.Label className='text-primary'>
                                        Correo electrónico válido
                                    </Form.Label>
                                ) : !validEmail && touchedEmailInput ? (
                                    <Form.Label className='text-danger'>
                                        Correo electrónico no válido
                                    </Form.Label>
                                ) : null}
                            </Form.Group>
                        </Col>

                        <Col lg={6} md={6} sm={6}>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Select
                                    onMenuOpen={() => getRoles()}
                                    name='rol'
                                    options={rolesOptions}
                                    styles={customStyles}
                                    components={animatedComponents}
                                    onChange={handleChangeRole}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <Form.Group>
                                <Form.Label>{'Teléfono'}</Form.Label>
                                <Form.Control
                                    value={user.phoneNumber}
                                    type='text'
                                    pattern='/^-?\d+\.?\d*$/'
                                    maxLength={8}
                                    autoComplete='off'
                                    className='mb-4'
                                    onChange={(e) => {
                                        if (validateStringSoloNumeros(e.target.value)) {
                                            setUser({
                                                username: user.username,
                                                password: user.password,
                                                name: user.name,
                                                lastname: user.lastname,
                                                role: user.role,
                                                passwordConfirm: user.passwordConfirm,
                                                phoneNumber: e.target.value,
                                                imageProfile: user.imageProfile,
                                            })
                                        }
                                        setTouchedPhoneInput(true)
                                        setValidPhone(validateStringSoloNumeros(e.target.value))
                                    }}
                                />
                                {validPhone && touchedPhoneInput ? (
                                    <Form.Label className='text-primary'>
                                        Teléfono válido
                                    </Form.Label>
                                ) : !validPhone && touchedPhoneInput ? (
                                    <Form.Label className='text-danger'>
                                        Teléfono no válido
                                    </Form.Label>
                                ) : null}
                            </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <Form.Group>
                                <Form.Label>{'Contraseña '}</Form.Label>
                                <p>
                                    *Debe tener por lo menos 6 caracteres, con letras mayúsculas,
                                    letras minúsculas, números y almenos un caracter especial*
                                </p>
                                <FormControl
                                    sx={{width: '100%'}}
                                    variant='outlined'
                                    color='primary'
                                    focused
                                >
                                    <OutlinedInput
                                        inputProps={{
                                            style: {fontFamily: 'sans-serif', color: '#92929F'},
                                        }}
                                        id='outlined-adornment-password'
                                        type={values.showPassword ? 'text' : 'password'}
                                        onChange={(e) => {
                                            setTouchedPasswordInput(true)

                                            setUser({
                                                username: user.username,
                                                password: e.target.value,
                                                name: user.name,
                                                lastname: user.lastname,
                                                role: user.role,
                                                passwordConfirm: user.passwordConfirm,
                                                phoneNumber: user.phoneNumber,
                                                imageProfile: user.imageProfile,
                                            })

                                            setValidPassword(validateStringPassword(e.target.value))

                                            setData({
                                                newPassword: data.newPassword,
                                                confirmPassword: e.target.value,
                                            })
                                            handleChange('password')
                                        }}
                                        placeholder='Introduce tu contraseña'
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    style={{color: '#92929F'}}
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    edge='end'
                                                >
                                                    {values.showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {/* <Form.Control
                                    type='password'
                                    className={'mb-4'}
                                    onChange={(e) => {
                                        setTouchedPasswordInput(true)

                                        setUser({
                                            username: user.username,
                                            password: e.target.value,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role,
                                            passwordConfirm: user.passwordConfirm,
                                            phoneNumber: user.phoneNumber,
                                            imageProfile: user.imageProfile,
                                        })

                                        setValidPassword(validateStringPassword(e.target.value))
                                    }}
                                /> */}
                                {validPassword && touchedPasswordInput ? (
                                    <Form.Label className='text-primary'>
                                        Contraseña válida
                                    </Form.Label>
                                ) : !validPassword && touchedPasswordInput ? (
                                    <Form.Label className='text-danger'>
                                        Contraseña no válida
                                    </Form.Label>
                                ) : null}
                            </Form.Group>
                        </Col>

                        <Col lg={12} md={12} sm={12}>
                            <Form.Group>
                                <Form.Label>{'Confirma la contraseña'}</Form.Label> 
                                <FormControl
                            sx={{width: '100%'}}
                            variant='outlined'
                            color='primary'
                            focused
                        >
                            <OutlinedInput
                                inputProps={{style: {fontFamily: 'sans-serif', color: '#92929F'}}}
                                id='outlined-adornment-password'
                                type={values.showPassword ? 'text' : 'password'}
                                onChange={(e) => { 
                                    setTouchedRepeatPasswordInput(true)

                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role,
                                            passwordConfirm: e.target.value,
                                            phoneNumber: user.phoneNumber,
                                            imageProfile: user.imageProfile,
                                        })

                                        setValidRepeatPassword(
                                            validateStringPassword(e.target.value)
                                        ) 
                                        
                                    setData({
                                        newPassword: data.newPassword,
                                        confirmPassword: e.target.value,
                                    })
                                    handleChange('password')
                                }}
                                placeholder='Introduce tu contraseña'
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            style={{color: '#92929F'}}
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            edge='end'
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                                {/* <Form.Control
                                    type='password'
                                    className={'mb-4'}
                                    onChange={(e) => {
                                        setTouchedRepeatPasswordInput(true)

                                        setUser({
                                            username: user.username,
                                            password: user.password,
                                            name: user.name,
                                            lastname: user.lastname,
                                            role: user.role,
                                            passwordConfirm: e.target.value,
                                            phoneNumber: user.phoneNumber,
                                            imageProfile: user.imageProfile,
                                        })

                                        setValidRepeatPassword(
                                            validateStringPassword(e.target.value)
                                        )
                                    }}
                                /> */}
                                {user.password == user.passwordConfirm ? (
                                    <Form.Label className='text-primary'>
                                        Las contraseñas coinciden
                                    </Form.Label>
                                ) : user.password != user.passwordConfirm ? (
                                    <Form.Label className='text-danger'>
                                        Las contraseñas no coinciden
                                    </Form.Label>
                                ) : null}
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            signUp()
                            //nameValidation()
                            //onClose()
                        }}
                    >
                        {'Añadir '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUser
