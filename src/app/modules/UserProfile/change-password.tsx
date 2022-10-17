import React, {useState, FC, useEffect} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {validateStringEmail, validateStringPassword} from '../validarCadena/validadorCadena'

interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
}

const changePassword: FC<any> = ({
    show,
    setShow,
    onClose,
    dataPassword,
    setDataPassword,
    changePasswordMethod,
    values,
    handleChange,
    handleClickShowPassword,
}) => {
    
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Cambiar Contraseña'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className=''>
                        <Form.Label>Contraseña antigua</Form.Label> 
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
                                    
                                    setDataPassword({
                                      oldPassword: e.target.value,
                                      newPassword: dataPassword.newPassword, 
                                      confirmPassword: dataPassword.confirmPassword,
                                    });  
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
                            placeholder='Introduce tu contraseña antigua'
                            autoComplete='off'
                            onChange={(e) => {
                                setDataPassword({
                                    oldPassword: e.target.value,
                                    newPassword: dataPassword.newPassword,
                                })
                            }}
                        /> */}
                    </Form.Group>

                    <Form.Group className='pt-5'>
                        <Form.Label>Contraseña Nueva</Form.Label>
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
                                    
                                    setDataPassword({
                                      oldPassword: dataPassword.oldPassword,
                                      newPassword: e.target.value, 
                                      confirmPassword: dataPassword.confirmPassword,
                                    });  
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
                    </Form.Group> 

                    <Form.Group className='pt-5'>
                        <Form.Label>Confirmar contraseña</Form.Label>
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
                                    setDataPassword({
                                        oldPassword: dataPassword.oldPassword,
                                        newPassword: dataPassword.newPassword, 
                                        confirmPassword: e.target.value,
                                      });  
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
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setDataPassword({
                                oldPassword: '',
                                newPassword: '',
                            })
                            onClose()
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button onClick={() => changePasswordMethod()}>
                        {'Continuar '}
                        <i className='bi bi-chevron-right'></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default changePassword
