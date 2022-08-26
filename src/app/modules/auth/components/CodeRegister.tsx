import { useState } from 'react' 
import swal from "sweetalert"; 
import { Form, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'

const CodeRegister = () => {
    return( 
        <>
        <Form style={{ width: '50%' }} >
          <div className='text-left mb-10'> 
            <h1 className='text-dark mb-3'>Confirmar Registro</h1>
            <span>
              {'Antes de continuar es necesario que ingreses el código de confirmación que se envió a tu email'}
            </span>
          </div>
    
          <Form.Group className="mb-3">
            <Form.Label>Código de seguridad</Form.Label>
            <Form.Control type="text"  placeholder="Introduce el código que se te envió" />
          </Form.Group>  

          <Link to='login'>
            <Button variant="primary"   style={{ width: '100%' }}>
                {'Continuar >'}
            </Button> 
          </Link>
    
        </Form>  
        </>
  )
}

export default CodeRegister