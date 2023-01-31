import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {FormControl, IconButton, InputAdornment, OutlinedInput} from '@mui/material'
import {Auth} from 'aws-amplify'
import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'
import {validateStringPassword} from '../../validarCadena/validadorCadena'

interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
}

export function RestorePassword() {
    const [data, setData] = useState({password: '', passwordConfirm: '', code: ''})
    let navigate = useNavigate()

    let email = localStorage.getItem('email')

    if (email) {
        email = JSON.parse(email)
    }

    const forgotPasswordSubmit = async () => {
        if (data.password != '' && data.passwordConfirm != '' && data.code != '') {
            if (data.password == data.passwordConfirm) {
                try {
                    if (email) {
                        await Auth.forgotPasswordSubmit(email, data.code, data.password)
                        localStorage.removeItem('email')
                        navigate('/auth', {replace: true})
                    }
                } catch (error) {
                    swal('Hubo un error al cambiar tu contraseña', 'Inténtalo de nuevo', 'error')
                }
            } else {
                swal('Las contraseñas no son iguales', 'Intentalo de nuevo', 'warning')
            }
        } else {
            swal('Campos inválidos', 'Por favor ingresa correctamente los campos', 'warning')
        }
    }

    const [password, setPassword] = useState('')
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    })
    const [validPassword, setValidPassword] = useState(false)
    const [touchedPasswordInput, setTouchedPasswordInput] = useState(false)
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

    const [validRepeatPassword, setValidRepeatPassword] = useState(false)
    const [touchedRepeatPasswordInput, setTouchedRepeatPasswordInput] = useState(false)

    return (
        <div style={{width: '50%'}}>
            <div className='text-left mb-10'>
                <h1 className='text-dark mb-3'>Nueva Contraseña</h1>
                <span>
                    {
                        'Se ha enviado un mensaje para restablecer la contraseña. Por favor, revisa tu correo electronico para restablecer tu contraseña'
                    }
                </span>
            </div>

            <Form.Group className='mb-3'>
                <Form.Label>Código de seguridad</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Introduce el código que se te envió'
                    autoComplete='off'
                    maxLength={6}
                    onChange={(e) => {
                        setData({
                            password: data.password,
                            passwordConfirm: data.passwordConfirm,
                            code: e.target.value,
                        })
                    }}
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Nueva contraseña</Form.Label>
                <p>
                    *Debe tener por lo menos 6 caracteres, con letras mayúsculas, letras minúsculas,
                    números y almenos un caracter especial*
                </p>
                <FormControl sx={{width: '100%'}} variant='outlined' color='primary' focused>
                    <OutlinedInput
                        inputProps={{
                            style: {fontFamily: 'sans-serif', color: '#92929F'},
                        }}
                        id='outlined-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={(e) => {
                            setTouchedPasswordInput(true)

                            setData({
                                password: e.target.value,
                                passwordConfirm: data.passwordConfirm,
                                code: data.code,
                            })

                            setValidPassword(validateStringPassword(e.target.value))

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
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {validPassword && touchedPasswordInput ? (
                    <Form.Label className='text-primary'>Contraseña válida</Form.Label>
                ) : !validPassword && touchedPasswordInput ? (
                    <Form.Label className='text-danger'>Contraseña no válida</Form.Label>
                ) : null}
                {/* <Form.Control
                    type='password'
                    placeholder='Introduce tu contraseña'
                    autoComplete='off'
                    onChange={(e) => {
                        setData({
                            password: e.target.value,
                            passwordConfirm: data.passwordConfirm,
                            code: data.code,
                        })
                    }}
                /> */}
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Confirma tu contraseña</Form.Label>
                <FormControl sx={{width: '100%'}} variant='outlined' color='primary' focused>
                    <OutlinedInput
                        inputProps={{style: {fontFamily: 'sans-serif', color: '#92929F'}}}
                        id='outlined-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={(e) => {
                            setTouchedRepeatPasswordInput(true)

                            setValidRepeatPassword(validateStringPassword(e.target.value))

                            setData({
                                password: data.password,
                                passwordConfirm: e.target.value,
                                code: data.code,
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
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {data.password == data.passwordConfirm ? (
                    <Form.Label className='text-primary'>Las contraseñas coinciden</Form.Label>
                ) : data.password != data.passwordConfirm ? (
                    <Form.Label className='text-danger'>Las contraseñas no coinciden</Form.Label>
                ) : null}
                {/* <Form.Control
                    type='password'
                    placeholder='Repite tu contraseña'
                    autoComplete='off'
                    onChange={(e) => {
                        setData({
                            password: data.password,
                            passwordConfirm: e.target.value,
                            code: data.code,
                        })
                    }}
                /> */}
            </Form.Group>

            <Button
                variant='primary'
                onClick={() => forgotPasswordSubmit()}
                style={{width: '100%'}}
            >
                {'Continuar '}
                <i className='bi bi-chevron-right'></i>
            </Button>
        </div>
    )
}
