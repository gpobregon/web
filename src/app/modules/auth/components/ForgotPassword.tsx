import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {requestPassword} from '../core/_requests'
import {Form, Button} from 'react-bootstrap'
import swal from 'sweetalert'
import {Auth} from 'aws-amplify'
import {validateStringEmail} from '../../validarCadena/validadorCadena'

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

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [touchedEmailInput, setTouchedEmailInput] = useState(false)
    let navigate = useNavigate()

    const verifyEmail = async () => {
        try {
            await Auth.forgotPassword(email)
            localStorage.setItem('email', JSON.stringify(email))
            navigate('/auth/restore-password', {replace: true})
        } catch (error) {
            swal(
                'No se ha encontrado tu correo',
                'Verifica si haz ingresado un email registrado',
                'error'
            )
        }
    }

    const emailValidation = () => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

        if (regEx.test(email)) {
            verifyEmail()
        } else if (!regEx.test(email) && email !== '') {
            alertEmail()
        } else {
            alertEmailNoIngresado()
        }
    }

    return (
        <div style={{width: '50%'}}>
            <div
                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                id='kt_login_password_reset_form'
            >
                <div className='text-left mb-10'>
                    <h1 className='text-dark mb-3'>Restablecer Contraseña</h1>
                </div>
                <div className='mb-10'>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingresa tu correo electrónico'
                        autoComplete='off'
                        onChange={(e) => {
                            setTouchedEmailInput(true)

                            if (validateStringEmail(e.target.value)) {
                                setEmail(e.target.value)
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
                            Correo   electrónico no válido
                        </Form.Label>
                    ) : null}
                </div>

                <Button variant='primary w-100' onClick={() => emailValidation()} disabled={!validEmail}>
                    {'Siguiente '}
                </Button>
            </div>
        </div>
    )
}
