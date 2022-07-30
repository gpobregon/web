/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { useAuth } from '../core/Auth'
import { Form, Button } from 'react-bootstrap';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@demo.com',
  password: 'demo',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await login(values.email, values.password)
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('Algo falló al iniciar sesión')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <Form style={{ width: '50%' }} onSubmit={formik.handleSubmit}>
      <div className='text-left mb-10'>
        <h1 className='text-dark mb-3'>Iniciar sesión</h1>
        <span>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </span>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Ingresa tu email" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{'Contraseña'}</Form.Label>
        <Form.Control type="password" placeholder="Introduce tu contraseña" />
      </Form.Group>
      <Form.Group className="mb-10 mt-10">
        <Form.Check type="checkbox" label="Recuerdame" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        {'Iniciar sesión'}
      </Button>

      <div className='text-center mt-10'>
        <div className='text-gray-400 fw-bold fs-4'>
          {'¿Eres nuevo? '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            {'Solicita tu usuario'}
          </Link>
        </div>
      </div>
    </Form>
  )
}
