import {Auth} from 'aws-amplify'
import {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import swal from 'sweetalert'

export function RestorePassword() {
    const [data, setData] = useState({password: '', passwordConfirm: '', code: ''})
    let navigate = useNavigate()

    let email = localStorage.getItem('email') 

    if (email){ 
        email = JSON.parse(email)
    } 
    console.log(email)

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
                    console.log('error confirming changing password', error)
                }
            } else {
                swal('Las contraseñas no son iguales', 'Intentalo de nuevo', 'warning')
            }
        } else {
            swal('Campos inválidos', 'Por favor ingresa correctamente los campos', 'warning')
        }
    }

    return (
        <div style={{width: '50%'}}>
            <div className='text-left mb-10'>
                <span>{'/*Aparece al acceder al link*/'}</span>
                <h1 className='text-dark mb-3'>Nueva Contraseña</h1>
                <span>
                    {
                        'Se ha enviado un mail para restablecer la contraseña. Por favor, revisa tu correo electronico para restablecer tu contraseña'
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
                <Form.Control
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
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Confirma tu contraseña</Form.Label>
                <Form.Control
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
                />
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
