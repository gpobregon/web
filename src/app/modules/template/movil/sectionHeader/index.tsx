import { useContext } from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { ContentContext } from '../context'


const Index = () => {
    const { changeTypeEdit, language, changeLangegeSelect, changeLaguage, tipo } = useContext(ContentContext)
    return (
        <div className="mt-8 d-flex justify-content-between">
            <div>
                <p className="h2">Creador de { tipo === 'punto' ? 'Punto' : 'Sitio'}{changeTypeEdit === 1 ? ' - Version Móvil' : 's - Version Web'}</p>
                <p className="small text-muted">Lista de { tipo === 'punto' ? 'Puntos' : 'Sitios'} - Configuracion del { tipo === 'punto' ? 'Punto' : 'Sitio'} -  {changeTypeEdit === 1 ? ' Creador móvil' : 'Creador Web'}</p>
            </div>
            <div>
                <DropdownButton id="dropdown-item-button" size="sm" variant="dark" className="text-white px-8" title={ changeLaguage.length !== 0 ? changeLaguage.label : 'Seleccione un Idioma' }>
                    {
                        language.map((item : any, index: number) => <Dropdown.Item key={index} as="button" onClick={() => changeLangegeSelect(item,changeLaguage.length)}>{ item.label }</Dropdown.Item> )
                    }
                    
                </DropdownButton>
            </div>
        </div>
    )
}

export default Index