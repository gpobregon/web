import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'

export function NewPassword(){  

    return(
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