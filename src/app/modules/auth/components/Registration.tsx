/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { getUserByToken, register } from '../core/_requests'
import { Link } from 'react-router-dom'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { useAuth } from '../core/Auth'
import { Form, Button, Row, Col } from 'react-bootstrap';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], 'Password and Confirm Password didn\'t match'),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const { data: auth } = await register(
          values.email,
          values.firstname,
          values.lastname,
          values.password,
          values.changepassword
        )
        saveAuth(auth)
        const { data: user } = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <Form style={{ width: '50%' }}>
      <div className='text-left mb-10'>
        <h1 className='text-dark mb-3'>Sign In</h1>
        <span>
          {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
        </span>
      </div>

      <Row>
        <Form.Group className='mb-3' as={Col} md='6'>
          <Form.Label>{'Nombres'}</Form.Label>
          <Form.Control type='text' placeholder='Tu nombre' />
        </Form.Group>
        <Form.Group className='mb-3' as={Col} md='6'>
          <Form.Label>{'Apellidos'}</Form.Label>
          <Form.Control type='text' placeholder='Tu apellido' />
        </Form.Group>
      </Row>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>{'Email'}</Form.Label>
        <Form.Control type='email' placeholder='Ingresa tu email' />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>{'Contraseña'}</Form.Label>
        <Form.Control type='password' placeholder='Escribe una contraseña' />
      </Form.Group>
      <Form.Group className='mb-10'>
        <Form.Label>{'Confirma tu contraseña'}</Form.Label>
        <Form.Control type='password' placeholder='Escribe una contraseña' />
      </Form.Group>
      <Button variant='primary' type='submit' style={{ width: '100%' }}>
        {'Solicitar mi usuario'}
      </Button>

      <div className='text-center mt-10'>
        <div className='text-gray-400 fw-bold fs-4'>
          {'¿Tienes un usuario? '}
          <Link to='/auth/login' className='link-primary fw-bolder'>
            {'Iniciar sesión'}
          </Link>
        </div>
      </div>
    </Form>
  )
}
