import { useContext } from 'react'
import { ContentContext } from '../context'
import { Button } from 'react-bootstrap'

const Index = () => {

    const { oneDataSite, ReturnView, pointInteres } = useContext(ContentContext)

    return (
        <div className="d-flex align-items-center my-2">
            <Button className="btn btn-dark dark" onClick={() => ReturnView()}><i className="fa fa-chevron-left text-white"></i></Button>
            <span className="h3 ms-4 mb-0"> { oneDataSite.nombre || pointInteres.nombre }</span>
            {/* <span className="ms-4 mb-0 text-muted">Última vez editado el {oneDataSite.editado || ''} por</span>
            <span className="ms-2 text-light">{oneDataSite.editadoPor || ''}</span> */}
        </div>
    )
}

export default Index