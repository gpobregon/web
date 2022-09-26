import {useState} from 'react'
import swal from 'sweetalert'
import {Form, Button} from 'react-bootstrap'
import {Link, Route, useNavigate} from 'react-router-dom'
import {Login} from './Login'
import {Auth} from 'aws-amplify'
import {validateStringEmail, validateStringSoloNumeros, validateStringCode} from '../../validarCadena/validadorCadena'

const CodeRegister = () => {
    const [data, setData] = useState({username: '', code: ''})
    const [validEmail, setValidEmail] = useState(false)
    const [touchedEmailInput, setTouchedEmailInput] = useState(false)

    const [validCode, setValidCode] = useState(false)
    const [touchedCodeInput, setTouchedCodeInput] = useState(false)

    let navigate = useNavigate()

    const confirmSignUp = async () => {
        if (data.username != '' && data.code != '') {
            try {
                await Auth.confirmSignUp(data.username, data.code)
                navigate('/auth', {replace: true})
            } catch (error) {
                swal('Hubo un error al confimar tu correo', 'Inténtalo de nuevo', 'error')
                console.log('error confirming sign up', error)
            }
        } else {
            swal('Campos inválidos', 'Por favor ingresa correctamente los campos', 'warning')
        }
    }

    return (
        <>
            <Form style={{width: '50%'}}>
                <div className='text-left mb-10'>
                    <h1 className='text-dark mb-3'>Confirmar Registro</h1>
                    <span>
                        {
                            'Antes de continuar es necesario que ingreses el código de confirmación que se envió a tu email'
                        }
                    </span>
                </div>

                <Form.Group className='mb-3'>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce tu correo'
                        onChange={(e) => {
                            setTouchedEmailInput(true)

                            if (validateStringEmail(e.target.value)) {
                                setData({
                                    username: e.target.value,
                                    code: data.code,
                                })
                            }

                            setValidEmail(validateStringEmail(e.target.value))
                        }}
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
                    <Form.Label>Código de seguridad</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Introduce el código que se te envió'
                        maxLength={6}
                        onChange={(e) => {
                            setTouchedCodeInput(true)

                            if (validateStringCode(e.target.value)) {
                                setData({
                                    username: data.username,
                                    code: e.target.value,
                                })
                            }

                            setValidCode(validateStringCode(e.target.value))
                        }}
                    />
                    {validCode && touchedCodeInput ? (
                        <Form.Label className='mt-2 text-primary'>Código válido</Form.Label>
                    ) : !validCode && touchedCodeInput ? (
                        <Form.Label className='mt-2 text-danger'>Código no válido</Form.Label>
                    ) : null}
                </Form.Group>

                <Button variant='primary w-100' onClick={() => confirmSignUp()} disabled={!validCode || !validEmail}>
                    {'Continuar '}
                    <i className='bi bi-chevron-right'></i>
                </Button>
            </Form>
        </>
    )
}

export default CodeRegister
