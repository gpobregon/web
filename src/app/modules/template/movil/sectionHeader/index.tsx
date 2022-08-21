import { useState, useContext } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { ContentContext } from '../context'


const Index = () => {
    const [changeLaguage, setChangeLaguage] = useState('español')
    const { changeTypeEdit } = useContext(ContentContext)
    return (
        <div className="mt-8 d-flex justify-content-between">
            <div>
                <p className="h2">Creador de Sitio{changeTypeEdit === 1 ? ' - Version Móvil' : 's - Version Web'}</p>
                <p className="small text-muted">Lista de Sitios - Configuracion del Sitio -  {changeTypeEdit === 1 ? ' Creador móvil' : 'Creador Web'}</p>
            </div>
            <div>
                <DropdownButton id="dropdown-item-button" size="sm" variant="dark" className="text-white px-8" title={ changeLaguage }>
                    <Dropdown.Item as="button" onClick={() => setChangeLaguage('español')}>español</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setChangeLaguage('ingles')}>ingles</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => setChangeLaguage('japones')}>japones</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    )
}

export default Index