import { useState } from 'react' 
import swal from "sweetalert"; 
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'

export function NewPassword(){  
  const [password, setPassword] = useState('')  
  const [newPassword, setNewPassword] = useState('') 

  const alertPassword = async () => {
    swal({
      text: "¡Contraseña incorrecta!",
      icon: "warning",
  
    })
  
  }  
  
  const alertPasswordNoEnviado = async () => {
    swal({
      text: "¡Contraseña no Ingresada!",
      icon: "warning",
  
    })
  
  } 

  const alertNewPassword = async () => {
    swal({
      text: "¡Contraseña incorrecta!",
      icon: "warning",
  
    })
  
  }  
  
  const alertNewPasswordNoEnviado = async () => {
    swal({
      text: "¡Contraseña no Ingresada!",
      icon: "warning",
  
    })
  
  }

  const passwordValidation=()=>{  
    const regEx = /^[0-9]{9}$/g  
    if(regEx.test(password)){ 
      
    }else if(!regEx.test(password) && password !== "" ){ 
      alertPassword()
    }else{ 
      alertPasswordNoEnviado()
    } 
  }

  const newPasswordValidation=()=>{  
    const regEx = /^[0-9]{9}$/g  
    if(regEx.test(password)){ 
      passwordValidation();
    }else if(!regEx.test(newPassword) && newPassword !== "" ){ 
      alertNewPassword()
    }else{ 
      alertNewPasswordNoEnviado()
    } 
  }

    return( 
    <>
    <Form style={{ width: '50%' }} >
      <div className='text-left mb-10'> 
      <span>
          {'/*Cambio de contraseña al loguearse por primera vez*/'}
        </span>
        <h1 className='text-dark mb-3'>Nueva Contraseña</h1>
        <span>
          {'Antes de continuar es necesario que crees una nueva Contraseña'}
        </span>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control type="password"  placeholder="Introduce tu contraseña" />
      </Form.Group> 

      <Form.Group className="mb-3">
        <Form.Label>Confirma tu  contraseña</Form.Label>
        <Form.Control type="password"  placeholder="Introduce tu contraseña" />
      </Form.Group>

      <Button variant="primary"   style={{ width: '100%' }}>
        {'Continuar >'}
      </Button> 

    </Form>  
    </>
    )
}