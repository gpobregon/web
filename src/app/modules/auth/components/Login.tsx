import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap';
import { Amplify, Auth } from 'aws-amplify';
import { awsconfig } from '../../../../aws-exports';
import { useAuth } from '../core/Auth';
Amplify.configure(awsconfig);
Amplify.configure(awsconfig);

export function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [changePassword, setChangePassword] = useState(false)
  const [user, setUser] = useState(null)
  const { saveAuth, setCurrentUser } = useAuth()

  const login = async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email, password);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setChangePassword(true)
      }
      setUser(user)
      setCurrentUser(user)
      saveAuth(user)
      return user
    } catch (error) {
      console.log(error);
      return null
    }
  }

  const onChangePassword = async () => {
    try {
      const result = await Auth.completeNewPassword(user, newPassword);
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
    return false;
  }

  return (
    <Form style={{ width: '50%' }}>

      {
        !changePassword ?
          <>
            <div className='text-left mb-10'>
              <h1 className='text-dark mb-3'>Iniciar sesión</h1>
              <span>
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Introduce tu correo electronico" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{'Contraseña'}</Form.Label>
              <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Introduce tu contraseña" />
            </Form.Group> 

            <div className='d-flex mb-10 mt-10 justify-content-between '  >
              <Form.Group className="">
                <Form.Check type="checkbox" label="Recuerdame" />  
              </Form.Group>   
              <Link to='/auth/forgot-password'>{'Olvidé mi contraseña'}</Link>
            </div>



            <Button variant="primary" onClick={handleSubmit} style={{ width: '100%' }}>
              {'Iniciar sesión'}
            </Button>
          </>
          :
          <>
            <div className='text-left mb-10'>
              <h1 className='text-dark mb-3'>Cambio de contraseña</h1>
              <span>
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </span>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>{'Nueva Contraseña'}</Form.Label>
              <Form.Control type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="Introduce tu nueva contraseña" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{'Confirme Contraseña'}</Form.Label>
              <Form.Control type="password" value={newPasswordConfirm} onChange={(event) => setNewPasswordConfirm(event.target.value)} placeholder="Confirma tu nueva contraseña" />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit} style={{ width: '100%' }}>
              {'Cambiar contraseña e Iniciar sesión'}
            </Button>
          </>
      }


   
    </Form>
  )
}