import {FC} from 'react'
import {Link} from 'react-router-dom'
import img404 from './Error-404.png'

const Error404: FC = () => {
    return (
        <div className='d-md-flex justify-content-end h-100'>
            <div className='align-self-center ms-20'>
                <p className='m-0' style={{fontSize: '3.75vw', fontWeight: 700}}>
                    ¡Oops!
                </p>
                <p className='m-0' style={{fontSize: '2.25vw', fontWeight: 500}}>
                    Página no encontrada
                </p>
                <div className='d-flex justify-content-center'>
                    <Link to='/' className='btn btn-outline-primary btn-lg mx-auto mt-5'>
                        Regresar
                    </Link>
                </div>
            </div>
            <div style={{maxHeight: '99vh'}}>
                <img
                    src={img404}
                    alt='error404'
                    style={{maxHeight: '100%', maxWidth: '100%', objectFit: 'cover'}}
                />
            </div>
        </div>
    )
}

export {Error404}
