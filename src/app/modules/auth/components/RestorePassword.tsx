import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'

export function RestorePassword(){  

    return(
    <Form style={{ width: '50%' }} >
      <div className='text-left mb-10'> 
      <span>
          {'/*Aparece al acceder al link*/'}
        </span>
        <h1 className='text-dark mb-3'>Nueva Contraseña</h1>
        <span>
          {'Se ha enviado un mail para restablecer la contraseña. Por favor, revisa tu correo electronico para restablecer tu contraseña'}
        </span>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Nueva contraseña</Form.Label>
        <Form.Control type="password" placeholder="Introduce tu contraseña" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirma tu  contraseña</Form.Label>
        <Form.Control type="password" placeholder="Introduce tu contraseña" />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        {'Continuar >'}
      </Button> 

    </Form> 
    )
}