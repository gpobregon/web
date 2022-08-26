import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {requestPassword} from '../core/_requests'
import {Form, Button} from 'react-bootstrap'
import swal from 'sweetalert'
import {Auth} from 'aws-amplify'

export function ForgotPassword() {
    const [email, setEmail] = useState('')
    let navigate = useNavigate()

    const verifyEmail = async () => {
        if (email != '') {
            try {
                await Auth.forgotPassword(email)
                localStorage.setItem('email', JSON.stringify(email))
                navigate('/auth/restore-password', {replace: true})
            } catch (error) {
                swal('No se ha encontrado tu correo', 'Inténtalo de nuevo', 'error')
                console.log('error confirming sign up', error)
            }
        } else {
            swal('Correo vacío', 'Por favor ingresa correctamente tu correo', 'warning')
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
                <div className='fv-row mb-10'>
                    <label className='form-label fs-6'>Correo electrónico</label>
                    <input
                        type='email'
                        id='inputEmail'
                        placeholder='Ingresa tu correo electrónico'
                        autoComplete='off'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='form-control form-control-lg form-control-solid'
                    />
                </div>

                <button
                    id='kt_password_reset_submit'
                    className='btn btn-lg btn-primary'
                    style={{width: '100%'}}
                    onClick={() => verifyEmail()}
                >
                    {'Siguiente '}
                </button>
            </div>
        </div>
    )
}
