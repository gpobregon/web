import { Button } from 'react-bootstrap'

const Index = () => {
    return (
        <div className="d-flex align-items-center my-2">
            <Button variant="dark"><i className="fa fa-chevron-left text-white"></i></Button>
            <span className="h3 ms-4 mb-0"> Museo del Ferrocarril</span>
            <span className="ms-4 mb-0 text-muted">Última vez editado el 15/07/22 por</span>
            <span className="ms-2 text-light">Usuario 01</span>
        </div>
    )
}

export default Index